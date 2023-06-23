import * as THREE from 'three'

console.log(THREE)

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 2, 1); // x, y, z
const material = new THREE.MeshBasicMaterial({color: 0x0000ff})
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const width = 800
const height = 600;

const camera = new THREE.PerspectiveCamera(90, width/height)
camera.position.z = 3; // move back
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(width, height);
renderer.render(scene, camera);
