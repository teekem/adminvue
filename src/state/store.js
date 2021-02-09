/** store/index.js **/
import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist'

import Application from './modules/Application'
import User from './modules/Users'
 //import modules from './modules/index'


Vue.use(Vuex);

const vuexPersist = new VuexPersist({
   key: "vuex",
   storage: window.sessionStorage
 })

const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
   modules:{Application,User},
   strict: debug,
   plugins: [vuexPersist.plugin],
})
