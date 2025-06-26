import { Group } from "three";
import { Box3, Vector3 } from "three";
import { CelestialBody } from "./CelestialBody";
import {rescaleToRealRadius} from "./rescale";
const SUN_RADIUS = 6.9634e8; // in meters
const reductionFactor = 10;
const multiplicationFactor = 3000000;

class SolarSystem extends Group {
   constructor() {
      super();
      this.bodies = this.createBodies();
   }
   getTotalSize() {
   const box = new Box3().setFromObject(this);
   const size = new Vector3();
   box.getSize(size);
   return size; // this is a Vector3 representing width (x), height (y), depth (z)
}

   waitUntilReady() {
   return new Promise((resolve) => {
      const checkIfAllLoaded = () => {
         const allLoaded = Object.values(this.bodies).every(body => body?.planet);
         if (allLoaded) {
            resolve(this);
         } else {
            setTimeout(checkIfAllLoaded, 100); // wait 100ms and check again
         }
      };
      checkIfAllLoaded();
   });
}

   createBodies() {
      this.bodies = {}; // initialize container

      const sun = new CelestialBody("/assets/models/sun.glb", 0, 0, 0, 0, 0, "Sun", (body) => {
         this.add(body.planet);

         // Compute scaleFactor using sun's bounding box
         const box = new Box3().setFromObject(body.planet);
         const size = new Vector3();
         box.getSize(size);
         // console.log("Sun size:", size);
         this.scaleFactor = size.x / 2 / SUN_RADIUS;
         // sun.planet.scale.set(size.x*2, size.y*2, size.z*2);
         
         // Mercury
         const mercury = new CelestialBody(
            "/assets/models/mercury.glb",
            (5.79e10 * this.scaleFactor) / reductionFactor,
            (5.79e10 * this.scaleFactor) / reductionFactor,
            7_600_543,
            5_067,
            0.034, "Mercury", 
            (mercuryBody) => {
               this.add(mercuryBody.planet);
               this.bodies.mercury = mercury;
               rescaleToRealRadius(mercuryBody.planet, 2.4397e6, sun.planet);
              
            }
         );

         // Venus
         const venus = new CelestialBody(
            "/assets/models/venus.glb",
            (1.082e11 * this.scaleFactor) / reductionFactor,
            (1.082e11 * this.scaleFactor) / reductionFactor,
            19_414_149,
            -20_992, // retrograde rotation
            177.4, "Venus",
            (venusBody) => {
               rescaleToRealRadius(venusBody.planet, 6.0518e6, sun.planet);
               
               // Res
               this.add(venusBody.planet);
               this.bodies.venus = venus;
               const box = new Box3().setFromObject(venusBody.planet);
               const size = new Vector3();
               box.getSize(size);
              
            }
         );

         const earth = new CelestialBody(
            "/assets/models/earth.glb",
            (1.496e11 * this.scaleFactor) / reductionFactor,
            (1.496e11 * this.scaleFactor) / reductionFactor,
            31_557_600,
            86_164,
            23.44, "Earth",
            (earthBody) => {
               this.add(earthBody.planet);
               this.bodies.earth = earth;
               rescaleToRealRadius(earthBody.planet, 6.371e6, sun.planet);
               
            }
         );
         // Mars
         const mars = new CelestialBody(
            "/assets/models/mars.glb",
            (2.279e11 * this.scaleFactor) / reductionFactor,
            (2.279e11 * this.scaleFactor) / reductionFactor,
            59_354_032,
            88_642,
            25.19, "Mars",
            (marsBody) => {
               this.add(marsBody.planet);
               this.bodies.mars = mars;
               rescaleToRealRadius(marsBody.planet, 3.3895e6, sun.planet);
             
            }
         );

         // Jupiter
         const jupiter = new CelestialBody(
            "/assets/models/jupiter.glb",
            (7.785e11 * this.scaleFactor) / reductionFactor,
            (7.785e11 * this.scaleFactor) / reductionFactor,
          
            374_335_776,
            35_730,
            3.13, "Jupiter",
            (jupiterBody) => {
               this.add(jupiterBody.planet);
               this.bodies.jupiter = jupiter;
               rescaleToRealRadius(jupiterBody.planet, 3.9911e7, sun.planet);
               const jupiterPosition = new Vector3();
               jupiterBody.planet.getWorldPosition(jupiterPosition);

               //minor tweak to scale it better
              
            }
         );
         // Saturn
         const saturn = new CelestialBody(
            "/assets/models/saturn.glb",
            (1.429e12 * this.scaleFactor) / reductionFactor,
            (1.429e12 * this.scaleFactor) / reductionFactor,
            929_596_728,
            29_457,
            26.73, "Saturn",
            (saturnBody) => {
               this.add(saturnBody.planet);
               this.bodies.saturn = saturn;
               rescaleToRealRadius(saturnBody.planet, 5.8232e7, sun.planet);
              
            }
         );
         // Uranus
         const uranus = new CelestialBody(
            "/assets/models/uranus.glb",
            (2.871e12 * this.scaleFactor) / reductionFactor,
            (2.871e12 * this.scaleFactor) / reductionFactor,
            2_555_888_000,
            -25_559, // retrograde rotation
            97.77, "Uranus",
            (uranusBody) => {
               this.add(uranusBody.planet);
               this.bodies.uranus = uranus;
               rescaleToRealRadius(uranusBody.planet, 2.5362e7, sun.planet);
             
            }
         );
         // Neptune
         const neptune = new CelestialBody(
            "/assets/models/neptune.glb",
            (4.495e12 * this.scaleFactor) / reductionFactor,
            (4.495e12 * this.scaleFactor) / reductionFactor,
            1_674_888_000,
            24_865, // retrograde rotation
            28.32, "Neptune",
            (neptuneBody) => {
               this.add(neptuneBody.planet);
               this.bodies.neptune = neptune;
               rescaleToRealRadius(neptuneBody.planet, 2.4622e7, sun.planet);
               
            }
         );
         // Pluto
         const pluto = new CelestialBody(
            "/assets/models/pluto.glb",
            (5.906e12 * this.scaleFactor) / reductionFactor,
            (5.906e12 * this.scaleFactor) / reductionFactor,
            7_885_000_000,
            60_190, // retrograde rotation
            122.53, "Pluto",
            (plutoBody) => {
               this.add(plutoBody.planet);
               this.bodies.pluto = pluto;
               rescaleToRealRadius(plutoBody.planet, 1.1883e6, sun.planet);
             

              
               
            }
            

         );
        

      });
   

      return this.bodies; 
   }

   tick(delta) {
      for (const body of Object.values(this.bodies)) {
         body.tick(delta);
      }
   }
   
}

export { SolarSystem };
