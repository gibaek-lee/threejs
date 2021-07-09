import * as THREE from 'three'

class HouseMaker {
  createWalls ({ width, height, depth }, meshColor) {
    const walls = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({ color: meshColor })
    )
    return walls
  }

  createRoof ({ radius, height, radialSegment }, meshColor) {
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(radius, height, radialSegment),
      new THREE.MeshStandardMaterial({ color: meshColor })
    )
    return roof
  }

  createDoor ({ width, height }, meshColor) {
    const door = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshStandardMaterial({ color: meshColor })
    )
    return door
  }

  createBush ({ radius, widthSeg, heightSeg }, meshColor) {
    const bush = new THREE.Mesh(
      new THREE.SphereGeometry(radius, widthSeg, heightSeg),
      new THREE.MeshStandardMaterial({ color: meshColor })
    )
    return bush
  }
}

export default HouseMaker
