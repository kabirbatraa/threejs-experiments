
import { useGLTF } from '@react-three/drei'

export default function Model() {

    // const model = useGLTF('./FlightHelmet/glTF/FlightHelmet.gltf')
    // const model = useGLTF('./hamburger.glb')
    const model = useGLTF('./hamburger-draco.glb')

    return <>
        {/* <primitive object={model.scene} scale={5} position-y={-1} /> */}
        <primitive object={model.scene} scale={0.35} />
    </>

}

// starts preloading at the moment Model is imported
useGLTF.preload('./hamburger-draco.glb')