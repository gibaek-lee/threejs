import * as THREE from 'three'

interface IOptionsDirectionalLight {
  intensity: number
  position3: THREE.Vector3
}

interface IReturnUseDirectionalLight {
  directionalLight: THREE.DirectionalLight
}

export default function UsePointLight (
  scene: THREE.Scene,
  options: IOptionsDirectionalLight = { intensity: 0.7, position3: new THREE.Vector3(1, 1, 1) }
): IReturnUseDirectionalLight {
  const { intensity, position3 } = options
  const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xFFFFFF, intensity)

  directionalLight.position.set(position3.x, position3.y, position3.z)

  scene.add(directionalLight)

  return {
    directionalLight
  }
}
