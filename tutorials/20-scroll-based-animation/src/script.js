import * as THREE from 'three'
import * as dat from 'lil-gui'

THREE.ColorManagement.enabled = false

/** 
 * Import textures
 */
const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
        toonMaterial.color.set(parameters.materialColor)
    })

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
const toonMaterial = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    // new THREE.MeshBasicMaterial({color: '#ff0000'})
    toonMaterial
)
const cone = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    // new THREE.MeshBasicMaterial({color: '#ff0000'})
    toonMaterial
)
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    // new THREE.MeshBasicMaterial({color: '#ff0000'})
    toonMaterial
)
scene.add(torus, cone, torusKnot)

const objectsDistance = 4;

torus.position.y = objectsDistance*0
// torus.scale.set(0.5, 0.5, 0.5)

// cone.visible = false;
cone.position.y = objectsDistance*-1

torusKnot.position.y = objectsDistance*-2
// torusKnot.scale.set(0.5, 0.5, 0.5)

const sectionMeshes = [torus, cone, torusKnot]

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight  )


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
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true, // default alpha is 0
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

    // Animate Meshes
    for(const mesh of sectionMeshes) {
        mesh.rotation.x = elapsedTime*0.1
        mesh.rotation.y = elapsedTime*0.12
    }



    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()