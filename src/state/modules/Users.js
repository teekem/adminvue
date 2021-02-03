
import axios from 'axios'
import { Promise } from "core-js";

export default {
    namespaced: true,
     state : {
        // allUser:[{'name':'admin'},{'name':'admin'},{'name':'admin'},{'name':'admin'}],
        allUser:[],
        user:{}
    },
    getters : {
        getUsers:state => state.allUser,
        countUser: state => state.allUser.length
        
    },
     actions : {
         loadUser({commit}){
             return new Promise((res, rej) => {
                axios
                .get('adminusers')
                .then(response => {
                    // let data = [{'name':'admin'},{'name':'admin'},{'name':'admin'},{'name':'admin'}]
                     commit("SET_USER", response.data.data)
                   // res(respoonse.data)
                })
                .catch(err => {console.log(err)})
             
         });

        },

        // async initStore({state, commit}) {
        //     if (!state.user['user']) {
        //         const user = await fetch('/jokes.json');
        //         commit('SET_USER', await user.json());
        //     }
      
      
    },

     mutations : {
        SET_USER(state, userpayload) {
            state.allUser = userpayload;
        },
    },
   
}






