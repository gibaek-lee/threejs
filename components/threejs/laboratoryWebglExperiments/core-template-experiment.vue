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
          width="auto"
          height="180px"
        >
        <p>Hover your mouse over the screen to start</p>
      </div>
      <canvas
        v-else
        class="webgl"
        :class="selectorCanvasId"
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
      setCanvas,
      registerRenderTickCanvas,
      canvas,
      gui,
      scene,
      renderer,
      axesHelper,
      cameraOrbit,
      windowSizes,
      clock,
      textureLoader
    } = UseWebgl({
      context,
      isOrbitControl: false
    })

    return {
      setCanvas,
      registerRenderTickCanvas,
      canvas,
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
  computed: {
    selectorCanvasId () {
      return `${this.selectorCanvasWrap}_canvas`
    }
  },
  beforeDestroy () {
    window.cancelAnimationFrame(this.idAnimationFrame)

    if (this.gui) {
      const guiParentNode = document.querySelector(this.gui.parentSelector)
      guiParentNode.appendChild(this.gui.domElement)

      this.gui.destroy()
    }
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
      this.setCanvas({ vm: this, selectorCanvasId: this.selectorCanvasId })
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
      width: 30%;
      margin: auto;

      > p {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
  }
}
</style>
