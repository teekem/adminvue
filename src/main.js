import Vue from 'vue'
import App from './App.vue'
import { router } from "./router";
import store from './state/store'
import axios from "axios";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);



window.axios = axios;
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
// axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.User.token}`
Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    console.log("App started");

    
  },
}).$mount('#app')
