import { EquirectangularReflectionMapping, Scene } from "three";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { manager } from "../systems/loadingManager";

function createScene() {
   const scene = new Scene();
   const loader = new RGBELoader(manager);

   // Loads the background image into the scene
   loader.load(
      "../../../assets/hdri/background.hdr",
      (texture) => {
         texture.mapping = EquirectangularReflectionMapping;
         scene.background = texture;
         scene.environment = texture;
      },
      // (xhr) => {
      //    // console.log(
      //    //    // (xhr.loaded / xhr.total) * 100 + "% loaded"
      //    // );
      // },
      undefined,
      (error) => {
         console.log("An error occured while loading the HDR texture", error);
      }
   );
   return scene;
}
export { createScene };
