import {createApp} from 'vue';
import App from './App.vue';
import routerInstance from "@/router";
import {createPinia} from "pinia";

createApp(App)
  .use(routerInstance)
  .use(createPinia())
  .mount('#app');
