<template>
  <div class="d-inline">

       <b-dropdown size="sm" class="mx-1" right>
      <template #button-content>
         <span
        v-if="approveBusy"
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
         <span
        v-if="denyBusy"
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span> Action
      </template>
     
      <b-dropdown-item  
      @click="actionBtnText()[0].action(item)">
        <span
        v-if="approveBusy"
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      {{actionBtnText()[0].text}}
      </b-dropdown-item>
      <b-dropdown-item @click="actionBtnText()[1].action(item)">
         <span
        v-if="denyBusy"
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      {{actionBtnText()[1].text}}
      </b-dropdown-item>
      <template v-if="actionBtnText()[2]">
         <b-dropdown-item @click="actionBtnText()[2].action(item)">
         <!-- <span
        v-if="denyBusy"
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span> -->
      {{actionBtnText()[2].text}}
      </b-dropdown-item>
      </template>
    </b-dropdown>

    <b-modal
      id="approveAdmission.modal"
      ref="approveAdmission.modal"
      v-model="modal"
      centered
      hide-footer
      hide-header
      @shown="onShown"
      @hidden="onHidden"
    >
      <template #default="{ hide }">
        <div>
          <div class="card custom-bg border-0">
            <div class="card-header border-0 p-2">
              <div class="w-100 text-center">
                <span class="text-monospace">Recommend For Admission</span>
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
              <div class="m-1 p-2 bg-light shadow border border-info">
                <b class="p-0 m-0"
                  >Name: {{ item.applicant.surname }}
                  {{ item.applicant.firstname }}
                  {{ item.applicant.lastname }}</b
                >
                <br />
                <b class="p-0 m-0">Applied For: {{ item.applyFor }} </b>
              </div>
              <label
                >Select the programme you wish to recommend for admission</label
              >
              <v-select
                label="programme"
                :options="programmes"
                v-model="approvedProgramme"
              ></v-select>
              <!-- <p>{{approvedProgramme}}</p> -->
              <!-- <v-select></v-select> -->
              <div class="app-card pl-1 border-left-decoration mt-3">
                <b class="mb-1">Programme applied for by student </b> <br />
                <label>{{ programme.programme }}</label>
              </div>
              <div class="mt-2">
                <button
                  class="btn btn-sm btn-outline-primary"
                  @click="recommend(item)"
                >
                  continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </b-modal>

    <b-modal
      id="denyAdmission.modal"
      ref="denyAdmission.modal"
      v-model="denyModal"
      centered
      hide-footer
      hide-header
      @shown="denyShown"
      @hidden="denyHidden"
    >
      <template #default="{ hide }">
        <div>
          <div class="card custom-bg border-0">
            <div class="card-header border-0 p-2">
              <div class="w-100 text-center">
                <span class="text-monospace text-danger">UnRecommend Admission</span>
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
              <div class="m-1 p-2 bg-light shadow border border-info">
                <b class="p-0 m-0"
                  >Name: {{ item.applicant.surname }}
                  {{ item.applicant.firstname }}
                  {{ item.applicant.lastname }}</b
                >
                <br />
                <b class="p-0 m-0">Applied For: {{ item.applyFor }} </b>
              </div>
              <div class="app-card pl-1 border-left-decoration mt-3">
                <b class="mb-1">Programme applied for by student </b> <br />
                <label>{{ programme.programme }}</label>
              </div>

              <div class="form-group">
                <b class="mt-1">Reason for not recommending applicant for admission</b>
                <textarea v-model="denyReason" class="form-control form-control-lg small-font p-1" rows="5" placeholder="State reason">
              </textarea>
              </div>
              
              <div class="mt-2">
                <button
                  class="btn btn-sm btn-outline-primary"
                  @click="UnRecommend(item)"
                >
                  UnRecommend
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </b-modal>
    <pending-application-modal/>
  </div>
</template>

