import { PointLight, AmbientLight } from "three";

function createLights() {
   const sunPointLight = new PointLight("white", 5000000);
   const ambientLight = new AmbientLight("white", 1);

   return { sunPointLight, ambientLight };
}

export { createLights };
