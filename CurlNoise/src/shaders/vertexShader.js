import glslCurlNoise from './glslCurlNoise.js';


const vertexShader = /*glsl*/`

uniform float uTime;
uniform float uRadius;

// Source: https://github.com/dmnsgn/glsl-rotate/blob/main/rotation-3d-y.glsl.js
mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}

// varying float vRadius;

${glslCurlNoise}

void main() {

  vec3 particlePosition = position;

  particlePosition = curlNoise(particlePosition*0.5 + uTime*0.1);

  vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  gl_PointSize = 50.0;

  // size attenuation
  gl_PointSize *= (1.0 / -viewPosition.z);
}

`

export default vertexShader;