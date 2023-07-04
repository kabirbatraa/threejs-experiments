
// can also replace viewMatrix and modelMatrix with modelViewMatrix

uniform vec2 uFrequency;
uniform float uTime;

attribute float aRandom;

varying float vRandom;
varying vec2 vUv;
varying float vElevation;

void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    // gl position x y --> fragment uv
    // gl position z --> depth
    // gl position w is always 1, has to do with projection

    // separating each part:
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.y += 0.5;
    // modelPosition.z += 0.5;

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.15;
    elevation += sin(modelPosition.y * uFrequency.y + uTime) * 0.15;
    modelPosition.z += elevation;
    // modelPosition.z += aRandom*0.05;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vRandom = aRandom; // will be automatically interpolated per fragment
    vUv = uv;
    vElevation = elevation;
}