<script>
import selectSettingsModal from '../../helper/selectSettings.modal.vue';
import PendingApplicationModal from './pending.application.modal.vue';
export default {
  components: { selectSettingsModal, PendingApplicationModal },
  props: ["index", "item"],
  data() {
    return {
      modal: false,
      denyModal:false,
      programme: "",
      approvedProgramme: "",
      approveBusy: false,
      denyBusy: false,
      denyReason:"",
      check:true,
    };
  },
  created() {
    Fire.$off("FinishedSelectingSettings")
    Fire.$on("FinishedSelectingSettings", (data)=>{
      this.approve(data.dataSent, data.settings)
    })
  },

  computed: {
    programmes() {
      return this.$store.state.programmes;
    },
  },

  methods: {
    onShown() {},
    onHidden() {},
    denyShown() {},
    denyHidden() {},
    getProgrammeForApprove() {
      return new Promise((res, rej) => {
        axios
          .post("admin/getProgrammeForApprove", { applicationId: this.item.id })
          .then((response) => {
            if (response.data.programme) {
              res(response.data);
              // this.programme = response.data.programme;
              // this.modal = true;
            } else {
              res(false);
              Swal.fire({
                title: "Application is not completed",
                icon: "warning",
              });
            }
            this.approveBusy = false;
          })
          .catch((err) => {
            rej(false);
            Swal.fire({
              title: "Application is not completed",
              icon: "warning",
            });
            this.approveBusy = false;
          });
      });
    },
    approveBtn(item) {
      if (item.status == "approved") {
        return true;
      }
      if (item.status == "submitted under processing") {
        return false;
      } else {
        return true;
      }
    },
    actionBtnText(){
      if(this.$store.state.user.roleInUse == 'admin' ||  this.$store.state.user.roleInUse== 'pgSchool' ){
        let approve = {url:"", alertText:"You are about to aprove an application for admission", text:"approve", action:this.loadSelectSettingsModal}
        let deny = {url:"", alertText:"You are about to deny an application for admission" , text:"deny" , action:this.deny}
        return [approve, deny]
      }else{
        let recommend = {url:"", alertText:"", text:"Recommend", action:this.handleRecom}
        let unsuitable = {url:"", alertText:"", text:"Not recommended", action:this.handleUnRecommend}
        let pending = {url:"", alertText:"", text:"Pend", action:this.handlePending}
        return [
          recommend,
          unsuitable,
          pending
        ]
      }
    },
    async handleApprove() {
      this.approveBusy = true;
      try {
        let approvedProgramme = await this.getProgrammeForApprove();
        if (approvedProgramme) {
          this.programme = approvedProgramme.programme;
          this.modal = true;
        }
        this.approveBusy = false;
      } catch (error) {
        console.log("error");
        // Swal.fire({
        //   title: "Application is not completed",
        //   icon: "warning",
        // });
        this.approveBusy = false;
      }
    },
    loadSelectSettingsModal(item){
      console.log("load settings modal")
      Fire.$emit("SelectedSettings", item )
    },
    getSelectedSettings(){
      return new Promise((res, rej)=>{
        
      })
    },
    async approve(item, settings) {
       let approvedProgramme = await this.getProgrammeForApprove();
       this.programme = approvedProgramme.programme;

      console.log(item);
      Swal.fire({
        title: "You are about to aprove an application for admission",
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "YES",
        cancelButtonText: "NO",
      }).then((result) => {
        if (result.isConfirmed) {
          let details = {
            applicant: item.applicant.id,
            applicationId: item.id,
            programmeId:item.assessment.approved_programme_id,
            admsStatus: "approved",
          };
          this.$store
            .dispatch("AdmissionOfficer/approveAdmission", {...details, ...settings})
            .then((response) => {
              // console.log(response);
              Fire.$emit("acceptAdmission");
              Toast.fire({
                icon:"info",
                title:"Done"
              })
            })
            .catch((err) => {
               Toast.fire({
                icon:"error",
                title:"Unable to approve admission"
              })
              console.log(err);
            });
        } else {
          Toast.fire({
            icon: "info",
            title: "Operation Cancelled",
          });
          //   throw new axios.Cancel('Operation canceled by the user.');
        }
      });
    },
    async handleDeny(item) {
      this.denyBusy = true;
      try {
        let approvedProgramme = await this.getProgrammeForApprove();
        if(approvedProgramme){
          this.programme = approvedProgramme.programme;
          this.denyModal = true
        }
        this.denyBusy = false
      } catch (error) {
        console.log(error)
        this.denyBusy = false
      }
    },
    deny(item) {
      console.log(item);
      Swal.fire({
        title: "You are about to deny an application for admission",
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "YES",
        cancelButtonText: "NO",
      }).then((result) => {
        if (result.isConfirmed) {
          let details = {
            applicant: item.applicant.id,
            applicationId: item.id,
            admsStatus: "denied",
            programmeId:item.assessment.programme_id
            // denyReason:this.denyReason
          };
          this.$store
            .dispatch("AdmissionOfficer/denyAdmission", details)
            .then((response) => {
              // console.log(response);
              Fire.$emit("acceptAdmission");
               Toast.fire({
                icon:"info",
                title:"Done"
              })
            })
            .catch((err) => {
              console.log(err);
               Toast.fire({
                icon:"error",
                title:"An error occured try again"
              })
            });
        } else {
          Toast.fire({
            icon: "info",
            title: "Operation Cancelled",
          });
          //   throw new axios.Cancel('Operation canceled by the user.');
        }
      });
    },
    async handleRecom(){
      this.approveBusy = true;
      try{
        let approvedProgramme = await this.getProgrammeForApprove();
        if (approvedProgramme) {
          this.programme = approvedProgramme.programme;
          this.modal = true;
        }
        this.approveBusy = false;
      } catch (error) {
        console.log("error");
        // Swal.fire({
        //   title: "Application is not completed",
        //   icon: "warning",
        // });
        this.approveBusy = false;
      }
    },
    async handlePending(application){
      // console.log("handlepending")
      Fire.$emit("PendApplication", application);
    },
    recommend(item){
      Swal.fire({
        title: "You are about to recommend an applicant for admission",
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "YES",
        cancelButtonText: "NO",
      }).then((result) => {
        if (result.isConfirmed) {
          let details = {
            applicant: item.applicant.id,
            applicationId: item.id,
            programmeId:
              this.approvedProgramme.id == this.programme.id
                ? this.programme.id
                : this.approvedProgramme.id,
            admsStatus: "RECOMMENDED",
          };
          axios.post("/admin/pgcoord/adms/recommendation",
            details
          )
          .then((response) => {
             Toast.fire({
                icon:"info",
                title:"Done"
              })
            
          }).catch((err) => {
             Toast.fire({
                icon:"error",
                title:"An error occured try again"
              })
          });
        } else {
          Toast.fire({
            icon: "info",
            title: "Operation Cancelled",
          });
          //   throw new axios.Cancel('Operation canceled by the user.');
        }
      });
    },
    async handleUnRecommend(){
      this.denyBusy = true;
      try {
        let approvedProgramme = await this.getProgrammeForApprove();
        if(approvedProgramme){
          this.programme = approvedProgramme.programme;
          this.denyModal = true
        }
        this.denyBusy = false
      } catch (error) {
        console.log(error)
        this.denyBusy = false
      }
    },
    UnRecommend(item){
      Swal.fire({
        title: "You are about to unrecommend an applicant for admission",
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "YES",
        cancelButtonText: "NO",
      }).then((result) => {
        if (result.isConfirmed) {
          let details = {
            applicant: item.applicant.id,
            applicationId: item.id,
            programmeId:item.assessment.programme_id,
            admsStatus: "NRECOMMENDED",
            message:this.denyReason
          };
          axios.post("/admin/pgcoord/adms/recommendation",
            details
          )
          .then((response) => {
             Toast.fire({
                icon:"info",
                title:"Done"
              })
          }).catch((err) => {
             Toast.fire({
                icon:"error",
                title:"An error occured try again"
              })
          });
        } else {
          Toast.fire({
            icon: "info",
            title: "Operation Cancelled",
          });
          //   throw new axios.Cancel('Operation canceled by the user.');
        }
      });
    }


  },
};
</script>

<style>
.small-font{
  font-size: 0.9rem;
}
</style>
