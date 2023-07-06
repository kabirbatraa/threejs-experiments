varying vec2 v_uv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    vec2 uv = v_uv;
    
    float strength = distance(uv, vec2(0.5));

    gl_FragColor = vec4(vec3(strength), 1.0);
}