<script>
import { defineComponent } from '@vue/composition-api'
import * as THREE from 'three'
import CoreTemplateExperiment from './core-template-experiment.vue'
import { UseShadow, UseAmbientLight, UsePointLight } from '~/composables/threejs/common/light'
import { EScreenMode, UsePointerLockControls } from '~/composables/threejs/common/controls'
import { UseRaycaster } from '~/composables/threejs/common/event'

export default defineComponent({
  extends: CoreTemplateExperiment,
  data () {
    return {
      selectorCanvasWrap: 'normal-vector-directional-transition',
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
    raycastHoverCallback (fromObj, toObj) {
      const STEP = 0.01
      const { radius } = toObj.geometry.parameters
      const distance = fromObj.position.distanceTo(toObj.position)
      if (distance < radius + STEP * 2) {
        return
      }

      const dir = new THREE.Vector3()
      dir.subVectors(toObj.position, fromObj.position).normalize()

      fromObj.position.add(dir.multiplyScalar(STEP))
    },
    initUtils () {
      const { controls } = UsePointerLockControls({
        vm: this,
        canvas: this.canvas,
        camera: this.cameraOrbit,
        options: { mode: EScreenMode.p, deltaMove: 0.1 }
      })

      this.raycasterRender = UseRaycaster({
        canvas: this.canvas,
        isSetFromCamera: true
      }).raycasterRender

      const plane = this.makeBasePlane()
      plane.rotation.x = -Math.PI * 0.5
      plane.position.y = 0

      const sphere1 = this.makeSimpleSphereMesh()
      const sphere2 = this.makeSimpleSphereMesh()
      sphere1.position.x = -4
      sphere2.position.x = 4
      sphere1.__raycastHoverCallback = () => this.raycastHoverCallback(this.cameraOrbit, sphere1)
      sphere2.__raycastHoverCallback = () => this.raycastHoverCallback(this.cameraOrbit, sphere2)
      this.raycastTestObjects.push(sphere1, sphere2)

      this.cameraOrbit.position.set(
        plane.position.x,
        plane.position.y + 2,
        plane.position.z + plane.geometry.parameters.width / 2
      )

      this.axesHelper.position.set(0, plane.position.y + 0.001, 0)
      this.scene.add(plane, ...this.raycastTestObjects, this.axesHelper)

      const { ambientLight } = UseAmbientLight(this.scene)
      const { pointLight } = UsePointLight({ scene: this.scene })
      pointLight.position.y = 5

      const {
        toggleVisiblePointLightCameraHelper
      } = UseShadow({
        scene: this.scene,
        renderer: this.renderer,
        recieveMesh: plane,
        castMeshs: this.raycastTestObjects,
        light: pointLight,
        isUseCameraHelper: true
      })

      this.gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Intensity Ambient Light')
    },
    tick () {
      const elapsedTime = this.clock.getElapsedTime()

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
