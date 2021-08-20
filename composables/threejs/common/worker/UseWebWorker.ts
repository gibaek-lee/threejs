/**
 * three.js & web worker reference
 * https://schteppe.github.io/cannon.js/examples/worker.html
 */

interface IParamUseWebWorker {
  N: number
  dt: number
  physicsLibUrl: string
  physicsWorldScript: string
}

interface IMessageFromWorker {
  isWorldReady: boolean
  positions: Float32Array | undefined
  quaternions: Float32Array | undefined
}

class ComposeWebWorker {
  protected N: number
  protected dt: number
  protected sendTime: number
  protected physicsLibUrl: string
  protected physicsWorldScript: string
  public worker: Worker
  public messageFromWorker: IMessageFromWorker
  static THRESHOLD_FPS = 80

  constructor ({
    N, dt, physicsLibUrl, physicsWorldScript
  }: IParamUseWebWorker) {
    this.N = N
    this.dt = dt
    this.sendTime = 0
    this.physicsLibUrl = physicsLibUrl
    this.physicsWorldScript = physicsWorldScript
    this.messageFromWorker = {
      isWorldReady: false,
      positions: undefined,
      quaternions: undefined
    }

    /**
     * todoc & fixme Worker interface로 정의 위해서 constructor 스코프에서 초기해야 함
     * 아래 init 내부 createWorker에서 worker.terminate() 하고 worker에 재할당 한다.
     */
    this.worker = new Worker('')

    this.init()
  }

  protected init () {
    this.createWorkerTagScript()
    this.createWorker()
      .then(() => {
        // todoc physic engine script read & library construct
        this.worker.postMessage(Object.assign({}, { physicsLibUrl: this.physicsLibUrl }))

        this.worker.onmessage = (event: MessageEvent<IMessageFromWorker>) => {
          const { isWorldReady, positions, quaternions } = event.data

          this.messageFromWorker.isWorldReady = isWorldReady
          this.messageFromWorker.positions = positions
          this.messageFromWorker.quaternions = quaternions
        }
      })
      .catch((err: Error) => {
        window.console.log(err.message)
      })
  }

  protected createWorkerTagScript () {
    const tagScript = document.createElement('script')
    tagScript.setAttribute('id', 'worker')
    tagScript.setAttribute('type', 'javascript/worker')
    tagScript.text = this.physicsWorldScript

    tagScript.onload = () => {
      window.console.log('tagScript load success')
    }

    document.body.insertBefore(tagScript, document.body.firstChild)
  }

  protected createWorker () {
    return new Promise((resolve, reject) => {
      const workerElement = document.querySelector('#worker')
      if (!workerElement) {
        reject(new Error('element id worker was not found'))
        return
      }

      this.worker.terminate() // todoc & fixme constructor interface 정의용 불필요한 worker 제거

      const blob = new Blob([workerElement.textContent as BlobPart], { type: 'text/javascript' })
      const worker = new Worker(window.URL.createObjectURL(blob))
      this.worker = worker

      resolve(true)
    })
  }

  public sendDataToWorker (data: {
    action: string, // 'step'
    timeSinceLastCalled: number,
    maxSubSteps: number,
    physicsObjects: string[]
  }) {
    this.sendTime = Date.now()

    const numberObjects = data.physicsObjects.filter(o => o === 'SphereGeometry').length
    const positions = new Float32Array(numberObjects * 3)
    const quaternions = new Float32Array(numberObjects * 4)

    /**
     * todoc validate fps: 60 기준 ComposeWebWorker.THRESHOLD_FPS 보다 작은 메세지만 보낸다.
     * 이게 없으면 지나치게 세밀한 physics world.step이 진행되어 불필요한 연산량이 많아진다.
     * 적당한 fps 범위의 threshold 설정은 성능 향상에 도움이 된다.
     */
    const curFps = 1 / data.timeSinceLastCalled
    if ((curFps - (1 / this.dt)) > ComposeWebWorker.THRESHOLD_FPS) {
      window.console.log('Drop message. FPS difference: ', (curFps - (1 / this.dt)))
      return
    }
    // todoc

    if (!this.messageFromWorker.isWorldReady) {
      console.log('Phyics world is not ready')
      return
    }

    this.worker.postMessage(Object.assign({}, {
      N: this.N,
      dt: this.dt,
      positions,
      quaternions
    }, data), [positions.buffer, quaternions.buffer])
  }
}

export default function UseWebWorker ({
  N, dt, physicsLibUrl, physicsWorldScript
}: IParamUseWebWorker) {
  const iComposeWorker = new ComposeWebWorker({
    N,
    dt,
    physicsLibUrl,
    physicsWorldScript
  })

  return {
    iComposeWorker
  }
}
