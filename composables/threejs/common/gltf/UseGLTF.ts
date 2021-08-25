import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import changeAnimationClip from './changeAnimationClip'

export enum E_GLTF {
  DEFAULT = 'glTF',
  DRACO = 'Draco',
  BINARY = 'Binary',
  EMBEDDED = 'Embedded',
}

interface IParamUseGLTF {
  loaderType: E_GLTF
  targetModelPath: string
  successCallback?: Function
}

export default function UseGLTF ({
  loaderType = E_GLTF.DEFAULT,
  targetModelPath = '',
  successCallback = () => {}
}: IParamUseGLTF) {
  // sample model: https://github.com/KhronosGroup/glTF-Sample-Models
  const invokeLoaderType = {
    [E_GLTF.DEFAULT]: (): Promise<GLTFLoader> => {
      return new Promise((resolve) => {
        const gltfLoader = new GLTFLoader()

        resolve(gltfLoader)
      })
    },
    [E_GLTF.DRACO]: (): Promise<any> => {
      return new Promise((resolve) => {
        const dracoLoader = new DRACOLoader()

        const baseDomain = document.location.origin
        dracoLoader.setDecoderPath(`${baseDomain}/threejs/draco/`)

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        resolve(gltfLoader)
      })
    },
    [E_GLTF.BINARY]: (): Promise<any> => new Promise(resolve => resolve(false)),
    [E_GLTF.EMBEDDED]: (): Promise<any> => new Promise(resolve => resolve(false))
  }

  invokeLoaderType[loaderType]()
    .then((gltfLoader: GLTFLoader) => {
      gltfLoader.load(
        targetModelPath,
        (gltf) => {
          console.log('model load success', gltf)

          // animation
          let animationMixer = null
          let changeAnimation = null
          if (gltf.animations.length > 0) {
            animationMixer = new THREE.AnimationMixer(gltf.scene)
            changeAnimation = changeAnimationClip({
              mixer: animationMixer,
              animations: gltf.animations
            })
          }

          successCallback({
            gltf,
            animationMixer,
            changeAnimation
          })
        }
      )
    })
}
