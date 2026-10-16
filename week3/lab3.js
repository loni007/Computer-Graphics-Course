import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/Addons.js";
import {SphereGeometry} from "three";
import {add} from "three/tsl";

const scene= new THREE.Scene();
const camera= new THREE.PerspectiveCamera
(75,
    window.innerWidth / window.innerHeight, 0.1, 100)

camera.position.set(5,6,7);
const renderer= new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

const pointLight= new THREE.PointLight(0xffffff, 400,0,1.6)
const ambientLight= new THREE.AmbientLight(0xffffff, 4)
scene.add(pointLight, ambientLight)

const geometry= new THREE.SphereGeometry(2,32,24)
const material= new THREE.MeshStandardMaterial({color:0xb44d1a, wireframe:true});
const sun=new THREE.Mesh(geometry,material);
scene.add(sun);

const earthOrbit= new THREE.Object3D();
sun.add(earthOrbit);

const earth=new THREE.Mesh(
    new THREE.SphereGeometry(0.8,32,24),
    new THREE.MeshStandardMaterial({color:0x1E40FF, roughness:0.9}),
)
earth.position.x=6
earthOrbit.add(earth)

const moonOrbit= new THREE.Object3D();
earth.add(moonOrbit);
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.28,32,24),
    new THREE.MeshStandardMaterial({color:0xece1e1, roughness:0.9})
)
moon.position.x=1.6
moonOrbit.add(moon);
const uranusOrbit= new THREE.Object3D();
sun.add(uranusOrbit);


const uranus=new THREE.Mesh(
    new THREE.SphereGeometry(0.9,32,24),
    new THREE.MeshStandardMaterial({color:0x111111, roughness:0.9}),
)
uranus.position.x=9
uranusOrbit.add(uranus)

const mirandaOrbit= new THREE.Object3D();
uranus.add(mirandaOrbit);

const miranda=new THREE.Mesh(
    new THREE.SphereGeometry(0.4,32,24),
    new THREE.MeshStandardMaterial({color:0xffffff, roughness:0.9}),
)
miranda.position.x=1.7
mirandaOrbit.add(miranda);

const saturnOrbit= new THREE.Object3D();
sun.add(saturnOrbit);

const saturn=new THREE.Mesh(
    new THREE.SphereGeometry(1.2,32,24),
    new THREE.MeshStandardMaterial({color:0xDCC7A1, roughness:0.9}),

)
saturn.position.x=14;
saturn.rotation.z=0.4;
saturnOrbit.add(saturn);


const ring=new THREE.Mesh(
    new THREE.RingGeometry(1.6,2.4,64),
    new THREE.MeshStandardMaterial({color:0x9f8a59, roughness:0.9 , side:THREE.DoubleSide}),
)

ring.rotation.x=Math.PI/2;
saturn.add(ring);

const control= new OrbitControls(camera, renderer.domElement);


function animate() {
    requestAnimationFrame(animate);
    control.update();
    earthOrbit.rotation.y += 0.01;
    moonOrbit.rotation.y += 0.04;
    earth.rotation.y += 0.05;
    sun.rotation.y += 0.006;
    uranus.rotation.y += 0.055;
    mirandaOrbit.rotation.y += 0.04;
    saturnOrbit.rotation.y += 0.004;
    saturn.rotation.y += 0.03;

    renderer.render(scene, camera);
}
animate()