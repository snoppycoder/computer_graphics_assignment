import { PointLight, AmbientLight } from "three";

function createLights() {
   const sunPointLight = new PointLight("white", 10000000);
   const ambientLight = new AmbientLight("white", 1);

   return { sunPointLight, ambientLight };
}

export { createLights };
