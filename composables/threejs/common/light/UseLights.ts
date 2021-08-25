import * as THREE from 'three'

type TLights = THREE.AmbientLight | THREE.DirectionalLight | THREE.PointLight

export enum ELights {
  'ambient',
  'directional',
  'point'
}

interface IOptionsLightDefault {
  type: ELights
  color?: THREE.Color | string | number
  intensity?: number
  position3?: THREE.Vector3
}

export default function UseLights (
  scene: THREE.Scene,
  options: IOptionsLightDefault
): TLights {
  const {
    type = ELights.ambient,
    color = 0xFFFFFF,
    intensity = 0.3,
    position3 = new THREE.Vector3(0, 0, 0)
  } = options

  const invokeLightInstance = {
    [ELights.ambient]: (): THREE.AmbientLight => {
      return new THREE.AmbientLight(color, intensity)
    },
    [ELights.directional]: (): THREE.DirectionalLight => {
      return new THREE.DirectionalLight(color, intensity)
    },
    [ELights.point]: (): THREE.PointLight => {
      return new THREE.PointLight(color, intensity)
    }
  }

  const light = invokeLightInstance[type || ELights.ambient]()
  light.position.set(position3.x, position3.y, position3.z)

  scene.add(light)

  return light
}
