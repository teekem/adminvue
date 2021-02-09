export const AdmissionOfficer = {
    namespaced:true,
    state:{
        applicants:[],
        applicant:{},
    },
    mutations:{
        setApplicants(state, payLoad){
            state.applicants = payLoad;
        },
        setApplicant(state, payLoad){
            state.applicant = payLoad
        }
    },
    actions:{
        getApplicants(context){
            return new Promise((res, rej)=>{
                axios.post('/admin/getApplicants')
                .then((response) => {
                    context.commit('setApplications', response.data.applicants)
                    res(response.data.applicants)
                }).catch((err) => {
                    rej(false)
                });
            })
        }
    }
}