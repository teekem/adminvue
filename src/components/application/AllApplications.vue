<template>
  <div>
    <b-container fluid>
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

        <template #cell(actions)="row">
          <button
            class="btn btn-sm btn-outline-dark"
            @click="info(row.item, row.index, $event.target)"
           
          >
            view
          </button>
          <!-- <b-button size="sm" @click="row.toggleDetails">
            {{ row.detailsShowing ? "Hide" : "Show" }} Details
          </b-button> -->
        </template>

        <template #empty="">
          <h4 class="text-danger text-center">No record</h4>
        </template>
        <template #emptyfiltered="">
          <h4 class="text-danger text-center">The record you searched for is not avalable </h4>
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
    </b-container>
  </div>
</template>

<script>
import { isEqual } from "lodash";
export default {
  // props: {
  //   listOfAllApplicants: Array,
  // },
  data() {
    return {
      isBusy: false,
      fields: [
        {
          key: "name",
          label: "full name",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "email",
          label: "Email",
          sortable: true,
        },
        {
          key: "mobile",
          label: "Mobile",
          sortable: true,
        },
        {
          key: "created_at",
          label: "Date",
          sortable: true,
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
    };
  },
  computed: {
    applications() {
      return this.$store.state.AdmissionOfficer.applications;
    },
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  created() {
    this.loadApplications();
  },
  mounted() {
    this.totalRows = this.applications.length;
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    loadApplications() {
      if (isEqual(this.applications)) {
        this.isBusy = true;
      }
      this.$store
        .dispatch("AdmissionOfficer/getApplications")
        .then((response) => {
          
          this.isBusy = false;
        })
        .catch((err) => {});
    },
  },
};
</script>

<style></style>
