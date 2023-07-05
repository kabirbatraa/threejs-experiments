varying vec2 v_uv;

void main()
{
    vec2 uv = v_uv;

    float strengthX = mod(uv.x * 10., 1.);
    float strengthY = mod(uv.y * 10., 1.);

    float strength = step(0.4, strengthX);
    strength *= step(0.8, strengthY);

    gl_FragColor = vec4(vec3(strength), 1.0);
}