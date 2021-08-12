import { ref, watch } from '@nuxtjs/composition-api'

interface IParamUseWebWorker {
  N: number
  dt: number
  physicsLibUrl: string
  physicsWorldScript: string
}

class ComposeWebWorker {
  N: number
  dt: number
  sendTime: number
  physicsLibUrl: string
  physicsWorldScript: string
  worker: Worker | any // fixme Worker interface로 정의해야 하지만 constructor 스코프에서 초기화 하지 않으므로 any로 해둠

  constructor ({
    N, dt, physicsLibUrl, physicsWorldScript
  }: IParamUseWebWorker) {
    this.N = N
    this.dt = dt
    this.sendTime = 0
    this.physicsLibUrl = physicsLibUrl
    this.physicsWorldScript = physicsWorldScript

    this.init()
  }

  protected init () {
    this.createWorkerTagScript()
    this.createWorker()
      .then(() => {
        // todoc physic engine script read & library construct
        this.worker.postMessage(Object.assign({}, { physicsLibUrl: this.physicsLibUrl }))
      })
      .catch((err: Error) => {
        window.console.log(err.message)
      })

    watch([ref(this.worker)], ([cur]: [cur: Worker]) => {
      cur.onmessage = (event: MessageEvent) => {
        const { positions, quaternions } = event.data

        // Update rendering meshes
        window.console.log('onmessage', positions, quaternions)

        // thread processing speed adjustment
        let delay = this.dt * 1000 - (Date.now() - this.sendTime)
        if (delay > 0) {
          delay = 0
        }

        window.setTimeout(this.sendDataToWorker, delay)
      }
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
