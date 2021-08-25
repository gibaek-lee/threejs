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
  light, // todo 현재 단일 광원에 대해서만 shadow 처리 되므로 light[]에 대한 필요가 있을 시 추가
  isUseCameraHelper
} : IParamUseShadow): IReturnUseShadow {
  // renderer 세팅
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // mesh 세팅
  if (recieveMesh) {
    recieveMesh.receiveShadow = true
  }

  castMeshs.forEach((m: THREE.Mesh) => {
    if (m.type === 'Group') {
      m.children.forEach((c: THREE.Object3D) => {
        c.castShadow = true
        c.receiveShadow = true
      })
    } else {
      m.castShadow = true
    }
  })

  // light 세팅
  light.castShadow = true

  light.shadow.mapSize.width = 1024
  light.shadow.mapSize.height = 1024

  light.shadow.camera.near = 1
  light.shadow.camera.far = 60

  if (light.shadow.camera.type === 'OrthographicCamera') {
    light.shadow.camera.top = 10
    light.shadow.camera.right = 10
    light.shadow.camera.bottom = -10
    light.shadow.camera.left = -10
  }

  light.shadow.normalBias = 0.05

  // light.shadow.radius = 10 // cheap blur technic, cannot use with THREE.PCFSoftShadowMap

  let lightCameraHelper: THREE.CameraHelper | null = null
  if (isUseCameraHelper) {
    lightCameraHelper = new THREE.CameraHelper(light.shadow.camera)
    lightCameraHelper.visible = true
    scene.add(lightCameraHelper)
  }

  // public method
  const toggleVisiblePointLightCameraHelper: Function = (): void => {
    if (!lightCameraHelper) { return }
    lightCameraHelper.visible = !lightCameraHelper.visible
  }

  return {
    toggleVisiblePointLightCameraHelper
  }
}
