import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { 
    EffectComposer, 
    Vignette,
    Glitch,
    Noise, 
    Bloom,
} from '@react-three/postprocessing'
import {
    BlendFunction,
    GlitchMode
} from 'postprocessing'
import {useControls} from 'leva'

import Effect from './Effect'


export default function Experience() {

    let blendFunctionOptions = (Object.entries(BlendFunction).sort((a, b) => a[1] - b[1]))
    blendFunctionOptions = blendFunctionOptions.filter((value) => {
        return (value[1] == BlendFunction.OVERLAY || value[1] == BlendFunction.SCREEN || value[1] == BlendFunction.SOFT_LIGHT || value[1] == BlendFunction.AVERAGE)
    })

    let { blendFunction } = useControls({
        blendFunction: {
            value: blendFunctionOptions[3],
            options: blendFunctionOptions
        }
    })
    blendFunction = blendFunction[1] // just the number

    return <>

        {/* Add background color to scene */}
        <color args={[ '#000000' ]} attach={'background'} />

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
            {/* <Noise 
                premultiply
                blendFunction={blendFunction}
            /> */}
            <Bloom
                mipmapBlur // allow bloom to go past cube mesh
                intensity={0.1}
                luminanceThreshold={0} // default is around 0.9, 0 means allow everything to glow
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
            <meshBasicMaterial color={[1.5 * 10, 1 * 10, 4 * 10]} toneMapped={false} />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}