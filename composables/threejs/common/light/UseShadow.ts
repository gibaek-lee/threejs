import * as THREE from 'three'

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

  castMeshs.forEach((m: THREE.Mesh) => { m.castShadow = true })

  light.castShadow = true
  light.shadow.mapSize.width = 1024
  light.shadow.mapSize.height = 1024
  light.shadow.camera.near = 1
  light.shadow.camera.far = 10
  // light.shadow.radius = 10 // cheap blur technic, cannot use with THREE.PCFSoftShadowMap

  let pointLightCameraHelper: THREE.CameraHelper | null = null
  if (isUseCameraHelper) {
    pointLightCameraHelper = new THREE.CameraHelper(light.shadow.camera)
    pointLightCameraHelper.visible = true

    scene.add(pointLightCameraHelper)
  }

  const toggleVisiblePointLightCameraHelper: Function = (): void => {
    if (!pointLightCameraHelper) { return }
    pointLightCameraHelper.visible = !pointLightCameraHelper.visible
  }

  return {
    toggleVisiblePointLightCameraHelper
  }
}
