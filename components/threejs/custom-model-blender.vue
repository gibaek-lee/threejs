<template>
  <v-row :class="`${selectorCanvasWrap}-container`">
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
      selectorCanvasWrap: 'custom-model-blender',
      guiParams: {},
      ambientLight: null,
      basePlane: null,
      iGLTF: null
    }
  },
  watch: {
    guiParams: {
      deep: true,
      handler (cur) {
        const {
          intensityAmbientLight, scalePlane, scaleHamburger
        } = cur

        if (intensityAmbientLight) {
          this.ambientLight.intensity = intensityAmbientLight
        }
        if (scalePlane) {
          this.basePlane.scale.set(scalePlane, scalePlane, 1)
        }
        if (this.iGLTF) {
          if (scaleHamburger) {
            this.iGLTF.scene.scale.set(scaleHamburger, scaleHamburger, scaleHamburger)
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
        scaleHamburger: 1
      }, {})

      this.gui.add(this.guiParams, 'intensityAmbientLight').min(0).max(1).step(0.01)
      this.gui.add(this.guiParams, 'scalePlane').min(1).max(10).step(1)
      this.gui.add(this.guiParams, 'scaleHamburger').min(0.01).max(0.5).step(0.001)

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
        loaderType: E_GLTF.DRACO,
        targetModelPath: '/threejs/models/hamburger/hamburger.glb',
        successCallback: ({ gltf }) => {
          this.iGLTF = gltf

          const { scaleHamburger } = this.guiParams

          gltf.scene.scale.set(scaleHamburger, scaleHamburger, scaleHamburger)
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
    }
  }
})
</script>

<style lang="scss" scoped>
.custom-model-blender-container {
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
