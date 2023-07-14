import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import ExperienceStage from './ExperienceStage.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

// function created({gl}) {
//     gl.setClearColor('#ff00ff', 1)
// }

function created({scene}) {
    scene.background = new THREE.Color('cyan')
}

root.render(
    <Canvas
        // shadows={true}
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ - 4, 3, 6 ]
        } }
        onCreated={created}
    >
        {/* this code area is implicitly attached to the scene */}
        <color args= { ['blue'] } attach="ivory" /> 
        <ExperienceStage />
    </Canvas>
)