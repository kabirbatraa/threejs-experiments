import test from './test.js'

const fragmentShader = /*glsl*/`

uniform vec3 uColorA;
uniform vec3 uColorB;

varying float vRadius;

void main() {

  // create strength equal to distance from center of particle
  float strength = 1.0 - distance(gl_PointCoord, vec2(0.5));

  // exaggerate the strength curve
  strength = pow(strength, 1.0 ${test});

  if (strength < 0.2) {
    strength = 0.0;
  }


  // set base color between color A and B by radius
  vec3 color = mix(uColorA, uColorB, 1. - vRadius);

  // set end color to between black and base color based on strength
  color = mix(vec3(0.0), color, strength);

  // also base opacity off of strength
  gl_FragColor = vec4(color, strength);
}
`

export default fragmentShader;
