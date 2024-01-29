import { createApp } from "vue";
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import setupInterceptors from './services/setupInterceptors';
import { FontAwesomeIcon } from './plugins/font-awesome';
import Pagination from 'v-pagination-3';
import VueApexCharts from 'vue3-apexcharts'; // Importe o pacote vue3-apexcharts


// import "https://beehavemarketing.com.br/oda/estilo.css";

setupInterceptors(store);


createApp(App)
  .use(router)
  .use(store)
  .use(Pagination)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(VueApexCharts) // Registre o pacote vue3-apexcharts
  .component('apexchart', VueApexCharts) // Registre o componente ApexChart globalmente
  .mount("#app");