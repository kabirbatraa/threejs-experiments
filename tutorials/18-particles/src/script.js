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

const particleTexture = textureLoader.load('/textures/particles/10.png')

/**
 * Particles
 */
const particlesGeometry = new THREE.SphereGeometry(1, 32, 32)
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true, // to create perspective (close -> larger)
    color: 'red'
})
particlesMaterial.color = new THREE.Color('#ff88cc')
// particlesMaterial.map = particleTexture; // dont need this i think
particlesMaterial.alphaMap = particleTexture;
particlesMaterial.transparent = true;

// reason why alpha doesnt work is because gpu draws particles in random order
// and some 0 alpha values still overwrite?

// one potential solution is low alpha test
// particlesMaterial.alphaTest = 0.001
// not perfect, will still have some particles cut off

// another potential solution is disable depth test 
// particlesMaterial.depthTest = false
// not perfect, will draw far particles over other objects that are closer

// another potential solution is disable depth write (do not write to the depth buffer)
particlesMaterial.depthWrite = false;
// THIS WORKS BEST

// blending: adds overlapping colors to make super bright glow
particlesMaterial.blending = THREE.AdditiveBlending

// particles/points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
// scene.add(particles)


// challege: random points everywhere
const randomParticlesGeometry = new THREE.BufferGeometry()

const numParticles = 20000;
const range = 3; //10
const vertices = new Float32Array(3*numParticles)
for (let i = 0; i < numParticles; i++) {
    vertices[i*3] = range*(Math.random()*2-1) // x
    vertices[i*3+1] = range*(Math.random()*2-1) // y
    vertices[i*3+2] = range*(Math.random()*2-1) // z
}
randomParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

const randomParticles = new THREE.Points(randomParticlesGeometry, particlesMaterial)
scene.add(randomParticles)

// scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial()))

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