import { World } from "./World/World";


function main() {
   window.addEventListener("DOMContentLoaded", () => {
      const container = document.querySelector("#scene_container");
      const world = new World(container);
      world.start();
   });
}


main();
