<template>
  <div>
    <div class="mb-2 bg-dark ">
      <button class="btn btn-danger d-inline dontprint" @click="back">
        <b-icon icon="arrow-left" scale="1"></b-icon>
        Back
      </button>
      <h5
        class="m-0 font-weight-bold text-white text-capitalize text-center d-inline ml-5"
      >
        {{ applicantName }}    {{application_number}}
      </h5>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="row dontprint">
          <div class="col">
            <template v-if="previousForm">
              <button
                class="btn btn-sm btn-outline-light btn-link"
                @click="previousStep(previousForm)"
              >
                {{ previousForm.name }}
              </button>
            </template>
          </div>
          <div class="col">
            <template v-if="nextForm">
              <button
                class="btn btn-sm btn-outline-light btn-link float-right"
                @click="nextStep(nextForm)"
              >
                {{ nextForm.name }}
              </button>
            </template>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <div>
              <keep-alive>
                <component
                  :is="currentform.com"
                  :personalData="personalData"
                  :assessment="assessment"
                  :credentials="credentials"
                  :reference="reference"
                  :institutionHistroy="institutionHistroy"
                  :employmentHistory="employmentHistory"
                >
                </component>
              </keep-alive>
            </div>
          </div>
        </div>
        <!-- <print-all :personalData="personalData" :assessment="assessment"
                  :credentials="credentials"
                  :reference="reference"
                  :institutionHistroy="institutionHistroy"
                  :employmentHistory="employmentHistory" /> -->
      </div>
    </div>
    <!-- <personsal-data :personalData="personalData" /> -->

    <!-- <div>
      <div class="row p-2">
        <div class="col">
          <div class="row">
            <div class="col">
              <personsal-data :personalData="personalData" />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col">
              <assesment :assessment="assessment" />
            </div>
          </div>
        </div>
        <div class="col-3">
          <credentials :credentials="credentials" />
        </div>
      </div>

      <div class="row">
        <div class="col">
          <reference :reference="reference"/>
        </div>
        <div class="col">
          <institution :institutionHistroy="institutionHistroy"/>
        </div>
        <div class="col">
          <employment :employmentHistory="employmentHistory"/>
        </div>
      </div>

    </div> -->
    <b-overlay :show="busy.state" no-wrap @shown="onShown" @hidden="onHidden">
      <template #overlay>
        <div class="text-center rounded">
          <b-icon
            icon="text-paragraph"
            animation="fade"
            font-scale="4"
          ></b-icon>
        </div>
      </template>
    </b-overlay>
  </div>
</template>

<script>
import Assesment from "./Forms/assesment.vue";
import Credentials from "./Forms/Credentials.vue";
import Employment from "./Forms/Employment.vue";
import Institution from "./Forms/institution.vue";
import PersonsalData from "./Forms/PersonsalData.vue";
import PrintAll from './Forms/print.all.vue';
import Reference from "./Forms/Reference.vue";

export default {
  props: ["applicationId", "applicantName", "mobile", "email" , "applicantData",'application_number'],
  components: {
    Credentials,
    PersonsalData,
    Assesment,
    Reference,
    Institution,
    Employment,
    PrintAll,
  },
  data() {
    return {
      currentform: {
        index: 0,
        com: "PersonsalData",
        name: "Personal Data",
      },
      formSteppers: [
        {
          name: "Personal Data",
          key: "PersonsalData",
        },
        {
          name: "Institution(s) Attended",
          key: "Institution",
        },
        {
          name: "Employment History",
          key: "Employment",
        },
        {
          name: "Assestment Form",
          key: "Assesment",
        },
        {
          name: "Reference",
          key: "Reference",
        },
        {
          name: "Credentials",
          key: "Credentials",
        },
      ],
      busy: {
        state: false,
        displayMsg: "",
        action: null,
      },
      applicants: this.$store.getters["User/getAllUsers"],
      applicant: {},
      credentials: {},
      personalData: {},
      reference: {},
      institutionHistroy: {},
      employmentHistory: {},
      assessment: {},
      applicantImageUrl:null
    };
  },

  methods: {
    nextStep(nextform) {
      this.currentform.com = nextform.key;
      this.currentform.name = nextform.name;
      this.currentform.index = this.currentform.index + 1;
    },
    previousStep(pform) {
      this.currentform.com = pform.key;
      this.currentform.name = pform.name;
      this.currentform.index = this.currentform.index - 1;
    },
    onShown() {},
    onHidden() {},
    back() {
      Fire.$emit("back");
    },
    // thisApplicant(applicant) {
    //   this.applicant = "";
    //   return (this.applicant = applicant);
    // },
    loadForms() {
      this.busy.state = true;
      this.$store
        .dispatch("AdmissionOfficer/getForms", this.applicationId)
        .then((response) => {
          this.busy.state = false;
          this.credentials = response.data.credentials;
          this.personalData = {...response.data.personalData, ...{email:this.email}, ...{ mobile:this.mobile}, ...{applicantData:this.applicantData}  };
          this.personalData.name = this.applicantName;
          this.reference = response.data.reference;
          this.institutionHistroy = response.data.institutionHistory;
          this.assessment = response.data.assessment;
          this.employmentHistory = response.data.employmentHistory;
        })
        .catch((err) => {
          this.busy.state = false;
          console.log(err);
        });
    },
    loadApplicantImage(){
       axios.post("api/viewProfileImage", {'imgPath':this.applicantData.picture}, {responseType:"blob"})
      .then((response) => {
        console.log(response)
         let applicantImageUrl = URL.createObjectURL(response.data);
        //  console.log(applicantImageUrl)
          // this.applicantImageUrl= applicantImageUrl;
          // this.personalData.applicantImageUrl = this.applicantImageUrl
        Fire.$emit("ApplicantImageLoaded", {url:applicantImageUrl})
      // this.applicantImg.loading = false
      }).catch((err) => {
        Fire.$emit("ApplicantImageLoaded", {error:true})
        // console.log(err)
      });
    }
  },
  created() {
      this.loadForms();
      this.loadApplicantImage();

    Fire.$on("LOADFORMS", () => {
      this.credentials = {}
      this.personalData = {}
      this.personalData.name = {}
      this.reference = {}
      this.institutionHistroy = {}
      this.assessment = {}
      this.employmentHistory = {}
      this.loadForms();
      this.loadApplicantImage();
    });
  },
  computed: {
    nextForm() {
      if (this.currentform.index == 5) {
        return false;
      }
      return this.formSteppers[this.currentform.index + 1];
    },
    previousForm() {
      if (this.currentform.index == 0) {
        return false;
      }
      return this.formSteppers[this.currentform.index - 1];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@media print {
  .dontprint {
    display: none;
  }
}
</style>
