import * as THREE from 'three'
import { ghost } from '~/business/threejs/hauntedHouse'
import { IWindowSizes } from '~/composables/threejs'

export default function UseGhostMesh (
  scene: THREE.Scene,
  tensorHouseGroup: THREE.Vector3[],
  windowSizes: IWindowSizes
): {
  me: any, // todo
  cameraGhost: THREE.PerspectiveCamera
} {
  const {
    me,
    relCameraPositionToGhost,
    ghostKeyMoveCallback
  } = ghost.addOnScene(scene)

  window.addEventListener('keydown', (event) => {
    ghostKeyMoveCallback(event, me, cameraGhost)
  })

  me.position.set(
    tensorHouseGroup[12].x,
    tensorHouseGroup[12].y + 1,
    tensorHouseGroup[12].z
  )

  const cameraGhost = new THREE.PerspectiveCamera(75, windowSizes.width / windowSizes.height, 0.1, 200)
  cameraGhost.position.set(
    me.position.x + relCameraPositionToGhost.x,
    me.position.y + relCameraPositionToGhost.y,
    me.position.z + relCameraPositionToGhost.z
  )
  cameraGhost.lookAt(me.position)
  scene.add(cameraGhost)

  return {
    me,
    cameraGhost
  }
}
