<script>
import { defineComponent } from '@vue/composition-api'
import CoreTemplateExperiment from './core-template-experiment.vue'

export default defineComponent({
  extends: CoreTemplateExperiment,
  data () {
    return {
      selectorCanvasWrap: 'normal-vector-directional-transition',
      thumbnailSrc: '/threejs/images/thumbnail_camera-lookat-target.png'
    }
  },
  methods: {
    initUtils () {
    },
    tick () {
    }
  }
})
</script>
