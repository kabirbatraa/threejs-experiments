import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { GroundProjectedSkybox } from 'three/addons/objects/GroundProjectedSkybox'

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader()
const rgbeLoader = new RGBELoader()
const textureLoader = new THREE.TextureLoader();

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
const global = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Update all materials
 */
function updateAllMaterials() {
    scene.traverse((child) => {
        // console.log(child)
        // will go through every child in the scene, called on load of gltf object

        // increase envmap intensity of every material of every mesh
        if (child.isMesh && child.material.isMeshStandardMaterial) {
            child.material.envMapIntensity = global.envMapIntensity
        }
    })
}



/**
 * Environment Map
 */
// blurriness
scene.backgroundBlurriness = 0.0 // useful when env map is low resolution
// global intensity
global.envMapIntensity = 1;
gui.add(global, 'envMapIntensity').min(0).max(10).step(0.001).onChange(updateAllMaterials)
gui.add(scene, 'backgroundBlurriness').min(0).max(1).step(0.001).onChange(updateAllMaterials)



// // LDR cube texture (low dynamic range)
// const environmentMap = cubeTextureLoader.load([
//     'environmentMaps/0/px.png',
//     'environmentMaps/0/nx.png',
//     'environmentMaps/0/py.png',
//     'environmentMaps/0/ny.png',
//     'environmentMaps/0/pz.png',
//     'environmentMaps/0/nz.png',
// ])
// scene.background = environmentMap
// scene.environment = environmentMap

// hdr (high dynamic range) rgbe (rgb+exponent) equirectangular
// rgbeLoader.load(
//     'environmentMaps/0/2k.hdr',
//     (environmentMap) => {
//         environmentMap.mapping = THREE.EquirectangularReflectionMapping;
//         scene.background = environmentMap // for background color
//         scene.environment = environmentMap // for lighting
//     }
// )
// hdri backgrounds are much brighter so you don't need to increase envMapIntensity
// hdri backgrounds are much higher resolution so you don't need to blur the background

// LDR (low dynamic range) equirectangular
// const envMapJPG = textureLoader.load(
//     // 'environmentMaps/blockadesLabsSkybox/scifi_white_sky_scrapers_in_clouds_at_day_time.jpg',
//     'environmentMaps/blockadesLabsSkybox/anime_art_style_japan_streets_with_cherry_blossom_.jpg',
    
// )
// envMapJPG.colorSpace = THREE.SRGBColorSpace
// envMapJPG.mapping = THREE.EquirectangularReflectionMapping;
// scene.background = envMapJPG // for background color
// scene.environment = envMapJPG // for lighting
// global.envMapIntensity = 2;


// ground projected skybox
rgbeLoader.load('environmentMaps/2/2k.hdr', (environmentMap) => {
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = environmentMap // lighting
    // scene.background = environmentMap // do not set background

    // skybox
    const skybox = new GroundProjectedSkybox(environmentMap);
    skybox.scale.setScalar(50)
    scene.add(skybox)

    gui.add(skybox, 'radius', 1, 200, 0.1)
    gui.add(skybox, 'height', 1, 200, 0.1)
})



/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    new THREE.MeshStandardMaterial({
        roughness: 0.3,
        metalness: 1,
        color: 0xaaaaaa,
    })
)
torusKnot.position.x = 4
torusKnot.position.y = 4
// torusKnot.material.envMap = environmentMap // do this on the scene instead
scene.add(torusKnot)





/** 
 * Models
 */
gltfLoader.load(
    '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) => {
        gltf.scene.scale.set(10, 10, 10)
        scene.add(gltf.scene)

        updateAllMaterials()
    }
)




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
camera.position.set(4, 5, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () =>
{
    // Time
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()