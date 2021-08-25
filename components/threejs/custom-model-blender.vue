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
import { ELights, UseLights, UseShadow } from '~/composables/threejs/common/light'
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
      isOrbitControl: true,
      isPhysicallyCorrectLight: true
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
      directionalLight: null,
      iGLTF: null,
      environmentMap: null
    }
  },
  head () {
    return {
      title: 'Custom Model Blender',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Import Custom Model using blender & realistic render'
        }
      ]
    }
  },
  watch: {
    guiParams: {
      deep: true,
      handler (cur, prev) {
        const {
          intensityAmbientLight,
          intensityDirectionalLight,
          positionDirectionalLight,
          scaleHamburger,
          rotateYHamburger,
          envMapIntensity,
          toneMappingExposure
        } = cur

        if (intensityAmbientLight) {
          this.ambientLight.intensity = intensityAmbientLight
        }
        if (intensityDirectionalLight) {
          this.directionalLight.intensity = intensityDirectionalLight
        }
        if (positionDirectionalLight) {
          const { x, y, z } = positionDirectionalLight
          this.directionalLight.position.set(x, y, z)
        }
        if (this.iGLTF) {
          if (scaleHamburger) {
            this.iGLTF.scene.scale.set(scaleHamburger, scaleHamburger, scaleHamburger)
          }
          if (rotateYHamburger) {
            this.iGLTF.scene.rotation.y = rotateYHamburger
          }
          if (envMapIntensity) {
            this.updateAllMeshes({
              envMap: this.environmentMap,
              envMapIntensity
            })
          }
        }
        if (toneMappingExposure) {
          this.renderer.toneMappingExposure = toneMappingExposure
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
      // gui control
      this.guiParams = Object.assign({
        intensityAmbientLight: 1,
        intensityDirectionalLight: 1,
        positionDirectionalLight: { x: -20.25, y: 10, z: -20.25 },
        scaleHamburger: 1,
        rotateYHamburger: Math.PI * 0.25, // degree
        envMapIntensity: 7,
        toneMapping: 3,
        toneMappingExposure: 3
      }, {})

      this.gui.add(this.guiParams, 'intensityAmbientLight').min(0).max(1).step(0.01)
      this.gui.add(this.guiParams, 'intensityDirectionalLight').min(0).max(1).step(0.01)
      this.gui.add(this.guiParams.positionDirectionalLight, 'x').min(-25).max(25).step(0.01).name('lightX')
      this.gui.add(this.guiParams.positionDirectionalLight, 'y').min(0).max(10).step(0.01).name('lightY')
      this.gui.add(this.guiParams.positionDirectionalLight, 'z').min(-25).max(25).step(0.01).name('lightZ')
      this.gui.add(this.guiParams, 'scaleHamburger').min(0.01).max(2).step(0.001)
      this.gui.add(this.guiParams, 'rotateYHamburger').min(-Math.PI).max(Math.PI).step(0.001)
      this.gui.add(this.guiParams, 'envMapIntensity').min(0).max(10).step(0.001)
      this.gui.add(this.guiParams, 'toneMapping', {
        No: THREE.NoToneMapping,
        Linear: THREE.LinearToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Cineon: THREE.CineonToneMapping,
        ACESFilmic: THREE.ACESFilmicToneMapping
      }).onFinishChange(() => {
        this.renderer.toneMapping = Number(this.guiParams.toneMapping)
        this.updateAllMeshes({
          envMap: this.environmentMap,
          envMapIntensity: this.guiParams.envMapIntensity
        })
      })
      this.gui.add(this.guiParams, 'toneMappingExposure').min(0).max(10).step(0.001)

      // lights
      this.ambientLight = UseLights(
        this.scene,
        { type: ELights.ambient, intensity: this.guiParams.intensityAmbientLight }
      )

      this.directionalLight = UseLights(
        this.scene,
        {
          type: ELights.directional,
          intensity: this.guiParams.intensityDirectionalLight,
          position3: this.guiParams.positionDirectionalLIght
        }
      )

      // renderer
      this.renderer.outputEncoding = THREE.sRGBEncoding
      this.renderer.toneMapping = this.guiParams.toneMapping
      this.renderer.toneMappingExposure = this.guiParams.toneMappingExposure

      // environment map
      const cubeTextureLoader = new THREE.CubeTextureLoader()
      this.environmentMap = cubeTextureLoader.load([
        '/textures/environmentMap/px.jpg',
        '/textures/environmentMap/nx.jpg',
        '/textures/environmentMap/py.jpg',
        '/textures/environmentMap/ny.jpg',
        '/textures/environmentMap/pz.jpg',
        '/textures/environmentMap/nz.jpg'
      ])
      this.environmentMap.encoding = THREE.sRGBEncoding
      this.scene.background = this.environmentMap
      this.scene.environment = this.environmentMap

      // models
      UseGLTF({
        loaderType: E_GLTF.DRACO,
        targetModelPath: '/threejs/models/hamburger/hamburger.glb',
        successCallback: ({ gltf }) => {
          this.iGLTF = gltf

          const { scaleHamburger } = this.guiParams

          gltf.scene.scale.set(scaleHamburger, scaleHamburger, scaleHamburger)
          gltf.scene.position.y = 2
          gltf.scene.rotation.y = this.guiParams.rotateYHamburger
          this.scene.add(gltf.scene)

          // environment
          this.updateAllMeshes({
            envMap: this.environmentMap,
            envMapIntensity: this.guiParams.envMapIntensity
          })

          // shadow
          const {
            toggleVisiblePointLightCameraHelper
          } = UseShadow({
            scene: this.scene,
            renderer: this.renderer,
            castMeshs: [this.iGLTF.scene],
            light: this.directionalLight,
            isUseCameraHelper: true
          })
        }
      })

      // camera
      this.cameraOrbit.position.set(0, 20, 20)
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
    updateAllMeshes ({ envMap, envMapIntensity }) {
      this.scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.envMap = envMap
          child.material.envMapIntensity = envMapIntensity
        }
      })
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
