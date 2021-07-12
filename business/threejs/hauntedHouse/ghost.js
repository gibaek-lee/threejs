import * as THREE from 'three'

function mountGhost () {
  const relCameraPositionToGhost = new THREE.Vector3(0, 3, 6)

  const offAxisCameraRotation = (ghost, camera, key) => {
    const deltaRoation = Math.PI / 45
    const pivot = new THREE.Vector3(ghost.position.x, camera.position.y, ghost.position.z)
    const cameraRelRotRadius = pivot.distanceTo(camera.position)

    if (key === 'q') {
      ghost.rotation.y += deltaRoation
      updatePosition()
    } else if (key === 'w') {
      ghost.rotation.y -= deltaRoation
      updatePosition()
    }

    function updatePosition () {
      const angle = ghost.rotation.y
      camera.position.set(
        Math.sin(angle) * cameraRelRotRadius + pivot.x,
        pivot.y,
        Math.cos(angle) * cameraRelRotRadius + pivot.z
      )
    }
  }

  const translation = (ghost, camera, key) => {
    const deltaStep = 0.4

    switch (key) {
      case 'ArrowUp':
        updatePosition(
          -deltaStep * Math.sin(ghost.rotation.y),
          -deltaStep * Math.cos(ghost.rotation.y)
        )
        break
      case 'ArrowDown':
        updatePosition(
          +deltaStep * Math.sin(ghost.rotation.y),
          +deltaStep * Math.cos(ghost.rotation.y)
        )
        break
      case 'ArrowLeft':
        updatePosition(
          -deltaStep * Math.sin(Math.PI * 0.5 + ghost.rotation.y),
          -deltaStep * Math.cos(Math.PI * 0.5 + ghost.rotation.y)
        )
        break
      case 'ArrowRight':
        updatePosition(
          deltaStep * Math.sin(Math.PI * 0.5 + ghost.rotation.y),
          deltaStep * Math.cos(Math.PI * 0.5 + ghost.rotation.y)
        )
        break
    }

    function updatePosition (deltaX, deltaZ) {
      ghost.position.set(
        ghost.position.x + deltaX,
        ghost.position.y,
        ghost.position.z + deltaZ
      )
      camera.position.set(
        camera.position.x + deltaX,
        camera.position.y,
        camera.position.z + deltaZ
      )
    }
  }

  const ghostKeyMoveCallback = (event, ghost, camera) => {
    const { key } = event
    offAxisCameraRotation(ghost, camera, key)
    translation(ghost, camera, key)
  }

  const addOnScene = (scene) => {
    const ghost = new THREE.PointLight('red', 5, 2)

    scene.add(ghost)

    return { me: ghost, relCameraPositionToGhost, ghostKeyMoveCallback }
  }

  return { addOnScene }
}

export default mountGhost()
