import * as THREE from 'three'

function mountLight () {
  const mountAmbienLight = () => {
    const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
    return ambientLight
  }

  const mountMoonLight = () => {
    const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
    moonLight.position.set(4, 5, -2)
    return moonLight
  }

  const setGUI = (gui, { ambientLight, moonLight }) => {
    gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('ambientLight-intensity')
    gui.add(moonLight, 'intensity').min(0).max(1).step(0.001).name('moonLight-intensity')
    gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001).name('moonLight-x')
    gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001).name('moonLight-y')
    gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001).name('moonLight-z')
  }

  const addOnScene = (scene, gui) => {
    const ambientLight = mountAmbienLight()
    const moonLight = mountMoonLight()
    const lightGroup = new THREE.Group()

    lightGroup.add(ambientLight, moonLight)

    setGUI(gui, { ambientLight, moonLight })

    scene.add(lightGroup)

    return { lightGroup }
  }

  return { addOnScene }
}

export default mountLight()
