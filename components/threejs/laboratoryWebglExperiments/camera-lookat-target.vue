<script>
import * as THREE from 'three'
import { defineComponent } from '@vue/composition-api'
import CoreTemplateExperiment from './core-template-experiment.vue'
import { ELights, UseLights, UseShadow } from '~/composables/threejs/common/light'
import { UseCameraLookatTarget } from '~/composables/threejs/laboratoryWebgl'

export default defineComponent({
  extends: CoreTemplateExperiment,
  data () {
    return {
      selectorCanvasWrap: 'camera-lookat-target',
      thumbnailSrc: '/threejs/images/thumbnail_camera-lookat-target.png',
      runComposable: null
    }
  },
  methods: {
    initUtils () {
      const {
        plane,
        sphere,
        material,
        runRotSphereWtCamera
      } = UseCameraLookatTarget(this.scene, this.textureLoader)
      const ambientLight = UseLights(this.scene, { type: ELights.ambient })
      const pointLight = UseLights(this.scene, { type: ELights.point, position3: new THREE.Vector3(3, 3, 3) })
      const {
        toggleVisiblePointLightCameraHelper
      } = UseShadow({
        scene: this.scene,
        renderer: this.renderer,
        recieveMesh: plane,
        castMeshs: [sphere],
        light: pointLight,
        isUseCameraHelper: true
      })

      this.runComposable = runRotSphereWtCamera

      this.gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Intensity Ambient Light')
      this.gui.add(material, 'metalness').min(0).max(1).step(0.001).name('Metalness Material of Meshes')
      this.gui.add(material, 'roughness').min(0).max(1).step(0.001).name('Roughness Material of Meshes')

      this.axesHelper.position.set(0, 0.1, 0)
      this.scene.add(this.axesHelper)
    },
    tick () {
      const elapsedTime = this.clock.getElapsedTime()

      this.runComposable({ elapsedTime, cameraOrbit: this.cameraOrbit })

      this.renderer.render(this.scene, this.cameraOrbit)

      this.idAnimationFrame = window.requestAnimationFrame(this.tick)
    }
  }
})
</script>
