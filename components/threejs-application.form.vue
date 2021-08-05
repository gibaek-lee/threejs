/**
 * Note: This component is for reference only, not for use.
 *
 * [Description]
 * Form for threejs application component.
 * Reference it when develop a new threejs application component.
 */
<template>
  <v-row :class="`${selectorCanvasWrap}-container`">
    <!--
      custom markup
    -->
    <v-col
      :class="selectorCanvasWrap"
      class="col-canvas"
    >
      <canvas class="webgl" /> <!-- required -->
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import UseWebgl from '~/composables/threejs'

export default defineComponent({
  setup (props, context) {
    // Apply only member instances of canvas to be used
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
    }) // required

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
      idAnimationFrame: null, // required
      selectorCanvasWrap: '',
      guiParams: {}
    }
  },
  watch: {
    guiParams: {
      deep: true,
      handler (cur) {
        // update threejs instance properties
      }
    }
  },
  mounted () {
    this.setCanvas({ vm: this })
    this.registerRenderTickCanvas(() => {
      // run this callback just once after ready threejs environment
      this.initUtils() // required
      this.setStyleDatGui() // optional
      this.tick() // required
    })
  },
  beforeDestroy () {
    // CSR일 시 라우트 변경 때 render tick이 멈춰야 성능 이슈가 없다.
    window.cancelAnimationFrame(this.idAnimationFrame)

    // CSR일 시 다른 페이지의 gui를 제거하고 route push가 일어나야 한다.
    // 이때 parentSelector 자식에 gui.domElement가 있어야 정상적으로 destroy되서 다시 라우트 돌아올 시 에러가 나지 않는다.
    const guiParentNode = document.querySelector(this.gui.parentSelector)
    guiParentNode.appendChild(this.gui.domElement)

    this.gui.destroy()
  },
  methods: {
    initUtils () {
      // gui
      this.guiParams = Object.assign({
        // 이곳에 정의한 parameter 주소의 참조값을 threejs class constructor에 넘겨야
        // gui ui 패널에서 값 변경 시 instance가 값을 참조하여 씬에 반영한다.
      }, {})

      // initialze for business logic
      // composable을 여기서 사용하는 것을 권장한다
    },
    tick () {
      // upate camera, control, etc
      // repeately update logics for scene

      const elapsedTime = this.clock.getElapsedTime() // sample
      this.orbitControl.update() // sample

      this.renderer.render(this.scene, this.cameraOrbit) // required

      this.idAnimationFrame = window.requestAnimationFrame(this.tick) // required
    },
    setStyleDatGui () {
      /**
       * caution
       * destroy 시 div.dg.ac가 컨트롤 패널의 최상단 node가 아니면 에러발생한다.
       * 그러므로 firstChild를 다른 node로 옮기거나 하면 안된다.
       *
       * etc
       * 필요할 시 스타일 조작 customizing 해도 된다
       */
      this.gui.domElement.style.cssText += 'position: absolute; right: 0px; top: 0px;'
      this.$el.querySelector(`.${this.selectorCanvasWrap}`).appendChild(this.gui.domElement)
    }
  }
})
</script>

<style lang="scss" scoped>
.mother-container-selector-name { /** `${selectorCanvasWrap}-container` */
  height: 100%;

  .col-controls {
    flex-grow: unset;
  }

  .col-canvas {
    flex-grow: inherit;
    position: relative; /** dat.gui를 canvas 안에 상대적 위치로 두기 위함 */
  }
}
</style>
