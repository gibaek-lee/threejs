import * as THREE from 'three'

export default function UseAmbientLight (scene: THREE.Scene) {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)

  scene.add(ambientLight)

  return {
    ambientLight
  }
}
