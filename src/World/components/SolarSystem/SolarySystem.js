import { Group } from "three";
import { Box3, Vector3 } from "three";
import { CelestialBody } from "./CelestialBody";
import { rescale } from "./rescale";
const SUN_RADIUS = 6.9634e8; // in meters
const reductionFactor = 40;

class SolarSystem extends Group {
   constructor() {
      super();
      this.bodies = this.createBodies();
   }

   createBodies() {
      this.bodies = {}; // initialize container

      const sun = new CelestialBody("/assets/models/sun.glb", 0, 0, 0, 0, 0, "sun", (body) => {
         this.add(body.planet);
         const box = new Box3().setFromObject(body.planet);
         const size = new Vector3();
         box.getSize(size);
         this.scaleFactor = size.x / 2 / SUN_RADIUS;

         // Mercury (2.4397e6 m)
         const mercury = new CelestialBody(
            "/assets/models/mercury.glb",
            (5.79e10 * this.scaleFactor) / reductionFactor,
            (5.79e10 * this.scaleFactor) / reductionFactor,
            7_600_543,
            5_067,
            0.034,
            "Mercury",
            (mercuryBody) => {
               rescale(mercuryBody.planet, 2.4397e6, sun.planet);
               this.add(mercuryBody.planet);
               this.bodies.mercury = mercury;
            }
         );

         // Venus (6.0518e6 m)
         const venus = new CelestialBody(
            "/assets/models/venus.glb",
            (1.082e11 * this.scaleFactor) / reductionFactor,
            (1.082e11 * this.scaleFactor) / reductionFactor,
            19_414_149,
            -20_992,
            177.4,
            "Venus",
            (venusBody) => {
               rescale(venusBody.planet, 6.0518e6, sun.planet);
               this.add(venusBody.planet);
               this.bodies.venus = venus;
            }
         );

         // Earth (6.371e6 m)
         const earth = new CelestialBody(
            "/assets/models/earth.glb",
            (1.496e11 * this.scaleFactor) / reductionFactor,
            (1.496e11 * this.scaleFactor) / reductionFactor,
            31_557_600,
            86_164,
            23.44,
            "Earth",
            (earthBody) => {
               rescale(earthBody.planet, 6.371e6, sun.planet);
               this.add(earthBody.planet);
               this.bodies.earth = earth;
            }
         );

         // Mars (3.3895e6 m)
         const mars = new CelestialBody(
            "/assets/models/mars.glb",
            (2.279e11 * this.scaleFactor) / reductionFactor,
            (2.279e11 * this.scaleFactor) / reductionFactor,
            59_354_032,
            88_642,
            25.19,
            "Mars",
            (marsBody) => {
               rescale(marsBody.planet, 3.3895e6, sun.planet);
               this.add(marsBody.planet);
               this.bodies.mars = mars;
            }
         );

         // Jupiter (6.9911e7 m)
         const jupiter = new CelestialBody(
            "/assets/models/jupiter.glb",
            (7.785e11 * this.scaleFactor) / reductionFactor,
            (7.785e11 * this.scaleFactor) / reductionFactor,
            374_335_776,
            35_730,
            3.13,
            "Jupiter",
            (jupiterBody) => {
               rescale(jupiterBody.planet, 6.9911e7, sun.planet);
               this.add(jupiterBody.planet);
               this.bodies.jupiter = jupiter;
            }
         );
         // Saturn
         const saturn = new CelestialBody(
            "/assets/models/saturn.glb",
            (1.429e12 * this.scaleFactor) / reductionFactor,
            (1.429e12 * this.scaleFactor) / reductionFactor,
            929_596_608,
            38_362,
            26.73,
            "Saturn",
            (saturnBody) => {
               rescale(saturnBody.planet, 5.8232e7, sun.planet);
               this.add(saturnBody.planet);
               this.bodies.saturn = saturn;
            }
         );

         // Uranus
         const uranus = new CelestialBody(
            "/assets/models/uranus.glb",
            (2.871e12 * this.scaleFactor) / reductionFactor,
            (2.871e12 * this.scaleFactor) / reductionFactor,
            2_651_370_880,
            -61_200,
            97.77,
            "Uranus",
            (uranusBody) => {
               rescale(uranusBody.planet, 2.5362e7, sun.planet);
               this.add(uranusBody.planet);
               this.bodies.uranus = uranus;
            }
         );

         // Neptune
         const neptune = new CelestialBody(
            "/assets/models/neptune.glb",
            (4.495e12 * this.scaleFactor) / reductionFactor,
            (4.495e12 * this.scaleFactor) / reductionFactor,
            5_200_418_560,
            57_996,
            28.32,
            "Neptune",
            (neptuneBody) => {
               rescale(neptuneBody.planet, 2.4622e7, sun.planet);
               this.add(neptuneBody.planet);
               this.bodies.neptune = neptune;
            }
         );

         // Pluto
         const pluto = new CelestialBody(
            "/assets/models/pluto.glb",
            (5.906e12 * this.scaleFactor) / reductionFactor,
            (5.906e12 * this.scaleFactor) / reductionFactor,
            7_815_600_000,
            -55_200,
            119.61,
            "Pluto",
            (plutoBody) => {
               rescale(plutoBody.planet, 1.1883e6, sun.planet);
               this.add(plutoBody.planet);
               this.bodies.pluto = pluto;
            }
         );
         this.bodies.sun = sun;
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
