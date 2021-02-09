<template>
  <div>
    <page-header class="mt-5"></page-header>
    <!--//row-->
    <!-- nava started -->
    <nav
      id="orders-table-tab"
      class="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4"
    >
      <a
        class="flex-sm-fill text-sm-center nav-link active"
        id="orders-all-tab"
        data-toggle="tab"
        href="#orders-all"
        role="tab"
        aria-controls="orders-all"
        aria-selected="true"
        >All Applications</a
      >
      <a
        class="flex-sm-fill text-sm-center nav-link"
        id="orders-paid-tab"
        data-toggle="tab"
        href="#orders-paid"
        role="tab"
        aria-controls="orders-paid"
        aria-selected="false"
        >Pending Applications</a
      >
      <a
        class="flex-sm-fill text-sm-center nav-link"
        id="orders-pending-tab"
        data-toggle="tab"
        href="#orders-pending"
        role="tab"
        aria-controls="orders-pending"
        aria-selected="false"
        >Admitted Applications</a
      >
      <a
        class="flex-sm-fill text-sm-center nav-link"
        id="orders-cancelled-tab"
        data-toggle="tab"
        href="#orders-cancelled"
        role="tab"
        aria-controls="orders-cancelled"
        aria-selected="false"
        >Cancelled Applications</a
      >
    </nav>
    <div class="tab-content" id="orders-table-tab-content">
      <div
        class="tab-pane fade show active"
        id="orders-all"
        role="tabpanel"
        aria-labelledby="orders-all-tab"
      >
        <div class="app-card app-card-orders-table shadow-sm mb-5">
          <div class="app-card-body">
            <AllApplications :listOfAllApplicants="applicants" />
          </div>
        </div>
      </div>

      <!-- // two -->
      <div
        class="tab-pane fade"
        id="orders-paid"
        role="tabpanel"
        aria-labelledby="orders-paid-tab"
      >
        <div class="app-card app-card-orders-table mb-5">
          <div class="app-card-body">
            <PendApplications />
          </div>
        </div>
      </div>
      <!-- Two end -->

      <div
        class="tab-pane fade"
        id="orders-pending"
        role="tabpanel"
        aria-labelledby="orders-pending-tab"
      >
        <div class="app-card app-card-orders-table mb-5">
          <div class="app-card-body">C</div>
        </div>
      </div>
      <!-- three end -->

      <div
        class="tab-pane fade"
        id="orders-cancelled"
        role="tabpanel"
        aria-labelledby="orders-cancelled-tab"
      >
        <div class="app-card app-card-orders-table mb-5">
          <div class="app-card-body">D</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AllApplications from "@/components/application/AllApplications";
import PendApplications from "@/components/application/PendApplications";
import GetApplicants from "@/components/application/GetApplications";

import { mapGetters, mapActions } from "vuex";
import PageHeader from "../layout/pageHeader.vue";
export default {
  components: { AllApplications, PendApplications, GetApplicants, PageHeader },
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
