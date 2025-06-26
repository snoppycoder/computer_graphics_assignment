import { gsap } from "gsap";

export function descriptionDrawer(description, planetName) {
   const drawer = document.getElementById("descriptionDrawer");
   const nameEl = document.getElementById("planetName");
   const descEl = document.getElementById("planetDescription");

   nameEl.textContent = planetName;
   descEl.textContent = description;

   gsap.to(drawer, {
      x: -400, 
      duration: 0,
      onComplete: () => {
         gsap.to(drawer, {
            x: 0,
            duration: 0.5,
            ease: "power2.out",
         });
      }
   });
}
