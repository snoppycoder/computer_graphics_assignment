import { MathUtils } from "three";
import { loadModel } from "../../systems/modelLoader";

const secondsPerRev = 100; // Specifies how much one revolution is in seconds for earth
const secondsPerRot = secondsPerRev / 365; // Specifies how much one revolution is in seconds for earth
const earthRevPeriod = 31557600; // Revolution period of the Earth in seconds
const earthRotPeriod = 86164; // Revolution period of the Earth in seconds
// Default name for the celestial body

class CelestialBody {
   constructor(url, a, b, revPeriod, rotPeriod, obliquity, name, onLoad) {
      loadModel(url, name).then((value) => {
         this.planet = value;
         this.planet.rotation.set(0, 0, MathUtils.degToRad(obliquity));

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

      // Revolution
      if (this.revPeriod > 0) {
         const revPerSecond = MathUtils.degToRad((360 * (earthRevPeriod / this.revPeriod)) / secondsPerRev);
         const x = this.a * Math.cos(this.time);
         const z = this.b * Math.sin(this.time);
         this.planet.position.set(x, 0, -z);
         this.time += revPerSecond * delta;
      }

      // Rotation
      if (this.rotPeriod > 0) {
         const rotPerSecond = MathUtils.degToRad((360 * (earthRotPeriod / this.rotPeriod)) / secondsPerRot);
         this.planet.rotateY(rotPerSecond * delta);
      }
   }
}

export { CelestialBody };
