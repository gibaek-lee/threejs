import * as THREE from 'three'

interface IParamUseRaycaster {
  canvas: HTMLCanvasElement,
  isSetFromCamera?: boolean
}

export default function UseRaycaster ({
  canvas,
  isSetFromCamera = false
} : IParamUseRaycaster): { raycasterRender: Function } {
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  const onMouseMove = (event: MouseEvent) => {
    if (event.target && event.target.tagName !== 'CANVAS') {
      return
    }

    // todoc 캔버스가 NDC에서 브라우저 전체를 채우고 있을떄만 적용되는 수식
    // mouse.set(
    //   (event.clientX / window.innerWidth) * 2 - 1,
    //   -(event.clientY / window.innerHeight) * 2 + 1
    // )

    // todoc 캔버스가 NDC에서 사이즈가 변할 때 -> 일반화된 수식
    const canvasBounds = canvas.getBoundingClientRect()
    mouse.set(
      ((event.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1,
      -((event.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1
    )
  }

  const raycasterRender = ({
    origin,
    direction,
    camera,
    testObjects
  } : {
    origin: THREE.Vector3,
    direction: THREE.Vector3,
    camera: THREE.PerspectiveCamera,
    testObjects: THREE.Object3D[]
  }) => {
    if (isSetFromCamera) {
      raycaster.setFromCamera(mouse, camera)
    } else {
      raycaster.set(origin, direction)
    }

    testObjects.forEach((object: any) => {
      if (object.material) {
        object.material.color.set(0xFFFFFF)
      }
    })

    const intersects = raycaster.intersectObjects(testObjects)
    intersects.forEach((intersect: THREE.Intersection) => {
      if (intersect.distance > 0) {
        const { object } = intersect as any // fixme threejs 타입 정의 잘못됨
        object.material.color.set(0xFF0000)

        if (object.__raycastHoverCallback && typeof object.__raycastHoverCallback === 'function') {
          object.__raycastHoverCallback()
        }
      }
    })
  }

  window.addEventListener('mousemove', onMouseMove)

  // todo 메쉬 mouse click 시 메쉬 변하게 하는 기능 추가(아래 코드펜 참조)
  // https://codepen.io/k3no/embed/WGzXGN?height=500&theme-id=0&slug-hash=WGzXGN&default-tab=js%2Cresult&user=k3no&name=cp_embed_7

  return {
    raycasterRender
  }
}
