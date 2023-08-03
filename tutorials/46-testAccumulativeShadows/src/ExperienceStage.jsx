import { useFrame } from '@react-three/fiber'
import { 
    OrbitControls,
    Stage,
} from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useControls } from 'leva'

export default function Experience()
{
    const cube = useRef()

    useFrame((state, delta) =>
    {
        // rotate cube
        cube.current.rotation.y += delta * 0.2

        // translate cube
        const elapsedTime = state.clock.elapsedTime
        cube.current.position.x = 2 + Math.sin(elapsedTime)

    })

    return <>

        <Perf position="top-left" />
        <OrbitControls makeDefault />

        <Stage
            shadows={{
                type: 'contact',
                opacity: 0.2,
                blur: 3,
            }}
            // environment='sunset'
            preset='portrait'
            intensity={3}
        >
            <mesh castShadow position-x={ - 2 } position-y={1}>
                <sphereGeometry />
                <meshStandardMaterial color="orange"  
                    metalness={0.95}
                    roughness={0.01}
                />
            </mesh>

            <mesh castShadow ref={ cube } position-x={ 2 } scale={ 1.5 } position-y={1}>
                <boxGeometry />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
        </Stage>

    </>
}