interface IParamUseWebWorker {
  N: number
  dt: number
  physicsLibUrl: string
  physicsWorldScript: string
}

interface IMessageFromWorker {
  positions: Float32Array | undefined,
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

  constructor ({
    N, dt, physicsLibUrl, physicsWorldScript
  }: IParamUseWebWorker) {
    this.N = N
    this.dt = dt
    this.sendTime = 0
    this.physicsLibUrl = physicsLibUrl
    this.physicsWorldScript = physicsWorldScript
    this.messageFromWorker = {
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

        this.worker.onmessage = (event: MessageEvent) => {
          const { positions, quaternions } = event.data

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

  public sendDataToWorker (data?: Object) {
    this.sendTime = Date.now()

    const positions = new Float32Array(this.N * 3)
    const quaternions = new Float32Array(this.N * 4)

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
