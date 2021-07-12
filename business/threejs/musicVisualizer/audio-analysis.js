/* eslint-disable no-tabs */
import * as THREE from 'three'

class AudioAnalysis {
  constructor () {
    this.sound = undefined
    this.audioLoader = undefined
    this.analyser = undefined
    this.clock = new THREE.Clock(false)
  }

  play (camera, audioSource) {
    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener()
    camera.add(listener)

    // create an Audio source
    this.sound = new THREE.Audio(listener)

    // set audio loader
    this.audioLoader = new THREE.AudioLoader()

    // load a sound and set it as the Audio object's buffer
    this.audioLoader.load(
      audioSource,
      (buffer) => {
        console.log(buffer)
        this.sound.setBuffer(buffer)
        this.sound.setLoop(true)
        this.sound.setVolume(0.5)

        this.sound.play()
        this.clock.start()
        console.log('sound', this.sound, this.startTime)
      }
    )

    // create an AudioAnalyser, passing in the sound and desired fftSize
    // fft 늘리면 t 의 정밀도가 떨어지는 대신 f의 정밀도를 높여 데이터를 받을 수 있다.
    // 32 => 16개 샘플링, 64 => 32개 샘플링, etc
    const FFT_SIZE = Math.pow(2, 5)
    this.analyser = new THREE.AudioAnalyser(this.sound, FFT_SIZE)
  }

  getBeatTiming () {
    const elapseTime = this.clock.getElapsedTime()
    // 만일 elapseTime이 2초의 배수이면 return true, 아니면 return false
  }

  getAnalyseData () {
    return {
      /**
			 * The frequency data is composed of integers on a scale from 0 to 255.
			 * Each item in the array represents the decibel value for a specific frequency.
			 *
			 * The frequencies are spread linearly from 0 to 1/2 of the sample rate.
			 * If 48000 sample rate, the last item of the array will represent the decibel value for 24000 Hz.
			 *
			 * 현재 샘플 노래는 sound.buffer.sampleRate = 48000 이다.
			 * 그러므로 0 ~ 24000 Hz를 16개의 간격으로 데시벨 데이터가 나오고 있다.
			 */
      frequencyList: Array.from(this.analyser.getFrequencyData()),
      avgFrequency: this.analyser.getAverageFrequency()
    }
  }

  mapFrequencyData () {
    /**
		 * []:Unit8Array = [{
		 *   color: number 1 to 16,
		 *   position: 1 to 16
		 * }]
		 * 0 - 255 => log2 => 1 - 8
		 */
    const { frequencyList } = this.getAnalyseData()
    return this.analyser
      ? frequencyList.map((f, idx) => {
        const tmpColorIdx = Math.floor(Math.log2(f + 1) * 2)
        return {
          colorIdx: tmpColorIdx === 16 ? 15 : tmpColorIdx,
          positionIdx: idx
        }
      })
      : []
  }
}

export default AudioAnalysis
