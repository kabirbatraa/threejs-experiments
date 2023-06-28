import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

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

// axes helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('textures/matcaps/3.png')
const matcapRedOrangeWhite = textureLoader.load('textures/matcaps/matcapRedOrangeWhite.png')
const matcapGold = textureLoader.load('textures/matcaps/matcapGold.png')

/**
 * Fonts
 */
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        console.log('font loaded')

        const textGeometry = new TextGeometry(
            'hello world :D',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     -textGeometry.boundingBox.max.x*0.5,
        //     -textGeometry.boundingBox.max.y*0.5,
        //     -textGeometry.boundingBox.max.z*0.5
        // )
        textGeometry.center()
        

        // const textMaterial = new THREE.MeshBasicMaterial()
        // const textMaterial = new THREE.MeshNormalMaterial()
        const textMaterial = new THREE.MeshMatcapMaterial()
        textMaterial.matcap = matcapTexture;
        // textMaterial.wireframe = true
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        // textMesh.position.set(new THREE.Vector3(
        //     (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) / 2,
        //     -textGeometry.boundingBox.max.y*0.5,
        //     -textGeometry.boundingBox.max.z*0.5
        // ))
        // textMesh.position.x = -(textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x) / 2
        
        scene.add(textMesh)
    }
)

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

// DONUTS
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapGold })
let range = 25;
for (let i = 0; i < 1000; i++) {
    const donutMesh = new THREE.Mesh(donutGeometry, donutMaterial)
    donutMesh.position.x = (Math.random()-0.5) * 25
    donutMesh.position.y = (Math.random()-0.5) * 25
    donutMesh.position.z = (Math.random()-0.5) * 25

    donutMesh.rotation.x = (Math.random()-0.5) * Math.PI
    donutMesh.rotation.y = (Math.random()-0.5) * Math.PI
    donutMesh.rotation.z = (Math.random()-0.5) * Math.PI

    let scale = Math.random()
    donutMesh.scale.set(scale, scale, scale)
    
    scene.add(donutMesh)
}

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()