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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()


/**
 * Particles
 */
const particlesGeometry = new THREE.SphereGeometry(1, 32, 32)
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true // to create perspective (close -> larger)
})

// particles/points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
// scene.add(particles)


// challege: random points everywhere
const randomParticlesGeometry = new THREE.BufferGeometry()

const numParticles = 1000;
const range = 3;
const vertices = new Float32Array(3*numParticles)
for (let i = 0; i < numParticles; i++) {
    vertices[i*3] = range*(Math.random()*2-1)
    vertices[i*3+1] = range*(Math.random()*2-1)
    vertices[i*3+2] = range*(Math.random()*2-1)
}
randomParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

const randomParticles = new THREE.Points(randomParticlesGeometry, particlesMaterial)
scene.add(randomParticles)

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