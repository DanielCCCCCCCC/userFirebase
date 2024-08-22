<script setup>
import { useUserStore } from "../store/user";
const userStore = useUserStore();
</script>

<template>
  <div class="container mt-1">
    <div class="bg-light p-1 rounded shadow">
      <h1 class="text-center fs-4 mb-1">Home</h1>
      <p class="text-center">Bienvenido a la página de inicio</p>
      <p><span class="fw-bold">Email:</span> {{ userStore.userData?.email }}</p>
      <p><span class="fw-bold">UID:</span> {{ userStore.userData?.uid }}</p>
    </div>
  </div>
</template>
