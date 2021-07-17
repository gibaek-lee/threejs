<template>
  <component :is="page" />
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import ThreejsComponentListJson from '~/static/threejs-component-list.json'

export default defineComponent({
  components: {
    'haunted-house': () => import('~/components/threejs/haunted-house.vue'),
    'music-visualizer': () => import('~/components/threejs/music-visualizer.vue'),
    'laboratory-webgl': () => import('~/components/threejs/laboratory-webgl.vue')
  },
  head () {
    return {
      meta: [
        {
          hid: 'keyword',
          name: 'keyword',
          content: 'three.js, threejs, webgl, canvas, nuxt, vue'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('threejs', {
    }),
    threejsComponentList () {
      return JSON.parse(JSON.stringify(ThreejsComponentListJson))
    },
    page () {
      const pageList = this.threejsComponentList
        .reduce((a, c) => ({ ...a, ...{ [c.path]: c.id } }), {})
      return pageList[this.$route.path]
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
