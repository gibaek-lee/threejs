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
  public worker: Worker | any // fixme Worker interface로 정의해야 하지만 constructor 스코프에서 초기화 하지 않으므로 any로 해둠
  public messageFromWorker: IMessageFromWorker
  static THRESHOLD_FPS_DIFF = 40

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

    // todoc validate fps: 60 기준 ComposeWebWorker.THRESHOLD_FPS_DIFF 범위의 메세지만 보낸다.
    //
    // fixme
    // 이러면 프레임드랍이 있지 않나? 하지만 이게 없으면 지나치게 physics world.step이 적게 진행되거나 많이 진행되므로
    // 렌더 시 오히려 중간에 프레임 없이 순간이동 한것처럼 보인다.
    const curFps = 1 / data.timeSinceLastCalled
    if (Math.abs(curFps - (1 / this.dt)) > ComposeWebWorker.THRESHOLD_FPS_DIFF) {
      window.console.log('Drop message. FPS difference: ', Math.abs(curFps - (1 / this.dt)))
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
