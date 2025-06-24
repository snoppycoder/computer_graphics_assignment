import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
const tiltInDegrees = 23.5;
import * as THREE from 'three';
const tiltInRadians = THREE.MathUtils.degToRad(tiltInDegrees);

export function createPlanet(name, distanceFromSun, url, rotationPeriod) {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {     
    loader.load(url, (gltf) => {
        const planet = gltf.scene;
        planet.name = name;
        planet.rotateX(tiltInRadians); 
        planet.rotationPeriod = rotationPeriod;
        const angle = Math.random() * Math.PI;
        const x = Math.cos(angle) * distanceFromSun;
        const z = Math.sin(angle) * distanceFromSun;
        planet.position.set(x, 0, z); // trial to make them seem in a single file
        const orbitGroup = new THREE.Group();
        orbitGroup.add(planet);
        orbitGroup.userData.planet = planet;
        resolve(orbitGroup);

    }, undefined, (error) => {
        console.error(`Error loading celestial body ${name}:`, error);
        reject(error);
    });
    });
}
export function createSun() {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) =>{
        loader.load('asset/model/sun.glb', (gltf) => {
            const model = gltf.scene;
            model.name = 'Sun';
            model.scale.set(1, 1, 1);
            model.position.set(0, 0, 0);
            resolve(model);
        }, undefined, (error) => {
            console.error('Error loading sun model:', error);
            reject(error);
        
        });
    });

}