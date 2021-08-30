# threejs

## Description

webgl 라이브러리 three.js를 활용한 다양한 기능을 실험하는 곳입니다.

```bash
page 1. Audio Visualizer
page 2. Haunted House(Mesh 및 키보드 컨드롤 테스트)
page 3. Animate Model Import(gltf 모델 import와 clip animation 테스트)
page 4. Blender를 이용한 Custom model import & realistic render
page 5. Physics Engine(Cannon.js) with Web Worker
page 6. glsl vertex & fragment shader basic
page 7. Laboratory Webgl(three.js의 간단한 기능들을 테스트하는 카드 모음)
```

### `기술스택`

프론트엔드 프레임워크: Nuxt CSR<br>
webgl 라이브러리: three.js<br>
물리엔진: cannon.js<br>
셰이더: glsl

### `(on going)about this project`
[Webgl(wt threejs & nuxt)](https://docs.google.com/presentation/d/17WGG9_Ta_cRJbsu3JsRxzDVkaGIKA_kQhbYjzROwQS8/edit?usp=sharing)

### `github-pages`
[threejs playground](https://gibaek-lee.github.io/threejs/)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# deploy step
CI using github action - deploy.yml 참조
```

## reference

### `Core Lecture`
[three.js journey](https://threejs-journey.xyz/)

### `Etc`
[three.js org document](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)<br>
[glTF-Sample-Models](https://github.com/KhronosGroup/glTF-Sample-Models)<br>
[cannon.js document](https://schteppe.github.io/cannon.js/docs/)<br>
[web worker with three.js example](https://schteppe.github.io/cannon.js/examples/worker.html)<br>
[OpenGL ES Shading Language Reference](https://www.shaderific.com/glsl)<br>
