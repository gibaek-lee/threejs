import * as THREE from 'three'
import { GraveMaker } from '~/utils/threejs/hauntedHouse'

function mountGraves () {
  const mountGrave = (instanceGraveMaker) => {
    const graveList = []
    for (let i = 0; i < 50; i++) {
      const graveData = { width: 0.6, height: 0.8, depth: 0.2 }
      const grave = instanceGraveMaker.createGrave(graveData, '#b2b6b1')
      const randomPosition3 = instanceGraveMaker.getRandomPosition()
      grave.position.set(randomPosition3.x, randomPosition3.y, randomPosition3.z)

      graveList.push(grave)
    }

    return graveList
  }

  const addOnScene = (scene) => {
    const instanceGraveMaker = new GraveMaker()
    const gravesGroup = new THREE.Group()

    const graveList = mountGrave(instanceGraveMaker)

    gravesGroup.add(...graveList)

    scene.add(gravesGroup)

    return { gravesGroup }
  }

  return { addOnScene }
}

export default mountGraves()
