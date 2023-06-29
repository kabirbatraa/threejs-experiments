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

// Fog
const fogColor = '#262837'
const fog = new THREE.Fog(fogColor, 1, 15) 
// params:
    // color
    // how for from the camera should the fog start
    // at what point the fog should be fully opaque
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * House
 */
// group
const houseGroup = new THREE.Group();
scene.add(houseGroup)

// walls
const wallHeight = 2.5;
const wallWidth = 4;
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(wallWidth, wallHeight, wallWidth),
    new THREE.MeshStandardMaterial({color: "#ac8e82"})
)
// console.log(walls.geometry.parameters.height)
walls.position.y = wallHeight /2
houseGroup.add(walls)


// roof
const roofHeight = 1;
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, roofHeight, 4),
    new THREE.MeshStandardMaterial({color: '#b35f45'})
)
roof.position.y = wallHeight + roofHeight/2
roof.rotation.y = Math.PI/4
houseGroup.add(roof)


// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#a9c388' })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)


// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshStandardMaterial({color: "#aa7b7b"})
)
door.position.y = 1
door.position.z = wallWidth/2 + 0.001
houseGroup.add(door)


// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({color: "#89c854"})
const bush = new THREE.Mesh(bushGeometry, bushMaterial)
bush.scale.set(0.5, 0.5, 0.5)
bush.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.1)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)

houseGroup.add(bush, bush2, bush3, bush4)


// graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({color: "#686868"})

let currentAngle = Math.random() * Math.PI * 2
const minRadius = wallWidth * Math.sqrt(2)
for (let i = 0; i < 50; i++) {
    // console.log(currentAngle)
    const posX = Math.cos(currentAngle) * (minRadius + Math.random()*4)
    const posZ = Math.sin(currentAngle) * (minRadius + Math.random()*4)
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(posX, 0.3, posZ)
    grave.rotation.y = (Math.random()*2-1) * Math.PI / 4
    grave.rotation.z = (Math.random()*2-1) * Math.PI / 16
    graves.add(grave)
    // currentAngle += (Math.random()*2-1) * Math.PI
    currentAngle += grave.rotation.y
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9df55', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)


// door light
const doorLight = new THREE.PointLight("#ff7d46", 0.5) // intensity, distance
doorLight.position.set(0, 2.2, 2.7)
houseGroup.add(doorLight)





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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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

// set background color to fog color
renderer.setClearColor(fogColor)

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