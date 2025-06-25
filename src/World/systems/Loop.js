import { Clock } from "three";

const clock = new Clock();

class Loop {
   constructor(camera, renderer, scene) {
      this.camera = camera;
      this.renderer = renderer;
      this.scene = scene;
      this.updatables = [];
   }

   start() {
      this.renderer.setAnimationLoop(() => {
         this.tick();
         this.renderer.render(this.scene, this.camera);
      });
   }

   stop() {
      this.renderer.setAnimationLoop(null);
   }

   tick() {
      const delta = clock.getDelta();
      for (const obj of this.updatables) {
         obj.tick(delta);
      }
   }
}

export { Loop };
