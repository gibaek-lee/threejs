// OpenGL ES Shading Language Reference: https://www.shaderific.com/glsl

// embeded glsl matrices
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

// custom uniforms of threejs matrial
uniform vec2 uFrequency;
uniform float uTime;

// embeded attribute of threejs geometry
attribute vec3 position;
attribute vec2 uv;

// custom attribute of threejs gemometry(from geometry.setAttribute('customAttr'))
// attribute <type> customAttr

// data send to fragment shader which includes information of geometry
varying vec2 varyUV;
varying float varyElevation;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float MINIMIZE_SIZE = 0.1;
  float TIME_SPEED = 2.0;
  float AMPLITUDE = 2.0;
  float elevation = AMPLITUDE * sin((modelPosition.x * MINIMIZE_SIZE) * uFrequency.x - uTime * TIME_SPEED);
  elevation += AMPLITUDE * sin((modelPosition.y * MINIMIZE_SIZE) * uFrequency.y - uTime * TIME_SPEED);
  modelPosition.z = elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  varyUV = uv;
  varyElevation = elevation;
}
