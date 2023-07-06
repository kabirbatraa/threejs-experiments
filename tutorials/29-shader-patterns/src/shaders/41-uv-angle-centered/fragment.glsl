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

    // float strength = atan(uv.y, uv.x) / (PI/2.);
    uv -= 0.5;
    float strength = atan(uv.x, uv.y);

    gl_FragColor = vec4(vec3(strength), 1.0);
}