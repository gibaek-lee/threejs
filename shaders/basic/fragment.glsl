precision mediump float;

// custom uniforms of matrial
uniform vec3 uColor;
uniform sampler2D uTexture;

// data comes from vertex shader which include geometry information
varying vec2 varyUV;
varying float varyElevation;

void main() {
  vec4 textureColor = texture2D(uTexture, varyUV);
  textureColor.rgb *= varyElevation * 0.1 + 1.0;
  gl_FragColor = textureColor; // vec4(uColor, 1.0);
}
