export const AdmissionOfficer = {
    namespaced:true,
    state:{
        applicants:[],
        applicant:{},
        applications:[],
    },
    mutations:{
        setApplicants(state, payLoad){
            state.applicants = payLoad;
        },
        setApplicant(state, payLoad){
            state.applicant = payLoad
        },
        setApplications(state, payLoad){
            state.applications = payLoad
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
        },
        getApplications(context){
            return new Promise((res, rej)=>{
                axios.post('/admin/getApplications')
                .then((response) => {
                    context.commit('setApplications', response.data.applications);
                    res(response.data.applications);
                }).catch((err) => {
                    rej(false)
                });
            })
        }
    }
}