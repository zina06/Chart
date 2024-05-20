import { createApp } from 'vue'
import App from './App.vue'
import router from './routers';
import Datepicker from 'vue3-datepicker';
import { VueMoment } from 'moment';

createApp(App).use(router).use(VueMoment).component('Datepicker',Datepicker).mount('#app');
