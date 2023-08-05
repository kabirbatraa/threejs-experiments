import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react"

import * as THREE from 'three'

import vertexShader from './shaders/vertexShader.js'
import fragmentShader from './shaders/fragmentShader.js'
import { useControls } from "leva";


export default function TutorialParticles({ count }) {

    const points = useRef();

    const maxRadius = 1;

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        
        for (let i = 0; i < count; i++) {

            const radius = Math.sqrt(Math.random()) * maxRadius;

            // const theta = THREE.MathUtils.randFloatSpread(Math.PI*2);
            // const phi = THREE.MathUtils.randFloatSpread(Math.PI /2);

            // const theta = Math.random() * Math.PI*2;
            // const phi = Math.random() * Math.PI;

            // const theta = 2 * Math.PI * Math.random(); // Azimuthal angle (longitude)
            // const phi = Math.acos(2 * Math.random() - 1); // Polar angle (latitude)

            // let x = distance * Math.sin(theta) * Math.cos(phi)
            // let y = distance * Math.sin(theta) * Math.sin(phi);
            // let z = distance * Math.cos(theta);

            let x = Math.random() * 2 - 1; // Random value between -1 and 1
            let y = Math.random() * 2 - 1; // Random value between -1 and 1
            let z = Math.random() * 2 - 1; // Random value between -1 and 1

            const length = Math.sqrt(x * x + y * y + z * z);
            x = x / length * radius;
            y = y / length * radius;
            z = z / length * radius;

            positions.set([x, y, z], i * 3);
        }

        return positions;
    }, [count])

    const uniforms = useMemo(() => ({
        uTime: {
            value: 0.0
        },
        uRadius: {
            value: maxRadius,
        },
        uColorA: {
            value: new THREE.Color(0.34, 0.53, 0.96)
        },
        uColorB: {
            value: new THREE.Color('#ffa75e')
        },
    }), [])


    useControls({
        uColorA: {
            // value: new THREE.Color().getHexString
            value: '#' + (new THREE.Color(0.34, 0.53, 0.96).getHexString()),
            onChange: (value) => {
                points.current.material.uniforms.uColorA.value = new THREE.Color(value)
            }
        },
        uColorB: {
            value: '#ffa75e',
            onChange: (value) => {
                points.current.material.uniforms.uColorB.value = new THREE.Color(value)
            }
        },

    })

    useFrame((state) => {
        const { clock } = state;

        points.current.material.uniforms.uTime.value = clock.elapsedTime;
    });

    return <>
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                />
            </bufferGeometry>
            <shaderMaterial
                depthWrite={false}
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                transparent
                blending={THREE.AdditiveBlending}
            />
            {/* <pointsMaterial
                size={0.015}
            /> */}
        </points>
    </>
}