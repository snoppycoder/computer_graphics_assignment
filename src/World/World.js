import { createCamera } from "./components/camera";
import { createLights } from "./components/lights";
import { createScene } from "./components/scene";
import { SolarSystem } from "./components/SolarSystem/SolarySystem";
import { rayCaster } from "./systems/raycaster.js";
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
      this.setup(container);
      // Adding the solar system
      const solarSystem = new SolarSystem();
      
      

      scene.add(solarSystem);
      loop.updatables.push(solarSystem);
      
     
   }
   

   setup(container) {
      camera = createCamera();
      scene = createScene();
      renderer = createRenderer();
      container.append(renderer.domElement);
      loop = new Loop(camera, renderer, scene);
      const solarSystem = new SolarSystem();
     

      // Setting up light from the Sun and ambient lighting
      this.lights = createLights();
      scene.add(this.lights.sunPointLight, this.lights.ambientLight);

      // Setting up orbit controls
      this.orbitControls = createOrbitControls(camera, renderer.domElement);
      loop.updatables.push(this.orbitControls);

      resizer(container, camera, renderer);

      // Setting up camera
      camera.position.set(0, 900, 950);
      scene.add(camera);

     renderer.domElement.addEventListener("click", (event) => {
  rayCaster(camera, event, scene, this.orbitControls);
});
   }

   start() {
      loop.start();
   }
   stop() {
      loop.stop();
   }
}

export { World };
