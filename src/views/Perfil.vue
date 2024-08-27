<template>
  <div class="form-container">
    <a-form
      @submit.prevent="onSubmit"
      layout="vertical"
      class="p-4 bg-light rounded shadow"
    >
      <a-form-item label="Ingrese su Email" class="mb-3">
        <a-input
          v-model="email"
          id="email"
          type="email"
          placeholder="Ingrese Email"
        />
      </a-form-item>

      <a-form-item label="Ingrese su NickName" class="mb-3">
        <a-input
          v-model="nickname"
          id="nickname"
          type="text"
          placeholder="Ingrese NickName"
        />
      </a-form-item>

      <a-form-item label="Ingrese su photo" class="mb-3">
        <a-input
          v-model="photo"
          id="photo"
          type="text"
          placeholder="Ingrese URL de la foto"
        />
      </a-form-item>

      <a-form-item class="mb-0">
        <a-button
          type="primary"
          html-type="submit"
          block
          :loading="userStore.loadingUsers"
        >
          Acceso
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/user";
import { ref } from "vue";

const userStore = useUserStore();
const email = ref("");
const nickname = ref("");
const photo = ref("");

const onSubmit = async () => {
  try {
    await userStore.updateUser(nickname.value);
    console.log("DisplayName actualizado con éxito");
  } catch (error) {
    console.log("Error al actualizar el displayName:", error.message);
  }
};
</script>

<style scoped>
.form-container {
  max-width: 500px; /* Ajusta este valor para cambiar el tamaño máximo del formulario */
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}
</style>
