varying vec2 v_uv;

void main()
{
    vec2 uv = v_uv;
    
    float strength = floor(uv.x*10.) / 10.;

    gl_FragColor = vec4(vec3(strength), 1.0);
}