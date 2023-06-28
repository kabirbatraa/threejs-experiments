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
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 0.5)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)
const ambientLight = new THREE.AmbientLight("#bf75ff", 0.3)
// ambientLight.color = new THREE.Color("#bf75ff")
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.01).name("ambient intensity")
gui.addColor(ambientLight, 'color').name("ambient color")
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight("red", 0.3)
gui.add(directionalLight, 'intensity').min(0).max(1 ).step(0.01).name('directional intensity')
gui.addColor(directionalLight, 'color').name('directional color')
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight("#00ff55", "#0000ff", 0.2)
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight('#ff9000', 0.9)
pointLight.position.set(1, -0.5, 1)
gui.add(pointLight, 'distance').min(0).max(10)
gui.add(pointLight, 'decay').min(0).max(10)
scene.add(pointLight)

// only works iwth standard or physical material, not phong etc
// (physical material inherits from standard material)
const rectAreaLight = new THREE.RectAreaLight("#4e00ff", 0.5, 3, 1)
rectAreaLight.position.z = 1
scene.add(rectAreaLight)

const rectAreaLight2 = new THREE.RectAreaLight("#4e00ff", 0.5, 2, 2)
rectAreaLight2.position.z = -1
rectAreaLight2.position.y = 1
// rectAreaLight2.lookAt(new THREE.Vector3(0,0,0))
scene.add(rectAreaLight2)

// color, intensity, distance (fade with distance), angle width, penumbra (soft edge), decay
const spotLight = new THREE.SpotLight("#e770ff", 0.3, 10, Math.PI*0.05, 0.25, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight, spotLight.target)



/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5
rectAreaLight2.lookAt(sphere.position)

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5
// spotLight.lookAt(torus.position) // spotlights dont work like this
spotLight.target.position.set(...torus.position);

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()