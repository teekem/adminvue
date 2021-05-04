<template>
  <b-container fluid>
    <div class="bg-light">
      <div class="row">
        <div class="col pl-4">
          <b-form-group
            label="Select Application Category"
            v-slot="{ ariaDescribedby }"
          >
            <b-form-radio-group
              v-model="selected.status"
              @change="fetchApplications"
              :options="options"
              :aria-describedby="ariaDescribedby"
              name="radio-inline"
            ></b-form-radio-group>
          </b-form-group>
        </div>
      </div>

      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="Search the table"
            label-for="filter-input"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type here to search"
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per page"
            label-for="per-page-select"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              size="sm"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </div>

    <!-- Main table element -->
    <b-table
      :busy="isBusy"
      :items="applications"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
      <template #cell(name)="row">
        {{ row.item.applicant.surname }} {{ row.item.applicant.firstname }}
        {{ row.item.applicant.lastname }}
      </template>

      <template #cell(email)="row">
        {{ row.item.applicant.email }}
      </template>
      <template #cell(mobile)="row">
        {{ row.item.applicant.mobile }}
      </template>
      <template #cell(applyFor)="row">
        {{ row.item.applyFor }}
      </template>
      <template #cell(actions)="row">
        <template v-if="wantToPrintLetter">
          <button
            class="btn btn-sm btn-outline-primary"
            @click="admissionLetter(row.item.admissionLetter)"
          >
            Admission Letter
          </button>
          <admission-letter
            
            
          ></admission-letter>
        </template>
        <template v-else>
         
            <button
            class="btn btn-sm btn-outline-dark"
            @click="viewApplicant(row.item, row.index, $event.target)"
          >
            view
          </button>
          <print-all
            :application_number="row.item.application_number"
            :applicantData="row.item.applicant"
            :applicantName="
              row.item.applicant.surname + ' ' + row.item.applicant.firstname
            "
            :mobile="row.item.applicant.mobile"
            :email="row.item.applicant.email"
            :applicationId="row.item.id"
          />
          <template v-if="$store.state.user.roleInUse != 'pgCoord'">
          <accept-admission :index="row.index" :item="row.item" />
          </template>
          <button
            class="btn btn-outline-dark rounded btn-sm"
            v-b-tooltip.hover
            title="Download All Credentials"
            @click="downloadAll(row.item)"
          >
            <b-icon icon="download" scale="1"></b-icon>
          </button>

        </template>
      </template>

      <template #empty="">
        <h4 class="text-danger text-center">No record</h4>
      </template>
      <template #emptyfiltered="">
        <h4 class="text-danger text-center">
          The record you searched for is not avalable
        </h4>
      </template>
    </b-table>
    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
    <select-settings-modal/>
    

  </b-container>
</template>

<script>
import { isEmpty } from "lodash";

import AcceptAdmission from "./accept.admission.vue";
import PrintAll from "../Forms/print.all.vue";
import AdmissionLetter from "./admissionLetter.vue";
import SelectSettingsModal from '../../helper/selectSettings.modal.vue';
export default {
  // props: ["applications"],
  components: { AcceptAdmission, PrintAll, AdmissionLetter, SelectSettingsModal },
  data() {
    return {
      // applications:
      selected: {
        status: "submitted under processing",
      },
      options: [
        { text: "All Applications", value: "all" },
        { text: "Submitted Applications", value: "submitted under processing" },
        { text: "Pending Applications", value: "awaiting submission" },
        { text: "Denied Application ", value: "denied" },
        { text: "Approved Application", value: "approved" },
        { text: "Recommended", value: "recommended" },
        { text: "Not Recommended", value: "nrecommened" },
      ],
      isBusy: false,
      fields: [
        {
          key: "name",
          label: "full name",
          sortable: true,
          sortDirection: "desc",
        },
        // {
        //   key: "email",
        //   label: "Email",
        //   sortable: true,
        // },
        {
          key: "mobile",
          label: "Mobile",
          sortable: true,
        },
        {
          key: "programme",
          label: "Programme",
          sortable: true,
        },
        {
          key: "approvedProgramme",
          label: "Approved Programme",
          sortable: true,
        },
        {
          key: "applyFor",
          label: "Applied For",
          sortable: true,
        },
        {
          key: "created_at",
          label: "Date",
          sortable: true,
          formatter: (value, key, item) => {
            return new Date(value).toLocaleString("en-US");
          },
        },
        {
          key: "status",
          label: "Admission Status",
          sortable: true,
        },
        { key: "actions", label: "Actions" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      wantToPrintLetter:false,
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
    applications() {
      return this.$store.state.AdmissionOfficer.applications;
    },
    
  },
  mounted() {
    // this.totalRows = this.applications.length;
    this.selectProgramme();
    this.loadSettings();
  },
  beforeUpdate() {
    this.totalRows = this.applications.length;
  },
  methods: {
    loadSettings(){
      this.$store
        .dispatch("getSettings")
        .then((response) => {
          // this.programmes = response
        })
        .catch((err) => {
          console.log(err);
        });
    },
    admissionLetter(letter) {
      Fire.$emit("SHOW-ADMISSION-LETTER", letter);
    },
    fetchApplications() {
      this.loadApplications();
    },
    printAll() {},
    downloadFile(file) {
      return new Promise((res, rej) => {
        axios({
          url: "admin/downloadFile",
          methods: "GET",
          params: { path: file.path },
          responseType: "blob",
        })
          .then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", file.name);
            document.body.appendChild(fileLink);
            fileLink.click();
            res(true);
          })
          .catch((err) => {
            console.log(err);
            rej(err);
          });
      });
    },
    downloadAll(item) {
      let credentials = "";
      let assessment = "";
      this.$store
        .dispatch("AdmissionOfficer/getForms", item.id)
        .then((response) => {
          // this.busy.state = false;
          credentials = response.data.credentials;
          assessment = response.data.assessment;
          this.downloadFile(assessment.essay);
          credentials.credentials.forEach(async (element) => {
            await this.downloadFile(element);
          });
        })
        .catch((err) => {
          // this.busy.state = false;
          console.log(err);
        });
      console.log(item);
    },
    selectProgramme() {
      console.log("load programme");
      this.$store
        .dispatch("getProgrammes")
        .then((response) => {
          // this.programmes = response
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    viewApplicant(item, index, target) {
      console.log(item);
      //   console.log(index);
      //   console.log(target);
      let applicationId = item.id;
      let applicant =
        item.applicant.surname +
        " " +
        item.applicant.firstname +
        " " +
        item.applicant.lastname;
      Fire.$emit("VIEW-APPLICANT", {
        applicationId: applicationId,
        applicantName: applicant,
        email: item.applicant.email,
        mobile: item.applicant.mobile,
        applicantData: item.applicant,
        application_number: item.application_number,
      });
    },
    loadApplications() {
      if (isEmpty(this.applications)) {
        this.isBusy = true;
      }
      this.isBusy = true;
      // console.log(this.selected)
      this.$store
        .dispatch("AdmissionOfficer/getApplications", this.selected)
        .then((response) => {
          // console.log(response);
          if(this.selected.status == 'approved'){
            this.wantToPrintLetter = true
          }else{
            this.wantToPrintLetter = false
          }
          this.isBusy = false;
        })
        .catch((err) => {
          console.log(err);
          Toast.fire({
            'icon':'error',
            'title':"Error while fetching applications"
          })
        });
    },
  },
  created() {
    this.loadApplications();
    Fire.$on("acceptAdmission", () => {
      this.loadApplications();
    });
  },
};
</script>

<style></style>
