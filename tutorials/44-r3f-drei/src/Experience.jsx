import { TransformControls, OrbitControls, PivotControls } from '@react-three/drei'

import { useRef } from 'react'

export default function Experience() {

    const cube = useRef();


    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <PivotControls 
            anchor={[0,1,0]} // relative positon (without respect to scale)
            depthTest={false} // render on top of sphere
            lineWidth={2}
            axisColors={[ '#9381ff', '#ff4d6d', "#7ae5ff"]}
            scale={100}
            fixed={true} // make the size the same, but based on 'scale' pixels
        >
            <mesh position-x={ - 2 } scale={[1, 1.5,1]}>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
            </mesh>
        </PivotControls>

        <mesh ref={cube} position-x={ 2 } scale={ 1.5 } >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={cube} mode="translate"/>
        <TransformControls object={cube} mode="rotate"/>
        <TransformControls object={cube} mode="scale"/>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}