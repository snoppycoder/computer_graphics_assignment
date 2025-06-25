import { Box3, Vector3 } from 'three';
export function rescaleToRealRadius(object3D, realRadiusMeters, sun) {
   
   const SUN_RADIUS = 6.9634e8;
   const factor = realRadiusMeters / SUN_RADIUS;
   const box = new Box3().setFromObject(sun);
    const size = new Vector3();
    box.getSize(size);
    const currentSize = size.x * factor;
   
   object3D.scale.set(
       currentSize,
       currentSize,
      currentSize
   );
}
