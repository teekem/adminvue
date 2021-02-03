/** store/index.js **/
import Vue from 'vue';
import Vuex from 'vuex';


import Application from './modules/Application'
import User from './modules/Users'
 //import modules from './modules/index'


Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
   modules:{Application,User},
   strict: debug,
//    plugins: debug? [ createLogger() ] : []
})




// Vue.use(Vuex);

// export default new Vuex.Store({
        
//  state : {
//     allApplicants:[{'name':'sam'},{'name':'tee'},{'name':'kay'}]
// },

//  actions : {
//     requestAllApplicants({commit}){
//         axios.get('/allApplicants')
//         .then(({data}) => {
//             commit('setAllApplicant', data)
//         })
//       }
// },
//  mutations : {
//     setAllApplicant: (state, data) => { state.allApplicants = data}
// },      
//  getters : {
//     getApplicants:state => state.allApplicants
    
// }
// })