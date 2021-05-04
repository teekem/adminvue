<template>
          <b-modal
      id="selectSettings.modal"
      ref="selectSettings.modal"
      v-model="modal"
      centered
      hide-footer
      hide-header
    >
      <template #default="{ hide }">
        <div>
          <div class="card custom-bg border-0">
            <div class="card-header border-0 p-2">
              <div class="w-100 text-center">
                <span class="text-monospace">Pend Application</span>
                <b-icon
                  icon="x-circle"
                  scale="1"
                  variant="danger"
                  @click="hide()"
                  class="card-tools float-right"
                ></b-icon>
              </div>
            </div>
            <div class="card-body">
              <div class="form-group text-center">
                <b class="text-center">{{application.applicant.surname}} {{application.applicant.firstname}} {{application.applicant.lastname}}</b>
                <br/>
                <label>{{application.application_number}}</label>
              </div>
             <div class="form-group">
                <label>Give Reason(s)</label>
              <textarea class="form-control form-control-lg small-font" rows="5"  v-model="deny_reason">
              </textarea>
             </div>
              <div class="d-block m-2">
                <button class="btn btn-sm btn-primary" @click="handlePend">
                  Pend Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </b-modal>

</template>

<script>
export default {
    data() {
        return {
            modal:false,
            deny_reason:"",
            application:"",
        }
    },
    methods: {
        handlePend(){
          console.log(this.application)
          axios.post('admin/admissionPending' ,{deny_reason:this.deny_reason , applicationId:this.application.id})
          .then((response) => {
            Toast.fire({
              icon:"info",
              title:"Application pended"
            });
            this.modal = false;
          }).catch((err) => {
            
          });

        }
    },
    created() {
      Fire.$off('PendApplication');
        Fire.$on('PendApplication',(data)=>{
            this.application = data;
            this.modal = true
        })
    },
}
</script>

<style>

</style>