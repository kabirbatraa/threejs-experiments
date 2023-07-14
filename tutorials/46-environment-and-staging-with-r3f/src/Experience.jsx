import { useFrame } from '@react-three/fiber'
import { 
    useHelper, 
    OrbitControls,
    BakeShadows,
    SoftShadows,
    AccumulativeShadows,
    RandomizedLight,
    ContactShadows,
    Sky,
    Environment,
    Lightformer,
} from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useControls } from 'leva'

export default function Experience()
{
    const directionalLight = useRef();
    // useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

    const cube = useRef()
    // const lightformer = useRef()

    const [{sunPosition}, setSunPosition] = useControls(() => {
        return {sunPosition: [1, 2, 3]}
    })
        
        
        // 'sky', )

    // const {sunPosition} = useControls({sunPosition: [1, 2, 3]})
    
    useFrame((state, delta) =>
    {
        // rotate cube
        cube.current.rotation.y += delta * 0.2

        // translate cube
        const elapsedTime = state.clock.elapsedTime
        cube.current.position.x = 2 + Math.sin(elapsedTime)

        // control sun day-night cycle
        // const spherical = new THREE.Spherical(10, Math.PI/4, 0); // radius, phi, theta
        const spherical = new THREE.Spherical(10, elapsedTime, 0); // radius, phi, theta
        const sunPosition = new THREE.Vector3().setFromSpherical(spherical)
        // if (setSunPosition != null) setSunPosition(sunPosition)
        // console.log(setSunPosition)
        // setSunPosition({ sunPosition: sunPosition.toArray() })
        setSunPosition({ sunPosition: sunPosition.toArray() })
        // console.log(sunPosition.toArray())


        // update rotation of light former
        // inspired by https://codesandbox.io/s/building-live-envmaps-forked-924nk5?file=/src/App.js:2644-2668
        // lightformer.current.rotation.x = Math.sin(elapsedTime * 0.5) * 2 * Math.PI / 2

    })

    const {color, opacity, blur, bake} = useControls('contact shadows', {
        color: '#222222',
        opacity: {
            value: 0.5,
            min: 0,
            max: 1,
            step: 0.01,
        },
        blur: {
            value: 2,
            min: 0,
            max: 10,
            step: 0.01,
        },
        bake: false,
    })


    // control env map intensity
    const {envMapIntensity} = useControls('environment map', {
        envMapIntensity: {value: 1, min: 0, max: 12},
    })



    return <>

        <Environment
            background={true}
            // blur={1}
            // files={[
            //     './environmentMaps/2/nx.jpg',
            //     './environmentMaps/2/py.jpg',
            //     './environmentMaps/2/ny.jpg',
            //     './environmentMaps/2/pz.jpg',
            //     './environmentMaps/2/nz.jpg',
            //     './environmentMaps/2/px.jpg',
            // ]}
            // files={'./environmentMaps/the_sky_is_on_fire_2k.hdr'}
            preset='sunset'
            ground={{
                height: 7,
                radius: 28,
                scale: 100
            }}
        >
            {/* <color args={['#4444aa']} attach="background"/>
            <Lightformer 
                ref={lightformer}
                position-z={-5} 
                scale={10} 
                color="red"
                intensity={10}
                form="ring"
                rotation={[Math.PI / 4, 0, 0]}
            />
            <mesh position-z={-5} scale={10}>
                <planeGeometry/>
                <meshBasicMaterial color={[10, 0, 0]}/>
            </mesh> */}
        </Environment>

        


        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <ContactShadows
            position={[0, 0, 0]}
            scale={10}
            resolution={1024}
            far={5}

            color={color}
            opacity={opacity}
            blur={blur}

            frames={bake ? 1 : Infinity}
        />

        {/* <directionalLight 
            ref={directionalLight} 
            position={ sunPosition } 
            intensity={ 1.5 } 
            castShadow={true}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-bottom={-5}
            shadow-camera-top={5}
            shadow-camera-near={0.1}
            shadow-camera-far={10}
        /> */}
        {/* <ambientLight intensity={ 0.5 } /> */}

        {/* <Sky
            sunPosition={sunPosition}
        /> */}

        <mesh castShadow position-x={ - 2 } position-y={1}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} 
                metalness={0.95}
                roughness={0.01}
            />
        </mesh>

        <mesh castShadow ref={ cube } position-x={ 2 } scale={ 1.5 } position-y={1}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
        </mesh>

        {/* <mesh position-y={ 0 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="gray" envMapIntensity={envMapIntensity} />
        </mesh> */}

    </>
}