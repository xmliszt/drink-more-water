import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGlassWater } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./assets/main.css";

library.add(faGlassWater);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
