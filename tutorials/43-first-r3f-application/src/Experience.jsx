import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function Experience() {

    const cube = useRef();
    const group = useRef();

    useFrame((state, deltaTime) => {
        console.log('tick') // every frame
        // to access threejs cube, we need to use cube.current
        cube.current.rotation.y += deltaTime*10;
        group.current.rotation.y += deltaTime;
    })

    return <>
        <group ref={group}>
            <mesh position-y={3}>
                <torusKnotGeometry />
                <meshNormalMaterial />
            </mesh>
            <mesh position-x={-2} scale={ 1.5 }>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshBasicMaterial color="mediumpurple" wireframe={true} />
            </mesh>
            <mesh ref={cube} position-x={2} rotation-y={Math.PI/4} scale={[3, 0.5, 0.5]}>
                <boxGeometry />
                <meshBasicMaterial color="orange" />
            </mesh>
        </group>
        <mesh position-y={-2} rotation-x={-Math.PI/2} scale={[10, 2, 0]}>
            <planeGeometry />
            <meshBasicMaterial color="greenyellow" />
        </mesh>
    </>
}