<template>
  <div class="d-inline">
    <button
      class="btn btn-sm btn-outline-primary"
      v-if="!printall"
      @click="print()"
    >
      <span
        v-if="busy.state"
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      print
    </button>
    <button class="btn btn-danger btn-sm" v-if="printall" @click="back">
      Back
    </button>




    <div v-if="printall">
          <!-- loading state for the print page -->
          <b-overlay :show="printPage" class="m-0 p-0">
                    
      <div class="container">
        <div class="d-block">
          <div class="row align-items-center ">
            <div class="col">
              <img
                class="logo-icon mr-2 img-fluid w-25"
                 src="assets/images/logo1.jpg"
                alt="logo"
              />
            </div>
            <div class="col">
              <h5 class="text-uppercase text-center">
                {{ personalData.name }} 
              </h5>
                <h6 class="text-center text-uppercase">
                <b>
                  {{application_number}}
                </b>
              </h6>
            </div>
            <div class="col ">
               <div class="float-right">
                  <b-overlay :show="applicantImg.loading" rounded="sm" >
                 <template v-if="applicantImg.error">
                   <label class="text-danger ">
                     <b>
                       No Image Uploaded
                     </b>
                   </label>
                 </template>
                 <template v-else>
                   <img
                class="logo-icon mr-2 img-fluid w-25 float-right"
                :src="applicantImg.img"
                alt="applicant image"
              />
                 </template>
    </b-overlay>
               </div>
            </div>
          </div>
        </div>
        <div class="row m-3">
          <div class="col">
            <label class="d-block" style="font-weight: bold">Fullname</label
            ><label class="p-2 w-100 border">{{ personalData.name }}</label>
          </div>
          <div class="col col-3">
            <label class="d-block" style="font-weight: bold">Title</label
            ><label class="p-2 w-100 border text-capitalize">{{
              personalData.title
            }}</label>
          </div>
          <div class="col col-3">
            <label class="d-block" style="font-weight: bold">Gender</label
            ><label class="p-2 w-100 border">{{
              personalData.gender == "F" ? "FEMALE" : "MALE"
            }}</label>
          </div>
        </div>
        <div class="row m-3">
          <div class="col">
            <label class="d-block" style="font-weight: bold">Email</label
            ><label class="p-2 w-100 border">{{ email }}</label>
          </div>
          <div class="col">
            <label class="d-block" style="font-weight: bold">Mobile</label
            ><label class="p-2 w-100 border">{{ mobile }}</label>
          </div>
        </div>
        <div class="row m-3">
          <div class="col">
            <label class="d-block" style="font-weight: bold"
              >Marital Status</label
            ><label class="p-2 w-100 border text-capitalize">{{
              personalData.marital_status
            }}</label>
          </div>
          <div class="col">
            <label class="d-block" style="font-weight: bold"
              >Date of Birth</label
            ><label class="p-2 w-100 border">{{
              personalData.date_of_birth
            }}</label>
          </div>
          <div class="col">
            <label class="d-block" style="font-weight: bold"
              >State of Birth</label
            ><label class="p-2 w-100 border">{{
              personalData.state_of_origin
            }}</label>
          </div>
          <div class="col">
            <label class="d-block" style="font-weight: bold"
              >Place of birth</label
            ><label class="p-2 w-100 border">{{
              personalData.place_of_birth
            }}</label>
          </div>
        </div>
        <div class="row m-3">
          <div class="col">
            <label class="d-block" style="font-weight: bold"
              ><strong>Place of birth LG</strong><br /></label
            ><label class="p-2 w-100 border">{{
              personalData.place_of_birth_LG
            }}</label>
          </div>
          <div class="col">
            <label class="d-block" style="font-weight: bold"
              ><strong>Nationality</strong><br /></label
            ><label class="p-2 w-100 border">{{
              personalData.nationality
            }}</label>
          </div>
          <div class="col">
            <label class="d-block" style="font-weight: bold"
              ><strong>Health Status</strong><br /></label
            ><label class="p-2 w-100 border">{{
              personalData.health_status
            }}</label>
          </div>
        </div>
        <div class="row m-3">
          <div class="col">
            <label class="d-block" style="font-weight: bold"
              ><strong>Residential Address</strong><br /></label
            ><label class="p-2 w-100 border">{{
              personalData.residential_address
            }}</label>
          </div>
          <div class="col">
            <label class="d-block" style="font-weight: bold"
              ><strong>Contact Address</strong><br /></label
            ><label class="p-2 w-100 border">{{
              personalData.contact_address
            }}</label>
          </div>
        </div>
        <div class="row m-3">
          <div class="col">
            <label class="d-block" style="font-weight: bold"
              ><strong>Next of kin&#39;s name</strong><br /></label
            ><label class="p-2 w-100 border">{{
              personalData.next_of_kin_name
            }}</label>
          </div>
          <div class="col">
            <label class="d-block" style="font-weight: bold"
              ><strong>Next of kin&#39;s relationship</strong><br /></label
            ><label class="p-2 w-100 border">{{
              personalData.next_of_kin_relationship
            }}</label>
          </div>
          <div class="col">
            <label class="d-block" style="font-weight: bold"
              ><strong>Next of kin&#39;s phone</strong><br /></label
            ><label class="p-2 w-100 border">{{
              personalData.next_of_kin_phone
            }}</label>
          </div>
        </div>
        <div class="row m-3">
          <div class="col">
            <label class="d-block" style="font-weight: bold"
              ><strong>Next of kin&#39;s email</strong><br /></label
            ><label class="p-2 w-100 border">{{
              personalData.next_of_kin_email
            }}</label>
          </div>
          <div class="col">
            <label class="d-block" style="font-weight: bold"
              ><strong>Next of kin&#39;s address</strong><br /></label
            ><label class="p-2 w-100 border">{{
              personalData.next_of_kin_address
            }}</label>
          </div>
        </div>
        <div class="row m-3">
          <div class="col">
            <label class="d-block" style="font-weight: bold"
              ><strong>Hobbies</strong><br /></label
            ><label class="p-2 w-100 border">{{ personalData.hobbies }}</label>
          </div>
        </div>
      </div>
      <!-- institution Attend -->
      <div class="container">
        <div class="d-block">
          <div class="row align-items-center justify-content-center">
            <div class="col">
              <h5 class="text-uppercase text-center">Institution Attended</h5>
            </div>
          </div>
          <div v-for="(institution, index) in institutionHistroy" :key="index">
            <span class="d-block">
              Institution Name: <b>{{ institution.name_of_institution }}</b>
            </span>
            <span class="d-block">
              Institution Address:
              <b>{{ institution.address_of_institution }}</b>
            </span>
            <span class="d-block"
              >Date Admitted: <b>{{ institution.date_admitted }}</b>
            </span>
            <span
              >Date Graduated: <b>{{ institution.date_graduated }}</b></span
            >
            <span class="d-block"
              >Quanlification Obtained:
              <b>{{ institution.qualification_obtained }}</b></span
            >
            <span class="d-block"
              >Degree Obtained:
              <b>{{ institution.class_of_degree_obtained }}</b></span
            >
            <span class="d-block"
              >Discipline: <b>{{ institution.field_discipline }}</b></span
            >
            <hr />
          </div>
        </div>
      </div>

      <!-- Employment History -->
      <div class="container">
        <div class="d-block">
          <div class="row align-items-center justify-content-center">
            <div class="col text-center">
              <h5 class="text-uppercase">Employment History</h5>
            </div>
          </div>
        </div>
        <div v-for="(employment, index) in employmentHistory" :key="index">
          <span class="d-block"
            >Organisation Name: <b>{{ employment.organisation }}</b>
          </span>
          <span class="d-block"
            >Address: <b> {{ employment.address }} </b></span
          >
          <span class="d-block">
            Date Started: <b>{{ employment.start_date }}</b>
          </span>
          <span class="d-block">
            Date Ended: <b>{{ employment.end_date }}</b></span
          >
          <span class="d-block"
            >Salary: <b>{{ employment.last_salary_per_annum }}</b></span
          >
          <span class="d-block"
            >Reason for leaving: <b>{{ employment.reason_for_leaving }}</b>
          </span>
          <hr />
        </div>
      </div>

      <!-- Reference  -->
      <div class="container">
        <div class="d-block">
          <div class="row align-items-center justify-content-center">
            <div class="col text-center">
              <h5 class="text-uppercase">Reference(s)</h5>
            </div>
          </div>
        </div>
        <div v-for="(reference, index) in reference" :key="index">
          <span class="d-block"
            >Title: <b>{{ reference.title }}</b>
          </span>
          <span class="d-block"
            >Fullname: <b>{{ reference.fullname }}</b></span
          >
          <span class="d-block"
            >Phone: <b>{{ reference.phone }}</b></span
          >
          <span class="d-block"
            >Email: <b>{{ reference.email }}</b></span
          >
          <span class="d-block"
            >Organisation: <b>{{ reference.organisation }}</b></span
          >
          <hr />
        </div>
      </div>

      <!-- Assessment -->
      <div class="container">
        <div class="d-block">
          <div class="row">
            <div class="col">
              <h5 class="text-uppercase text-center">Assessment</h5>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label class="d-block">NYSC COMPLETED ?</label>
            <label class="d-block p-2 border">
              {{ assessment.nysc_completed ? "YES" : "NO" }}
            </label>
          </div>
          <div class="col">
            <label class="d-block">Campus</label>
            <label class="d-block p-2 border">{{
              assessment.choose_campus
            }}</label>
          </div>
          <div class="col">
            <label class="d-block">Currently attending any college</label>
            <label class="d-block p-2 border">{{
              assessment.college_attending_currently ? "YES" : "NO"
            }}</label>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label class="d-block">Applied For</label>
            <label class="d-block p-2 border">{{ assessment.apply_for }}</label>
          </div>
          <div class="col">
            <label class="d-block"> Programme </label>
            <label class="d-block p-2 border">{{ assessment.programme }}</label>
          </div>
          <div class="col">
            <label class="d-block"> Academic Distinctions </label>
            <template v-if="assessment.academic_distinction_prize">
              <div
                class="d-block border-left border-5 border-dark mb-1"
                v-for="(distinctions,
                index) in assessment.academic_distinction_prize"
                :key="index"
              >
                <b class="p-1">{{ distinctions }}</b>
              </div>
            </template>
          </div>
        </div>
        <div class="row align-items-center justify-content-center">
          <div class="col">
            <label class="d-block">Publications</label>
            <template v-if="assessment.publications">
              <div
                class="d-block border-left border-5 border-dark mb-1"
                v-for="(publications, index) in assessment.publications"
                :key="index"
              >
                <b class="p-1">{{ publications }}</b>
              </div>
            </template>
          </div>
        </div>
      </div>
       </b-overlay>
    </div>
  </div>
