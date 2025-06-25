import { GLTFLoader } from "three/examples/jsm/Addons.js";

function loadModel(url) {
   const loader = new GLTFLoader();

   return new Promise((resolve, reject) => {
      loader.load(
         url,
         (gltf) => {
            const model = gltf.scene;
            resolve(model);
         },
         undefined,
         (error) => {
            console.error("Could not load model");
            reject(error);
         }
      );
   });
}

export { loadModel };
