import simulationVertexShader from './simulationShaders/vertexShader.js'
import simulationFragmentShader from './simulationShaders/fragmentShader.js'

import * as THREE from 'three'

function generatePointsInSphere(count) {
    const positions = new Float32Array(count * 4);
        
    for (let i = 0; i < count; i++) {

        const radius = Math.sqrt(Math.random()) * 0.5 + 1.5;

        let x = Math.random() * 2 - 1; // Random value between -1 and 1
        let y = Math.random() * 2 - 1; // Random value between -1 and 1
        let z = Math.random() * 2 - 1; // Random value between -1 and 1

        const length = Math.sqrt(x * x + y * y + z * z);
        x = x / length * radius;
        y = y / length * radius;
        z = z / length * radius;

        // we wont use the forth value (rgba texture)
        positions.set([x, y, z, 1.0], i * 4);
    }
}

// custom material that stores the positions of particles in a texture 
// the texture is passed as a uniform to the fragment shader
// where uv coordinates are converted to texture coordinates 
// and the new coordinates are rendered to that texture every frame
class SimulationMaterial extends THREE.ShaderMaterial {
    constructor(size) {

        const data = generatePointsInSphere(size * size);
        
        const positionsTexture = new THREE.DataTexture(
            data,
            size,
            size,
            THREE.RGBAFormat,
            THREE.FloatType
        );
        positionsTexture.needsUpdate = true;

        const simulationUniforms = {
            positionsTex: {
                value: positionsTexture
            },
            uTime: {
                value: 0
            }
        };

        super({
            uniforms: simulationUniforms,
            vertexShader: simulationVertexShader,
            fragmentShader: simulationFragmentShader,
        })
    }
}

export default SimulationMaterial;