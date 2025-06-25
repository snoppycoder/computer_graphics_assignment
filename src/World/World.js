import { createCamera } from "./components/camera";
import { createLights } from "./components/lights";
import { createScene } from "./components/scene";

import { Loop } from "./systems/Loop";
import { createOrbitControls } from "./systems/orbitcontrols";
import { createRenderer } from "./systems/renderer";
import { resizer } from "./systems/resizer";

let camera;
let scene;
let renderer;
let loop;

class World {
   constructor(container) {
      camera = createCamera();
      scene = createScene();
      renderer = createRenderer();
      container.append(renderer.domElement);
      loop = new Loop(camera, renderer, scene);

      // Setting up light from the Sun and ambient lighting
      const lights = createLights();
      scene.add(lights.sunPointLight, lights.ambientLight);

      // Setting up orbit controls
      const orbitControls = createOrbitControls(camera, renderer.domElement);

      resizer(container, camera, renderer);

      // Setting up camera
      camera.position.set(0, 0, 1000);
      scene.add(camera);
   }
   start() {
      loop.start();
   }
   stop() {
      loop.stop();
   }
}

export { World };
