import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import { useControls }  from 'leva'

import Model from './Model'
import Placeholder from './Placeholder'

export default function Experience()
{

    const { enableModel } = useControls({
        enableModel: true,
    })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        {/* <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh> */}

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        {/* lazy loading: skip model if it has not loaded yet */}
        <Suspense
            fallback={ <Placeholder position-y={0.5} scale={[2, 3, 2]} /> }
        >
            {enableModel && <Model />}
        </Suspense>

    </>
}