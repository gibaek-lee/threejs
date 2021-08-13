let world
let sphereBody
let positions
let quaternions

self.onmessage = function (event) {
  const { physicsLibUrl } = event.data

  if (physicsLibUrl && !world) {
    self.importScripts(physicsLibUrl)

    world = new CANNON.World()
    world.gravity.set(0, -9.82, 0)
    console.log('@@@canon world generated', world, CANNON)

    const sphereShape = new CANNON.Sphere(0.5)
    sphereBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(0, 3, 0),
      shape: sphereShape
    })

    world.addBody(sphereBody)
  }

  if (world) {
    const { action, timeSinceLastCalled, maxSubSteps } = event.data
    positions = event.data.positions
    quaternions = event.data.quaternions

    if (action === 'step') {
      world.step(1 / 60, timeSinceLastCalled, maxSubSteps)
      // console.log(sphereBody.position.y)

      positions[0] = sphereBody.position.x
      positions[1] = sphereBody.position.y
      positions[2] = sphereBody.position.z

      self.postMessage({
        positions,
        quaternions
      }, [positions.buffer, quaternions.buffer])
    }
  }
}
