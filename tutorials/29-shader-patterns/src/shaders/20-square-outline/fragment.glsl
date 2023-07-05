varying vec2 v_uv;

void main()
{
    vec2 uv = v_uv;
    // uv.x -= 0.5;

    // smaller square
    float strength = step(0.2, max(
        abs(uv.x - 0.5),
        abs(uv.y - 0.5)
    ));

    // bigger square, inverted
    strength *= 1. - step(0.3, max(
        abs(uv.x - 0.5),
        abs(uv.y - 0.5)
    ));

    gl_FragColor = vec4(vec3(strength), 1.0);
}