import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

// import shaders
import testVertexShader from './shaders/testShader/vertex.glsl'
import testFragmentShader from './shaders/testShader/fragment.glsl'

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
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)

const count = geometry.attributes.position.count
const randoms = new Float32Array(count)
for (let i = 0; i < count; i++) {
    randoms[i] = Math.random()
}
// attribute name: aRandom; 1 value per vertex
geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

// Material
// const material = new THREE.MeshBasicMaterial()
const material = new THREE.RawShaderMaterial({
    // vertexShader: `
    //     uniform mat4 projectionMatrix;
    //     uniform mat4 viewMatrix;
    //     uniform mat4 modelMatrix;

    //     attribute vec3 position;

    //     void main() {
    //         gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    //     }
    // `,
    // fragmentShader: `
    //     precision mediump float;

    //     void main() {
    //         gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    //     }
    // `
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    // wireframe: true,
    // side: THREE.DoubleSide,
    transparent: true,
})

// Mesh
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.set(0.25, - 0.25, 1)
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