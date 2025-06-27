import { LoadingManager } from "three";

const manager = new LoadingManager();

manager.onStart = () => {
   console.log("Loading started");
   //    document.getElementById("loader").style.display = "block";
};

manager.onLoad = () => {
   console.log("All models loaded");
   document.getElementById("loader").style.display = "none";
};

manager.onProgress = (url, itemsLoaded, itemsTotal) => {
   const percent = (itemsLoaded / itemsTotal) * 100;
   document.getElementById("num_items_loader_text").innerText = `Loading item ${itemsLoaded} / ${itemsTotal}`;
   document.getElementById("progress-bar-overall").style.width = `${percent}%`;
};

manager.onError = (url) => {
   console.error("There was an error loading " + url);
};

export { manager };
