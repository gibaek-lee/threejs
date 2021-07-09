import * as THREE from 'three'

export default function useFloor (scene) {
  const NUM_PLANES = 4
  const BASE_WIDHT_PLANE = 20

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(BASE_WIDHT_PLANE * NUM_PLANES, BASE_WIDHT_PLANE * NUM_PLANES),
    new THREE.MeshStandardMaterial({ color: '#a9c388' })
  )
  floor.rotation.x = -Math.PI * 0.5
  floor.position.y = 0

  scene.add(floor)
}
