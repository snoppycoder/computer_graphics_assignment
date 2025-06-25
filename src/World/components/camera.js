import { PerspectiveCamera } from "three";

function createCamera() {
   const camera = new PerspectiveCamera(75, 0.1, 0.1, 15000);
   return camera;
}

export { createCamera };
