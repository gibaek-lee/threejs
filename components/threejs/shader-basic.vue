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
import vertexShader from '~/static/shaders/basic/vertex.glsl'
import fragmentShader from '~/static/shaders/basic/fragment.glsl'

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
      clock,
      textureLoader
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
      clock,
      textureLoader
    }
  },
  data () {
    return {
      idAnimationFrame: null,
      selectorCanvasWrap: 'shader-basic',
      deltaTime: 0,
      material: null,
      guiParam: {
        timespeed: 2,
        palette: '#FFA500'
      }
    }
  },
  head () {
    return {
      title: 'Shader Basic',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'apply vertext and fragment shader using glsl'
        }
      ]
    }
  },
  watch: {
    deltaTime (cur) {
      this.material.uniforms.uTime.value = cur * this.guiParam.timespeed
      this.material.uniforms.uColor.value = new THREE.Color(this.guiParam.palette)
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
      const geometry = new THREE.PlaneGeometry(60, 60, 128, 128)

      const baseDomain = document.location.origin
      const flagTexture = this.textureLoader.load(`${baseDomain}/threejs/textures/flag-french.jpg`)

      this.material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uFrequency: { value: new THREE.Vector2(2, 2) },
          uTime: { value: this.deltaTime },
          uColor: { value: new THREE.Color('orange') },
          uTexture: { value: flagTexture }
        }
      })
      this.material.side = THREE.DoubleSide

      const mesh = new THREE.Mesh(geometry, this.material)
      mesh.scale.y = 2 / 3

      this.scene.add(mesh)

      this.gui.add(this.material.uniforms.uFrequency.value, 'x').min(0).max(20).step(0.01).name('freqX')
      this.gui.add(this.material.uniforms.uFrequency.value, 'y').min(0).max(20).step(0.01).name('freqY')
      this.gui.add(this.guiParam, 'timespeed').min(0).max(10).step(0.1).name('timespeed')
      this.gui.addColor(this.guiParam, 'palette')
    },
    tick () {
      const elapsedTime = this.clock.getElapsedTime()
      this.deltaTime = elapsedTime

      this.orbitControl.update()

      this.renderer.render(this.scene, this.cameraOrbit)

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
.shader-basic-container {
  height: 100%;

  .col-controls {
    flex-grow: unset;
  }

  .col-canvas {
    flex-grow: inherit;
    position: relative;
  }
}
</style>
