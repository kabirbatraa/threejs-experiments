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
    count: 10000,
    size: 0.01,
    radius: 6,
    branches: 3,
    spin: 6,
    variance: 1,
    randomBias: 4,
    // insideColor: new THREE.Color('#f88437'),
    // outsideColor: new THREE.Color('#6c2dda')

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
    for (let i = 0; i < parameters.count; i++) {
        // random
        // vertices[i*3+0] = Math.random()*2-1
        // vertices[i*3+1] = Math.random()*2-1
        // vertices[i*3+2] = Math.random()*2-1

        const branchNumber = i % parameters.branches
        const radius = Math.random() * parameters.radius

        const angle = (branchNumber / parameters.branches) * Math.PI * 2
        const spinAngle = parameters.spin * radius / parameters.radius
        // const spinAngle = parameters.spin * radius
        // I think my spin looks better than his so I'm going to keep mine

        // random for x y z, but decrease randomness as radius increases
        let varianceValues = []
        for (let i = 0; i < 3; i++) {
            varianceValues.push(
                // Math.pow((Math.random()*2-1) * parameters.variance / radius, parameters.randomBias) 
                // Math.pow((Math.random()*2-1) * parameters.variance, parameters.randomBias) 
                // Math.pow(Math.random() * parameters.variance, parameters.randomBias) * (Math.random() < 0.5 ? -1 : 1)
                Math.pow(Math.random()*parameters.variance, parameters.randomBias) * (Math.random() < 0.5 ? -1 : 1)
            )
            // then add additional randomness?
            // varianceValues[i] += (Math.random()*2-1) * parameters.variance / radius

        }
        // const variance = new THREE.Vector3(
        //     (Math.random()*2-1) * parameters.variance / radius,
        //     (Math.random()*2-1) * parameters.variance / radius,
        //     (Math.random()*2-1) * parameters.variance / radius
        // )
        const variance = new THREE.Vector3(...varianceValues)

        // galaxy shape
        vertices[i*3+0] = radius * Math.sin(angle+spinAngle) + variance.x
        vertices[i*3+1] = 0 + variance.y
        vertices[i*3+2] = radius * Math.cos(angle+spinAngle) + variance.z
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    // Make sure to use PointsMaterial instead of any other material
    particleMaterial = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: '#f3f49c'
        // vertexColors: true
    })
    particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)
}

generateGalaxy()

// can use onFinishChange instead of onChange if framerate too lows
gui.add(parameters, 'count')
.min(100)
.max(100000)
.step(100)
.onChange(generateGalaxy)

gui.add(parameters, 'size')
.min(0.001)
.max(0.1)
.step(0.001)
.onChange(generateGalaxy)

gui.add(parameters, 'radius')
.min(0.01)
.max(29)
.step(0.01)
.onChange(generateGalaxy)

gui.add(parameters, 'branches')
.min(2)
.max(20)
.step(1)
.onChange(generateGalaxy)

gui.add(parameters, 'spin')
.min(-5)
.max(20)
.step(1)
.onChange(generateGalaxy)

gui.add(parameters, 'variance')
.min(0)
.max(2)
.step(0.05)
.onChange(generateGalaxy)

gui.add(parameters, 'randomBias')
.min(1)
.max(10)
.step(0.1)
.onChange(generateGalaxy)

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