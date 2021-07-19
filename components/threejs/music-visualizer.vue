<template>
  <v-row class="music-visualizer">
    <v-row class="row-controls">
      <div class="button-wrapper">
        <div class="play-music">
          <p>play music</p>
          <v-btn id="audio-start-btn-camel" small color="primary" dark @click="onAudioStart">
            {{ audioList[0] }}
          </v-btn>
          <v-btn id="audio-start-btn-swim" small color="primary" dark @click="onAudioStart">
            {{ audioList[1] }}
          </v-btn>
        </div>
        <div class="control-visualizer">
          <p>control visualizer</p>
          <v-btn id="mode-init-position" small color="primary" dark @click="onModeInitPosition">원형배치</v-btn>
          <v-btn id="mode-random" small color="primary" dark @click="onModeRandom">랜덤</v-btn>
          <v-btn id="mode-move" small color="primary" dark @click="onModeMove">무브</v-btn>
          <v-btn id="mode-decibel-y" small color="primary" dark @click="onModeDecibelY">데시벨Y</v-btn>
        </div>
        <div class="control-mode">
          <p>visualizer mode</p>
          <v-chip id="description-init-position" color="green">
            {{ isModeCircle ? 'circle' : 'linear' }}
          </v-chip>
          <v-chip id="description-random" color="green">
            {{ isModeRandom ? 'random' : 'static' }}
          </v-chip>
          <v-chip id="description-move" color="green">
            {{ isModeMove ? 'move' : 'stay' }}
          </v-chip>
          <v-chip id="description-decibel-y" color="green">
            {{ isModeDecibelY ? 'decibel' : 'freq' }}
          </v-chip>
        </div>
      </div>
    </v-row>
    <v-row class="row-canvas">
      <canvas class="webgl" />
    </v-row>
    <div class="copyright">
      <a href="https://www.bensound.com" target="_blank">
        &copy; <b>Royalty Free Music from Bensound</b>
      </a>
      <p id="music-title" />
    </div>
  </v-row>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import UseWebgl from '~/composables/threejs'
