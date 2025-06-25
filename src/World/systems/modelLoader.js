import { GLTFLoader } from "three/examples/jsm/Addons.js";

function loadModel(url, name) {
   const loader = new GLTFLoader();

   return new Promise((resolve, reject) => {
      loader.load(
         url,
         (gltf) => {
            const model = gltf.scene;
            model.traverse(( child ) => {
               if (child.isMesh) {
                  child.name = name; // Set a name for the mesh
               }
            });
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
