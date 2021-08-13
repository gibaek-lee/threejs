let world
let sphereBody
let floorBody
let positions
let quaternions

self.onmessage = function (event) {
  const { physicsLibUrl } = event.data

  if (physicsLibUrl && !world) {
    // load physics script
    self.importScripts(physicsLibUrl)

    // world init
    world = new CANNON.World()
    world.gravity.set(0, -9.82, 0)
    console.log('@@@canon world generated', world, CANNON)

    // contact
    const defaultMaterial = new CANNON.Material('default')
    const defaultContactMaterial = new CANNON.ContactMaterial(
      defaultMaterial,
      defaultMaterial,
      {
        friction: 0.1,
        restitution: 0.7
      }
    )
    world.addContactMaterial(defaultContactMaterial)

    // body
    const sphereShape = new CANNON.Sphere(0.5)
    sphereBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(0, 3, 0),
      shape: sphereShape,
      material: defaultContactMaterial
    })

    const floorShape = new CANNON.Plane()
    floorBody = new CANNON.Body({
      mass: 0,
      position: new CANNON.Vec3(0, 0, 0),
      shape: floorShape,
      material: defaultContactMaterial
    })
    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)

    world.addBody(sphereBody)
    world.addBody(floorBody)

    self.postMessage({ isWorldReady: true })
  }

  if (world) {
    const {
      action, // todoc 컴포넌트 tick에서 보내는 행동 인터페이스 'step' |
      dt, timeSinceLastCalled, maxSubSteps
    } = event.data
    positions = event.data.positions
    quaternions = event.data.quaternions

    if (action === 'step') {
      world.step(dt, timeSinceLastCalled, maxSubSteps)

      positions[0] = sphereBody.position.x
      positions[1] = sphereBody.position.y
      positions[2] = sphereBody.position.z

      self.postMessage({
        isWorldReady: true,
        positions,
        quaternions
      }, [positions.buffer, quaternions.buffer])
    }
  }
}
