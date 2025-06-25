import { PerspectiveCamera } from "three";

function createCamera() {
   const camera = new PerspectiveCamera(75, 0.1, 0.1, 5000);
   return camera;
}

export { createCamera };
