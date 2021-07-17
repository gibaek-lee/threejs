import {
  Ref, ComputedRef,
  ref, computed, watch,
  onMounted,
  SetupContext
} from '@nuxtjs/composition-api'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export interface IWindowSizes {
  width: number
  height: number
}

export interface IExtendDatGui extends dat.GUI {
  parentSelector: string
}

export default function UseWebgl (context: SetupContext) {
  const gui: Ref<IExtendDatGui | null> = ref(null)
  const scene: Ref<THREE.Scene | null> = ref(null)
  const axesHelper: Ref<THREE.AxesHelper | null> = ref(null)
  const cameraOrbit: Ref<THREE.PerspectiveCamera | null> = ref(null)
  const textureLoader: Ref<THREE.TextureLoader | null> = ref(null)

  const canvas: Ref<HTMLCanvasElement | undefined> = ref(undefined)
  const renderer: Ref<THREE.WebGLRenderer | null> = ref(null)
  const orbitControl: Ref<OrbitControls | null> = ref(null)
  const clock: Ref<THREE.Clock | null> = ref(null)

  const windowSizes: ComputedRef<IWindowSizes> = computed(() => ({
    width: window.innerWidth,
    height: window.innerHeight
  }))
  const isReadyCanvasRenderTick: ComputedRef<boolean> = computed(() => {
    return !!scene.value &&
           !!renderer.value &&
           !!cameraOrbit.value &&
           !!orbitControl.value
  })

  watch(canvas, () => {
    initThreejs()
    initDatGui()
  })

  onMounted(() => {
    window.addEventListener('resize', () => {
      windowSizes.value.width = window.innerWidth
      windowSizes.value.height = window.innerHeight

      if (cameraOrbit.value) {
        cameraOrbit.value.aspect = windowSizes.value.width / windowSizes.value.height
        cameraOrbit.value.updateProjectionMatrix()
      }

      if (renderer.value) {
        renderer.value.setSize(windowSizes.value.width, windowSizes.value.height)
        renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      }
    })

    // todoc WebGLRenderer 파라미터 canvas 타입과 querySelector 리턴 타입 정의가 다르다.
    canvas.value = context.root.$el.querySelector('canvas.webgl') as HTMLCanvasElement || undefined
  })

  const initThreejs = () => {
    scene.value = new THREE.Scene()

    axesHelper.value = new THREE.AxesHelper(1)
    axesHelper.value.position.set(2.01, 0.01, 2.01)

    cameraOrbit.value = new THREE.PerspectiveCamera(75, windowSizes.value.width / windowSizes.value.height, 0.1, 200)
    cameraOrbit.value.position.set(4, 20, 60)

    textureLoader.value = new THREE.TextureLoader()

    renderer.value = new THREE.WebGLRenderer({ canvas: canvas.value })
    renderer.value.setSize(windowSizes.value.width, windowSizes.value.height)
    renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.value.setClearColor('#262837')

    orbitControl.value = new OrbitControls(cameraOrbit.value, canvas.value)
    orbitControl.value.enableDamping = true

    clock.value = new THREE.Clock()
  }

  const initDatGui = () => {
    gui.value = new dat.GUI({ closed: false, width: 350 }) as IExtendDatGui

    // fixme CSR에서 라우트 이동했다 재진입시 Element(div.dg.ac)가 null이 되어 gui.add가 되지 않는다.
    // gui.destroy()의 문제이다. 아마 document 생성 시점과 dat.gui의 new가 의존성이 있어 보인다.
    // (solution) beforeDestroy 시점에 gui.parentSelector에 gui.domElement를 append 한 후 destroy 한다.
    gui.value.parentSelector = 'div.dg.ac'
  }

  const registerRenderTickCanvas = (callbackTick: Function) => {
    let counter = 0
    const intervalId = window.setInterval(() => {
      if (isReadyCanvasRenderTick.value) {
        callbackTick()
        window.clearInterval(intervalId)
      }

      // error handling
      counter = counter + 1
      console.log('waiting UseWebgl init...', counter)
      if (counter > 60) {
        window.clearInterval(intervalId)
        console.error('failed to init UseWebgl')
      }
    }, 100)
  }

  return {
    registerRenderTickCanvas,
    gui,
    scene,
    renderer,
    axesHelper,
    cameraOrbit,
    orbitControl,
    windowSizes,
    clock,
    textureLoader
  }
}
