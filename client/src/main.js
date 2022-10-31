import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGlassWater,
  faRightFromBracket,
  faRankingStar,
  faXmark,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import "./assets/main.css";

library.add(faGlassWater, faRightFromBracket, faRankingStar, faXmark, faGear);

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", appHeight);
appHeight();

createApp(App)
  .use(Toast, { timeout: 2000 })
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
