import { createCamera } from "./components/camera";
import { createLights } from "./components/lights";
import { createScene } from "./components/scene";
import { SolarSystem } from "./components/SolarSystem/SolarySystem";
import { rayCaster } from "./systems/raycaster.js";
import { Loop } from "./systems/Loop";
import { createOrbitControls } from "./systems/orbitcontrols";
import { createRenderer } from "./systems/renderer";
import { resizer } from "./systems/resizer";
import {createEllipseOrbitLine} from "./components/SolarSystem/orbitLines.js";
import { supernova } from "./simulation/supernova.js";


let camera;
let scene;
let renderer;
let loop;

class World {
   constructor(container) {
      this.setup(container);
      
      // Adding the solar system
   }

   setup(container) {
      camera = createCamera();
      scene = createScene();
      renderer = createRenderer();
      container.append(renderer.domElement);
      loop = new Loop(camera, renderer, scene);
      const solarSystem = new SolarSystem();
      scene.add(solarSystem);
      loop.updatables.push(solarSystem);

      // Setting up light from the Sun and ambient lighting
      this.lights = createLights();
      scene.add(this.lights.sunPointLight, this.lights.ambientLight);

      // Setting up orbit controls
      this.orbitControls = createOrbitControls(camera, renderer.domElement);
      loop.updatables.push(this.orbitControls);

      resizer(container, camera, renderer);

      // Setting up camera
      camera.position.set(0, 500, 800);
      scene.add(camera);

      renderer.domElement.addEventListener("click", (event) => {
         rayCaster(camera, event, scene, this.orbitControls, loop);
      });
         solarSystem.ready.then(() => {
            const planetNames = [ "mercury", "venus", "earth", "mars", "jupiter", "saturn", 
               "uranus", "neptune", "pluto"
            ];

            
            for (const name of planetNames) {
               const body = solarSystem.bodies[name];
               if (!body || !body.a || !body.b) continue; // just incase
               if (!scene.getObjectByName(`${name}orbit`)) {
                  const orbit = createEllipseOrbitLine(body.a, body.b);
                  orbit.name = name + "orbit"
                  scene.add(orbit);

               }
            }
         });
         document.getElementById("toggle").addEventListener("change", (event) => {
         scene.traverse((child) => {
            if (child.name.endsWith("orbit")) {
               child.visible =  event.target.checked;;
               }
            });
         });
        

  
      

      document.getElementById("closeDrawerBtn").addEventListener("click", () => {
         document.getElementById("descriptionDrawer").style.transform = "translateX(100%)";
      });
      
      const slider = document.getElementById('speed-slider');
      const label =  document.querySelector('#speed-value');
      slider.addEventListener('input', (event) => {
         label.textContent = event.target.value;
         const raw = parseFloat(event.target.value);    
         const normalized = raw / 100;                   

         solarSystem.speedAdjustment(normalized);
         

      })

   }
   start() {
      loop.start();
   }
   stop() {
      loop.stop();
   }
}

export { World };
