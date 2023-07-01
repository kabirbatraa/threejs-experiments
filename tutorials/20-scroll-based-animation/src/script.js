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
    // materialColor: '#ffeded',
    materialColor: '#701010',
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
        toonMaterial.color.set(parameters.materialColor)
        particlesMaterial.color.set(parameters.materialColor)
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
torus.position.x = 2

// cone.visible = false;
cone.position.y = objectsDistance*-1
cone.position.x = -2

torusKnot.position.y = objectsDistance*-2
// torusKnot.scale.set(0.5, 0.5, 0.5)
torusKnot.position.x = 2

const sectionMeshes = [torus, cone, torusKnot]



/**
 * Particles
 */
const numParticles = 1000

const minY = objectsDistance/2;
const maxY = sectionMeshes.length*objectsDistance;

const positions = new Float32Array(numParticles*3)
for (let i = 0; i < numParticles; i++) {
    positions[i*3+0] = (Math.random()-0.5) * 10
    positions[i*3+1] = minY + -Math.random() * maxY
    positions[i*3+2] = (Math.random()-0.5) * 10
}
// geometry
const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
// material
const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: true,
    size: 0.03,
})
// points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)




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
// add camera to camera group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)



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
 * Scroll
 */
let scrollY = window.scrollY;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY
    // scroll down means +scrollY in pixels
})


/**
 * Cursor Movement
 */
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    // cursor is -0.5 to 0.5
    cursor.x = (event.clientX / sizes.width) - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
    // down is positive
    console.log(cursor)
})


/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = clock.getElapsedTime();

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime;

    // Animate camera:

    // camera follow scroll
    // goal: delta scroll = viewport --> camera moves objectsDistance(4) units
    camera.position.y = -scrollY / sizes.height * objectsDistance

    // parallax based on cursor
    const parallaxX = cursor.x * 0.5
    const parallaxY = -cursor.y * 0.5
    // cameraGroup.position.set(parallaxX, parallaxY)
    // to make it smooth, instead of moving directly to the correct position, 
    // just move 1/10 closer
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 4 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 4 * deltaTime



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