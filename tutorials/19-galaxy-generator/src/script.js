import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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
 * Galaxy
 */
const parameters = {
    count: 100000,
    size: 0.01,
}

let particleGeometry = null;
let particleMaterial = null;
let particles = null;


function generateGalaxy() {

    // if the old galaxy already exists, destroy before recreating
    if (particles !== null) {
        particleGeometry.dispose() // free memory
        particleMaterial.dispose() // free memory
        scene.remove(particles); // remove points from scene
    }
    
    particleGeometry = new THREE.BufferGeometry()
    const vertices = new Float32Array(parameters.count*3)
    for (let i = 0; i < parameters.count*3; i++) {
        vertices[i] = Math.random()*2-1
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    // Make sure to use PointsMaterial instead of any other material
    particleMaterial = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 'blue'
    })
    particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)
}

generateGalaxy()

gui.add(parameters, 'count')
    .min(100)
    .max(1000000)
    .step(100)
    .onChange(generateGalaxy)
gui.add(parameters, 'size')
    .min(0.001)
    .max(0.1)
    .step(0.001)
    .onFinishChange(generateGalaxy)

// problem: we generate a new galaxy but we do not remove the old one from the scene



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
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
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