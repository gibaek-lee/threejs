import * as THREE from 'three'

interface IParamUsePointLight {
  scene: THREE.Scene
}

interface IReturnUsePointLight {
  pointLight: THREE.PointLight
}

export default function UsePointLight ({
  scene
} : IParamUsePointLight): IReturnUsePointLight {
  const pointLight: THREE.PointLight = new THREE.PointLight(0xFFFFFF, 0.3)

  // 기본 세팅은 해주되 pointLight를 리턴해서 position을 component에서 설정하게 해준다.
  pointLight.position.set(1, 1, 1)

  scene.add(pointLight)

  return {
    pointLight
  }
}
