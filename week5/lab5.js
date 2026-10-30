import * as THREE from 'three';
import {OrbitControls} from "three/addons";
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

const positions = new Float32Array([
    0,1.5,0,
    0,-1.5,0,
    1,0,0,
    0,0,1,
    -1,0,0,
    0,0,-1

]);

const index=[
    0,3,2,
    0,4,3,
    0,5,4,
    0,2,5,
    1,2,3,
    1,3,4,
    1,4,5,
    1,5,2

]
const geometry=new THREE.BufferGeometry()
geometry.setAttribute('position',new THREE.BufferAttribute(positions,3))
geometry.setIndex(index)
geometry.computeVertexNormals()

const mesh=new THREE.Mesh(geometry,
    new THREE.MeshStandardMaterial({color:0x66aaff,roughness:0.4}));
scene.add(mesh);

const nonIndexed=geometry.toNonIndexed();
nonIndexed.computeVertexNormals()

console.log('vertices',geometry.attributes.positions.count,'faces',index.length/3);
console.log('vertices',nonIndexed.attributes.positions.count,'faces',index.length/3);

window.addEventListener('keydown',(e)=>{
    if (e.key=== 'f'){
        if(mesh.geometry===geometry){
            mesh.geometry=nonIndexed;
        }else{
        mesh.geometry=geometry;
        }
    }
})
const controls = new OrbitControls(camera,renderer.domElement);

function animate() {

    requestAnimationFrame(animate);
    mesh.rotation.y += 0.01;

    controls.update();


    renderer.render(scene,camera);
}
animate();