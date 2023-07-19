import { BlendFunction, Effect } from "postprocessing";
import { Uniform } from "three";

const fragmentShader = /* glsl */`

    uniform float frequency;
    uniform float amplitude;

    // shift uv.y to be a sign wave
    // this function is called automatically
    void mainUv(inout vec2 uv) {
        uv.y += sin(uv.x * frequency) * amplitude;
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        // outputColor = vec4(1.0, 0.0, 0.0, 1.0);
        outputColor = vec4(uv, 1.0, 1.0);
        vec4 color = inputColor;
        color.rgb *= vec3(0.8, 1.0, 0.5); // reduce red and blue, keep green
        outputColor = color;
    }
`


export default class DrunkEffect extends Effect {
    constructor({ frequency, amplitude, blendFunction = BlendFunction.DARKEN }) {
        super(
            'DrunkEffect', 
            fragmentShader, 
            {
                blendFunction,
                uniforms: new Map([
                    // ['frequency', {value: frequency}],
                    // ['amplitude', {value: amplitude}],
                    ['frequency', new Uniform(frequency)],
                    ['amplitude', new Uniform(amplitude)],
                ])
            }
        );

    }
}