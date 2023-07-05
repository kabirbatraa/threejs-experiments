varying vec2 v_uv;

void main()
{
    // gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);
    vec2 uv = v_uv;
    float strength = mod(uv.y * 10., 1.);

    gl_FragColor = vec4(vec3(strength), 1.0);
}