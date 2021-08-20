/**
 * cannon.js reference
 * https://schteppe.github.io/cannon.js/docs/
 */

/**
 * fixme
 * 1. static 폴더에 있으므로 nuxt 빌드를 거치지 않아 파일이 버전관리 되지 안아 캐싱 문제를 일으킬 수 있다. shell script를 짜서 npm run generate에 이어 해시 스트링을 붙이는 과정을 추가하던지, 아니면 nuxt 빌드 패스 안으로 넣는 것을 고민하자.
 * 2. cannon.js 폴더가 static으로 들어가고 있어 코드 분석에 javascript 비율이 지나치게 높아져 있다. nuxt 빌드 패스 내부로 넣는 방법을 고민하자.
 * 3. 타입 추적이 어려우므로 typescript 도입 방법이 필요하다. 역시 nuxt 빌드 패스 안으로 넣는 방법을 고민하자.
 */

let world
let sphereBody
let floorBody
let positions
let quaternions
let defaultContactMaterial
let bodies = []

self.onmessage = function (event) {
  const invokeModeAction = {
    init: () => {
      const { physicsLibUrl } = event.data
      if (!physicsLibUrl) {
        self.console.error('physicsLibUrl is not defined')
        return
      }

      try {
        world = initPhysicsWorld(self, physicsLibUrl)
      } catch (e) {
        self.console.log(e.message)
      }
      initWorldMaterialContact(world)

      self.postMessage({ isWorldReady: true })
    },
    recieve: () => {
      const {
        action, // todo 컴포넌트 tick에서 보내는 행동 인터페이스 작성 - 'step' |
        dt, timeSinceLastCalled, maxSubSteps,
        physicsObjects = []
      } = event.data
      positions = event.data.positions
      quaternions = event.data.quaternions

      createNewBody(physicsObjects)

      if (action === 'step') {
        worldStepCalculate(dt, timeSinceLastCalled, maxSubSteps)

        self.postMessage({ // worldStepCalculate과 동기적으로 실행되야 한다
          isWorldReady: true,
          positions,
          quaternions
        }, [positions.buffer, quaternions.buffer])
      }
    },
    error: () => {
      self.console.error('mode worker onmessage is not defined')
    }
  }

  const mode = world ? 'recieve' : 'init'
  const invoker = invokeModeAction[mode] || invokeModeAction.error
  invoker()
}

function initPhysicsWorld (self, physicsLibUrl) {
  self.importScripts(physicsLibUrl)

  world = new CANNON.World()
  world.gravity.set(0, -9.82, 0)
  self.console.log('@@@canon world generated', world, CANNON)

  return world
}

function initWorldMaterialContact (world) {
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
    // position: new CANNON.Vec3(0, 3.5, 0),
    shape: sphereShape,
    material: defaultContactMaterial
  })
  sphereBody.position.set(
    Math.random() * 3 - 0.5,
    Math.random() * 6 + 0.5,
    Math.random() * 3 - 0.5
  )
  world.addBody(sphereBody)
}

function createNewBody (physicsObjects) {
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
}

function worldStepCalculate (dt, timeSinceLastCalled, maxSubSteps,) {
  world.step(dt, timeSinceLastCalled, maxSubSteps)

  world.bodies.forEach((wBody, index) => {
    if (wBody.shapes[0].type === 1) { // type 1: sphere
      if (wBody.position) {
        positions[3 * (index - 1) + 0] = wBody.position.x
        positions[3 * (index - 1) + 1] = wBody.position.y
        positions[3 * (index - 1) + 2] = wBody.position.z
      }

      if (wBody.quaternions) { // fixme type 1 sphere에는 quaternion이 없다. 육면체 타입 추가하면 거기로 이동
        quaternions[4 * (index - 1) + 0] = wBody.quaternions.x
        quaternions[4 * (index - 1) + 1] = wBody.quaternions.y
        quaternions[4 * (index - 1) + 2] = wBody.quaternions.z
        quaternions[4 * (index - 1) + 3] = wBody.quaternions.w
      }
    }
  })
}
