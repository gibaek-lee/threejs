<template>
  <v-row :class="`${selectorCanvasWrap}-container`">
    <v-col class="col-controls">
      <div class="animation-change-box">
        <div
          v-for="(item, index) in ['survey', 'walk', 'run', 'stop']"
          :key="`${item}_${index}`"
          :class="`animation-change-box__${item}`"
          @click="clickAniBtn(index + 1)"
        >
          run ani {{ item }}
        </div>
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
import UseWebgl from '~/composables/threejs'
import { UseAmbientLight } from '~/composables/threejs/common/light'
import UseGLTF, { E_GLTF } from '~/composables/threejs/common/gltf/UseGLTF'

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
      prevTime: 0,
      selectorCanvasWrap: 'animate-model-import',
      guiParams: {},
      ambientLight: null,
      basePlane: null,
      iGLTF: null,
      iAnimationMixer: null,
      invokeClipAction: null
    }
  },
  watch: {
    guiParams: {
      deep: true,
      handler (cur) {
        const {
          intensityAmbientLight, scalePlane, scaleFox
        } = cur

        if (intensityAmbientLight) {
          this.ambientLight.intensity = intensityAmbientLight
        }
        if (scalePlane) {
          this.basePlane.scale.set(scalePlane, scalePlane, 1)
        }
        if (this.iGLTF) {
          if (scaleFox) {
            this.iGLTF.scene.scale.set(scaleFox, scaleFox, scaleFox)
          }
        }
      }
    }
  },
  mounted () {
    this.setCanvas({ vm: this })
    this.registerRenderTickCanvas(() => {
      this.initUtils()
      this.setStyleDatGui()
      this.tick()
    })
  },
  beforeDestroy () {
    window.cancelAnimationFrame(this.idAnimationFrame)

    const guiParentNode = document.querySelector(this.gui.parentSelector)
    guiParentNode.appendChild(this.gui.domElement)
    this.gui.destroy()
  },
  methods: {
    initUtils () {
      this.guiParams = Object.assign({
        intensityAmbientLight: 0.7,
        scalePlane: 3,
        scaleFox: 0.1,
        timeSpeed: 2
      }, {})

      this.gui.add(this.guiParams, 'intensityAmbientLight').min(0).max(1).step(0.01)
      this.gui.add(this.guiParams, 'scalePlane').min(1).max(10).step(1)
      this.gui.add(this.guiParams, 'scaleFox').min(0.01).max(0.5).step(0.001)
      this.gui.add(this.guiParams, 'timeSpeed').min(1).max(10).step(0.1)

      // lights
      const { ambientLight } = UseAmbientLight(
        this.scene,
        { intensity: this.guiParams.intensityAmbientLight }
      )
      this.ambientLight = ambientLight

      // meshes
      const planeWidth = 30
      this.basePlane = this.makeBasePlane(planeWidth)
      this.scene.add(this.basePlane)

      // models
      UseGLTF({
        loaderType: E_GLTF.DEFAULT,
        targetModelPath: '/threejs/models/Fox/glTF/Fox.gltf',
        successCallback: ({ gltf, animationMixer, invokeClipAction }) => {
          this.iGLTF = gltf
          this.iAnimationMixer = animationMixer
          this.invokeClipAction = invokeClipAction

          const { scaleFox } = this.guiParams

          gltf.scene.scale.set(scaleFox, scaleFox, scaleFox)
          gltf.scene.rotateY(Math.PI / 4)
          this.scene.add(gltf.scene)
        }
      })

      // camera
      this.cameraOrbit.position.set(0, 5, 20)
    },
    tick () {
      const elapsedTime = this.clock.getElapsedTime()
      const deltaTime = elapsedTime - this.prevTime
      this.prevTime = elapsedTime

      this.orbitControl.update()

      // Update animation mixer
      if (this.iAnimationMixer) {
        this.iAnimationMixer.update(deltaTime * this.guiParams.timeSpeed)
      }

      this.renderer.render(this.scene, this.cameraOrbit)

      this.idAnimationFrame = window.requestAnimationFrame(this.tick)
    },
    setStyleDatGui () {
      this.gui.domElement.style.cssText += 'position: absolute; right: 0px; top: 0px;'
      this.$el.querySelector(`.${this.selectorCanvasWrap}`).appendChild(this.gui.domElement)
    },
    makeBasePlane (width = 10) {
      const SEGMENT_FLOOR = 10
      const geometry = new THREE.PlaneGeometry(
        width, width,
        SEGMENT_FLOOR, SEGMENT_FLOOR
      )

      const material = new THREE.MeshStandardMaterial({
        roughness: 0.7, color: 0xFFFF00, wireframe: true
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.rotation.x = -Math.PI * 0.5
      mesh.position.y = 0

      return mesh
    },
    clickAniBtn (id) {
      const clipKeys = this.iGLTF.animations.reduce((a, c) => a.concat([c.name]), [])
      const mapKey = clipKeys[id - 1]
      const invoker = this.invokeClipAction[mapKey] || this.invokeClipAction.stop

      invoker()
    }
  }
})
</script>

<style lang="scss" scoped>
.animate-model-import-container {
  height: 100%;

  .col-controls {
    flex-grow: unset;

    .animation-change-box {
      > div {
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
        word-break: break-all;
        padding: 5px;
        font-size: 12px;
        text-align: center;

        &:hover {
          cursor: pointer;
        }
      }

      &__survey {
        background-color: blue;
      }

      &__walk {
        background-color: green;
      }

      &__run {
        background-color: orange;
      }

      &__stop {
        background-color: red;
      }
    }
  }

  .col-canvas {
    flex-grow: inherit;
    position: relative; /** dat.gui를 canvas 안에 상대적 위치로 두기 위함 */
  }
}
</style>
