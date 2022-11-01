import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import http from './api/http'

import { configure } from "vee-validate";
configure({
    validateOnInput: true,
});

import VueSweetalert2 from 'vue-sweetalert2';

import '@/assets/scss/main.scss';

const app = createApp(App)

app.use(store)

app.use(router)

app.use(VueSweetalert2);

app.mount('#app')