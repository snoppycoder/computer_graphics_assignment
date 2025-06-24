import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createSun, createPlanet} from './celestialBodies.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 250);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 

const container = document.getElementById('canvas_');
container.appendChild(renderer.domElement);

const loader = new RGBELoader();
loader.load('/asset/hdri/background.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
},
(xhr) => {
    // this is actually good might add it inside as a loader later on
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
},
(error) => {
    console.error('An error occurred while loading the HDR texture:', error);
  
});
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);


createSun().then((sun) => {
    scene.add(sun);
    const box = new THREE.Box3().setFromObject(sun);
    console.log('Sun bounding box:', box);
    console.log('Sun bounding box min:', box.min);
    console.log('Sun bounding box max:', box.max);

    const size = box.getSize(new THREE.Vector3());
    console.log('Sun size:', size);
});
// let us also add a source of light to the scene
const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
pointLight.position.set(0, 0, 0);
createPlanet("Mercury", 200, 'asset/model/mercury.glb', 58.6).then((mercury) => {
    mercury.scale.set(0.06, 0.06, 0.06);
    scene.add(mercury);
    
})



window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });



function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();