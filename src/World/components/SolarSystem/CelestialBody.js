import { MathUtils } from "three";
import { loadModel } from "../../systems/modelLoader";

class CelestialBody {
   constructor(url, distance, rotPerSecond, onLoad) {
      loadModel(url).then((value) => {
         this.planet = value;
         if (onLoad) onLoad(this);
      });
      this.distance = distance;
      this.time = 0;
      this.rotPerSecond = rotPerSecond;
   }

   tick(delta) {
      if (!this.planet) return;
      const secondsPerYear = 10; // Specifies how much a year for the planet is in seconds for the renderer
      const revPerSecond = MathUtils.degToRad(360 / secondsPerYear);
      const x = this.distance * Math.cos(this.time);
      const z = this.distance * Math.sin(this.time);
      this.planet.position.set(x, 0, -z);
      this.time += revPerSecond * delta;
      this.planet.rotateY(this.rotPerSecond * delta);
   }
}

export { CelestialBody };
