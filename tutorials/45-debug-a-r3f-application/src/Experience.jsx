import { OrbitControls } from '@react-three/drei'
import Cube from './Cube'
import { useControls } from 'leva'

export default function Experience()
{

    const { position, color, visible } = useControls({
        position: {
            value: {x: -2, y: 0, }, 
            // min: -4,
            // max: 4,
            step: 0.01,
            joystick: 'invertY'
        },
        color: '#ffff00', // does not work with alpha
        visible: true,
    })

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh position={ [ position.x, position.y, 0 ] } visible={visible} >
            <sphereGeometry />
            <meshStandardMaterial color={color} />
        </mesh>

        <Cube scale={3} />

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}