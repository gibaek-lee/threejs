import * as THREE from 'three'
import { HouseMaker } from '@utils/threejs/hauntedHouse'

function mountHouse () {
  const wallSize = {
    width: 4,
    height: 2.5,
    depth: 4
  }

  // methos
  const mountWalls = (instanceHouseMaker) => {
    const walls = instanceHouseMaker.createWalls(wallSize, '#ac8e82')
    walls.position.y = wallSize.height / 2

    return walls
  }

  const mountRoof = (instanceHouseMaker) => {
    const roofSize = { radius: wallSize.width / 2 * 1.75, height: wallSize.width / 4, radialSegment: 4 }
    const roof = instanceHouseMaker.createRoof(roofSize, '#b35f45')
    roof.position.y = wallSize.height + roofSize.height / 2
    roof.rotation.y = Math.PI * 0.25

    return roof
  }

  const mountDoor = (instanceHouseMaker) => {
    const doorSize = { width: wallSize.width / 2, height: wallSize.width / 2 }
    const door = instanceHouseMaker.createDoor(doorSize, '#aa7b7b')
    door.position.y = doorSize.height / 2
    door.position.z = wallSize.depth / 2 + 0.01

    return door
  }

  const mountBushes = (instanceHouseMaker) => {
    const bushList = []
    const bushSettingDataList = [
      { scale: new THREE.Vector3(0.5, 0.5, 0.5), position: new THREE.Vector3(0.8, 0.2, 2.2) },
      { scale: new THREE.Vector3(0.25, 0.25, 0.25), position: new THREE.Vector3(1.4, 0.1, 2.1) },
      { scale: new THREE.Vector3(0.4, 0.4, 0.4), position: new THREE.Vector3(- 0.8, 0.1, 2.2) },
      { scale: new THREE.Vector3(0.15, 0.15, 0.15), position: new THREE.Vector3(- 1, 0.05, 2.6) }
    ]
    bushSettingDataList.forEach(data => {
      const bushData = { radius: 1, widthSeg: 16, heightSeg: 16 }
      const bush = instanceHouseMaker.createBush(bushData, '#89c854')

      bush.scale.set(data.scale.x, data.scale.y, data.scale.z)
      bush.position.set(data.position.x, data.position.y, data.position.z)

      bushList.push(bush)
    })

    return bushList
  }

  const mountDoorLight = (walls, door) => {
    const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
    const { depth } = walls.geometry.parameters
    const { height } = door.geometry.parameters
    doorLight.position.set(0, height + 0.2, depth + 0.7)

    return doorLight
  }

  const setGUI = (gui, { doorLight }) => {
    gui.add(doorLight, 'intensity').min(0).max(1).step(0.001).name('doorLight-intensity')
  }

  // mounted
  const addOnScene = (scene, gui) => {
    const instanceHouseMaker = new HouseMaker()
    const houseGroup = new THREE.Group()

    const walls = mountWalls(instanceHouseMaker)
    const roof = mountRoof(instanceHouseMaker)
    const door = mountDoor(instanceHouseMaker)
    const bushList = mountBushes(instanceHouseMaker)
    const doorLight = mountDoorLight(walls, door)

    houseGroup.add(walls, roof, door, ...bushList, doorLight)

    setGUI(gui, { doorLight })

    scene.add(houseGroup)

    return { houseGroup }
  }

  return { addOnScene }
}

export default mountHouse()
