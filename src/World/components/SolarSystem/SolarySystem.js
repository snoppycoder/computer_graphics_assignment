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
      this.originalBodies = {};
   }

   createBodies() {
      this.bodies = {}; // initialize container
      

      const sun = new CelestialBody("/assets/models/sun.glb", 0, 0, 0, 0, 0, "sun", (body) => {
         this.add(body.planet);
         const box = new Box3().setFromObject(body.planet);
         const size = new Vector3();
         box.getSize(size);
         
         this.scaleFactor = size.x / 2 / SUN_RADIUS;
         
         
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
               this.originalBodies['mercury'] = {
                  rev: mercury.revPeriod,
                  rot: mercury.rotPeriod
               
               }
               
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
               
               // Res
               this.add(venusBody.planet);
               this.bodies.venus = venus;
               rescaleToRealRadius(venusBody.planet, 6.0518e6, sun.planet);
               this.originalBodies['venus'] = {
                  rev: venus.revPeriod,
                  rot: venus.rotPeriod
               
               }

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
               this.originalBodies['earth'] = {
                  rev: earth.revPeriod,
                  rot: earth.rotPeriod
               
               }
            
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
               this.originalBodies['mars'] = {
                  rev: mars.revPeriod,
                  rot: mars.rotPeriod
               
               }
            
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
               //minor tweak to scale it better
               this.originalBodies['jupiter'] = {
                  rev: jupiter.revPeriod,
                  rot: jupiter.rotPeriod
               
               }
               
            });
             // Saturn
             const saturn = new CelestialBody(
               "/assets/models/saturn.glb",
               (1.433e12 * this.scaleFactor) / reductionFactor,
               (1.433e12 * this.scaleFactor) / reductionFactor,
               929_596_608,
               38_484,
               26.73, "Saturn",
               (saturnBody) => {
                  this.add(saturnBody.planet);
                  this.bodies.saturn = saturn;
                  rescaleToRealRadius(saturnBody.planet, 3.8232e7, sun.planet);
                  this.originalBodies['saturn'] = {
                  rev: saturn.revPeriod,
                  rot: saturn.rotPeriod
               
               }
               }
             );

             // Uranus
             const uranus = new CelestialBody(
               "/assets/models/uranus.glb",
               (2.877e12 * this.scaleFactor) / reductionFactor,
               (2.877e12 * this.scaleFactor) / reductionFactor,
               2_651_370_304,
               -62_064, // retrograde rotation
               97.77, "Uranus",
               (uranusBody) => {
                  this.add(uranusBody.planet);
                  this.bodies.uranus = uranus;
                  rescaleToRealRadius(uranusBody.planet, 2.5362e7, sun.planet);
                  this.originalBodies['uranus'] = {
                  rev: uranus.revPeriod,
                  rot: uranus.rotPeriod
               
               }
               }
             );

             // Neptune
             const neptune = new CelestialBody(
               "/assets/models/neptune.glb",
               (4.503e12 * this.scaleFactor) / reductionFactor,
               (4.503e12 * this.scaleFactor) / reductionFactor,
               5_200_418_560,
               57_996,
               28.32, "Neptune",
               (neptuneBody) => {
                  this.add(neptuneBody.planet);
                  this.bodies.neptune = neptune;
                  rescaleToRealRadius(neptuneBody.planet, 2.4622e7, sun.planet);
                  this.originalBodies['neptune'] = {
                  rev: neptune.revPeriod,
                  rot: neptune.rotPeriod
               
               }
               }
             );

             // Pluto (dwarf planet)
             const pluto = new CelestialBody(
               "/assets/models/pluto.glb",
               (5.906e12 * this.scaleFactor) / reductionFactor,
               (5.906e12 * this.scaleFactor) / reductionFactor,
               7_818_432_640,
               -551_856, // retrograde rotation
               119.61, "Pluto",
               (plutoBody) => {
                  this.add(plutoBody.planet);
                  this.bodies.pluto = pluto;
                  rescaleToRealRadius(plutoBody.planet, 1.1883e6, sun.planet);
                  this.originalBodies['pluto'] = {
                  rev: pluto.revPeriod,
                  rot: pluto.rotPeriod
               
               }
               }
             );
            
            

             


         this.bodies.sun = sun;
      });

      return this.bodies; // even though incomplete initially, gets populated later
   }

   tick(delta) {
      for (const body of Object.values(this.bodies)) {
         body.tick(delta);
      }
   }
   speedAdjustment(percentage) {
 
    

   for (const [name, body] of Object.entries(this.bodies)) {

      const original = this.originalBodies[name];
      
      if (!original) continue;
      body.revPeriod = original.rev / percentage;
      body.rotPeriod = original.rot / percentage;
      console.log(original.rev, body.revPeriod);
   }
}

}

export { SolarSystem };
