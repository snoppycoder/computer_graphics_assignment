import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
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
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
camera.position.set(0, 0, 5);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();