uniform mat4 projectionMatrix; // contains fov, aspect ratio, near far etc
uniform mat4 viewMatrix; // contains camera's position direction orientation
uniform mat4 modelMatrix; // contains threejs mesh's position rotation scale

// can also replace viewMatrix and modelMatrix with modelViewMatrix

uniform vec2 uFrequency;

attribute vec3 position;
attribute float aRandom;

varying float vRandom;

void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    // gl position x y --> fragment uv
    // gl position z --> depth
    // gl position w is always 1, has to do with projection

    // separating each part:
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.y += 0.5;
    // modelPosition.z += 0.5;
    modelPosition.z += sin(modelPosition.x * uFrequency.x) * 0.15;
    modelPosition.z += sin(modelPosition.y * uFrequency.y) * 0.15;
    modelPosition.z += aRandom*0.05;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    vRandom = aRandom; // will be automatically interpolated per fragment
}