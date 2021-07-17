<template>
  <v-row class="threejs-experiment-container">
    <v-col
      :class="selectorCanvasWrap"
      class="col-canvas"
      @mouseenter="onRemoveThumbnail"
    >
      <div
        v-if="!isHoverToStart"
        class="col-canvas__thumbnail"
      >
        <img
          :src="thumbnailSrc"
          width="100%"
          height="100%"
        >
        <p>Hover your mouse over the screen to start</p>
      </div>
      <canvas
        class="webgl"
        :class="`${selectorCanvasWrap}_canvas`"
        @mouseenter="onMouseEnterCanvas"
        @mouseout="onMouseOutCanvas"
      />
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import UseWebgl from '~/composables/threejs'

export default defineComponent({
  setup (props, context) {
    const {
      registerRenderTickCanvas,
      gui,
      scene,
      renderer,
      axesHelper,
      cameraOrbit,
      windowSizes,
      clock,
      textureLoader
    } = UseWebgl(context)

    return {
      registerRenderTickCanvas,
      gui,
      scene,
      renderer,
      axesHelper,
      cameraOrbit,
      windowSizes,
      clock,
      textureLoader
    }
  },
  data () {
    return {
      idAnimationFrame: null,
      selectorCanvasWrap: 'custom-selector', // extends
      thumbnailSrc: '/threejs/images/*.png', // extends
      isHoverToStart: false,
      isInit: false
    }
  },
  beforeDestroy () {
    window.cancelAnimationFrame(this.idAnimationFrame)

    const guiParentNode = document.querySelector(this.gui.parentSelector)
    guiParentNode.appendChild(this.gui.domElement)

    this.gui.destroy()
  },
  methods: {
    initUtils () { // extends
    },
    tick () { // extends
    },
    setStyleDatGui () {
      this.gui.domElement.style.cssText += 'position: absolute; right: 0px; top: 0px;'
      this.$el.querySelector(`.${this.selectorCanvasWrap}`).appendChild(this.gui.domElement)
    },
    onRemoveThumbnail () {
      this.isHoverToStart = true
    },
    onMouseEnterCanvas () {
      this.registerRenderTickCanvas(() => {
        if (!this.isInit) {
          this.isInit = true
          this.initUtils()
          this.setStyleDatGui()
        }

        this.clock.start()
        this.tick()
      })
    },
    onMouseOutCanvas () {
      window.cancelAnimationFrame(this.idAnimationFrame)
      this.clock.stop()
    }
  }
})
</script>

<style lang="scss" scoped>
.threejs-experiment-container {
  height: 100%;

  .col-controls {
    flex-grow: unset;
  }

  .col-canvas {
    flex-grow: inherit;
    position: relative;

    &__thumbnail {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      height: 80%;
    }
  }
}
</style>
