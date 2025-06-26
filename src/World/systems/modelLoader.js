import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { manager } from "./loadingManager";

const loader = new GLTFLoader(manager);

function loadModel(url, name) {
   return new Promise((resolve, reject) => {
      loader.load(
         url,
         (gltf) => {
            const model = gltf.scene;
            model.traverse((child) => {
               if (child.isMesh) {
                  child.name = name; // Set a name for the mesh
               }
            });
            resolve(model);
         },
         (xhr) => {
            if (xhr.lengthComputable) {
               const percent = (xhr.loaded / xhr.total) * 100;
               document.getElementById("loader_text").innerText = `Loading ${Math.floor(percent)}%`;
               document.getElementById("progress-bar-individual").style.width = `${percent}%`;
            }
         },
         (error) => {
            console.error("Could not load model");
            reject(error);
         }
      );
   });
}

export { loadModel };
