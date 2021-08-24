<script>
import { defineComponent } from '@vue/composition-api'
import * as THREE from 'three'
import CoreTemplateExperiment from './core-template-experiment.vue'
import { UseRaycaster } from '~/composables/threejs/common/event'
import { ELights, UseLights, UseShadow } from '~/composables/threejs/common/light'

export default defineComponent({
  extends: CoreTemplateExperiment,
  data () {
    return {
      selectorCanvasWrap: 'raycast-hover-interaction',
      thumbnailSrc: '/threejs/images/thumbnail_normal-vector-directional-transition.png',
      raycasterRender: () => {},
      raycastTestObjects: []
    }
  },
  methods: {
    makeBasePlane () {
      const material = new THREE.MeshStandardMaterial()
      material.roughness = 0.7

      return new THREE.Mesh(new THREE.PlaneGeometry(20, 20), material)
    },
    makeSimpleSphereMesh () {
      const material = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 16),
        new THREE.MeshStandardMaterial()
      )
      material.roughness = 0.7

      return material
    },
    initUtils () {
      const basePlane = this.makeBasePlane()
      basePlane.rotation.x = -Math.PI * 0.5
      basePlane.position.y = 0

      const object1 = this.makeSimpleSphereMesh()
      const object2 = this.makeSimpleSphereMesh()
      const object3 = this.makeSimpleSphereMesh()
      object1.position.x = -2
      object3.position.x = 2
      this.raycastTestObjects.push(object1, object2, object3)

      const ambientLight = UseLights(this.scene, { type: ELights.ambient })
      const pointLight = UseLights(this.scene, { type: ELights.point, position3: new THREE.Vector3(0, 5, 0) })

      const {
        toggleVisiblePointLightCameraHelper
      } = UseShadow({
        scene: this.scene,
        renderer: this.renderer,
        recieveMesh: basePlane,
        castMeshs: this.raycastTestObjects,
        light: pointLight,
        isUseCameraHelper: true
      })

      this.raycasterRender = UseRaycaster({
        canvas: this.canvas,
        isSetFromCamera: true
      }).raycasterRender

      this.cameraOrbit.position.set(0, 2, 5)

      this.scene.add(basePlane, ...this.raycastTestObjects)
    },
    tick () {
      const elapsedTime = this.clock.getElapsedTime()

      this.raycastTestObjects.forEach((obj, idx) => {
        const freqOmega = 0.4 * (idx + 1)
        const offsetY = 1
        const amplitude = 3
        obj.position.y = Math.sin(elapsedTime * freqOmega) * amplitude + offsetY
      })

      this.raycasterRender({
        camera: this.cameraOrbit,
        testObjects: this.raycastTestObjects
      })

      this.renderer.render(this.scene, this.cameraOrbit)

      this.idAnimationFrame = window.requestAnimationFrame(this.tick)
    }
  }
})
</script>
