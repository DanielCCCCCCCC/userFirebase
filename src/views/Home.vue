<template>
  <div>
    <h1>Home Ruta protegida</h1>
    <div class="user-info mt-2" style="display: flex; align-items: center">
      <a-avatar
        :src="userStore.userData.photoURL"
        :size="60"
        style="margin-right: 12px"
      ></a-avatar>
      <p style="margin: 0">{{ userStore.userData?.email }}</p>
    </div>
    <!-- <p>{{ userStore.userData }}</p> -->
    <add-form></add-form>

    <p v-if="databaseStore.loadingDoc">loading docs...</p>

    <a-space
      direction="vertical"
      v-if="!databaseStore.loadingDoc"
      style="width: 100%"
    >
      <a-card
        v-for="item of databaseStore.documents"
        :key="item.id"
        :title="item.short"
      >
        <template #extra>
          <a-space>
            <a-popconfirm
              title="¿Estás seguro que deseas eliminar?"
              ok-text="Sí"
              cancel-text="No"
              @confirm="confirm(item.id)"
              @cancel="cancel"
            >
              <a-button
                danger
                :loading="databaseStore.loading"
                :disabled="databaseStore.loading"
                >Eliminar</a-button
              >
            </a-popconfirm>
            <a-button type="primary" @click="router.push(`/editar/${item.id}`)"
              >Editar</a-button
            >
          </a-space>
        </template>
        <p>{{ item.name }}</p>
      </a-card>
    </a-space>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/user";
import { useDatabaseStore } from "../store/database";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
const userStore = useUserStore();
const databaseStore = useDatabaseStore();
const router = useRouter();
databaseStore.getUrls();
// console.log(userStore.documents);

const confirm = async (id) => {
  const error = await databaseStore.deleteUrl(id);
  if (!error) return message.success("Se eliminó con éxito 💋");
  return message.error(error);
};

const cancel = () => {
  message.error("no se eliminó 💋");
};
</script>

<style scoped>
.mt-2 {
  margin-bottom: 2rem;
}
</style>
