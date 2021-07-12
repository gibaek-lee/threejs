import { GUI } from 'dat.gui'
import * as THREE from 'three'
import { house, graves } from '~/business/threejs/hauntedHouse'

export default function useHouse (
  scene: THREE.Scene,
  gui: GUI
): {
  tensorHouseGroup: THREE.Vector3[]
} {
  const tensorHouseGroup: THREE.Vector3[] = [
    new THREE.Vector3(30, 0, -30), new THREE.Vector3(10, 0, -30), new THREE.Vector3(-10, 0, -30), new THREE.Vector3(-30, 0, -30),
    new THREE.Vector3(30, 0, -10), new THREE.Vector3(10, 0, -10), new THREE.Vector3(-10, 0, -10), new THREE.Vector3(-30, 0, -10),
    new THREE.Vector3(30, 0, 10), new THREE.Vector3(10, 0, 10), new THREE.Vector3(-10, 0, 10), new THREE.Vector3(-30, 0, 10),
    new THREE.Vector3(30, 0, 30), new THREE.Vector3(10, 0, 30), new THREE.Vector3(-10, 0, 30), new THREE.Vector3(-30, 0, 30),
  ]

  tensorHouseGroup.forEach((position) => {
    const isCreate = Math.random() * 2 > 1
    if (!isCreate) { return }

    const { houseGroup } = house.addOnScene(scene, gui)
    const { gravesGroup } = graves.addOnScene(scene)
    houseGroup.position.set(position.x, position.y, position.z)
    gravesGroup.position.set(position.x, position.y, position.z)
  })

  return {
    tensorHouseGroup
  }
}
