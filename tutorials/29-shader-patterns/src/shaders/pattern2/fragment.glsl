varying vec2 v_uv;

void main()
{
    // gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);
    gl_FragColor = vec4(v_uv, 0.0, 1.0);
}