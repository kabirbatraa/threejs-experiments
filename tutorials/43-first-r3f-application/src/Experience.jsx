import { useFrame, extend, useThree } from "@react-three/fiber"
import { useRef } from "react"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import CustomObject from "./CustomObject"

import * as THREE from 'three'

// name of html tag: imported thing
// extend({ OrbitControls: OrbitControls })
extend({ OrbitControls })

export default function Experience() {

    const three = useThree();
    const { camera, gl } = three;

    const cube = useRef();
    const group = useRef();

    // let elapsed = 0;

    useFrame((state, deltaTime) => {
        // elapsed += deltaTime;
        const elapsed = state.clock.elapsedTime;

        // state contains camera, renderer etc
            // use three also contains this

        console.log('tick') // every frame
        // to access threejs cube, we need to use cube.current
        cube.current.rotation.y += deltaTime*2;
        group.current.rotation.y += deltaTime;


        // animate the camera:
        /*
        state.camera.position.set(
            10 * Math.sin(-elapsed/2),
            2,
            10 * Math.cos(-elapsed/2)
        )
        // state.camera.lookAt(new THREE.Vector3(0, 0, 0))
        state.camera.lookAt(0, 0, 0)
        */
    })

    return <>

        <orbitControls args={[camera, gl.domElement]} />

        <directionalLight position={[1, 2, 3]} intensity={1.5}/>
        <ambientLight intensity={0.5}/>

        <group ref={group}>
            {/* <mesh position-y={3}>
                <torusKnotGeometry />
                <meshNormalMaterial />
            </mesh> */}
            <mesh position-x={-2} scale={ 1.5 }>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial color="mediumpurple" wireframe={true} />
            </mesh>
            <mesh ref={cube} position-x={2} rotation-y={Math.PI/4} scale={[3, 0.5, 0.5]}>
                <boxGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>
        </group>
        <mesh position-y={-2} rotation-x={-Math.PI/2} scale={[10, 20, 1]}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <CustomObject />
    </>
}