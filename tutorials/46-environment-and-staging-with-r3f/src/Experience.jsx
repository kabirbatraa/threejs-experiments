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

    })

    const {color, opacity, blur, bake} = useControls('contact shadows', {
        color: '#00ffff',
        opacity: {
            value: 0.5,
            min: 0,
            max: 1,
            step: 0.01,
        },
        blur: {
            value: 3,
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
            // files={[
            //     './environmentMaps/2/nx.jpg',
            //     './environmentMaps/2/py.jpg',
            //     './environmentMaps/2/ny.jpg',
            //     './environmentMaps/2/pz.jpg',
            //     './environmentMaps/2/nz.jpg',
            //     './environmentMaps/2/px.jpg',
            // ]}
            // files={'./environmentMaps/the_sky_is_on_fire_2k.hdr'}
            // preset='night'
        >
            <color args={['#4444aa']} attach="background"/>
            <mesh position-z={-5} scale={10}>
                <planeGeometry/>
                <meshBasicMaterial color="red"/>
            </mesh>
        </Environment>

        


        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <ContactShadows
            position={[0, -0.99, 0]}
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

        <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
        </mesh>

        <mesh castShadow ref={ cube } position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity} />
        </mesh>

    </>
}