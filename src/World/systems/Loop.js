import { Clock } from "three";

const clock = new Clock();

class Loop {
  constructor(camera, renderer, scene) {
    this.camera = camera;
    this.renderer = renderer;
    this.scene = scene;
    this.updatables = [];
    this.animate = true; // controls whether animation updates happen
  }

  start() {
    this.animate = true;
    this.renderer.setAnimationLoop(() => {
      if (this.animate) {
        const delta = clock.getDelta();
        for (const obj of this.updatables) {
          obj.tick(delta); // update animations only when animate = true
        }
      }
      this.renderer.render(this.scene, this.camera); // always render each frame
    });
  }

  stop() {
    this.animate = false; 
  }
}

export { Loop };
