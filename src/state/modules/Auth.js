
import axios from 'axios'

export default {
    namespaced: true,

     state : {
        allApplicants:[]
    },

     getters : {
    getApplicants:state => state.allApplicants
    
    },
     actions : {
        requestAllApplicants({commit}){
            axios.get('/allApplicants')
            .then(({data}) => {
                commit('SET_APPLICANTS', data)
            })
          }
    },

    mutations : {
        SET_APPLICANTS: (state, data) => { state.allApplicants = data}
    }

   

}






