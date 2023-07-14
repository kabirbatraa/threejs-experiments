import { useFrame } from '@react-three/fiber'
import { 
    useHelper, 
    OrbitControls,
    BakeShadows,
    SoftShadows
} from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useControls } from 'leva'

export default function Experience()
{
    const directionalLight = useRef();
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const cube = useRef()
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
    })

    const {samples, rings} = useControls({
        samples: {
            value: 17,
            step: 1,
            min: 1,
            max: 30
        },
        // rings: {
        //     value: 11,
        //     step: 1,
        //     min: -30,
        //     max: 30
        // },
    })

    return <>

        {/* <BakeShadows /> */}

        {/* softshadows modify the shaders in threejs, so modifying these values during runtime will cause lag */}
        <SoftShadows
            frustum={3.75}
            size={50}
            near={9.5}
            samples={samples}
            rings={11}
        />

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight 
            ref={directionalLight} 
            position={ [ 1, 2, 3 ] } 
            intensity={ 1.5 } 
            castShadow={true}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-bottom={-5}
            shadow-camera-top={5}
            shadow-camera-near={0.1}
            shadow-camera-far={10}
        />
        <ambientLight intensity={ 0.5 } />

        <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow ref={ cube } position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}