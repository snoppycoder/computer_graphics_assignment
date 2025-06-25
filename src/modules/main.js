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

// Uranus
createPlanet("Uranus", 700, 'asset/model/uranus.glb', 58.6).then((uranusGroup) => {
    const uranus = uranusGroup.userData.planet;
    uranus.scale.set(0.08, 0.08, 0.08);
    // Apply Uranus's unique axial tilt (about 98 degrees)
    uranus.rotation.z = THREE.MathUtils.degToRad(98);
    // Add rings to Uranus
    const ringGeometry = new THREE.RingGeometry(0.11, 0.16, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xcccccc,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2; // Lay flat
    ring.position.y = 0.01; // Slightly above the planet
    uranus.add(ring);
    orbitGroups.push(uranusGroup);
    const planetLight = new THREE.PointLight('white', 2, 1000);
    planetLight.position.set(uranus.position.x, uranus.position.y, uranus.position.z );
    scene.add(uranusGroup);
    scene.add(planetLight);
    // Store reference for interactivity
    uranus.userData.isUranus = true;
});

// Raycaster and info popup for Uranus
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function showUranusInfo() {
    let info = document.getElementById('uranus-info-popup');
    if (!info) {
        info = document.createElement('div');
        info.id = 'uranus-info-popup';
        info.style.position = 'absolute';
        info.style.top = '30px';
        info.style.right = '30px';
        info.style.background = 'rgba(30,40,60,0.95)';
        info.style.color = '#fff';
        info.style.padding = '18px 24px';
        info.style.borderRadius = '12px';
        info.style.zIndex = 1000;
        info.style.fontFamily = 'sans-serif';
        info.innerHTML = `
            <h2>Uranus</h2>
            <ul>
                <li><b>Distance from Sun:</b> 2.87 billion km</li>
                <li><b>Diameter:</b> 50,724 km</li>
                <li><b>Axial Tilt:</b> 98° (rolls on its side!)</li>
                <li><b>Rings:</b> 13 known faint rings</li>
                <li><b>Fun Fact:</b> Uranus was the first planet discovered with a telescope.</li>
            </ul>
            <button id="close-uranus-info">Close</button>
        `;
        document.body.appendChild(info);
        document.getElementById('close-uranus-info').onclick = () => info.remove();
    }
}

function highlightUranus(uranus) {
    uranus.scale.set(0.11, 0.11, 0.11);
    setTimeout(() => {
        uranus.scale.set(0.08, 0.08, 0.08);
    }, 800);
}

renderer.domElement.addEventListener('pointerdown', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    // Only check Uranus
    let uranusMesh = null;
    for (const group of orbitGroups) {
        const planet = group.userData.planet;
        if (planet && planet.userData.isUranus) {
            uranusMesh = planet;
            break;
        }
    }
    if (uranusMesh) {
        const intersects = raycaster.intersectObject(uranusMesh, true);
        if (intersects.length > 0) {
            highlightUranus(uranusMesh);
            showUranusInfo();
        }
    }
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