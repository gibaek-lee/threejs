<template>
  <component :is="page" />
</template>

<script>
import { defineComponent, ref, provide } from '@vue/composition-api'

export default defineComponent({
  components: {
    'haunted-house': () => import('~/components/threejs/haunted-house.vue'),
    'music-visualizer': () => import('~/components/threejs/music-visualizer.vue')
  },
  setup () {
    const test = ref('hello')

    provide('test', test)
  },
  computed: {
    page () {
      return {
        '/playground/haunted-house': 'haunted-house',
        '/playground/music-visualizer': 'music-visualizer'
      }[this.$route.path]
    }
  }
})
</script>
