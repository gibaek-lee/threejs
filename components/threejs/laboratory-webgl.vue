<template>
  <v-row class="laboratory-webgl" align="start">
    <v-col
      v-for="(item, index) in fullsizeFlags"
      :key="index"
      cols="12"
      sm="8"
      md="6"
    >
      <v-card
        class="laboratory-webgl__card-item"
        :class="[
          `card__${componentsNames[index]}`,
          fullsizeFlags[index] ? 'fullsize' : ''
        ]"
        @click.native="(e) => onFullSize(e, index)"
      >
        <v-card-title>
          {{ `Experiment ${index + 1}. ${componentsNames[index]}` }}
        </v-card-title>
        <v-card-actions>
          <component :is="componentsNames[index]" />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    'camera-lookat-target': () => import('./laboratoryWebglExperiments/camera-lookat-target'),
    'normal-vector-directional-transition': () => import('./laboratoryWebglExperiments/normal-vector-directional-transition'),
    'raycast-hover-interaction': () => import('./laboratoryWebglExperiments/raycast-hover-interaction')
  },
  data () {
    return {
      fullsizeFlags: []
    }
  },
  head () {
    return {
      title: 'Laboratory Webgl',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Laboratory Webgl developed via three.js which is a library for webgl api'
        }
      ]
    }
  },
  computed: {
    componentsNames () {
      return Object.keys(this.$options.components)
    }
  },
  mounted () {
    this.fullsizeFlags = this.componentsNames.reduce(a => a.concat([false]), [])
  },
  methods: {
    onFullSize (event, idx) {
      const { target } = event
      if (target.localName !== 'canvas') { // dat.gui 클릭 bubbling 차단
        return
      }

      // update fullsizeFlags
      this.fullsizeFlags = this.fullsizeFlags.reduce((a, c, i) => a.concat([(i === idx) ? !c : c]), [])
    }
  }
})
</script>

<style lang="scss" scoped>
.laboratory-webgl {
  height: calc(100vh - 100px); /** 100px 헤더 푸터 사이즈 */
  overflow: auto;

  &__card-item {
    &:hover {
      cursor: pointer;
    }

    &.fullsize {
      position: fixed;
      z-index: 2;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
    }
  }
}
</style>
