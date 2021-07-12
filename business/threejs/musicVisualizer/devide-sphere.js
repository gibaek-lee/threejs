import * as THREE from 'three'
import { IModeInitPosition, IModeRandom, IModeMove, IModeDecibelY } from './static.interface'

class DevideSphere {
  constructor (utilFrustumValidator, audioAnalyst, modeInitPosition, modeRandom, modeMove, modeDecibelY) {
    this.utilFrustumValidator = utilFrustumValidator
    this.audioAnalyst = audioAnalyst

    this.position3 = undefined
    this.direction = undefined
    this.isCollide = false
    this.isScreenOut = false
    this.id = undefined
    this.colorIdx = undefined
    this.object = undefined

    this.modeInitPosition = modeInitPosition || IModeInitPosition.linear
    this.modeRandom = modeRandom || IModeRandom.static
    this.modeMove = modeMove || IModeMove.stay
    this.modeDecibelY = modeDecibelY || IModeDecibelY.freq
  }

  createObject () {
    const geometry = new THREE.SphereGeometry(0, 32, 32)
    const material = new THREE.MeshBasicMaterial({wireframe: true})

    this.object = new THREE.Mesh(geometry, material)
  }

  insertObjectOnScene (scene, { colorIdx, positionIdx }) {
    this.id = positionIdx
    this.colorIdx = colorIdx

    this.createObject()
    this.setPosition({ mode: 'init' }, positionIdx)
    this.setColor()

    scene.add(this.object)
  }

  update () {
    this.detectCollide()
    this.detectScreenOut()
    this.setPosition({ mode: 'update' })
    this.setRadius()
    this.setColor()
  }

  setModeRandom (mode) {
    this.modeRandom = mode
  }

  setRadius () { // decibel
    if(!this.id) { return }
    const FACTOR_CORRECTION_DECIBEL = 40
    const FACTOR_CORRECTION_RADIUS = 1.05

    const radius = this.audioAnalyst.getAnalyseData().frequencyList[this.id] / FACTOR_CORRECTION_DECIBEL
    const mapRadius = Math.pow(radius, FACTOR_CORRECTION_RADIUS) // Math.log2(radius || 1) 는 너무 변화가 적다

    this.object.geometry = new THREE.SphereGeometry(mapRadius, 32, 32)
  }

  getCirclePosition (radius, segment, idx) {
    const deltaTheta = 2 * Math.PI / segment
    let count = segment
    const container = []
    while (count > 0) {
      count -= 1

      const position = {
        x: radius * Math.sin(deltaTheta * idx),
        y: radius * Math.cos(deltaTheta * idx),
        z: 0
      }
      container.push(position)
    }
    return new THREE.Vector3(container[idx].x, container[idx].y, container[idx].z)
  }

