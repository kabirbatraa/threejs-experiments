import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'green' })
)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'yellow' })
)
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'white' })
)
cube2.position.x = -2
cube3.position.x = 2
group.add(cube1)
group.add(cube2)
group.add(cube3)
group.rotation.reorder('YXZ')
group.rotation.y = Math.PI / 8
group.rotation.x = Math.PI / 4


/*
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 2
mesh.position.y = 1
mesh.position.set(1, 2, -5)

mesh.scale.x = 1.5
mesh.scale.y = 0.5

mesh.rotation.reorder('YXZ') // make it like fps 
mesh.rotation.x = Math.PI / 4
mesh.rotation.y = Math.PI / 8
scene.add(mesh)
*/


// draw axes
const axesHelper = new THREE.AxesHelper(length=3);
scene.add(axesHelper);



/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.x = 0.5
// camera.position.y = 0.5
camera.position.z = 10

// camera.lookAt(mesh.position)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

console.log(mesh.position.distanceTo(camera.position))
console.log(mesh.position.length())
