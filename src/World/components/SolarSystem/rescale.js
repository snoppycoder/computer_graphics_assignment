import { Box3, Vector3 } from "three";

export function rescale(object3D, realRadius, sun) {
   const SUN_RADIUS = 6.9634e8;
   const multiplicationFactor = 100000000;
   const accuracyFactor = realRadius / SUN_RADIUS;

   const box = new Box3().setFromObject(sun);
   const size = new Vector3();
   box.getSize(size);
   const scaleFactor = size.x / 2 / SUN_RADIUS;

   object3D.scale.set(
      scaleFactor * multiplicationFactor * accuracyFactor,
      scaleFactor * multiplicationFactor * accuracyFactor,
      scaleFactor * multiplicationFactor * accuracyFactor
   );
}