  setPosition ({ mode }, positionIdx) { // frequency
    const invokeMode = {
      init: () => {
        const invokeInitMode = {
          linear: () => {
            let mapIndex = 0
            const FACTOR_POSITION_PARALLEL_MOVE = 7
            if (positionIdx < FACTOR_POSITION_PARALLEL_MOVE) {
              mapIndex = -1 * (FACTOR_POSITION_PARALLEL_MOVE - positionIdx)
            } else {
              mapIndex = +1 * (positionIdx - FACTOR_POSITION_PARALLEL_MOVE)
            }

            const FACTOR_POSITION_MULTIPLY = 7
            const scalarPosition3 = new THREE.Vector3(mapIndex * FACTOR_POSITION_MULTIPLY, 0, 0)
            const direction3 = this.setDirection()
            const vectorPosition3 = scalarPosition3.multiply(direction3)

            this.object.position.set(vectorPosition3.x, vectorPosition3.y, 1)
          },
          circle: () => {
            const segment = this.audioAnalyst.getAnalyseData().frequencyList.length
            const radius = 20
            const circlPosition3 = this.getCirclePosition(radius, segment, this.id)
            const direction3 = this.setDirection()
            const vectorPosition3 = circlPosition3.multiply(direction3)

            this.object.position.set(vectorPosition3.x, vectorPosition3.y, 1)
          }
        }

        const initMode = this.modeInitPosition === IModeInitPosition.linear ? 'linear' : 'circle'
        invokeInitMode[initMode]()
      },
      update: () => {
        const invokeUpdateMode = {
          move: () => {
            const CUSTOM_SPEED = 0.02
            const deltaPosition = this.modeMove === IModeMove.stay ? 0 : CUSTOM_SPEED

            const deltaVector3 = this.direction.clone().multiplyScalar(deltaPosition)
            const prevVectorPosition3 = this.object.position.clone()
            const nextVectorPosition3 = prevVectorPosition3.addVectors(prevVectorPosition3, deltaVector3)

            this.object.position.set(nextVectorPosition3.x, nextVectorPosition3.y, 1)
          },
          decibelY: () => { // 원형배치 대응(y축 이동이 아닌 radial 방향 이동으로. IModeInitPosition)
            const invokeInitMode = {
              linear: () => {
                // decibel 0 - 288 가정, 18조각 = 270 / 15
                const FACTOR_CORRECTION_DECIBEL_TO_POSITION_Y = 15
                const decibel = this.audioAnalyst.getAnalyseData().frequencyList[this.id]
                const mapDecibel = Math.ceil(decibel / FACTOR_CORRECTION_DECIBEL_TO_POSITION_Y)
                const decibelPositionY = (mapDecibel > FACTOR_CORRECTION_DECIBEL_TO_POSITION_Y) ? FACTOR_CORRECTION_DECIBEL_TO_POSITION_Y : mapDecibel

                this.object.position.set(this.object.position.x, decibelPositionY, 1)
              },
              circle: () => {
              }
            }
            const initMode = this.modeInitPosition === IModeInitPosition.linear ? 'linear' : 'circle'
            invokeInitMode[initMode]()
          }
        }

        let invokeMode = ''
        if (this.modeDecibelY === IModeDecibelY.decibel) {
          invokeMode = 'decibelY'
        } else if (this.modeDecibelY === IModeDecibelY.freq) {
          invokeMode = 'move'
        } else {
          invokeMode = 'move'
        }

        invokeUpdateMode[invokeMode]()
      }
    }

    invokeMode[mode]()
  }

  setDirection () {
    const UNIT_DIRECTION = [1, -1]

    const isModeStatic = this.modeRandom === IModeRandom.static
    const staticDirection = UNIT_DIRECTION[IModeRandom.static]
    const randomDirection = UNIT_DIRECTION[Math.floor(Math.random() * UNIT_DIRECTION.length)]

    const directionX = isModeStatic ? staticDirection : randomDirection
    const directionY = isModeStatic ? staticDirection : randomDirection
    const directionZ = isModeStatic ? staticDirection : randomDirection

    this.direction = new THREE.Vector3(directionX, directionY, directionZ)

    return this.direction
  }

  setColor () { // decibel
    const RANDOM_COLORS = [
      // 색상표 참조
      // https://www.rapidtables.org/ko/web/color/RGB_Color.html
      // https://colorswall.com/palette/102/
      // 빨(낮은 frequency) -> 보(높은 frequency)
      'rgb(128,0,0)', 'rgb(220,20,60)', 'rgb(233,150,122)', // 빨
      'rgb(255,69,0)', 'rgb(255,128,0)', 'rgb(255,215,0)', // 주
      'rgb(218,165,32)', 'rgb(255,255,0)', // 노
      'rgb(154,205,50)', 'rgb(127,255,0)', // 초
      'rgb(32,178,170)', 'rgb(30,144,255)', 'rgb(25,25,112)', // 파
      'rgb(138,43,226)', 'rgb(75,0,130)', // 남
      'rgb(238,130,238)', 'rgb(139,0,139)', 'rgb(128,0,128)' // 보
    ].reverse()

    // decibel 0 - 288 가정, 15조각 컬러 = 270 / 18
    const decibel = this.audioAnalyst.getAnalyseData().frequencyList[this.id]
    const mapDecibel = Math.ceil(decibel / RANDOM_COLORS.length)
    const colorID = (mapDecibel > RANDOM_COLORS.length) ? RANDOM_COLORS.length : mapDecibel

    if (this.object) {
      this.object.material.color = new THREE.Color(RANDOM_COLORS[colorID])
    }
  }

  detectCollide(vector3_a, vector3_b) {
    // 참조 https://stackoverflow.com/questions/11473755/how-to-detect-collision-in-three-js
    // todo ray & raycasting
    this.isCollide = false // vector3_a.distanceTo(vector3_b) <= this.radius
  }

  detectScreenOut () {
    this.isScreenOut = !this.utilFrustumValidator.testVisibilty(this.object)
  }
}

export default DevideSphere
