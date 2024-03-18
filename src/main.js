import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/router.js";
import {createPinia} from "pinia";

const pinia = createPinia();

createApp(App)
    .use(router)
    .use(Antd)
    .use(pinia)
    .mount('#app')

