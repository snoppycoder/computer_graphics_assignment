import { World } from "./World/World";

function main() {
   const container = document.querySelector("#scene_container");
   const world = new World(container);
   world.start();
}

main();
