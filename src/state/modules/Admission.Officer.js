// import { axios } from "vue/types/umd";

// import { axios } from "vue/types/umd";

// import { axios } from "vue/types/umd";

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
        getApplications(context, applicationProps){
            // applicationProps ->status ->fromdate to datedate
            return new Promise((res, rej)=>{
                if(applicationProps.status != "recommended" && applicationProps.status != "nrecommened"){
                    axios.post('/admin/getApplications', {status:applicationProps.status , deptName:context.rootState.user.deptName})
                    .then((response) => {
                        context.commit('setApplications', response.data.applications);
                        res(response.data.applications);
                    }).catch((err) => {
                        rej(false)
                    });
                }
                if(applicationProps.status == "nrecommened"){
                    axios.post("admin/pgcoord/disapproved/recommendation/list", {deptName:context.rootState.user.deptName})
                    .then((response) => {
                        context.commit("setApplications", response.data.applications)
                        res(response.data.applications);
                        return true;
                    }).catch((err) => {
                        rej(false);
                        return false;
                    });
                }
                if(applicationProps.status == "recommended"){
                   
                    axios.post("admin/pgcoord/approved/recommendation/list", {deptName:context.rootState.user.deptName})
                    .then((response) => {
                        context.commit("setApplications", response.data.applications)
                        res(response.data.applications);
                        return true;
                    }).catch((err) => {
                        rej(false);
                        return false;
                    });
                } 
            })
        },
        getForms(context , applicationId){
            return new Promise((res, rej)=>{
                axios.post('admin/getForms' , {applicationId:applicationId})
                .then((response) => {
                    res(response)
                }).catch((err) => {
                    rej(err)
                });
            })
        },
        approveAdmission(context, details){
            // console.log("approveAdmission")
            // console.log(details)
            return new Promise((res, rej)=>{
                axios.post('admin/admissionApproved', details)
                .then((response) => {
                    res(response)
                }).catch((err) => {
                    rej(err)
                });
            })
        },
        denyAdmission(context, details){
            return new Promise((res, rej)=>{
                axios.post("admin/admissionApproved", details)
                .then((response) => {
                    res(response)
                }).catch((err) => {
                    rej(err)
                });
            })
        }
    }
}