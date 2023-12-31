import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import * as dat from 'lil-gui'

THREE.ColorManagement.enabled = false

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/** 
 * Models
 */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/') // copied from node modules
    // node_modules\three\examples\jsm\libs\draco
// Now the draco loader can use web assembly to decompress faster

let mixer = null; // for animations
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.load(
    // '/models/Duck/glTF/Duck.gltf', // path
    // '/models/Duck/glTF-Binary/Duck.glb',
    // '/models/Duck/glTF-Embedded/Duck.gltf', 
    // '/models/FlightHelmet/glTF/FlightHelmet.gltf', 
    // '/models/DamagedHelmet/glTF/DamagedHelmet.gltf', 

    // draco compressed version does not work unless we set the draco loader
    // '/models/Duck/glTF-Draco/Duck.gltf', 

    // animated
    '/models/Fox/glTF/Fox.gltf', 


    (gltf) => {
        console.log("success")
        console.log(gltf)

        // the for loop is supposed to unintentionally remove children from the gltf.scene object
        // for (const child of gltf.scene.children) {
        //     scene.add(child)
        // }

        // potential solution: loop through children and add one by one
        // while (gltf.scene.children.length != 0) {
        //     scene.add(gltf.scene.children[0])
        // }

        // second solution: clone the array
        // const children = [...gltf.scene.children]
        // // note this is only a shallow copy, the gltf scene will be empty
        // for (const child of children) {
        //     scene.add(child)
        // }

        // most simple solution:
        scene.add(gltf.scene)

        gltf.scene.scale.set(0.025, 0.025, 0.025)

        // Animations:
        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[2])
        action.play()

        // update mixer in tick function

    },
    // () => {
    //     console.log("progress")
    // },
    // () => {
    //     console.log("error")
    // },
)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // update mixer (for animations)
    if (mixer != null)
        mixer.update(deltaTime)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()