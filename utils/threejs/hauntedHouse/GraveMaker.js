import * as THREE from 'three'

class GraveMaker {
  constructor() {
    this.graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
    this.graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })
  }

  // getNewGrave() {
  createGrave({width, height, depth}, meshColor) {
    const grave = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({ color: meshColor })
    )
    return grave
  }

  getRandomPosition() {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius

    return new THREE.Vector3(x, 0.3, z)
  }
}

export default GraveMaker
