import { Clock } from "three";

const clock = new Clock();

class Loop {
   constructor(camera, renderer, scene) {
      this.camera = camera;
      this.renderer = renderer;
      this.scene = scene;
      this.updatables = [];
      this.shouldAnimate = true;
   }

   start() {
      this.renderer.setAnimationLoop(() => {
         if (this.shouldAnimate) {
            const delta = clock.getDelta();
            for (const obj of this.updatables) {
               if (obj.tick) {
                  obj.tick(delta);
               }
            }
         }
         this.tick();
         this.renderer.render(this.scene, this.camera);
      });
   }

   stop() {
      this.shouldAnimate = false;
   }

   tick() {
      const delta = clock.getDelta();
      for (const obj of this.updatables) {
         obj.tick(delta);
      }
   }
}

export { Loop };
