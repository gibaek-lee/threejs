import * as THREE from 'three'
import { LineSegments } from 'three'

type TShadowSupportLights = THREE.PointLight | THREE.DirectionalLight | THREE.SpotLight

interface IParamUseShadow {
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  recieveMesh: THREE.Mesh
  castMeshs: THREE.Mesh[]
  light: TShadowSupportLights
  isUseCameraHelper: boolean
}

interface IReturnUseShadow {
  toggleVisiblePointLightCameraHelper: Function
}

export default function UseShadow ({
  scene,
  renderer,
  recieveMesh,
  castMeshs,
  light,
  isUseCameraHelper
} : IParamUseShadow): IReturnUseShadow {
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  recieveMesh.receiveShadow = true

  castMeshs.forEach((m: THREE.Mesh) => {
    if (m.type === 'Group') {
      m.children.forEach((c: THREE.Object3D) => { c.castShadow = true })
    } else {
      m.castShadow = true
    }
  })

  light.castShadow = true

  light.shadow.mapSize.width = 1024
  light.shadow.mapSize.height = 1024

  light.shadow.camera.near = 1
  light.shadow.camera.far = 40

  if (light.shadow.camera.type === 'OrthographicCamera') {
    light.shadow.camera.top = 10
    light.shadow.camera.right = 10
    light.shadow.camera.bottom = -10
    light.shadow.camera.left = -10
  }

  // light.shadow.radius = 10 // cheap blur technic, cannot use with THREE.PCFSoftShadowMap

  let lightCameraHelper: THREE.CameraHelper | null = null
  if (isUseCameraHelper) {
    lightCameraHelper = new THREE.CameraHelper(light.shadow.camera)
    lightCameraHelper.visible = true
    scene.add(lightCameraHelper)
  }

  const toggleVisiblePointLightCameraHelper: Function = (): void => {
    if (!lightCameraHelper) { return }
    lightCameraHelper.visible = !lightCameraHelper.visible
  }

  return {
    toggleVisiblePointLightCameraHelper
  }
}
