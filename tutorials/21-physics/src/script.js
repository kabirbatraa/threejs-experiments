import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import CANNON from 'cannon'

THREE.ColorManagement.enabled = false

/**
 * Debug
 */
const gui = new dat.GUI()
const debugObject = {}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.png',
    '/textures/environmentMaps/0/nx.png',
    '/textures/environmentMaps/0/py.png',
    '/textures/environmentMaps/0/ny.png',
    '/textures/environmentMaps/0/pz.png',
    '/textures/environmentMaps/0/nz.png'
])


/**
 * Physics World
 */
const world = new CANNON.World()
world.broadphase = new CANNON.SAPBroadphase(world)
world.allowSleep = true;
world.gravity.set(0, -9.82, 0)

// Materials (physics)
const defaultMaterial = new CANNON.Material('default');
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.1,
        restitution: 0.7
    }
)
world.addContactMaterial(defaultContactMaterial)
world.defaultContactMaterial = defaultContactMaterial;
/**
const concreteMaterial = new CANNON.Material('concrete')
const plasticMaterial = new CANNON.Material('plastic')
// 'concrete' is just a name/reference

const concretePlasticContactMaterial = new CANNON.ContactMaterial(
    concreteMaterial,
    plasticMaterial,
    {
        friction: 0.1,
        restitution: 0.7
    }
)
world.addContactMaterial(concretePlasticContactMaterial);
 */

/**
// sphere body
const sphereShape = new CANNON.Sphere(0.5) // radius
const sphereBody = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape: sphereShape,
    // material: plasticMaterial,
    // material: defaultMaterial,
})
sphereBody.applyLocalForce(new CANNON.Vec3(200, 200, 0), new CANNON.Vec3(0, 0, 0))
world.addBody(sphereBody)
 */

// floor body
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
// floorBody.material = concreteMaterial;
// floorBody.material = defaultMaterial;
floorBody.mass = 0
floorBody.addShape(floorShape) // note u can add many shapes to 1 body
floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0), // axis
    Math.PI * 0.5, // angle rotation
) // need to make plane horizontal instead of vertical
world.addBody(floorBody)



/**
 * Test sphere
 */
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 32, 32),
//     new THREE.MeshStandardMaterial({
//         metalness: 0.3,
//         roughness: 0.4,
//         envMap: environmentMapTexture,
//         envMapIntensity: 0.5
//     })
// )
// sphere.castShadow = true
// sphere.position.y = 0.5
// scene.add(sphere)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#777777',
        metalness: 0.3,
        roughness: 0.4,
        envMap: environmentMapTexture,
        envMapIntensity: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

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
camera.position.set(- 3, 3, 3)
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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))




/**
 * Object generation Utils
 */
// contains objects: {mesh, body}
const objectsArray = [];

const createSphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const createSphereMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    color: 'hotpink'
})

function createSphere(radius, position) {

    // create THREE mesh
    const mesh = new THREE.Mesh(
        createSphereGeometry,
        createSphereMaterial
    )
    mesh.scale.set(radius, radius, radius);
    mesh.castShadow = true;
    mesh.position.copy(position);
    scene.add(mesh)


    // create CANNON body
    const shape = new CANNON.Sphere(radius)
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape: shape,
        material: defaultMaterial
    })
    body.position.copy(position);
    world.addBody(body)


    // add to objectsArray
    objectsArray.push({
        mesh: mesh,
        body: body
    })

}
// createSphere(1, new THREE.Vector3(0, 2, 0))
// createSphere(1, new THREE.Vector3(1, 3, 0))
// createSphere(1, new THREE.Vector3(0, 2, 1))

debugObject.createSphere = () => {
    const radius = 0.05 + Math.random()*0.4;
    const position = new THREE.Vector3(
        (Math.random()-0.5) * 3,
        1 + Math.random() * 3,
        (Math.random()-0.5) * 3,
    )
    createSphere(radius, position)
}
gui.add(debugObject, 'createSphere')



// create cubes:
const createCubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const createCubeMaterial = new THREE.MeshStandardMaterial({
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    color: 'blue'
})

function createCube(width, position) {
    // create THREE mesh
    const mesh = new THREE.Mesh(
        createCubeGeometry,
        createCubeMaterial
    )
    mesh.scale.set(width, width, width);
    mesh.castShadow = true;
    mesh.position.copy(position);
    scene.add(mesh)


    // create CANNON body
    const shape = new CANNON.Box(new CANNON.Vec3(width/2, width/2, width/2))
    const body = new CANNON.Body({
        mass: 1,
        position: new CANNON.Vec3(0, 3, 0),
        shape: shape,
        material: defaultMaterial
    })
    body.position.copy(position);
    world.addBody(body)


    // add to objectsArray
    objectsArray.push({
        mesh: mesh,
        body: body
    })
}

debugObject.createBox = () => {
    const width = 0.3 + Math.random()*0.3;
    const position = new THREE.Vector3(
        (Math.random()-0.5) * 3,
        1 + Math.random() * 3,
        (Math.random()-0.5) * 3,
    )
    createCube(width, position)
}
gui.add(debugObject, 'createBox')
// createCube(1, new THREE.Vector3(0, 3, 0))

debugObject.createHandful = () => {
    for (let i = 0; i < 10; i++) {
        debugObject.createBox()
        debugObject.createSphere()
    }
}
debugObject.createHandful()
gui.add(debugObject, 'createHandful')

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = clock.getElapsedTime()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime;

    // update physics world
    // apply wind force to sphere
    // sphereBody.applyForce(new CANNON.Vec3(-1.5, 0, -0.5), sphereBody.position)

    // Update physics world
    world.step(1/60, deltaTime, 3)
        // fixed timestamp, time passed, #iterations if delayed
    // sphere.position.copy(sphereBody.position)
    for (const obj of objectsArray) {
        obj.mesh.position.copy(obj.body.position)
        obj.mesh.quaternion.copy(obj.body.quaternion)
    }
    // debugObject.createSphere()
    // debugObject.createBox()
    // createSphere(
    //     0.5, 
    //     new THREE.Vector3(
    //         (Math.random()-.5) * 0.01, 
    //         3, 
    //         (Math.random()-.5) * 0.01
    //     )
    // )

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()