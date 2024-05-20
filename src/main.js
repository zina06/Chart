import { createApp } from 'vue'
import App from './App.vue'
import router from './routers';
import Datepicker from 'vue3-datepicker';
import { VueMoment } from 'moment';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Quasar, QSpinnerCube, QSpinnerTail } from 'quasar';
import 'quasar/dist/quasar.css';


createApp(App).use(router).use(VueMoment).use(Quasar, {
    config: {},
    components: {
      QSpinnerCube,
      QSpinnerTail
    },
    plugins: {}
  }).component('Datepicker',Datepicker).mount('#app');
