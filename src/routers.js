import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import { useUserStore } from "./store/user.js";

const requiereAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  try {
    const user = await userStore.currentUser(); // Esperamos a que la promesa se resuelva

    if (user) {
      next(); // Si el usuario está autenticado, permite el acceso
    } else {
      next("/login"); // Si no está autenticado, redirige a /login
    }
  } catch (error) {
    console.error("Error verificando usuario:", error);
    next("/login"); // Si hay algún error, redirige a /login
  }
  userStore.loadingSession = false;
};

const routes = [
  { path: "/home", component: Home, beforeEnter: requiereAuth },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({ routes, history: createWebHistory() });

export default router;
