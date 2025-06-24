import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createSun, createPlanet} from './celestialBodies.js';
const scene = new THREE.Scene();
let timeLapse = 1; 
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const rotatingPlanet = [];
camera.position.set(0, 0, 400);
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

const sunLight = new THREE.PointLight(0xffffff, 5, 0);

sunLight.position.set(0, 0, 0);
createPlanet("Mercury", 200, 'asset/model/mercury.glb', 58.6).then((mercury) => {
    mercury.scale.set(0.08, 0.08, 0.08);
    // const planetLight = new THREE.PointLight('white', 2, 1000);
    // planetLight.position.set(mercury.position.x, mercury.position.y, mercury.position.z )
    scene.add(mercury);
    rotatingPlanet.push(mercury);
    
});
createPlanet("Venus", 300, 'asset/model/mercury.glb', 58.6).then((venus) => {
    venus.scale.set(0.08, 0.08, 0.08);
    rotatingPlanet.push(venus);
    scene.add(venus);
    
});
createPlanet("Earth", 400, 'asset/model/mercury.glb', 58.6).then((earth) => {
    earth.scale.set(0.08, 0.08, 0.08);
    rotatingPlanet.push(earth);
    scene.add(earth);
    
});
createPlanet("Mars", 500, 'asset/model/mercury.glb', 58.6).then((mars ) => {
    mars.scale.set(0.08, 0.08, 0.08);
    rotatingPlanet.push(mars);
    scene.add(mars);
    
});
createPlanet("Jupiter", 600, 'asset/model/mercury.glb', 58.6).then((jupiter) => {
    jupiter.scale.set(0.08, 0.08, 0.08);
    rotatingPlanet.push(jupiter);
    scene.add(jupiter);
});
const tiltInDegrees = 23.5;
const tiltInRadians = THREE.MathUtils.degToRad(tiltInDegrees);


const axis = new THREE.Vector3(0, 0, 0)








window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

// const clock = new THREE.Clock();


function animate() {
  
  
  requestAnimationFrame(animate);
    // const delta = clock.getDelta();
    rotatingPlanet.forEach((planet) => {
        planet.rotation.y += ((2*Math.PI)/(planet.rotationPeriod * 24 * 60 * 60) * (timeLapse)*24 * 60 * 60); // rotation period in seconds
        planet.rotateX(tiltInRadians);
    });
  controls.update();
  renderer.render(scene, camera);
}
animate();