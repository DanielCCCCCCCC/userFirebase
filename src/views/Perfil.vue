<template>
  <h1>Pefil de usuario</h1>
  <!--  <p>{{ userStore.userData }}</p> -->
  <div class="text-center mb-5">
    <a-avatar :src="userStore.userData.photoURL" :size="130"></a-avatar>
  </div>
  <a-row>
    <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
      <a-form
        name="basicPerfil"
        autocomplete="off"
        layout="vertical"
        :model="userStore.userData"
        @finish="onFinish"
      >
        <a-form-item
          name="email"
          label="Tu correo (No modificable)"
          :rules="[
            {
              required: true,
              whitespace: true,
              type: 'email',
              message: 'Ingresa un email válido',
            },
          ]"
        >
          <a-input disabled v-model:value="userStore.userData.email"></a-input>
        </a-form-item>

        <a-form-item
          name="displayName"
          label="Ingrese tu nickName"
          :rules="[
            {
              // required: true,
              whitespace: true,
              message: 'Ingresa un nick válido',
            },
          ]"
        >
          <a-input v-model:value="nick"></a-input>
        </a-form-item>

        <!-- :max-count="1" PROPIEDAD DEL A-UPLOAD PARA SUBIR SOLO UNA IMAGEN -->
        <a-upload
          v-model:file-list="fileList"
          list-type="picture"
          :before-upload="beforeUpload"
          @change="handleChange"
          class="mb-2"
        >
          <a-button>Subir foto perfil </a-button>
        </a-upload>

        <a-form-item class="mt-5">
          <a-button
            type="primary"
            html-type="submit"
            :disabled="userStore.loadingUser"
            :loading="userStore.loadingUser"
            >Actualizar información</a-button
          >
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import { message } from "ant-design-vue";
import { useUserStore } from "../store/user";
import { ref } from "vue";

const userStore = useUserStore();
const nick = ref("");
const fileList = ref([]);

const beforeUpload = () => {
  fileList.value = [...fileList.value, file];
  return false;
};

const handleRemove = (file) => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};

//FUNCION PARA SUBIR SOLO UNA IMAGEN
const handleChange = (info) => {
  //valida los tipos de imagen
  if (info.file.status !== "uploading") {
    // console.log(info.file);

    const isJpgOrPng =
      info.file.type === "image/jpeg" || info.file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Solo puedes subir una imagen JPG ");
      handleRemove(info.file);
      return;
    }
    const isLt2m = info.file.size / 1024 / 1024 < 2;
    if (!isLt2m) {
      message.error("Maximo 2MB!");
      handleRemove(info.file);
      return;
    }
  }

  //Valida que solo sea una imagen, si el user sube otra, se remplaza
  let resFileList = [...info.fileList];
  resFileList = resFileList.slice(-1);

  resFileList = resFileList.map((file) => {
    if (file.response) {
      file.url = file.response.url;
    }
    return file;
  });
  fileList.value = resFileList;
};

const onFinish = async () => {
  // fileList.value.forEach((file) => {
  //   // formData.append("files[]", file);
  //   console.log(file);
  // });

  //como solo es una imagen la que subimos no necesitamos el forEach
  // console.log(fileList.value[0]);
  const error = await userStore.updateUser(nick.value);

  if (fileList.value[0]) {
    const error = await userStore.updateImg(fileList.value[0]);
    if (error) {
      return message.success(
        "Problemas al subir su imagen, intentelo mas tarde "
      );
    }
    message.success("Se actualizo tu imagen ");
  }

  if (!error) {
    // Actualizar manualmente el estado de la tienda si la actualización es exitosa
    // userStore.userData.displayName = userStore.userData.displayName;
    return message.success("Se actualizó tu información de tu DisplayName");
  } else {
    message.error("Ocurrió un error al actualizar el perfil");
  }
};
</script>

<style scoped>
.mb-5 {
  margin-bottom: 2rem;
}
.mt-5 {
  margin-top: 2rem;
}
</style>
