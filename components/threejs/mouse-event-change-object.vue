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
import UseWebgl from '~/composables/threejs'
import UseWebWorker from '~/composables/threejs/common/worker/UseWebWorker'

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
      isOrbitControl: false
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
      selectorCanvasWrap: 'mouse-event-change-object'
    }
  },
  computed: {
    workerScript () { // cannon script
      return `
        let world
        self.onmessage = function (event) {
          console.log('tagScript get message', event.data, self)
          const { cannonUrl } = event.data

          if (cannonUrl && !world) {
            self.importScripts(cannonUrl)

            world = new CANNON.World()
            console.log('@@@canon world generated', world)
          }
        }
      `
    }
  },
  mounted () {
    this.setCanvas({ vm: this })
    this.registerRenderTickCanvas(() => {
      this.initUtils()
      this.setStyleDatGui()
      this.tick()
    })

    // init phyics
    const { iComposeWorker } = UseWebWorker({
      N: 40,
      dt: 1 / 60,
      workerScript: this.workerScript
    })
    iComposeWorker.sendDataToWorker() // can pass data
  },
  beforeDestroy () {
    window.cancelAnimationFrame(this.idAnimationFrame)

    const guiParentNode = document.querySelector(this.gui.parentSelector)
    guiParentNode.appendChild(this.gui.domElement)
    this.gui.destroy()
  },
  methods: {
    initUtils () {

    },
    tick () {
      const elapsedTime = this.clock.getElapsedTime()

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
.mouse-event-change-object-container {
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
