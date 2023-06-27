import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

THREE.ColorManagement.enabled = false

/**
 * Debug using lilgui (dat)
 */
const gui = new dat.GUI()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColor = textureLoader.load('/textures/door/color.jpg')
const doorAlpha = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusion = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeight = textureLoader.load('/textures/door/height.jpg')
const doorNormal = textureLoader.load('/textures/door/normal.jpg')
const doorMetalness = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughness = textureLoader.load('/textures/door/roughness.jpg')

const matcapTexture = textureLoader.load('/textures/matcaps/4.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

// load environment map
const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/city/px.png',
    '/textures/environmentMaps/city/nx.png',
    '/textures/environmentMaps/city/py.png',
    '/textures/environmentMaps/city/ny.png',
    '/textures/environmentMaps/city/pz.png',
    '/textures/environmentMaps/city/nz.png'
])

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/** 
 * Objects
 */
/*
// used for light-less renders?
const material = new THREE.MeshBasicMaterial({
    // color: 0x00ff00
    // map: doorColor
});
material.map = doorColor;
// material.color.set('magenta')
// material.wireframe = true;
// material.opacity = 0.5
material.transparent = true
material.alphaMap = doorAlpha
material.side = THREE.DoubleSide
*/

/*
// used for debugging normals
const material = new THREE.MeshNormalMaterial()
material.flatShading = true;
*/

/*
// used for simulating light using a sphere image
const material = new THREE.MeshMatcapMaterial()
material.matcap = matcapTexture
*/

/*
// used for simulating fog? (futher away = darker)
const material = new THREE.MeshDepthMaterial()
*/

// basic light algo (has weird pattern artifact)
// const material = new THREE.MeshLambertMaterial()

/*
// better light algo (with specular, less performant)
const material = new THREE.MeshPhongMaterial()
material.shininess = 100
material.specular = new THREE.Color(0x1188ff) // can set specular color
*/

/*
// uses cell shading for comic feeling
const material = new THREE.MeshToonMaterial()
// control cell shading steps/layers using gradient
material.gradientMap = gradientTexture
// we lost the cartoon effect bc the texture is small
// mag filter is trying to blur (stretch out the texture)
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false
*/

/*
// smoother than phong (more realistic algo)
const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.5
// material.roughness = 0.5
// gui.add(material, 'metalness').min(0).max(1)
// gui.add(material, 'roughness').min(0).max(1)

material.map = doorColor
material.aoMap = doorAmbientOcclusion
// material.aoMapIntensity
gui.add(material, 'aoMapIntensity').min(0).max(10)

material.displacementMap = doorHeight
// material.wireframe = true
material.displacementScale = 0.1
gui.add(material, 'displacementScale').min(0).max(0.5)

material.metalnessMap = doorMetalness
material.roughnessMap = doorRoughness

material.normalMap = doorNormal
material.alphaMap = doorAlpha
material.transparent = true
*/
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.01
material.envMap = environmentMapTexture
gui.add(material, 'metalness').min(0).max(1)
gui.add(material, 'roughness').min(0).max(1)

material.side = THREE.DoubleSide

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64), 
    material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)



/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
// const pointLight = new THREE.PointLight(0x4400ff, 1.2)
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2;
pointLight.position.y = 3
pointLight.position.z = 4;
scene.add(pointLight)



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
    const elapsedTime = clock.getElapsedTime() // in seconds

    // Update Objects
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()