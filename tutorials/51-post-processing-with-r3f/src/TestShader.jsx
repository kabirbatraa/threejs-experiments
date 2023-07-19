import { forwardRef } from 'react'

import { Effect } from "postprocessing";
// import { Uniform } from "three";

const fragmentShader = /* glsl */`
    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        outputColor = vec4(uv, 1.0, 1.0);
    }
`


class TestShaderEffect extends Effect {
    constructor({ blendFunction }) {
        super(
            'TestShaderEffect', 
            fragmentShader, 
            {
                blendFunction: blendFunction,
                // uniforms: new Map([
                // ])
            }
        );

    }
}

export default forwardRef(function TestShader(props, ref) {
    
    const effect = new TestShaderEffect(props);

    return <primitive ref={ref} object={effect} />
})