/** store/index.js **/
import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import Application from "./modules/Application";
import User from "./modules/Users";
import { AdmissionOfficer } from "./modules/Admission.Officer";
// import { axios } from "vue/types/umd";

//import modules from './modules/index'

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "vuex",
  storage: window.sessionStorage,
});

const debug = process.env.NODE_ENV !== "production";
export default new Vuex.Store({
  state: {
    settings:null,
    programmes: "",
    programmeTypes:"",
    paymentTypes:[],
    user: {
      token: null,
      user: null,
      roles: null,
      deptName:null,
      profileImg:null,
      roleInUse:'',
    },
  },
  actions: {
    getprogrammeTypes(context){
      return new Promise((res,rej)=>{
        axios.post('api/getProgrammeTypesForApplication')
      .then((response) => {
        // this.programme_types = response.data.types;
        context.commit("setProgrammeTypes",response.data.types)
      }).catch((err) => {
        // Toast.fire({
        //   icon:'error',
        //   title:'Network Error'
        // })
      });
      });
    },
    getSettings(context){
      return new Promise((res, rej)=>{
        axios.post('admin/settings')
        .then((resposne) => {
          context.commit("setSettings", resposne.data.settings);
          res(resposne.data.settings)
        }).catch((err) => {
          rej(err);
        });
      })
    },
    getProgrammes(context) {
      return new Promise((res, rej) => {
        axios
          .post("api/getProgrammes")
          .then((response) => {
            // console.log(response.data.programmes);
            context.commit("setProgrammes", response.data.programmes);
            // this.programmes = response.data.programmes
            res(response.data.programmes);
          })
          .catch((err) => {
            console.log("unable to get programmes");
            rej(err);
          });
      });
    },
    adminLogin(context, credentials) {
      return new Promise((res, rej) => {
        axios
          .post("admin/adminAuth", credentials)
          .then((response) => {
            console.log("here")
            context.commit("setUser", response.data);
            res(true);
          })
          .catch((err) => {
            rej(false)
          });
      });
      context.commit("setTest");
    },
    getPaymentTypes(context){
      return new Promise((res, rej)=>{
        axios.post("admin/paymentTypes")
        .then((response) => {
          context.commit("setPaymentTypes", response.data.types);
          res(response.data)
        }).catch((err) => {
          rej(err)
        });
      })
    },
    getDeptName(context, deptName){
      context.commit("setDeptName", deptName)
    },
    setStaff(context, userData){
      context.commit("setUser", userData);
    },
    logout(context, userData){
      context.commit("setUser", userData);
    },
    roleUsed(context, role){
      context.commit("setRoleUsed", role)
    }
  },
  mutations: {
    setRoleUsed(state, role){
      state.user.roleInUse = role
    },
    setSettings(state, settings){
      state.settings = settings
    },
    setProgrammes(state, programmes) {
      state.programmes = programmes;
    },
    setProgrammeTypes(state, payload){
      state.programmeTypes = payload;
    },
    setPaymentTypes(state, payload){
      state.paymentTypes = payload;
    },
    setUser(state, paylaod) {
      if (paylaod == "signout") {
        state.user.user = null;
        state.user.token = null;
        state.user.roles = null;
        state.user.deptName = null;
        state.user.profileImg = null;
      } else {
        state.user.token = paylaod.token;
        state.user.user = paylaod.user;
        if(paylaod.deptName){
          state.user.deptName = paylaod.deptName
          state.user.profileImg = paylaod.user.picture
          // console.log(paylaod.lecturer_category)
          state.user.roles = paylaod.lecturer_category ? [paylaod.lecturer_category] : [paylaod.user.lecturer_category]
        }
        else{
          let roles = []
          paylaod.user.roles.forEach(el => {
            roles.push(el.role)
          });
          state.user.roles =  roles
        }
        // state.user.roles = payload.roles;
      }
    },
    setTest(state) {
      state.user.token = "token";
    },
    setDeptName(state , payload){
      state.user.deptName = payload
    }
  },
  getters: {
    isAuth: (state) => {
      let value = state.user.token;
      console.log(value)
      if (value) {
        return true;
      } else {
        return false;
      }
    },
  },
  modules: { Application, User, AdmissionOfficer },
  strict: debug,
  plugins: [vuexPersist.plugin],
});
