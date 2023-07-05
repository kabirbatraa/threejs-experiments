varying vec2 v_uv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    vec2 uv = v_uv;
    
    vec2 gridUV = floor(uv * 10.) / 10.;
    // float strength = gridUV.x * gridUV.y;
    vec3 color;
    color.r = random(gridUV);
    color.g = random(gridUV+1.);
    color.b = random(gridUV+2.);

    gl_FragColor = vec4(color, 1.0);
}