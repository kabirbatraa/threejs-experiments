import { createPortal, extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

import * as THREE from 'three';

import SimulationMaterial from "./SimulationMaterial";
import { useFBO } from "@react-three/drei";
extend({ SimulationMaterial: SimulationMaterial });

export default function FBOParticles() {

    // number particles = textureSize^2
    const textureSize = 128;

    const simulationMaterialRef = useRef();

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1,
        1 / Math.pow(2, 53), // near
        1 // far
    ); 

    const squareVertices = new Float32Array([
        -1, -1, 0,
        1, -1, 0,
        1, 1, 0,
        -1, -1, 0,
        1, 1, 0,
        -1, 1, 0,
    ]);
    const squareUVs = new Float32Array([
        0, 1, 
        1, 1, 
        1, 0, 
        0, 1, 
        1, 0, 
        0, 0
    ]);

    // create render target (texture) using drei useFBO
    const renderTarget = useFBO(textureSize, textureSize, {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false,
        type: THREE.FloatType,
    })

    useFrame((state) => {
        const {gl, clock} = state;

        gl.setRenderTarget(renderTarget)
        gl.clear();
        gl.render(scene, camera);
        gl.setRenderTarget(null); // set render target back to default screen
        
        // update simulationMaterial's time uniform
        simulationMaterialRef.current.uniforms.uTime.value = clock.elapsedTime;
    })

    return <>
        {/* render square using orthographic camera off screen */}
        {createPortal(
            <mesh>
                {/* create buffer geometry to set square vertices and uvs manually */}
                <bufferGeometry>
                    {/* set square vertices */}
                    <bufferAttribute
                        attach="attributes-position"
                        count={squareVertices.length / 3}
                        array={squareVertices}
                        itemSize={3}
                    />

                    {/* set square uvs */}
                    <bufferAttribute
                        attach="attributes-uv"
                        count={squareUVs.length / 2}
                        array={squareUVs}
                        itemSize={2}
                    />
                </bufferGeometry>

                {/* square's material is simulation material */}
                <simulationMaterial ref={simulationMaterialRef} args={[textureSize]} />
            </mesh>,    
            scene
        )}

        
    <mesh>
        {/* create buffer geometry to set square vertices and uvs manually */}
        <bufferGeometry>
            {/* set square vertices */}
            <bufferAttribute
                attach="attributes-position"
                count={squareVertices.length / 3}
                array={squareVertices}
                itemSize={3}
            />

            {/* set square uvs */}
            <bufferAttribute
                attach="attributes-uv"
                count={squareUVs.length / 2}
                array={squareUVs}
                itemSize={2}
            />
        </bufferGeometry>

        {/* square's material is simulation material */}
        <simulationMaterial ref={simulationMaterialRef} args={[textureSize]} />
    </mesh>

    </>
}