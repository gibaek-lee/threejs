import * as THREE from 'three'

interface IRunRotSphereWtCamera {
  elapsedTime: number
  cameraOrbit: THREE.PerspectiveCamera
}

export default function UseCameraLookatTarget (
  scene: THREE.Scene,
  textureLoader: THREE.TextureLoader
) {
  const material = new THREE.MeshStandardMaterial()
  material.roughness = 0.7

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), material)
  plane.rotation.x = -Math.PI * 0.5
  plane.position.y = 0

  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material)

  scene.add(sphere, plane)

  // util for tick
  const ROT_RADIUS_SPHERE = 2
  const DIST_BTW_SPHERE_CAMERA = 2
  const SPHERE_Y = 1
  const PIVOT_ROT = new THREE.Vector3(1, SPHERE_Y, 1)
  const runRotSphereWtCamera = ({ elapsedTime, cameraOrbit } : IRunRotSphereWtCamera) => {
    sphere.position.set(
      Math.cos(elapsedTime) * ROT_RADIUS_SPHERE + PIVOT_ROT.x,
      SPHERE_Y,
      Math.sin(elapsedTime) * ROT_RADIUS_SPHERE + PIVOT_ROT.z
    )
    cameraOrbit.position.set(
      Math.cos(elapsedTime) * (ROT_RADIUS_SPHERE + DIST_BTW_SPHERE_CAMERA) + PIVOT_ROT.x,
      SPHERE_Y + DIST_BTW_SPHERE_CAMERA,
      Math.sin(elapsedTime) * (ROT_RADIUS_SPHERE + DIST_BTW_SPHERE_CAMERA) + PIVOT_ROT.z
    )
    cameraOrbit.lookAt(sphere.position)
  }

  return {
    plane,
    sphere,
    material,
    runRotSphereWtCamera
  }
}
