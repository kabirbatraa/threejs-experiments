varying vec2 v_uv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    vec2 uv = v_uv;
    
    vec2 gridUV = floor(uv * 10.) / 10.;
    // float strength = gridUV.x * gridUV.y;
    float strength = random(gridUV);

    gl_FragColor = vec4(vec3(strength), 1.0);
}