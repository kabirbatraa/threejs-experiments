export default function Experience() {
    return <>
        {/* <mesh>
            <torusKnotGeometry />
            <meshNormalMaterial />
        </mesh> */}
        <mesh position-x={-2} scale={ 1.5 }>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshBasicMaterial color="mediumpurple" wireframe={true} />
        </mesh>
        <mesh position-x={2} rotation-y={Math.PI/4}>
            <boxGeometry />
            <meshBasicMaterial color="orange" />
        </mesh>
        <mesh position-y={-2} rotation-x={-Math.PI/2} scale={[10, 2, 0]}>
            <planeGeometry />
            <meshBasicMaterial color="greenyellow" />
        </mesh>
    </>
}