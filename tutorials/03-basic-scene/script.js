

// SCENE
// create scene
const scene = new THREE.Scene();

// create geometry for mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 1 is the size

// create material for mesh
const properties1 = { color: '#ff0000' }
const properties2 = { color: 0xff0000 }
const properties3 = { color: 'red' }
const material = new THREE.MeshBasicMaterial(properties2)

// create mesh using geometry and material
const cubeMesh = new THREE.Mesh(geometry, material)

// add mesh to scene
scene.add(cubeMesh);


// CAMERA
const sizes = { width: 800, height: 600 }
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// fov (commonly 45 to 75), aspect ratio

// move the camera back so we can see the cube
camera.position.z = 4
camera.position.x = 1
scene.add(camera);


// RENDERER
// get the canvas from the DOM
const canvas = document.querySelector('.webgl')
console.log(canvas)
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)
// scene, camera

