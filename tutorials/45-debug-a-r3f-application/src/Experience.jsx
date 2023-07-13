import { OrbitControls } from '@react-three/drei'
import Cube from './Cube'
import { useControls } from 'leva'

export default function Experience()
{

    const controls = useControls({
        position: -2
    })
    const position = controls.position;

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh position-x={ position }>
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