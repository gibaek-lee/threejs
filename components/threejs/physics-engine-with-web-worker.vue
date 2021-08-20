<template>
  <v-row :class="`${selectorCanvasWrap}-container`">
    <v-col class="col-controls">
      <div class="color-change-box">
        <div class="color-change-box__red" />
        <div class="color-change-box__green" />
        <div class="color-change-box__blue" />
      </div>
    </v-col>
    <v-col
      :class="selectorCanvasWrap"
      class="col-canvas"
    >
      <canvas class="webgl" />
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import * as THREE from 'three'
import * as utils from '~/utils/common'
import UseWebgl from '~/composables/threejs'
import UseWebWorker from '~/composables/threejs/common/worker/UseWebWorker'
import { UseAmbientLight, UsePointLight, UseShadow } from '~/composables/threejs/common/light'

export default defineComponent({
  setup (props, context) {
    const {
      setCanvas,
      registerRenderTickCanvas,
      gui,
      scene,
      renderer,
      axesHelper,
      cameraOrbit,
      orbitControl,
      windowSizes,
      clock
    } = UseWebgl({
      context,
      isOrbitControl: true
    })

    return {
      setCanvas,
      registerRenderTickCanvas,
      gui,
      scene,
      renderer,
      axesHelper,
      cameraOrbit,
      orbitControl,
      windowSizes,
      clock
    }
  },
  data () {
    return {
      idAnimationFrame: null,
      selectorCanvasWrap: 'physics-engine-with-web-worker',
      iComposeWorker: null,
      oldElapsedTime: 0,
      deltaTime: 0,
      physicsObjects: [],
      debugObject: {}
    }
  },
  computed: {
    sphereMeshes () {
      return this.physicsObjects.filter(o => o.geometry.type === 'SphereGeometry')
    },
    messageFromWorker () {
      return this.iComposeWorker ? this.iComposeWorker.messageFromWorker : {}
    }
  },
  watch: {
    messageFromWorker: {
      deep: true,
      handler (cur) {
        const { positions, quaternions } = cur

        this.sphereMeshes.forEach((sphere, index) => {
          if (positions) {
            sphere.position.set(
              positions[3 * index + 0],
              positions[3 * index + 1],
              positions[3 * index + 2]
            )
          }
          if (quaternions) {
            sphere.quaternion.set(
              quaternions[4 * index + 0],
              quaternions[4 * index + 1],
              quaternions[4 * index + 2],
              quaternions[4 * index + 3]
            )
          }

          const isNotMeshOnScene = this.scene.children.every(m => m.uuid !== sphere.uuid)
          if (isNotMeshOnScene) {
            this.scene.add(sphere)
          }
        })
      }
    }
  },
  mounted () {
    this.setCanvas({ vm: this })
    this.registerRenderTickCanvas(() => {
      this.initUtils()
      this.initWorkerPhysics()
      this.setStyleDatGui()
      this.tick()

      const MAX_NUM_SPHERE = 100
      const intervalId = window.setInterval(() => {
        const numSphere = this.physicsObjects.filter(o => o.geometry.type === 'SphereGeometry').length

        if (numSphere >= MAX_NUM_SPHERE) {
          window.clearInterval(intervalId)
          return
        }

        this.createSphereMesh()
      }, 100)
    })
  },
  beforeDestroy () {
    window.cancelAnimationFrame(this.idAnimationFrame)
    this.iComposeWorker.worker.terminate()

    const guiParentNode = document.querySelector(this.gui.parentSelector)
    guiParentNode.appendChild(this.gui.domElement)
    this.gui.destroy()
  },
  methods: {
    createSphereMesh () {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.MeshStandardMaterial({ metalness: 0.3, roughness: 0.4 })
      )
      sphere.castShadow = true

      /**
       * todoc 아래 두 주석의 이유
       * 미리 scene에 넣어놓거나 포지션을 정해놓으면 physics world의 body 정보와 매칭되지 않는다.
       * 그러므로 physics world로 부터 messageFromWorker가 있을 때 mesh의 position을 정하고 scene에 add 해야한다.
       */
      // sphere.position.set(0, 6 + 0.5, 0)
      // this.scene.add(sphere)

      this.physicsObjects.push(sphere)
    },
    initUtils () {
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshStandardMaterial({ color: '#777777', metalness: 0.3, roughness: 0.4 })
      )
      floor.rotation.x = -Math.PI * 0.5
      this.scene.add(floor)
      this.physicsObjects.push(floor)

      this.debugObject.createSphereMesh = this.createSphereMesh
      this.gui.add(this.debugObject, 'createSphereMesh')

      this.cameraOrbit.position.set(0, 3, 8)

      const { ambientLight } = UseAmbientLight(this.scene, { intensity: 0.7 })
      const { pointLight } = UsePointLight({ scene: this.scene })
      pointLight.position.y = 5

      const {
        toggleVisiblePointLightCameraHelper
      } = UseShadow({
        scene: this.scene,
        renderer: this.renderer,
        recieveMesh: floor,
        castMeshs: this.physicsObjects,
        light: pointLight,
        isUseCameraHelper: true
      })
    },
    initWorkerPhysics () {
      const baseDomain = document.location.origin
      utils.readStaticFile({ url: `${baseDomain}/threejs/cannon/business/drop-bodies.js` })
        .then((cannonWorldScript) => {
          const STATIC_FPS = 60
          const { iComposeWorker } = UseWebWorker({
            N: 0,
            dt: 1 / STATIC_FPS,
            physicsLibUrl: `${baseDomain}/threejs/cannon/build/cannon.js`,
            physicsWorldScript: cannonWorldScript
          })
          this.iComposeWorker = iComposeWorker
        })
    },
    sendDataToWorker (deltaTime) {
      if (this.iComposeWorker === null) { return }

      // thread processing speed adjustment
      let delay = this.iComposeWorker.dt * 1000 - (Date.now() - this.iComposeWorker.sendTime)
      if (delay > 0) {
        delay = 0
      }

      window.setTimeout(() => {
        this.iComposeWorker.sendDataToWorker({
          action: 'step',
          timeSinceLastCalled: deltaTime,
          maxSubSteps: 3,
          physicsObjects: this.physicsObjects.reduce((a, c) => a.concat(c.geometry.type), [])
        })
      }, delay)
    },
    tick () {
      const elapsedTime = this.clock.getElapsedTime()
      this.deltaTime = elapsedTime - this.oldElapsedTime
      this.oldElapsedTime = elapsedTime

      if (this.physicsObjects.length > 0) {
        this.sendDataToWorker(this.deltaTime)
      }

      this.renderer.render(this.scene, this.cameraOrbit)

      this.orbitControl.update()

      this.idAnimationFrame = window.requestAnimationFrame(this.tick)
    },
    setStyleDatGui () {
      this.gui.domElement.style.cssText += 'position: absolute; right: 0px; top: 0px;'
      this.$el.querySelector(`.${this.selectorCanvasWrap}`).appendChild(this.gui.domElement)
    }
  }
})
</script>

<style lang="scss" scoped>
.physics-engine-with-web-worker-container {
  height: 100%;

  .col-controls {
    flex-grow: unset;

    .color-change-box {
      > div {
        width: 50px;
        height: 50px;
      }

      &__red {
        color: red;
      }

      &__green {
        color: green;
      }

      &__blue {
        color: blue;
      }
    }
  }

  .col-canvas {
    flex-grow: inherit;
    position: relative; /** dat.gui를 canvas 안에 상대적 위치로 두기 위함 */
  }
}
</style>
