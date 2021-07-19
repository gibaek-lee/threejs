<template>
  <v-row :class="`${selectorCanvasWrap}-container`">
    <v-col class="col-controls">
      <v-btn
        small
        color="primary"
        dark
        class="change-update-mode"
        @click="onChangeCameraControlMode"
      >
        {{ cameraControlMode }}
      </v-btn>
    </v-col>
    <v-col
      class="col-canvas"
      :class="selectorCanvasWrap"
    >
      <canvas class="webgl" />
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { lights } from '~/business/threejs/hauntedHouse'
import UseWebgl from '~/composables/threejs'
import { UseFloorMesh, UseHouseMesh, UseGhostMesh } from '~/composables/threejs/hauntedHouse'

const EMode = { orbit: 'orbit', keypress: 'keypress' }

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
      selectorCanvasWrap: 'haunted-house',
      cameraControlMode: 'orbit',
      cameraGhost: null,
      me: null,
      idAnimationFrame: null
    }
  },
  head () {
    return {
      title: 'Haunted House',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Haunted House developed via three.js which is a library for webgl api'
        }
      ]
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
      this.scene.add(this.axesHelper, this.cameraOrbit)
      lights.addOnScene(this.scene, this.gui)
      UseFloorMesh(this.scene)

      const { tensorHouseGroup } = UseHouseMesh(this.scene, this.gui)
      const { me, cameraGhost } = UseGhostMesh(this.scene, tensorHouseGroup, this.windowSizes)
      this.me = me
      this.cameraGhost = cameraGhost
    },
    tick () {
      const elapsedTime = this.clock.getElapsedTime()

      switch (this.cameraControlMode) {
        case EMode.orbit:
          this.orbitControl.update()
          this.renderer.render(this.scene, this.cameraOrbit)
          break
        case EMode.keypress:
          this.cameraGhost.lookAt(this.me.position)
          this.renderer.render(this.scene, this.cameraGhost)
      }

      this.idAnimationFrame = window.requestAnimationFrame(this.tick)
    },
    setStyleDatGui () {
      this.gui.domElement.style.cssText += 'position: absolute; right: 0px; top: 0px;'
      this.$el.querySelector(`.${this.selectorCanvasWrap}`).appendChild(this.gui.domElement)
    },
    onChangeCameraControlMode () {
      switch (this.cameraControlMode) {
        case EMode.orbit:
          this.cameraControlMode = EMode.keypress
          break
        case EMode.keypress:
          this.cameraControlMode = EMode.orbit
          break
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.haunted-house-container {
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
