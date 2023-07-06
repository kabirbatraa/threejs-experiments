varying vec2 v_uv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    vec2 uv = v_uv;

    uv -= 0.5; // center uv
    // uv.y *= 5.; // scale y

    float strength = (1. / 6. / length(vec2(uv.x, uv.y*5.)));
    strength *= (1. / 6. / length(vec2(uv.x*5., uv.y)));

    gl_FragColor = vec4(vec3(strength), 1.0);
}