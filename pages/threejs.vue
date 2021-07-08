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
import { mapGetters, mapMutations, mapActions } from 'vuex'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: 'Threejs',
  data () {
    return {
      canvas: null,
      scene: null,
      renderer: null,
      clock: null,
      orbitControl: null,
      camera: null,
      datGUI: null,
      axesHelper: null,
      textureLoader: null
    }
  },
  computed: {
    ...mapGetters('threejs', {
    }),
    sizes () {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      }
    },
    isInit () {
      return !!this.orbitControl &&
            !!this.renderer &&
            !!this.scene &&
            !!this.camera
    },
    targetDomUpdateMode () {
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

      this.addMeshFloor()

      this.clock = new THREE.Clock()
      this.tick()
    }
  },
  created () {
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.sizes.width = window.innerWidth
      this.sizes.height = window.innerHeight

      this.camera.aspect = this.sizes.width / this.sizes.height
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(this.sizes.width, this.sizes.height)
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
      this.datGUI = new dat.GUI({ closed: true, width: 350 })
      this.scene = new THREE.Scene()
      this.axesHelper = new THREE.AxesHelper(1)

      this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 200)
      this.camera.position.set(4, 20, 60)

      this.textureLoader = new THREE.TextureLoader()

      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas })
      this.renderer.setSize(this.sizes.width, this.sizes.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.renderer.setClearColor('#262837')

      this.orbitControl = new OrbitControls(this.camera, this.canvas)
      this.orbitControl.enableDamping = true

      this.scene.add(this.axesHelper, this.camera)
    },
    tick () {
      const elapsedTime = this.clock.getElapsedTime()

      const { mode } = this.targetDomUpdateMode.dataset
      if (mode === 'orbit') {
        this.orbitControl.update()
        this.renderer.render(this.scene, this.camera)
      } else if (mode === 'keypress') {
        // camera2.lookAt(me.position)
        // this.renderer.render(scene, camera2)
      }

      window.requestAnimationFrame(this.tick)
    },
    addMeshFloor () {
      const NUM_PLANES = 4
      const BASE_WIDHT_PLANE = 20
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(BASE_WIDHT_PLANE * NUM_PLANES, BASE_WIDHT_PLANE * NUM_PLANES),
        new THREE.MeshStandardMaterial({ color: '#a9c388' })
      )
      floor.rotation.x = -Math.PI * 0.5
      floor.position.y = 0

      this.scene.add(floor)
    }
  }
}
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