import {
  IModeInitPosition, IModeRandom, IModeMove, IModeDecibelY
} from '~/business/threejs/musicVisualizer/static.interface'
import frustumValidator from '~/business/threejs/musicVisualizer/frustum-validator'
import DevideSphere from '~/business/threejs/musicVisualizer/devide-sphere'
import AudioAnalysis from '~/business/threejs/musicVisualizer/audio-analysis'

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
      isOrbitControl: true
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
      devideSphereList: [],
      utilFrustumValidator: null,
      audioAnalyst: null,
      modeInitPosition: IModeInitPosition.linear,
      modeRandom: IModeRandom.static,
      modeMove: IModeMove.stay,
      modeDecibelY: IModeDecibelY.freq,
      idAnimationFrame: null
    }
  },
  head () {
    return {
      title: 'Musci Visualizer',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Musci Visualizer developed via three.js which is a library for webgl api'
        }
      ]
    }
  },
  computed: {
    audioList () {
      return [
        'bensound-cute.mp3',
        'bensound-acousticbreeze.mp3'
      ]
    },
    domDescriptionInitPosition () {
      return this.$el.querySelector('#description-init-position')
    },
    domDescriptionRandom () {
      return this.$el.querySelector('#description-random')
    },
    domDescriptionMove () {
      return this.$el.querySelector('#description-move')
    },
    domDescriptionDecibelY () {
      return this.$el.querySelector('#description-decibel-y')
    },
    isModeCircle () {
      return this.modeInitPosition === IModeInitPosition.circle
    },
    isModeRandom () {
      return this.modeRandom === IModeRandom.random
    },
    isModeMove () {
      return this.modeMove === IModeMove.move
    },
    isModeDecibelY () {
      return this.modeDecibelY === IModeDecibelY.decibel
    }
  },
  mounted () {
    this.setCanvas({ vm: this })
    this.registerRenderTickCanvas(() => {
      this.initUtils()
      this.tick()
    })
  },
  beforeDestroy () {
    this.audioAnalyst.stop()
    window.cancelAnimationFrame(this.idAnimationFrame)
  },
  methods: {
    initUtils () {
      this.cameraOrbit.position.set(0, 0, 50)
      this.scene.add(this.axesHelper, this.cameraOrbit)
      this.gui.add(this.orbitControl, 'autoRotate')
      this.utilFrustumValidator = frustumValidator(this.cameraOrbit)
      this.audioAnalyst = new AudioAnalysis()
    },
    audioAnimation () {
      while (this.scene.children.length > 0) {
        this.scene.remove(this.scene.children[0])
      }

      while (this.devideSphereList.length > 0) {
        this.devideSphereList.pop()
      }

      this.audioAnalyst.mapFrequencyData().forEach((data) => {
        const newSphere = new DevideSphere(
          this.utilFrustumValidator, this.audioAnalyst,
          this.modeInitPosition, this.modeRandom, this.modeMove, this.modeDecibelY
        )
        newSphere.insertObjectOnScene(this.scene, data)
        this.devideSphereList.push(newSphere)
      })
    },
    handlerPlayAnimation () {
      const startIntervalId = window.setInterval(() => {
        const isPlay = this.audioAnalyst.getAnalyseData().frequencyList.some(f => f !== 0)
        if (isPlay) {
          this.audioAnimation()
          window.setInterval(this.audioAnimation, 2000)
          window.clearInterval(startIntervalId)
        }
      }, 200)
    },
    tick () {
      const elapsedTime = this.clock.getElapsedTime()

      this.devideSphereList.forEach((dSphere) => {
        dSphere.update(this.scene)

        // todo collide
        // if (dSphere.iscollide) {
        //   const newradius = dsphere.radius / 2
        //   if (newradius > 1) {
        //     this.devidespherelist.push(new devidesphere(this.utilfrustumvalidator), new devidesphere(this.utilfrustumvalidator))
        //     this.devidespherelist.filter(s => s !== dsphere)
        //   }
        // }
      })

      this.orbitControl.update()
      this.utilFrustumValidator.update()

      this.renderer.render(this.scene, this.cameraOrbit)

      this.idAnimationFrame = window.requestAnimationFrame(this.tick)
    },
    onAudioStart (event) {
      this.audioAnalyst.stop()
      this.audioAnalyst.play(this.cameraOrbit, `/threejs/audio/${event.target.innerText}`.toLowerCase())
      this.handlerPlayAnimation()
      this.$el.querySelector('#music-title').innerText = event.target.innerText
    },
    onModeInitPosition () {
      this.modeInitPosition = this.isModeCircle ? IModeInitPosition.linear : IModeInitPosition.circle
      this.domDescriptionInitPosition.innerText = this.isModeCircle ? 'circle' : 'linear'
    },
    onModeRandom () {
      this.modeRandom = this.isModeRandom ? IModeRandom.static : IModeRandom.random
      this.domDescriptionRandom.innerText = this.isModeRandom ? 'random' : 'static'
    },
    onModeMove () {
      this.modeMove = this.isModeMove ? IModeMove.stay : IModeMove.move // vector, x축 대칭
      this.domDescriptionMove.innerText = this.isModeMove ? 'move' : 'stay'
    },
    onModeDecibelY () {
      this.modeDecibelY = this.isModeDecibelY ? IModeDecibelY.freq : IModeDecibelY.decibel // vector, x축 대칭
      this.domDescriptionDecibelY.innerText = this.isModeDecibelY ? 'decibel' : 'freq'
    }
  }
})
</script>

<style lang="scss" scoped>
.music-visualizer {
  height: 100%;

  .row-controls {
    flex-grow: unset;
    margin: 0;

    .button-wrapper {
      position: fixed;
      padding: 20px;

      > div:not(:nth-of-type(1)) {
        margin-top: 20px;
      }

      .play-music {
        > p {
          font-weight: bold;
          font-size: 20px;
          margin-bottom: 5px;
        }
      }

      .control-visualizer {
        > p {
          font-weight: bold;
          font-size: 20px;
          margin-bottom: 5px;
        }
      }

      .control-mode {
        > p {
          font-weight: bold;
          font-size: 20px;
          margin-bottom: 5px;
        }
      }
    }
  }

  .row-canvas {
    flex-grow: inherit;
    margin: 0;
    height: 100%;
  }

  .copyright {
    position: fixed;
    bottom: 0;
    width: 100vw;
    text-align: center;
    padding: 20px;

    > a {
      text-decoration: none;
      color: #fff;

      > b {
        font-weight: bold;
        color: #9cd121;
      }
    }
  }
}
</style>
