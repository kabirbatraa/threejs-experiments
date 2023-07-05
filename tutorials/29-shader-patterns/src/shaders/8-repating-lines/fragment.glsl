varying vec2 v_uv;

void main()
{
    vec2 uv = v_uv;

    float strength = mod(uv.y * 10., 1.);

    // step, input; returns 0 if below step else 1
    strength = step(0.5, strength);

    gl_FragColor = vec4(vec3(strength), 1.0);
}