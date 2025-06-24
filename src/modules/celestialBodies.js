import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

export function createPlanet(name, distanceFromSun, url, rotationPeriod) {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {     
    loader.load(url, (gltf) => {
        const model = gltf.scene;
        model.name = name;
        model.rotationPeriod = rotationPeriod;
        model.position.set(distanceFromSun, 0, 0);
        resolve(model);
    }, undefined, (error) => {
        console.error(`Error loading celestial body ${name}:`, error);
        reject(error);
    });
    });
}
export function createSun() {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) =>{
        loader.load('../model/sun.glb', (gltf) => {
            const model = gltf.scene;
            model.name = 'Sun';
            model.scale.set(10, 10, 10);
            model.position.set(0, 0, 0);
            resolve(model);
        }, undefined, (error) => {
            console.error('Error loading sun model:', error);
            reject(error);
        
        });
    });
}