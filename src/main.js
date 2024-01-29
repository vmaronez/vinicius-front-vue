import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import App from './App.vue';
import './services/api';
import './index.css';

import 'bootstrap/dist/js/bootstrap.js';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
