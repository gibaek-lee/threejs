// 침조: https://stackoverflow.com/questions/13125415/how-can-i-get-my-mesh-has-gone-off-screen

import * as THREE from 'three'

const frustumValidator = () => {
  // Create a new Frustum object (for efficiency, do this only once)
  const frustum = new THREE.Frustum()

  // Helper matrix (for efficiency, do this only once)
  const projScreenMatrix = new THREE.Matrix4()

  return camera => ({
    update: () => {
      // Set the matrix from camera matrices (which are updated on each renderer.render() call)
      projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)

      // Update the frustum
      frustum.setFromProjectionMatrix(projScreenMatrix)
    },
    testVisibilty: object => frustum.intersectsObject(object) // It's on-screen!
  })
}

export default frustumValidator()
