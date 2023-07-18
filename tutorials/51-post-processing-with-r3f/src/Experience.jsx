import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { 
    EffectComposer, 
    Vignette,
    Glitch,
    Noise, 
} from '@react-three/postprocessing'
import {
    BlendFunction,
    GlitchMode
} from 'postprocessing'
import {useControls} from 'leva'

import Effect from './Effect'


export default function Experience() {

    console.log(BlendFunction)
    let { blendFunction } = useControls({
        blendFunction: {
            options: [...(Object.entries(BlendFunction).sort((a, b) => a[1] - b[1]))]
        }
    })
    blendFunction = blendFunction[1] // just the number

    return <>

        {/* Add background color to scene */}
        <color args={[ '#ffffff' ]} attach={'background'} />

        {/* <Effect /> */}
        <EffectComposer multisampling={0}>
            {/* <Vignette 
                offset={0.3} 
                darkness={0.9} 
                // blendFunction={BlendFunction.COLOR_BURN} // default is NORMAL
            /> */}
            {/* <Glitch
                delay={[0.5, 1]}
                duration={[0.1, 0.3]}
                strength={[0.2, 0.4]}
                mode={GlitchMode.CONSTANT_MILD}
            /> */}
            <Noise 
                // blendFunction={BlendFunction.SOFT_LIGHT}
                blendFunction={blendFunction}
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
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}