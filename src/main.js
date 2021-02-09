import Vue from 'vue'
import App from './App.vue'
import { router } from "./router";
import store from './state/store'
import axios from "axios";

window.axios = axios;
axios.defaults.baseURL = 'http://localhost:8000/'
Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    console.log("App started");

    
  },
}).$mount('#app')
