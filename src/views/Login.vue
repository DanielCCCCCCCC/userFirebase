<template>
  <div class="container mt-5">
    <h1 class="mb-4">Login</h1>
    <form @submit.prevent="handleSubmit" class="bg-light p-4 rounded shadow">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          v-model.trim="email"
          id="email"
          type="email"
          class="form-control"
          placeholder="Ingrese Email"
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input
          v-model.trim="password"
          id="password"
          type="password"
          class="form-control"
          placeholder="Ingrese contraseña"
        />
      </div>

      <button
        :disabled="userStores.loadingUsers"
        type="submit"
        class="btn btn-primary w-100"
      >
        Acceso
      </button>
    </form>
  </div>
</template>

<style scoped>
/* Puedes agregar estilos adicionales aquí si lo deseas */
</style>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user";
import { useRouter } from "vue-router";

const userStores = useUserStore();
// const router = useRouter();
const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  if (!email.value || password.value.length < 6) {
    console.log("Procesando formulario ");
    return alert("Llena los campos");
  }
  await userStores.loginUsers(email.value, password.value);
  //   router.push("/home");
};
</script>
