import { Group } from "three";
import { Box3, Vector3 } from "three";
import { CelestialBody } from "./CelestialBody";

const SUN_RADIUS = 6.9634e8; // in meters
const reductionFactor = 10;
const multiplicationFactor = 3000000;

class SolarSystem extends Group {
   constructor() {
      super();
      this.bodies = this.createBodies();
   }

   createBodies() {
      this.bodies = {}; // initialize container

      const sun = new CelestialBody("../../../../assets/models/sun.glb", 0, 0, 0, 0, (body) => {
         this.add(body.planet);

         // Compute scaleFactor using sun's bounding box
         const box = new Box3().setFromObject(body.planet);
         const size = new Vector3();
         box.getSize(size);
         this.scaleFactor = size.x / 2 / SUN_RADIUS;

         // Mercury
         const mercury = new CelestialBody(
            "../../../../assets/models/mercury.glb",
            (5.79e10 * this.scaleFactor) / reductionFactor,
            (5.79e10 * this.scaleFactor) / reductionFactor,
            7_600_543,
            5_067,
            (mercuryBody) => {
               this.add(mercuryBody.planet);
               this.bodies.mercury = mercury;
               mercuryBody.planet.scale.set(
                  this.scaleFactor * multiplicationFactor,
                  this.scaleFactor * multiplicationFactor,
                  this.scaleFactor * multiplicationFactor
               );
            }
         );

         // Venus
         const venus = new CelestialBody(
            "../../../../assets/models/venus.glb",
            (1.082e11 * this.scaleFactor) / reductionFactor,
            (1.082e11 * this.scaleFactor) / reductionFactor,
            19_414_149,
            -20_992, // retrograde rotation
            (venusBody) => {
               this.add(venusBody.planet);
               this.bodies.venus = venus;
               venusBody.planet.scale.set(
                  this.scaleFactor * multiplicationFactor,
                  this.scaleFactor * multiplicationFactor,
                  this.scaleFactor * multiplicationFactor
               );
            }
         );

         const earth = new CelestialBody(
            "../../../../assets/models/earth.glb",
            (1.496e11 * this.scaleFactor) / reductionFactor,
            (1.496e11 * this.scaleFactor) / reductionFactor,
            31_557_600,
            86_164,
            (earthBody) => {
               this.add(earthBody.planet);
               this.bodies.earth = earth;
               earthBody.planet.scale.set(
                  this.scaleFactor * multiplicationFactor,
                  this.scaleFactor * multiplicationFactor,
                  this.scaleFactor * multiplicationFactor
               );
            }
         );
         // Mars
         const mars = new CelestialBody(
            "../../../../assets/models/mars.glb",
            (2.279e11 * this.scaleFactor) / reductionFactor,
            (2.279e11 * this.scaleFactor) / reductionFactor,
            59_354_032,
            88_642,
            (marsBody) => {
               this.add(marsBody.planet);
               this.bodies.mars = mars;
               marsBody.planet.scale.set(
                  this.scaleFactor * multiplicationFactor,
                  this.scaleFactor * multiplicationFactor,
                  this.scaleFactor * multiplicationFactor
               );
            }
         );

         // Jupiter
         const jupiter = new CelestialBody(
            "../../../../assets/models/jupiter.glb",
            (7.785e11 * this.scaleFactor) / reductionFactor,
            (7.785e11 * this.scaleFactor) / reductionFactor,
            374_335_776,
            35_730,
            (jupiterBody) => {
               this.add(jupiterBody.planet);
               this.bodies.jupiter = jupiter;
               jupiterBody.planet.scale.set(
                  this.scaleFactor * multiplicationFactor,
                  this.scaleFactor * multiplicationFactor,
                  this.scaleFactor * multiplicationFactor
               );
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
}

export { SolarSystem };
