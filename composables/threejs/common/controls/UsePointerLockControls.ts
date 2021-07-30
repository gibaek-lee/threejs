import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

export enum EScreenMode {
  'f' = 'fullsize',
  'p' = 'partial'
}

interface IOptions {
  mode: EScreenMode
  deltaMove: number
}

export default function UsePointerLockControls ({
  vm,
  camera,
  canvas,
  options: {
    mode = EScreenMode.f,
    deltaMove = 0.1
  }
} : {
  vm: Vue,
  canvas: HTMLCanvasElement,
  camera: THREE.PerspectiveCamera,
  options: IOptions
}): { controls: PointerLockControls } {
  const controls = new PointerLockControls(camera, canvas)
  const invokeModeLockCallback = {
    [EScreenMode.p]: () => {
      if (controls.isLocked) {
        controls.unlock()
      } else {
        controls.lock()
      }
    }
  }

  canvas.addEventListener('click', invokeModeLockCallback[mode])

  window.addEventListener('keydown', (event) => {
    switch (event.key) { // fixme 벡텨연산으로 바꿔야 한다.
      // case 'w':
      //   controls.moveForward(deltaMove)
      //   break
      // case 'a':
      //   controls.moveRight(-deltaMove)
      //   break
      // case 'd':
      //   controls.moveRight(deltaMove)
      //   break
      // case 's':
      //   controls.moveForward(-deltaMove)
      //   break
      case 'Escape':
        controls.unlock()
        break
    }
  })

  return {
    controls
  }
}
