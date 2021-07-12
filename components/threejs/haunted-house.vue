<template>
  <v-row class="haunted-house">
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
    <v-col class="col-canvas">
      <canvas class="webgl" />
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { lights } from '~/business/threejs/hauntedHouse'
import useCanvas from '~/composables/threejs'
import { useFloor, useHouse, useGhost } from '~/composables/threejs/hauntedHouse'

const EMode = { orbit: 'orbit', keypress: 'keypress' }

export default defineComponent({
  setup (props, context) {
    const {
      registerRenderTickCanvas,
      gui,
      scene,
      renderer,
      axesHelper,
      cameraOrbit,
      orbitControl,
      windowSizes,
      clock
    } = useCanvas(context)

    return {
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
      cameraControlMode: 'orbit',
      cameraGhost: null,
      me: null
    }
  },
  watch: {
  },
  mounted () {
    this.registerRenderTickCanvas(() => {
      this.initUtils()
      this.tick()
    })
  },
  methods: {
    initUtils () {
      this.scene.add(this.axesHelper, this.cameraOrbit)
      lights.addOnScene(this.scene, this.gui)
      useFloor(this.scene)

      const { tensorHouseGroup } = useHouse(this.scene, this.gui)
      const { me, cameraGhost } = useGhost(this.scene, tensorHouseGroup, this.windowSizes)
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

      window.requestAnimationFrame(this.tick)
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
.haunted-house {
  height: 100%;

  .col-controls {
    flex-grow: unset;
  }

  .col-canvas {
    flex-grow: inherit;
  }
}
</style>
