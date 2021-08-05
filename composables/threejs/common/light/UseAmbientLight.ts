import { intersectionTypeAnnotation } from '@babel/types'
import * as THREE from 'three'

interface IOptionsAmbientLight {
  color?: THREE.Color | string | number
  intensity?: number
}

export default function UseAmbientLight (
  scene: THREE.Scene,
  options: IOptionsAmbientLight = { color: 0xFFFFFF, intensity: 0.3 }
) {
  const ambientLight = new THREE.AmbientLight(options.color, options.intensity)

  scene.add(ambientLight)

  return {
    ambientLight
  }
}
