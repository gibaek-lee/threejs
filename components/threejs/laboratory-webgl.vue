<template>
  <v-row class="laboratory-webgl" align="start">
    <v-col cols="12" sm="8" md="6">
      <v-card
        class="laboratory-webgl__card-item card__camera-lookat-target"
        :class="{'fullsize': isShowFullSize[0]}"
        @click.native="(e) => onFullSize(e, 0)"
      >
        <v-card-title>
          Experiment 1. Camera Lookat Target
        </v-card-title>
        <v-card-actions>
          <camera-lookat-target />
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" sm="8" md="6">
      <v-card
        class="laboratory-webgl__card-item card__normal-vector-directional-transition"
        :class="{'fullsize': isShowFullSize[1]}"
        @click.native="(e) => onFullSize(e, 1)"
      >
        <v-card-title>
          Experiment 2. Normal Vector Directional Transition
        </v-card-title>
        <v-card-actions>
          <normal-vector-directional-transition />
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" sm="8" md="6">
      <v-card class="card__3">
        <v-card-title>
          Experiment 3. 3D Viewer
        </v-card-title>
        <v-card-actions>
          <three-dimentional-viewer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import CameraLookatTarget from './laboratoryWebglExperiments/camera-lookat-target'
import NormalVectorDirectionalTransition from './laboratoryWebglExperiments/normal-vector-directional-transition'
import ThreeDimentionalViewer from './laboratoryWebglExperiments/three-dimentional-viewer'

export default defineComponent({
  components: {
    CameraLookatTarget,
    NormalVectorDirectionalTransition,
    ThreeDimentionalViewer
  },
  data () {
    return {
      isShowFullSize: [false, false]
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
  methods: {
    onFullSize (event, idx) {
      if (event.target.localName === 'canvas') { // dat.gui 클릭 bubbling 차단
        this.isShowFullSize = this.isShowFullSize.reduce((accum, cur, i) => {
          accum[i] = (i === idx) ? !cur : cur
          return accum
        }, [])
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.laboratory-webgl {
  &__card-item {
    &:hover {
      cursor: pointer;
    }

    &.fullsize {
      position: fixed;
      z-index: 2;
      left: 0;
      width: 100vw;
      height: 100vh;
    }
  }
}
</style>
