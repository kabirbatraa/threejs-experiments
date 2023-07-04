precision mediump float; // decide on precision of float
// highp vs mediump vs lowp (medium is standard)

uniform vec3 uColor;
uniform sampler2D uTexture;

varying float vRandom;
varying vec2 vUv;

void main() {
    /*
    // gl_FragColor = vec4(1.0, 0.0, 1.0, 0.5);
    gl_FragColor = vec4(vRandom, 0.0, 1.0, 1.0);
    gl_FragColor = vec4(vRandom * uColor.r, 1.0 * uColor.g, 1.0 * uColor.b, 1.0);
    // gl_FragColor = vec4(uColor, 1.0);
    */


    vec4 textureColor = texture2D(uTexture, vUv);
    gl_FragColor = textureColor;
}