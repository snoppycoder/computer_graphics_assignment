import { Box3, Vector3 } from "three";

export function rescaleToRealRadius(object3D, sun) {
   const SUN_RADIUS = 6.9634e8;
   const multiplicationFactor = 1100000;

   const box = new Box3().setFromObject(sun);
   const size = new Vector3();
   box.getSize(size);
   const scaleFactor = size.x / 2 / SUN_RADIUS;

   object3D.scale.set(
      scaleFactor * multiplicationFactor,
      scaleFactor * multiplicationFactor,
      scaleFactor * multiplicationFactor
   );
}
