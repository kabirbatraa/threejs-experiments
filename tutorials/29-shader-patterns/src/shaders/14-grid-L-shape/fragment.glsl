varying vec2 v_uv;

void main()
{
    vec2 uv = v_uv;

    float strengthX = mod(uv.x * 10., 1.);
    float strengthY = mod(uv.y * 10., 1.);

    float xBar = step(0.4, strengthX);
    xBar *= step(0.8, strengthY);

    float yBar = step(0.8, strengthX) 
        * step(0.4, strengthY);
    
    float strength = xBar + yBar;

    gl_FragColor = vec4(vec3(strength), 1.0);
}