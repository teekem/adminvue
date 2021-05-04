<template>
  <div class="mt-3">
    <div>
      <div class="row">
        <div class="col-4">
          <div class="form-group">
            <label>Select Programme Type</label>
            <v-select
              @input="loadPaymentType"
              label="programme_type"
              :options="programmeTypes"
              v-model="programmeType"
            ></v-select>
          </div>
        </div>
        <div class="col-4">
          <div class="form-group">
            <label>Select payment</label>
            <v-select
                @input="laodPayments"
              :loading="paymentTypes.loading"
              label="type"
              :options="paymentTypes.types"
              v-model="paymentType"
            >
              <template #spinner="{ loading }">
                <div
                  v-if="loading"
                  style="border-left-color: rgba(88, 151, 251, 0.71)"
                  class="vs__spinner"
                >
                  The .vs__spinner class will hide the text for me.
                </div>
              </template>
            </v-select>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <b-form-group
          label="Filter"
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
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>
      <div class="col">
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
      </div>
    </div>
    <!-- Main table element -->
    <b-table
      :busy="isBusy"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
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

      <template #cell(actions)="row">
        <b-button
          size="sm"
          @click="info(row.item, row.index, $event.target)"
          class="mr-1"
        >
          Edit
        </b-button>
     
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
      <b-col md="6" class="my-1">
        <!-- <button>Save</button> -->
      </b-col>
    </b-row>
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isBusy: false,
      programmeType: {
        programme_type: "All",
      },
      paymentType: {
        type: "All",
      },
      paymentTypes: {
        types: ["All"],
        loading: false,
      },
      items: [{}],
      fields: [
        {
          key: "type",
          label: "Name",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "programme_type",
          label: "Programme Type",
          sortable: true,
          class: "text-center",
        },
        {
          key: "amount",
          label: "Amount",
          sortable: true,
          class: "text-center",
        },
        {
          key: "instalments",
          label: "Installments",
          sortable: true,
          class: "text-center",
        },
        {
          key: "serviceType_id",
          label: "Remita Service Type",
          sortable: true,
          class: "text-center",
        },
        {
          key: "details",
          label: "Details",
          sortable: true,
          class: "text-center",
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
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    programmeTypes() {
      let v = this.$store.state.programmeTypes;
      let value = [...v , { programme_type: "All" } ];
      
      // value.push({ programme_type: "All" });
      return value;
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
  beforeUpdate() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  mounted() {
      this.laodPayments();
  },
  methods: {
    loadPaymentType() {
      this.paymentTypes.loading = true;
      this.laodPayments();
      axios
        .post("admin/paymentTypes", { programme_type: this.programmeType })
        .then((response) => {
          let value = { type: "All" };
          this.paymentTypes.types = [...response.data.types, value];
          this.paymentTypes.loading = false;
        })
        .catch((err) => {
          console.log("error getting payment Type");
        });
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    laodPayments() {
      let params = {
        programme_type: this.programmeType.programme_type,
        type: this.paymentType.type,
      };
      this.isBusy = true;
      if (this.programmeType.programme_type == "All") {
        params.programme_type = null;
      }
      if (this.paymentType.type == "All") {
        params.type = null;
      }
      axios
        .post("admin/all/payment", params)
        .then((response) => {
          this.items = response.data.payment;
          this.isBusy = false;
        })
        .catch((err) => {});
    },
  },
  created() {
    this.$store.dispatch("getprogrammeTypes");
  },
};
</script>

<style></style>
