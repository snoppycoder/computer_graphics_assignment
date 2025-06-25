import { Group } from "three";
import { CelestialBody } from "./CelestialBody";

class SolarSystem extends Group {
   constructor() {
      super();
      this.bodies = this.createBodies();
   }

   createBodies() {
      const sun = new CelestialBody("../../../../assets/models/sun.glb", 0, 0, (body) => {
         this.add(body.planet);
      });
      return { sun };
   }

   tick(delta) {
      for (const body of Object.values(this.bodies)) {
         body.tick(delta);
      }
   }
}

export { SolarSystem };
