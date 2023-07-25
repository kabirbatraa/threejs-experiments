import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

export default function Model() {

    // const model = useLoader(GLTFLoader, './hamburger.glb');

    // draco loader (doesnt work right now?)
    const model = useLoader(
        GLTFLoader, 
        './hamburger.glb',
        // './hamburger-draco.glb',
        // './FlightHelmet/glTF/FlightHelmet.gltf',
        (loader) => {
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('./draco/')
            loader.setDRACOLoader(dracoLoader)
        }
    );

    return <>
        {/* <primitive object={model.scene} scale={5} position-y={-1} /> */}
        <primitive object={model.scene} scale={0.35} />
    </>

}