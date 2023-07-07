import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { MeshNormalMaterial } from 'three'
import Experience from './Experience.jsx'
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas 
        dpr={[1, 2]} // clamp pixel ratio between 1 and 2; this is default
        // flat
        gl={{
            // antialias: false
            // toneMapping: THREE.CineonToneMapping
            toneMapping: THREE.ACESFilmicToneMapping,
            // outputColorSpace: THREE.LinearSRGBColorSpace
        }}
        // orthographic
        camera={{
            fov: 45,
            // zoom: 100,
            near: 0.1,
            far: 200,
            position: [3,2,6]
        }}
    >
        <Experience />
    </Canvas>
)