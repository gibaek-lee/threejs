/**
 * [cannon worker business 로직]
 * 
 * cannon.js docs: https://schteppe.github.io/cannon.js/docs/
 *
 * @types/cannon interface: https://www.npmjs.com/package/@types/cannon
 * 주의사항: @types/cannon 이 아직 0.대 이다. 하지만 컨트리부들의 활동이 활발해서 문제 없을 듯 하다. 대안도 없긴 하다.
 *
 * compiling typescript: https://code.visualstudio.com/docs/typescript/typescript-compiling
 */
interface IBaseDataWorldStep {
  dt: number
  timeSinceLastCalled: number
  maxSubSteps: number
}

interface IRecieveEventData extends IBaseDataWorldStep {
  action: 'step' | string // todo extend type
  physicsObjects: string[]
}

interface IParamworldStepCalculate extends IBaseDataWorldStep {
  positions: Float32Array
  quaternions: Float32Array
}

// self를 Worker domain으로 인지하지 못하므로 self를 그냥 사용하지 않고 재정의 해줘야 한다.
const ctx: Worker = self as any

/**
 * fixme
 * 1. static 폴더에 있으므로 nuxt 빌드를 거치지 않아 파일이 버전관리 되지 안아 캐싱 문제를 일으킬 수 있다. shell script를 짜서 npm run generate에 이어 해시 스트링을 붙이는 과정을 추가하던지, 아니면 nuxt 빌드 패스 안으로 넣는 것을 고민하자.
 * 2. cannon.js 폴더가 static으로 들어가고 있어 코드 분석에 javascript 비율이 지나치게 높아져 있다. nuxt 빌드 패스 내부로 넣는 방법을 고민하자.
 * 3. 타입 추적이 어려우므로 typescript 도입 방법이 필요하다. 역시 nuxt 빌드 패스 안으로 넣는 방법을 고민하자.
 */
let world: CANNON.World
let defaultMaterial: CANNON.Material
let bodiesBefore: String[] = []

ctx.onmessage = function (event: any) {
  const invokeModeAction = {
    init: () => {
      const { physicsLibUrl } = event.data
      if (!physicsLibUrl) {
        self.console.error('physicsLibUrl is not defined')
        return
      }

      try {
        world = initPhysicsWorld(physicsLibUrl)
      } catch (e) {
        self.console.log(e.message)
      }
      initWorldMaterialContact(world)

      ctx.postMessage({ isWorldReady: true }, [])
    },
    recieve: () => {
      const {
        action, // todo 컴포넌트 tick에서 보내는 행동 인터페이스 작성 - 'step' |
        dt, timeSinceLastCalled, maxSubSteps,
        physicsObjects = []
      }: IRecieveEventData = event.data
      const positions: Float32Array = event.data.positions
      const quaternions: Float32Array = event.data.quaternions

      createNewBody(physicsObjects)

      if (action === 'step') {
        worldStepCalculate({
          dt,
          timeSinceLastCalled,
          maxSubSteps,
          positions,
          quaternions
        })

        ctx.postMessage({ // worldStepCalculate과 동기적으로 실행되야 한다
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

function initPhysicsWorld (physicsLibUrl: string) {
  (self as any).importScripts(physicsLibUrl) // fixme Worker interface에 WorkerGlobalScope 인터페이스가 정의 안되어 있다

  world = new CANNON.World()
  world.gravity.set(0, -9.82, 0)
  self.console.log('@@@canon world generated', world, CANNON)

  return world
}

function initWorldMaterialContact (world: CANNON.World) {
  defaultMaterial = new CANNON.Material('default')
  const defaultContactMaterial = new CANNON.ContactMaterial(
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
  const floorBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(0, 0, 0),
    shape: floorShape,
    material: defaultMaterial
  })
  floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
  world.addBody(floorBody)
}

function createSphereBody () {
  const sphereShape = new CANNON.Sphere(0.5)
  const sphereBody = new CANNON.Body({
    mass: 1,
    // position: new CANNON.Vec3(0, 3.5, 0),
    shape: sphereShape,
    material: defaultMaterial
  })
  sphereBody.position.set(
    Math.random() * 3 - 0.5,
    Math.random() * 6 + 0.5,
    Math.random() * 3 - 0.5
  )
  world.addBody(sphereBody)
}

function createNewBody (physicsObjects: string[]) {
  const diffBodies = physicsObjects.slice(bodiesBefore.length)
  if (diffBodies.length > 0) {
    bodiesBefore = physicsObjects

    if (diffBodies.includes('PlaneGeometry')) {
      createFloorBody()
    }
    if (diffBodies.includes('SphereGeometry')) {
      createSphereBody()
    }
  }
}

function worldStepCalculate ({
  dt,
  timeSinceLastCalled,
  maxSubSteps,
  positions,
  quaternions
}: IParamworldStepCalculate) {
  world.step(dt, timeSinceLastCalled, maxSubSteps)

  world.bodies.forEach((wBody, index) => {
    if (wBody.shapes[0].type === CANNON.Shape.types.SPHERE) {
      positions[3 * (index - 1) + 0] = wBody.position.x
      positions[3 * (index - 1) + 1] = wBody.position.y
      positions[3 * (index - 1) + 2] = wBody.position.z
    }

    if (wBody.shapes[0].type === CANNON.Shape.types.BOX) {
      positions[3 * (index - 1) + 0] = wBody.position.x
      positions[3 * (index - 1) + 1] = wBody.position.y
      positions[3 * (index - 1) + 2] = wBody.position.z

      quaternions[4 * (index - 1) + 0] = wBody.quaternion.x
      quaternions[4 * (index - 1) + 1] = wBody.quaternion.y
      quaternions[4 * (index - 1) + 2] = wBody.quaternion.z
      quaternions[4 * (index - 1) + 3] = wBody.quaternion.w
    }
  })
}
