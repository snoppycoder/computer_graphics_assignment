import { Box3, Raycaster, Vector2, Vector3 } from "three";
import { gsap } from "gsap"; //tweeny deprecated or not available so using gsap to animate the camera position

import { getDescription } from "../../API/call";
import { descriptionDrawer } from "../../API/descriptionDrawer";

const mouse = new Vector2();
const raycaster = new Raycaster();
let follow = false;

export function rayCaster(camera, event, scene, controls, loop) {
   mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // i am normalizing the mouse position
   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

   raycaster.setFromCamera(mouse, camera);

   const objectsWorthTracking = [];
   for (const child of scene.children) {
      if (child && child.isObject3D) {
         objectsWorthTracking.push(child);
      }
   }
   const intersects = raycaster.intersectObjects(objectsWorthTracking, true);

   if (intersects.length > 0) {
      const object = intersects[0].object;

      if (object.userData && object.userData.name) {
         const objectWorldPosition = new Vector3();
         object.getWorldPosition(objectWorldPosition);
         controls.addEventListener("start", () => {
            loop.updatables = loop.updatables.filter((item) => item !== camera);
            // controls.enabled = true;
         });
         
         let description = "";
         getDescription(object.name).then((data) => {
            description = data;
            if (description && description.length > 0) {
               descriptionDrawer(description, object.name);
            }
         });

        
         const box = new Box3().setFromObject(object);
         const size = new Vector3();
         box.getSize(size);
         const bodyRadius = size.x / 2;

         const direction = new Vector3().subVectors(camera.position, objectWorldPosition).normalize(); // Getting which direction the camera should go to
         const newPos = objectWorldPosition.clone().add(direction.multiplyScalar(bodyRadius * 2.5)); // Going to object and stepping away
         gsap.to(camera.position, {
            x: newPos.x,
            y: newPos.y,
            z: newPos.z,

            duration: 1,

            ease: "power2.inOut",

            onUpdate: () => {
               camera.lookAt(objectWorldPosition);
               controls.target.copy(objectWorldPosition);
               controls.update();
            },
         });
         // controls.enabled = false;
         camera.tick = (delta) => {
            const objectWorldPosition = new Vector3();
            object.getWorldPosition(objectWorldPosition);

            const direction = new Vector3().subVectors(camera.position, objectWorldPosition).normalize(); // Getting which direction the camera should go to
            const newPos = objectWorldPosition.clone().add(direction.multiplyScalar(bodyRadius * 2.5)); // Going to object and stepping away
            camera.position.copy(newPos);
            camera.lookAt(objectWorldPosition);
            controls.target.copy(objectWorldPosition);
            controls.update();
         };
          loop.updatables.push(camera);
      } else {
         console.log("Clicked on an object without a name");
      }
   } else {
      console.log("No intersections found");
   }
}
