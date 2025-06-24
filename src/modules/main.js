import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createSun, createPlanet} from './celestialBodies.js';

const scene = new THREE.Scene();

let timeLapse = 10; 
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const orbitGroups = [];
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
scene.add(sunLight);
createPlanet("Mercury", 200, 'asset/model/mercury.glb', 58.6).then((mercuryGroup) => {
    const mercury = mercuryGroup.userData.planet;
    mercury.scale.set(0.08, 0.08, 0.08);
    const planetLight = new THREE.PointLight('white', 2, 1000);
    planetLight.position.set(mercury.position.x, mercury.position.y, mercury.position.z );
    orbitGroups.push(mercuryGroup);
    scene.add(planetLight);
    scene.add(mercuryGroup);
    
});
createPlanet("Venus", 300, 'asset/model/venus.glb', 58.6).then((venusGroup) => {
    const venus = venusGroup.userData.planet;
    venus.scale.set(0.08, 0.08, 0.08);
    const planetLight = new THREE.PointLight('white', 2, 1000);
    planetLight.position.set(venus.position.x, venus.position.y, venus.position.z );
    orbitGroups.push(venusGroup);
    scene.add(planetLight);
    scene.add(venusGroup);
    
});
createPlanet("Earth", 400, 'asset/model/earth.glb', 58.6).then((earthGroup) => {
    const earth = earthGroup.userData.planet;
    earth.scale.set(0.08, 0.08, 0.08);
    const planetLight = new THREE.PointLight('white', 5, 1000);
    planetLight.position.set(earth.position.x, earth.position.y, earth.position.z );
    orbitGroups.push(earthGroup);
    scene.add(planetLight);
    scene.add(earthGroup);
    
});
createPlanet("Mars", 500, 'asset/model/mars.glb', 58.6).then((marsGroup) => {
    const mars = marsGroup.userData.planet;
    mars.scale.set(0.08, 0.08, 0.08);
    const planetLight = new THREE.PointLight('white', 2, 1000);
    planetLight.position.set(mars.position.x, mars.position.y, mars.position.z );

    orbitGroups.push(marsGroup);
    scene.add(planetLight);
    scene.add(marsGroup);

    
});
createPlanet("Jupiter", 600, 'asset/model/jupiter.glb', 58.6).then((jupiterGroup) => {
    const jupiter = jupiterGroup.userData.planet;
    jupiter.scale.set(0.08, 0.08, 0.08);
    orbitGroups.push(jupiterGroup);
    const planetLight = new THREE.PointLight('white', 2, 1000);
    planetLight.position.set(jupiter.position.x, jupiter.position.y, jupiter.position.z );
    scene.add(jupiterGroup);
    scene.add(planetLight);
});




window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

// const clock = new THREE.Clock();


function animate() {
  
  
  requestAnimationFrame(animate);
    // const delta = clock.getDelta();
    orbitGroups.forEach((group) => {
    
    group.rotation.y += 0.001 * timeLapse;

    // Rotation: spin the planet itself
    // const planet = group.userData.planet;
    // const rotationPeriod = planet.rotationPeriod;
    // planet.rotation.y += ((2 * Math.PI) / (rotationPeriod * 24 * 60 * 60)) * timeLapse * 24 * 60 * 60;
  });
  controls.update();
  renderer.render(scene, camera);
}
animate();