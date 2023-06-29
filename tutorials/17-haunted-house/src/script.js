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

// door textures
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// brick textures
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

// grass
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

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
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        aoMapIntensity: 2,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture,
    })
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
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture,
    })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)


// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        alphaMap: doorAlphaTexture,
        transparent: true,
        aoMap: doorAmbientOcclusionTexture,
        aoMapIntensity: 2,
        displacementMap: doorHeightTexture,
        displacementScale: 0.05,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
    })
)
// door.geometry.setAttribute('uv2')
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
const minRadius = wallWidth/2 * Math.sqrt(2) + 2
for (let i = 0; i < 75; i++) {
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
 * Ghosts! (floating lights)
 */
// let ghosts = []
const ghost1 = new THREE.PointLight('#ff00ff', 1, 3.5)
scene.add(ghost1)
// ghosts.push(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 1, 3.5)
scene.add(ghost2)
const ghost3 = new THREE.PointLight('#ffbb00', 3, 4)
scene.add(ghost3)

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

    // Update ghosts
    // ghosts.forEach(ghost => {
    let ghostAngle = elapsedTime * 0.4
    let radius = 4 + 0.3*Math.sin(elapsedTime*2)
    ghost1.position.x = Math.cos(ghostAngle) * radius
    ghost1.position.z = Math.sin(ghostAngle) * radius
    ghost1.position.y = Math.sin(elapsedTime * 1.5)
    // }); 
    ghostAngle = elapsedTime * 0.3
    radius = 5 + 0.2*Math.sin(elapsedTime*3)
    ghost2.position.x = -Math.cos(ghostAngle) * radius
    ghost2.position.z = Math.sin(ghostAngle) * radius
    ghost2.position.y = -Math.sin(elapsedTime * 1.5)

    ghostAngle = elapsedTime * 0.2 + Math.PI
    radius = 7 + 0.1*Math.sin(elapsedTime*5)
    ghost3.position.x = -Math.cos(ghostAngle) * radius
    ghost3.position.z = Math.sin(ghostAngle) * radius
    ghost3.position.y = Math.sin(elapsedTime)+0.5

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()