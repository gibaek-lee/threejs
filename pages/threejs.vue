<template>
  <v-row class="threejs">
    <v-col class="col-controls">
      <v-btn
        small
        color="primary"
        dark
        class="change-update-mode"
        data-mode="orbit"
      >
        orbit
      </v-btn>
    </v-col>
    <v-col class="col-canvas">
      <canvas class="webgl" />
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent, ref, provide } from '@nuxtjs/composition-api'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { lights } from '@business/threejs/hauntedHouse'
import { useFloor, useHouse, useGhost } from '@composables/threejs/hauntedHouse'

export default defineComponent({
  name: 'Threejs',
  setup () {
    const scene = ref(null)

    provide(scene)

    return {
      scene
    }
  },
  data () {
    return {
      canvas: null,
      renderer: null,
      clock: null,
      orbitControl: null,
      cameraOrbit: null,
      cameraGhost: null,
      me: null,
      gui: null,
      axesHelper: null,
      textureLoader: null
    }
  },
  computed: {
    ...mapGetters('threejs', {
    }),
    windowSizes () {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      }
    },
    isInit () {
      return !!this.orbitControl &&
             !!this.renderer &&
             !!this.scene &&
             !!this.cameraOrbit
    },
    targetDomChangeCameraMode () {
      return this.$el.querySelector('.change-update-mode')
    }
  },
  watch: {
    canvas () {
      this.init()
    },
    isInit (cur) {
      if (!cur) {
        return
      }

      // run init must once in a scene
      if (!this.clock) {
        // add meshes on scene
        this.scene.add(this.axesHelper, this.cameraOrbit)

        lights.addOnScene(this.scene, this.gui)

        useFloor(this.scene)

        const { tensorHouseGroup } = useHouse(this.scene, this.gui)

        const { me, cameraGhost } = useGhost(this.scene, tensorHouseGroup, this.windowSizes)
        this.me = me
        this.cameraGhost = cameraGhost

        // event
        this.addEventCameraModeChange()

        // render scene repeat
        this.clock = new THREE.Clock()
        this.tick()
      }
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.windowSizes.width = window.innerWidth
      this.windowSizes.height = window.innerHeight

      this.cameraOrbit.aspect = this.windowSizes.width / this.windowSizes.height
      this.cameraOrbit.updateProjectionMatrix()

      this.renderer.setSize(this.windowSizes.width, this.windowSizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    this.canvas = this.$el.querySelector('canvas.webgl')
  },
  methods: {
    ...mapMutations('threejs', {
    }),
    ...mapActions('threejs', {
    }),
    init () {
      this.gui = new dat.GUI({ closed: true, width: 350 })
      this.scene = new THREE.Scene()

      this.axesHelper = new THREE.AxesHelper(1)
      this.axesHelper.position.x = 2.01
      this.axesHelper.position.y = 0.01
      this.axesHelper.position.z = 2.01

      this.cameraOrbit = new THREE.PerspectiveCamera(75, this.windowSizes.width / this.windowSizes.height, 0.1, 200)
      this.cameraOrbit.position.set(4, 20, 60)

      this.textureLoader = new THREE.TextureLoader()

      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas })
      this.renderer.setSize(this.windowSizes.width, this.windowSizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.renderer.setClearColor('#262837')

      this.orbitControl = new OrbitControls(this.cameraOrbit, this.canvas)
      this.orbitControl.enableDamping = true
    },
    tick () {
      const elapsedTime = this.clock.getElapsedTime()

      const { mode } = this.targetDomChangeCameraMode.dataset

      switch (mode) {
        case 'orbit':
          this.orbitControl.update()
          this.renderer.render(this.scene, this.cameraOrbit)
          break
        case 'keypress':
          this.cameraGhost.lookAt(this.me.position)
          this.renderer.render(this.scene, this.cameraGhost)
      }

      window.requestAnimationFrame(this.tick)
    },
    addEventCameraModeChange () {
      this.targetDomChangeCameraMode.addEventListener('click', (event) => {
        const EMode = { orbit: 'orbit', keypress: 'keypress' }
        const { target } = event
        const { mode } = target.dataset

        if (mode === EMode.orbit) {
          target.dataset.mode = EMode.keypress
        } else if (mode === EMode.keypress) {
          target.dataset.mode = EMode.orbit
        }

        target.innerText = target.dataset.mode
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.threejs {
  height: 100%;

  .col-controls {
    flex-grow: unset;

    .change-update-mode {
    }
  }

  .col-canvas {
    flex-grow: inherit;

    .webgl {
      outline: none;
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>
