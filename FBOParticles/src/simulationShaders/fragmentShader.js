const fragmentShader = /*glsl*/`

uniform sampler2D positionsTexture;
uniform float uTime;

varying vec2 vUv;

void main() {
  // get position from texture
  vec3 position = texture2D(positionsTexture, vUv).xyz;

  // update position here

  // render position to render target texture
  gl_FragColor = vec4(position, 1.0);

}

`
export default fragmentShader;