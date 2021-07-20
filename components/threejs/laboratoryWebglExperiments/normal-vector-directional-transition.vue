<script>
import { defineComponent } from '@vue/composition-api'
import * as THREE from 'three'
import CoreTemplateExperiment from './core-template-experiment.vue'
import { UseAmbientLight } from '~/composables/threejs/common/light'
import { EScreenMode, UsePointerLockControls } from '~/composables/threejs/common/controls'
import { UseRaycaster } from '~/composables/threejs/common/event'

export default defineComponent({
  extends: CoreTemplateExperiment,
  data () {
    return {
      selectorCanvasWrap: 'normal-vector-directional-transition',
      thumbnailSrc: '/threejs/images/thumbnail_normal-vector-directional-transition.png',
      raycasterRender: () => {}
    }
  },
  methods: {
    initUtils () {
      const { controls } = UsePointerLockControls({
        vm: this,
        canvas: this.canvas,
        camera: this.cameraOrbit,
        options: { mode: EScreenMode.p, deltaMove: 0.1 }
      })

      this.raycasterRender = UseRaycaster({
        canvas: this.canvas
      }).raycasterRender

      const material = new THREE.MeshStandardMaterial()
      material.roughness = 0.7

      const plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), material)
      plane.rotation.x = -Math.PI * 0.5
      plane.position.y = 0

      this.cameraOrbit.position.set(
        plane.position.x,
        plane.position.y + 2,
        plane.position.z + plane.geometry.parameters.width / 2
      )

      this.axesHelper.position.set(0, plane.position.y + 0.001, 0)
      this.scene.add(plane, this.axesHelper)

      const { ambientLight } = UseAmbientLight(this.scene)
      this.gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Intensity Ambient Light')
    },
    tick () {
      const elapsedTime = this.clock.getElapsedTime()

      this.raycasterRender({
        camera: this.cameraOrbit,
        testObjects: this.scene.children
      })

      this.renderer.render(this.scene, this.cameraOrbit)

      this.idAnimationFrame = window.requestAnimationFrame(this.tick)
    }
  }
})
</script>
