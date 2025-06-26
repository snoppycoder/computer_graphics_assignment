import { LoadingManager } from "three";

const manager = new LoadingManager();

manager.onStart = () => {
   console.log("Loading started");
   document.getElementById("loader").style.display = "block";
};

manager.onLoad = () => {
   console.log("All models loaded");
   document.getElementById("loader").style.display = "none";
};

manager.onProgress = (url, itemsLoaded, itemsTotal) => {
   const percent = Math.floor((itemsLoaded / itemsTotal) * 100);
   document.getElementById("loader-text").innerText = `Loading... ${percent}%`;
};

manager.onError = (url) => {
   console.error("There was an error loading " + url);
};

export { manager };
