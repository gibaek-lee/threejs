/**
 * Note: This component is for reference only, not for use.
 *
 * [Description]
 * Form for threejs application component.
 * Reference it when develop a new threejs application component.
 */
<template>
  <v-row class="component-name">
    <!--
      custom markup
    -->
    <v-col class="col-canvas">
      <canvas class="webgl" /> <!-- required -->
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import useCanvas from '~/composables/threejs'

export default defineComponent({
  setup (props, context) {
    // Apply only member instances of canvas to be used
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
    } = useCanvas(context) // required

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
  mounted () {
    this.registerRenderTickCanvas(() => {
      // run this callback just once
      this.initUtils() // required
      this.tick() // required
    })
  },
  methods: {
    initUtils () {
      // initialze for business logic
    },
    tick () {
      // upate camera, control, etc
      // repeately update logics for scene

      const elapsedTime = this.clock.getElapsedTime() // sample
      this.orbitControl.update() // sample

      this.renderer.render(this.scene, this.cameraOrbit) // required

      window.requestAnimationFrame(this.tick) // required
    }
  }
})
</script>

<style lang="scss" scoped>
.component-name {
  height: 100%;

  .col-controls {
    flex-grow: unset;
  }

  .col-canvas {
    flex-grow: inherit;
  }
}
</style>
