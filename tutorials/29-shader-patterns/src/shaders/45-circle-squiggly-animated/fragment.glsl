#define PI 3.1415926535897932384626433832795

varying vec2 v_uv;

uniform float uTime;

// float random(vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// vec2 rotate(vec2 uv, float rotation, vec2 mid)
// {
//     return vec2(
//       cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
//       cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
//     );
// }

void main()
{
    vec2 uv = v_uv;
    vec2 vUv = uv;

    float angle = atan(uv.y-0.5, uv.x-0.5);
    float rays = sin(angle * 20.);
    float amplitude = sin(uTime*3.) * 0.05;

    float circle1 = distance(uv, vec2(0.5));
    float circle2 = 0.3 + rays*amplitude;
    float outline = abs(circle1 - circle2);

    float strength = 1. - step(0.01, outline);

    gl_FragColor = vec4(vec3(strength), 1.0);
}