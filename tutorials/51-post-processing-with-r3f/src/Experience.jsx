import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { 
    EffectComposer, 
    Vignette,
    Glitch,
    Noise, 
    Bloom,
    DepthOfField,
    SSR, // screenspace reflection
} from '@react-three/postprocessing'
import {
    BlendFunction,
    GlitchMode
} from 'postprocessing'
import {useControls} from 'leva'
import Drunk from './Drunk'
import { useRef } from 'react'

// import Effect from './EffectSSR'


export default function Experience() {

    const drunkRef = useRef(); // function components cannot use refs, so we use forward ref

    return <>

        {/* Add background color to scene */}
        <color args={[ '#ffffff' ]} attach={'background'} />

        {/* <Effect /> */}
        <EffectComposer>
            <Drunk
                ref={drunkRef}
                frequency={2}
                amplitude={0.1}
            />
        </EffectComposer>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            {/* <meshBasicMaterial color={[1.5 * 10, 1 * 10, 4 * 10]} toneMapped={false} /> */}
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="black" metalness={0} roughness={0} />
        </mesh>

    </>
}