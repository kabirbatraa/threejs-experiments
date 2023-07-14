import { useFrame } from '@react-three/fiber'
import { 
    useHelper, 
    OrbitControls,
    BakeShadows,
    SoftShadows,
    AccumulativeShadows,
    RandomizedLight,
} from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useControls } from 'leva'

export default function Experience()
{
    const directionalLight = useRef();
    // useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const cube = useRef()
    
    useFrame((state, delta) =>
    {
        // rotate cube
        cube.current.rotation.y += delta * 0.2

        // translate cube
        const elapsedTime = state.clock.elapsedTime
        cube.current.position.x = 2 + Math.sin(elapsedTime)

    })

    // const {samples, rings} = useControls({
    //     samples: {
    //         value: 17,
    //         step: 1,
    //         min: 1,
    //         max: 30
    //     },
    //     // rings: {
    //     //     value: 11,
    //     //     step: 1,
    //     //     min: -30,
    //     //     max: 30
    //     // },
    // })

    // const {amount, radius, intensity, ambient} = useControls({
    //     amount: {
    //         value: 8,
    //         min: 1,
    //         max: 10,
    //         step: 1,
    //     },
    //     radius: {
    //         value: 1,
    //         min: 0,
    //         max: 4,
    //         step: 0.01,
    //     },
    //     intensity: {
    //         value: 1,
    //         min: 0,
    //         max: 3,
    //         step: 0.01,
    //     },
    //     ambient: {
    //         value: 0.5,
    //         min: 0,
    //         max: 3,
    //         step: 0.01,
    //     }
    // })


    return <>

        {/* <BakeShadows /> */}

        {/* softshadows modify the shaders in threejs, so modifying these values during runtime will cause lag */}
        {/* <SoftShadows
            frustum={3.75}
            size={50}
            near={9.5}
            samples={samples}
            rings={11}
        /> */}


        {/* place acumulative shadow plane right above the floor */}
        <AccumulativeShadows
            position={[0, -0.99, 0]}
            scale={10}
            color="#316d39"
            opacity={0.8}
            frames={Infinity}
            temporal
            blend={100} // blend 100 instead of default 20 last shadows together
        >
            {/* <directionalLight
                position={ [ 1, 2, 3 ] } 
                castShadow={true}
            /> */}
            <RandomizedLight
                position={ [ 1, 2, 3 ] } 
                // amount={amount}
                // radius={radius}
                // intensity={intensity}
                // ambient={ambient}
                amount={8}
                radius={1}
                intensity={1}
                ambient={0.5}
            />
        </AccumulativeShadows>

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

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}