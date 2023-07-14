import { OrbitControls } from '@react-three/drei'
import Cube from './Cube'
import { button, useControls } from 'leva'
// import * as THREE from 'three'

export default function Experience()
{
    const { position, color, visible, myInterval } = useControls('sphere', {
        position: {
            value: {x: -2, y: 0, }, 
            // min: -4,
            // max: 4,
            step: 0.01,
            joystick: 'invertY'
        },
        color: '#ffff00', // does not work with alpha
        visible: true,
        myInterval: {
            min: -10,
            max: 10,
            value: [ -2, 3 ]
        },
        clickMe: button(() => {
            console.log('hi')
        }),
        choice: {
            options: [ 'a', 'b', 'c' ],
        },
    })

    const { scale } = useControls('cube', {
        scale: {
            value: 1,
            min: 0.1,
            max: 10,
            step: 0.1,
        }
    })

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh position={ [ position.x, position.y, 0 ] } visible={visible} >
            <sphereGeometry />
            <meshStandardMaterial color={color} />
        </mesh>

        <Cube scale={scale} />

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        {/* interval test */}
        <mesh position-y={3} position-x={ (myInterval[1] + myInterval[0])/2 } scale-x={ (myInterval[1] - myInterval[0]) } >
            <boxGeometry />
            <meshStandardMaterial color="cyan" />
        </mesh>

    </>
}