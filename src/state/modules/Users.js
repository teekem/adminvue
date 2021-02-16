
import axios from 'axios'
import { Promise } from "core-js";

export default {
    namespaced: true,
     state : {
        allUser:[],
        Authuser:{
            userID:'',
            userEmail:'',
            userEmailVeriedAt:'',
            userSurname:'',
            userFirstname:'',
            userOthername:'',
            userPhone:'',
            userPhoto:'',
            userSignature:'',
            userTitile:'',
            userDpt:'',
            createdAt:'',
            updatedAt:''
        }
    },
    getters : {
        getAllUsers:state => state.allUser,
        countUser: state => state.allUser.length,

        
    },
     actions : {
        login(context, credentials){
            return new Promise((res, rej) =>{
                axios.post('login', credentials)
                .then(response =>{
                    if(response.data.message == 'success'){
                        context.commit('SET_AUTH_USER', response.data.user)
                        res(response.data.user)
                    }
                })
                .catch(err=>{
                    rej(err)
                })
            })
         },
         loadUser({commit}){
             return new Promise((res, rej) => {
                axios
                .get('adminusers')
                .then(response => {
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
        SET_AUTH_USER(state, authpayload){
            state.Authuser.userID =authpayload.id
            state.Authuser.userEmail=authpayload.email
            state.Authuser.userEmailVeriedAt=
            state.Authuser.userSurname=authpayload.surname
            state.Authuser.userFirstname=authpayload.firstname
            state.Authuser.userOthername=authpayload.othername
            state.Authuser.userPhone=authpayload.phone
            state.Authuser.userPhoto=authpayload.photo
            state.Authuser.userSignature=authpayload.signature
            state.Authuser.userTitile=authpayload.title
            state.Authuser.userDpt=authpayload.dpt
            state.Authuser.createdAt=authpayload.created_at
            state.Authuser.updatedAt=authpayload.updated_at   }
    },
   
}






