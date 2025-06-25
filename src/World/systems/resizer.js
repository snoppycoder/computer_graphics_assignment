/* 
A function that does the following

1. Sets the correct aspect ratio of the camera
2. Sets the correct size for the renderer according to the container
3. Sets the correct pixel ratio for the renderer
4. Adds event listener to the window to do all of the above when the window is resized
*/

function resizer(container, camera, renderer) {
   function onResize() {

      camera.aspect = container.clientWidth / container.clientHeight;
   camera.updateProjectionMatrix();
   renderer.setSize(container.clientWidth, container.clientHeight);
   renderer.setPixelRatio(window.devicePixelRatio);
   }
   onResize(); 

   window.addEventListener("resize", onResize);
}

export { resizer };
