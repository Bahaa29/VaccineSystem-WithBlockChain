import { createApp,Vue } from 'vue';
import App from './App.vue';
import router from './routers';

import './assets/bootstrap.min.css';



createApp(App)
.use(router)
.mount('#app');
