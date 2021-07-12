<template>
  <component :is="page" />
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default defineComponent({
  components: {
    'haunted-house': () => import('~/components/threejs/haunted-house.vue'),
    'music-visualizer': () => import('~/components/threejs/music-visualizer.vue')
  },
  setup () {
  },
  computed: {
    ...mapGetters('threejs', {
    }),
    page () {
      return {
        '/playground/haunted-house': 'haunted-house',
        '/playground/music-visualizer': 'music-visualizer'
      }[this.$route.path]
    }
  },
  methods: {
    ...mapMutations('threejs', {
    }),
    ...mapActions('threejs', {
    })
  }
})
</script>

<style lang="scss">
canvas.webgl {
  outline: none;
  width: 100% !important;
  height: 100% !important;
}
</style>
