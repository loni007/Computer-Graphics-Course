import * as THREE from 'three';
import {GLTFLoader, OrbitControls} from "three/addons";

const scene=new THREE.Scene();
scene.background=new THREE.Color(0xcccccc)
const camera = new THREE.PerspectiveCamera(55,
    window.innerWidth / window.innerHeight,
    0.1,100)
camera.position.set(3,2,4);

const renderer= new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff,0.35);
const directionalLight = new THREE.DirectionalLight(0xffffff,2.5);
directionalLight.position.set(5,8,4);
scene.add(directionalLight);
scene.add(ambientLight);

const loader=  new GLTFLoader();
loader.load('model.glb', (gltf)=>{

    gltf.scene.rotation.y = Math.PI;
    scene.add(gltf.scene)
})
//in console show meshes vertices faces


const controls = new OrbitControls(camera,renderer.domElement);

function animate() {

    requestAnimationFrame(animate);


    controls.update();


    renderer.render(scene,camera);
}
animate();