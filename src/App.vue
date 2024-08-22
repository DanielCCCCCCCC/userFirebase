<script setup>
import { RouterLink, RouterView } from "vue-router";
// import HelloWorld from "./components/HelloWorld.vue";
import { useUserStore } from "./store/user";
// import { Home } from "./views/Home.vue";
const userStore = useUserStore();
</script>
<template>
  <nav
    v-if="!userStore.loadingSession"
    class="p-3 bg-light shadow-sm mb-1 d-flex"
  >
    <div class="container d-flex justify-content-end">
      <a class="navbar-brand me-auto" href="#">MiApp</a>
      <div class="d-flex align-items-center">
        <ul class="navbar-nav d-flex flex-row justify-content-end mb-1 mb-md-0">
          <li class="nav-item mx-2">
            <RouterLink to="/home" class="nav-link" v-if="userStore.userData"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item mx-2">
            <RouterLink to="/login" class="nav-link" v-if="!userStore.userData"
              >Login</RouterLink
            >
          </li>
          <li class="nav-item mx-2">
            <RouterLink
              to="/register"
              class="nav-link"
              v-if="!userStore.userData"
              >Register</RouterLink
            >
          </li>
        </ul>
        <button
          @click="userStore.logoutUser"
          class="btn btn-outline-danger ms-3"
          v-if="userStore.userData"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
  <div v-else>loading user...</div>
  <RouterView />
  <!-- <Home /> -->
</template>

<style scoped>
.navbar {
  min-height: 100px; /* Establece una altura mínima para centrar el contenido */
}

.container {
  max-width: 600px; /* Limita el ancho del contenido */
}

.navbar-nav {
  flex-grow: 1;
}

.nav-link {
  text-align: center;
}

.btn {
  align-self: center;
  width: 100px; /* Ancho fijo para el botón */
}
</style>
