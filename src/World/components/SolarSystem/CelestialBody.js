import { MathUtils } from "three";
import { loadModel } from "../../systems/modelLoader";

const secondsPerRev = 0.1; // Specifies how much one revolution is in seconds for earth
const secondsPerRot = 1; // Specifies how much one revolution is in seconds for earth
const earthRevPeriod = 31557600; // Revolution period of the Earth in seconds
const earthRotPeriod = 86164; // Revolution period of the Earth in seconds

class CelestialBody {
   constructor(url, a, b, revPeriod, rotPeriod, onLoad) {
      loadModel(url).then((value) => {
         this.planet = value;
         if (onLoad) onLoad(this);
      });
      this.a = a; // Major axis distance
      this.b = b; // Minor axis distance
      this.rotPeriod = rotPeriod; // How long it takes to rotate on its axis in seconds
      this.revPeriod = revPeriod; // How long it takes to orbit around the sun in seconds
      this.time = 0;
   }

   tick(delta) {
      if (!this.planet) return;
      const revPerSecond = MathUtils.degToRad(360 * (this.revPeriod / earthRevPeriod) * secondsPerRev);
      const x = this.a * Math.cos(this.time);
      const z = this.b * Math.sin(this.time);
      this.planet.position.set(x, 0, -z);
      this.time += revPerSecond * delta;

      const rotPerSecond = MathUtils.degToRad(360 * (this.rotPeriod / earthRotPeriod) * secondsPerRot);
      this.planet.rotateY(rotPerSecond * delta);
   }
}

export { CelestialBody };
