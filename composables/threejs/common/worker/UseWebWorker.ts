import { ref, watch } from '@nuxtjs/composition-api'

interface IParamUseWebWorker {
  N: number
  dt: number
  workerScript: string
}

class ComposeWebWorker {
  N: number
  dt: number
  sendTime: number
  workerScript: string
  worker: Worker | undefined // fixme createWorker 주석 확인

  constructor ({ N, dt, workerScript }: IParamUseWebWorker) {
    this.N = N
    this.dt = dt
    this.sendTime = 0
    this.workerScript = workerScript

    this.init()
  }

  protected init () {
    this.createWorkerTagScript()
    this.createWorker()

    watch([ref(this.worker)], ([cur]) => {
      if (cur === undefined) { return }

      cur.onmessage = (event: MessageEvent) => {
        const { positions, quaternions } = event.data

        // Update rendering meshes
        console.log('onmessage', positions, quaternions)

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
    tagScript.text = this.workerScript

    tagScript.onload = () => {
      console.log('tagScript load success')
    }

    document.body.insertBefore(tagScript, document.body.firstChild)
  }

  protected createWorker () { // fixme constuctor 내로 넣어서 worker 타입에 | undefined 제거할 수 있음
    const workerElement = document.querySelector('#worker')
    if (!workerElement) { return }

    const blob = new Blob([workerElement.textContent as BlobPart], { type: 'text/javascript' })
    const worker = new Worker(window.URL.createObjectURL(blob))
    this.worker = worker
  }

  public sendDataToWorker (data?: Object) {
    this.sendTime = Date.now()

    const positions = new Float32Array(this.N * 3)
    const quaternions = new Float32Array(this.N * 4)

    const baseDomain = document.location.origin
    const cannonUrl = `${baseDomain}/threejs/cannon/build/cannon.js`

    if (this.worker === undefined) {
      console.log('worker is not defined')
      return
    }

    this.worker.postMessage(Object.assign({}, {
      N: this.N,
      dt: this.dt,
      cannonUrl,
      positions,
      quaternions
    }, data), [positions.buffer, quaternions.buffer])
  }
}

export default function UseWebWorker ({ N, dt, workerScript }: IParamUseWebWorker) {
  const iComposeWorker = new ComposeWebWorker({ N, dt, workerScript })

  return {
    iComposeWorker
  }
}
