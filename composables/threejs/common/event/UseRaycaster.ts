import * as THREE from 'three'

interface IParamConstructRaycaster {
  origin: THREE.Vector3
  direction: THREE.Vector3
}

export default function UseRaycaster ({
  canvas,
  // options: {
  //   origin,
  //   direction
  // }
} : {
  canvas: HTMLCanvasElement
  // options?: IParamConstructRaycaster
}): { raycasterRender: Function } {
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  const onMouseMove = (event: MouseEvent) => {
    mouse.set(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    )
  }

  const raycasterRender = ({
    camera,
    testObjects
  } : {
    camera: THREE.PerspectiveCamera,
    testObjects: THREE.Object3D[]
  }) => {
    raycaster.setFromCamera(mouse, camera)

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
      }
    })
  }

  window.addEventListener('mousemove', onMouseMove)

  return {
    raycasterRender
  }
}
