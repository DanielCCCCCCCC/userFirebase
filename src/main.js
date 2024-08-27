// import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./routers.js";

import { DatePicker } from "ant-design-vue";

// import "ant-design-vue/dist/antd.css"; // Importa el CSS de Ant Design Vue
// import "ant-design-vue/es/message/style/css";

const app = createApp(App);

app.use(createPinia());
app.use(DatePicker);
app.use(router);

app.mount("#app");
