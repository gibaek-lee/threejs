let world
let sphereBody
let floorBody
let positions
let quaternions
let defaultContactMaterial
let bodies = []

self.onmessage = function (event) {
  const { physicsLibUrl } = event.data

  if (physicsLibUrl && !world) {
    // load physics script
    self.importScripts(physicsLibUrl)

    // world init
    world = new CANNON.World()
    world.gravity.set(0, -9.82, 0)
    self.console.log('@@@canon world generated', world, CANNON)

    // contact
    const defaultMaterial = new CANNON.Material('default')
    defaultContactMaterial = new CANNON.ContactMaterial(
      defaultMaterial,
      defaultMaterial,
      {
        friction: 0.1,
        restitution: 0.7
      }
    )
    world.addContactMaterial(defaultContactMaterial)

    self.postMessage({ isWorldReady: true })
  }

  if (world) {
    const {
      action, // todoc 컴포넌트 tick에서 보내는 행동 인터페이스 'step' |
      dt, timeSinceLastCalled, maxSubSteps,
      physicsObjects = []
    } = event.data
    positions = event.data.positions
    quaternions = event.data.quaternions

    // fixme 같은 이름 여러개면 추가된걸로 취급되지 않는다
    const diffBodies = physicsObjects.slice(bodies.length)
    if (diffBodies.length > 0) {
      bodies = physicsObjects

      if (diffBodies.includes('PlaneGeometry')) {
        createFloorBody()
      }
      if (diffBodies.includes('SphereGeometry')) {
        createSphereBody()
      }
    }

    if (action === 'step') {
      world.step(dt, timeSinceLastCalled, maxSubSteps)

      world.bodies.forEach((wBody, index) => {
        if (wBody.shapes[0].type === 1) { // type 1: sphere
          positions[3 * (index - 1) + 0] = wBody.position.x
          positions[3 * (index - 1) + 1] = wBody.position.y
          positions[3 * (index - 1) + 2] = wBody.position.z
        }
      })

      self.postMessage({
        isWorldReady: true,
        positions,
        quaternions
      }, [positions.buffer, quaternions.buffer])
    }
  }
}

function createFloorBody () {
  const floorShape = new CANNON.Plane()
  floorBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(0, 0, 0),
    shape: floorShape,
    material: defaultContactMaterial
  })
  floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
  world.addBody(floorBody)
}

function createSphereBody () {
  const sphereShape = new CANNON.Sphere(0.5)
  sphereBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape: sphereShape,
    material: defaultContactMaterial
  })
  world.addBody(sphereBody)
}
