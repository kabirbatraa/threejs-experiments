import * as THREE from 'three';

export default function CustomObject() {

    const verticesCount = 10*3;
    const positions = new Float32Array(verticesCount*3);

    for (let i = 0; i < verticesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 4;
    }

    return <mesh>
        <bufferGeometry>
            <bufferAttribute 
                attach="attributes-position"
                count={verticesCount} 
                array={positions} 
                itemSize={3} />
        </bufferGeometry>
        <meshBasicMaterial color="hotpink" side={THREE.DoubleSide}/>
    </mesh>
}