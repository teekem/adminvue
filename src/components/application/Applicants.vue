<template>
  <div>
    <page-header class="mt-5" title="Applicant"></page-header>

    <div>
      <AllApplications />
    </div>
  </div>
</template>

<script>
import AllApplications from "@/components/application/AllApplications";
// import PendApplications from "@/components/application/PendApplications";
// import GetApplicants from "@/components/application/GetApplications";

import { mapGetters, mapActions } from "vuex";
import PageHeader from "../layout/pageHeader.vue";
import Applicant from "./Applicant.vue";
export default {
  components: {
    AllApplications,
      PageHeader,
    Applicant,
  },

  props: {
    id: { type: Number },
  },
  data() {
    return {
      data1: true,
      applicants: this.$store.getters["User/getAllUsers"],
      test: 2,
    };
  },

  methods: {
    displaycontent(value) {
      if (value === "data1") {
        this.data1 = true;
        this.idvalue = "orders-all-tab";
        this.hrefvalue = "#orders-all";
        this.data2 = false;
      }
      if (value === "data2") {
        this.data2 = true;
        this.idvalue = "orders-paid-tab";
        this.hrefvalue = "#orders-paid";
        this.data1 = false;
      }
      // else {this.data1 = true}
    },

    registerRoute() {
      this.$router.push({
        name: "applicant",
        params: { name: { value: this.test } },
      });
    },
  },
  created() {
    this.$store.dispatch("User/loadUser");
  },

  computed: {},

  mounted() {
    //  console.log(this.$route)
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
