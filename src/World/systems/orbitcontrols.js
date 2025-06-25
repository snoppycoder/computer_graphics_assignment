import { OrbitControls } from "three/examples/jsm/Addons.js";

function createOrbitControls(camera, canvas) {
   const orbitControls = new OrbitControls(camera, canvas);
   orbitControls.enableDamping = true;
   orbitControls.listenToKeyEvents(window);
   orbitControls.tick = () => orbitControls.update();
   return orbitControls;
}

export { createOrbitControls };
