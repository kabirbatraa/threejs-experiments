varying vec2 v_uv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main()
{
    vec2 uv = v_uv;

    // in the tutorial:
    // uv -> vec2(uv.x, (vUv.y - 0.5) * 5.0 + 0.5);
    /*
    uv.y = (uv.y - 0.5) * 5. + 0.5;
    float strength = 1./6. / distance(uv, vec2(0.5));
    */

    // my version: 
    uv -= 0.5; //center uv
    uv.y *= 5.; // scale y
    float strength = 1. / 6. / length(uv);

    gl_FragColor = vec4(vec3(strength), 1.0);
}