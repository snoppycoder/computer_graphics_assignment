import { Box3, Vector3 } from 'three';
export function rescaleToRealRadius(object3D, realRadiusMeters, sun) {
   
   const SUN_RADIUS = 6.9634e8;
   // const factor = realRadiusMeters / SUN_RADIUS;
   // const box = new Box3().setFromObject(sun);
   // const size = new Vector3();
   // box.getSize(size);

   
   // object3D.scale.set(
   //     size.x * factor,
   //     size.y * factor,
   //    size.z * factor
   // );
   object3D.scale.set(
  sun.scale.x * (realRadiusMeters / SUN_RADIUS)*5,
  sun.scale.y * (realRadiusMeters / SUN_RADIUS)*5,
  sun.scale.z * (realRadiusMeters / SUN_RADIUS)*5
);

}
