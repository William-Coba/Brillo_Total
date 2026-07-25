import "./assets/main.css";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

import HomeView from "./views/HomeView.vue";
import ServiciosView from "./views/ServiciosView.vue";
import GaleriaView from "./views/GaleriaView.vue";
import ContactoView from "./views/ContactoView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView },
    { path: "/servicios", component: ServiciosView },
    { path: "/galeria", component: GaleriaView },
    { path: "/contacto", component: ContactoView },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

createApp(App).use(router).mount("#app");
