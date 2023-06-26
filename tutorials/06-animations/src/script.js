import * as THREE from 'three'
import gsap from 'gsap'
console.log(gsap)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const material = new THREE.MeshPhongMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// console.log(THREE.Material)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 10
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


/*
let time = Date.now();

// Animations!
const tick = () => {
    // use delta time:
    const currentTime = Date.now()
    const deltaTime = currentTime - time;
    time = currentTime;
    
    mesh.rotation.y += 0.01 * deltaTime / 10;
    renderer.render(scene, camera)

    // call itself the next frame
    window.requestAnimationFrame(tick)
}
tick();
*/


const clock = new THREE.Clock();

// Animations!
const tick = () => {
    // use delta time:
    const ellapsedTime = clock.getElapsedTime()
    
    mesh.rotation.y = 2*Math.PI / 4 * ellapsedTime;
    mesh.position.x = 4*Math.sin(ellapsedTime);
    mesh.position.y = 4*Math.cos(ellapsedTime);
    renderer.render(scene, camera)

    // call itself the next frame
    window.requestAnimationFrame(tick)
}
tick();

/*
// gsap has its own tick, but you still need to render yourself
// gsap.to(mesh.position, { duration: 3, delay: 1, x: 2} )
// object we are animating, properties

// const clock = new THREE.Clock();

// Animations!
const tick = () => {
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick();
 */