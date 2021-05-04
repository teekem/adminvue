<template>
  <div>
  <keep-alive>
    <component :is="currentComponent" :printall="printall" :mobile="mobile"  :email="email" :applications="applications" :applicationId="applicationId" :applicantName="applicantName" :applicantData="applicantData" :application_number="application_number"></component>
    </keep-alive>    

  </div>
</template>

<script>
import applicationsTable from './helper/applications.table.vue';
import Applicant from './Applicant.vue';
import PrintAll from './Forms/print.all.vue';


export default {
  components: { Applicant, applicationsTable, PrintAll },
  data() {
    return {
      currentComponent:applicationsTable,
      applicationId:'',
      applicantName:'',
      mobile:'',
      email:"",
      printall:false,
      applicantData:{},
      application_number:null,
      applicantImg:{
        loading:true,
        img:null
      }
    };
  },
  computed: {
    applications() {
      return this.$store.state.AdmissionOfficer.applications;
    },
   
  },
  created() {
    // this.loadApplications();
  // console.log('hete');
    Fire.$on('VIEW-APPLICANT' , data=>{
      this.applicationId = data.applicationId;
      this.applicantName = data.applicantName
      this.mobile = data.mobile;
      this.email = data.email
      this.applicantData = data.applicantData
      this.application_number = data.application_number
      this.currentComponent = Applicant;
      setTimeout(() => {
        Fire.$emit('LOADFORMS');
      }, 500);
    });
    Fire.$on('back', ()=>{
      this.currentComponent = applicationsTable
      this.printall = false
    })
    Fire.$on("PRINT-ALL", (data)=>{
      this.applicationId = data.applicationId
      this.applicantName = data.applicantName
      this.mobile = data.mobile;
      this.email = data.email
      this.printall  = true;
      this.applicantData = data.applicantData;
      this.application_number = data.application_number
      this.currentComponent = PrintAll
      // Fire.$emit('printCom');
    });
  },
 
  methods: {
    // loadApplications() {
    //   if (isEmpty(this.applications)) {
    //     this.isBusy = true;
    //   }
    //   this.$store
    //     .dispatch("AdmissionOfficer/getApplications")
    //     .then((response) => {
          
    //       this.isBusy = false;
    //     })
    //     .catch((err) => {});
    // },
  },
};
</script>

<style></style>
