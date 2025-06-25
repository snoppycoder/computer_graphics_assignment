import { Raycaster, Vector2, Vector3 } from "three";
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
            const offset = new Vector3(0, 0, 300);
            const newPos = object.position.clone().add(offset);
            camera.position.copy(newPos);
            camera.lookAt(object.position); // Adjust the camera position to look at the object
            controls.target.copy(object.position);
            controls.update();
            
        } else {
            console.log("Clicked on an object without a name");
        }
    } else {
        console.log("No intersections found");
    }
}
