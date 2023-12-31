import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

// function created({gl}) {
//     gl.setClearColor('#ff00ff', 1)
// }

// function created({scene}) {
//     scene.background = new THREE.Color('cyan')
// }

root.render(
    <Canvas
        shadows={true}
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ - 4, 3, 6 ]
        } }
    >
        {/* this code area is implicitly attached to the scene */}
        {/* <color args= { ['blue'] } attach="background" />  */}
        <Experience />
    </Canvas>
)