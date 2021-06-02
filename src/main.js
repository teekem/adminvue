import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import store from "./state/store";
import axios from "axios";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate';
import "vue-select/dist/vue-select.css";
import Swal from "sweetalert2";
import "./validator";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);
// Vue.component('v-select', VueSelect.VueSelect);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

window.Fire = new Vue();
window.axios = axios;
// axios.defaults.baseURL = "http://localhost:8000/";
// axios.defaults.baseURL = 'http://10.1.34.211:8000'
// axios.defaults.baseURL = 'http://192.168.137.127:8000/'
axios.defaults.baseURL = 'https://pgr.run.edu.ng/'

window.Swal = Swal;
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: true,
  // showCancelButton:true,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
window.Toast = Toast;

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
  created() {
    axios.interceptors.request.use(
      async (config) => {
        config.headers = {
          Authorization: `Bearer ${store.state.user.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        };
        return config;
      },
      (err) => {
        this.$Progress.fail();
        return Promise.reject(err);
      }
    );
    console.log("App started");
  },
}).$mount("#app");
