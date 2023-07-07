import * as THREE from 'three';
import { useRef, useMemo, useEffect } from 'react';

export default function CustomObject() {

    const geometryRef = useRef();
    // we cannot set the normals immediately, because the geometry is not yet created
    useEffect(() => {
        geometryRef.current.computeVertexNormals()
    }, []) // run once after the first render

    const verticesCount = 10*3;

    const positions = useMemo(() => {
        const positions = new Float32Array(verticesCount*3);

        for (let i = 0; i < verticesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 4;
        }
        return positions;
    }, [])

    

    return <mesh>
        <bufferGeometry ref={geometryRef}>
            <bufferAttribute 
                attach="attributes-position"
                count={verticesCount} 
                array={positions} 
                itemSize={3} />
        </bufferGeometry>
        <meshStandardMaterial color="hotpink" side={THREE.DoubleSide}/>
    </mesh>
}