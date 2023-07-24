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
    SSAO,
} from '@react-three/postprocessing'
import {
    BlendFunction,
    GlitchMode
} from 'postprocessing'
import {useControls} from 'leva'
import { useRef, useState } from 'react'
import SSAOHelper from './SSAOHelper'
import SSAOHelper2 from './SSAOHelper2'
import SSAOHelper3 from './SSAOHelper3'
import SSAOHelper4 from './SSAOHelper4'


export default function Experience() {

    // const config = useControls({
    //     samples: {
    //         value: 10,
    //     },
    //     radius: 5,
    //     intensity: {
    //         value: 20,
    //     },
    //     bias: 0.5,
    // });

    // const effectComposer = useRef()
    // console.log(effectComposer)
    // if (effectComposer.current != undefined)
    //     effectComposer.current.render();

    console.log('rerender Experience')
    const [dummy, setDummy] = useState(0)

    function callbackFunction() {
        console.log('callbackFunction')
        setDummy((prev) => (prev+1));
    }

    const {multisampling} = useControls({
        multisampling: {
            value: 8,
            step: 1,
            min:0,
            max:10,
        }
    })

    return <>

        {/* <EffectComposer>
            <SSAO
                blendFunction={BlendFunction.MULTIPLY}
                {...config}
            />
        </EffectComposer> */}

        <EffectComposer multisampling={multisampling}>
            {/* <SSAOHelper3 /> */}
            {/* <SSAOHelper callbackFunction={callbackFunction}/> */}
            <SSAOHelper4 callbackFunction={callbackFunction}/>
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
            <meshStandardMaterial color="gray" metalness={0} roughness={0} />
        </mesh>
        <mesh receiveShadow position-z={ - 1 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="gray" metalness={0} roughness={0} />
        </mesh>

    </>
}