varying vec2 v_uv;

void main()
{
    vec2 uv = v_uv;
    uv += 0.05;

    // 0.4 -> 1 is white
    // move x bar by 0.2 to the right
        // adding 0.2 will shift left because 
        // the step will become 1 earlier
        // therefore we need to subtract 0.2
    float xBar = step(0.4, mod(uv.x * 10. - 0.2, 1.));
    xBar *= step(0.8, mod(uv.y * 10., 1.));

    // shift y bars up by 0.2 (substract 0.2 before mod)
    float yBar = step(0.8, mod(uv.x * 10., 1.)) 
        * step(0.4, mod(uv.y * 10. - 0.2, 1.));
    
    float strength = xBar + yBar;
    // float strength = xBar;

    // value, min, max
    strength = clamp(strength, 0.0, 1.0);

    vec3 mixedColor = mix(
        vec3(0.0), 
        vec3(uv, 1.0),
        strength
    );

    gl_FragColor = vec4(mixedColor, 1.0);
}