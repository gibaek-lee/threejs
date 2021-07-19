import { Ref, ref } from '@vue/composition-api'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function UseOrbitControls ({
  camera,
  canvas
} : {
  camera: THREE.PerspectiveCamera,
  canvas: HTMLCanvasElement
}) {
  const orbitControl: Ref<OrbitControls | null> = ref(null)

  orbitControl.value = new OrbitControls(camera, canvas)
  orbitControl.value.enableDamping = true
}
