import { Raycaster, Vector2, Vector3 } from "three";
import { gsap } from "gsap";
const mouse = new Vector2();
const raycaster = new Raycaster();
export function rayCaster(camera, event, scene, controls) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // i am normalizing the mouse position
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; 
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object.userData && object.userData.name) {
            console.log("Clicked on:", object);
            const objectWorldPosition = new Vector3();
        object.getWorldPosition(objectWorldPosition);

        const direction = new Vector3()
        .subVectors(camera.position, objectWorldPosition)
        .normalize();

        const newPos = objectWorldPosition.clone().add(direction.multiplyScalar(300)); // STEPPING AWAY TO LOOK AT THE OBJECT PROPERLY
        //tweeny deprecated or not available so i am using gsap to animate the camera position
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
  }
});

            
        } else {
            console.log("Clicked on an object without a name");
        }
    } else {
        console.log("No intersections found");
    }
}
