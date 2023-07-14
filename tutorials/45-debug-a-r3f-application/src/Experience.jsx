import { OrbitControls } from '@react-three/drei'
import Cube from './Cube'
import { useControls } from 'leva'

export default function Experience()
{

    const { position } = useControls({
        position: {
            value: {x: -2, y: 0, z: 0 }, 
            // min: -4,
            // max: 4,
            step: 0.01
        }
    })

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh position={ [ position.x, position.y, position.z ] }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <Cube scale={3} />

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}