</template>

<script>
export default {
  props: ["applicantName", "applicationId", "printall", "mobile", "email", "applicantData","application_number"],
  data() {
    return {
      show: false,
      applicant: {},
      credentials: {},
      personalData: {},
      reference: {},
      institutionHistroy: {},
      employmentHistory: {},
      assessment: {},
      busy: {
        state: false,
      },
      printPage:false,
      applicantImg:{
        loading:true,
        img:null,
        error:null,
      },
    };
  },
  methods: {
    async print() {
      let data = {
        applicantName: this.applicantName,
        applicationId: this.applicationId,
        mobile: this.mobile,
        email: this.email,
        applicantData:this.applicantData,
        application_number:this.application_number
      };
      Fire.$emit("PRINT-ALL", data);
      // await this.loadForms();
      // this.show = true
    },
    printnow() {
      window.print();
    },
    loadApplicantImg(path){
      this.applicantImg.loading = true
      // console.log('loading')
      axios.post("api/viewProfileImage", {'imgPath':this.applicantData.picture}, {responseType:"blob"})
      .then((response) => {
        // console.log(response)
         let applicantImageUrl = URL.createObjectURL(response.data);
        //  console.log(applicantImageUrl)
          this.applicantImg.img = applicantImageUrl;
      this.applicantImg.loading = false
      this.applicantImg.error = false
      }).catch((err) => {
        // console.log(err)
        this.applicantImg.loading = false;
        this.applicantImg.error = true
      });
    },
    loadForms() {
      // console.log(this.mobile)
      return new Promise((res, rej) => {
        this.busy.state = true;
        this.printPage = true;
        this.$store
          .dispatch("AdmissionOfficer/getForms", this.applicationId)
          .then((response) => {
            this.credentials = response.data.credentials;
            this.personalData = response.data.personalData;
            this.personalData.name = this.applicantName;
            this.reference = response.data.reference;
            this.institutionHistroy = response.data.institutionHistory;
            this.assessment = response.data.assessment;
            this.employmentHistory = response.data.employmentHistory;
            this.busy.state = false;
            this.printPage =false;
            res(true);
          })
          .catch((err) => {
            rej(err);
            this.busy.state = false;
            this.printPage = false;
            Toast.fire({
              icon:"error",
              title:"Error fetching application forms"
            })
            console.log(err);
          });
      });
    },
    back() {
      Fire.$emit("back");
    },
  },
   activated() {
    if (this.printall) {
     this.loadForms();
     this.loadApplicantImg();
    }
  },
  created() {
    // Fire.$on('printCom' , ()=>{
    //      this.loadForms();
    // })
  },
};
</script>

<style>
.modal-fullscreen .modal-dialog {
  /* max-width: 100%; */
  /* width: 100vw; */
  margin: 0;
  top: 0;
  /* bottom: 0; */
  /* left: 0; */
  /* right: 0; */
  height: 100%;
  /* display: ; */
  /* position: fixed; */
  /* z-index: 100000; */
}
</style>
