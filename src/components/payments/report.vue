<template>
  <div>
    <page-header class="mt-5" title="Reports" />
    <div>
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-2">
              <div class="shadow border rounded-top">
                <div class="d-block bg-secondary rounded text-white">
                  <div class="text-center">
                    <b>Filter Reports Here</b>
                  </div>
                  <hr class="w-100 m-0 p-0" />
                </div>
                <div class="p-2">
                  <div class="form-group">
                    <label>Select Programme Type</label>
                    <v-select
                      @input="loadPaymentType"
                      label="programme_type"
                      :options="programmeTypes"
                      v-model="programmeType"
                    ></v-select>
                  </div>

                  <div class="form-group">
                    <label>Select payment</label>
                    <v-select :loading="paymentTypes.loading"
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

                  <div class="form-group">
                    <label>Select Start Date</label>
                    <b-form-datepicker
                      id="datepicker-dateformat2"
                      v-model="startDate"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      }"
                      locale="en"
                    ></b-form-datepicker>
                  </div>
                  <div class="form-group">
                    <label>Select End Start</label>
                    <b-form-datepicker
                      id="datepicker-dateformat1"
                      v-model="endDate"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                      }"
                      locale="en"
                    ></b-form-datepicker>
                  </div>
                  <div class="d-block">
                    <button class="btn btn-sm btn-outline-info">Load</button>
                    <button class="btn btn-sm btn-primary rounded float-right">
                      Dowload XLSX
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <report-table/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageHeader from "../layout/pageHeader.vue";
import ReportTable from './report.table.vue';

export default {
  components: { pageHeader, ReportTable,  },
  data() {
    return {
      payments: [],
      payment: "",
      programmeType: "",
      paymentType: "",
      paymentTypes: {
          types:[],
          loading:false
      },
      startDate:null,
      endDate:null,
    };
  },
  computed: {
    programmeTypes() {
      return this.$store.state.programmeTypes;
    },
    // paymentTypes(){
    //     return this.$store.paymentTypes;
    // }
  },
  methods: {
    loadPaymentType() {
    //   console.log("here");
    this.paymentTypes.loading=true
      axios
        .post("admin/paymentTypes", { programme_type: this.programmeType })
        .then((response) => {
          this.paymentTypes.types = response.data.types;
    this.paymentTypes.loading=false
        })
        .catch((err) => {
          console.log("error getting payment Type");
        });
    },
  },
  created() {
    this.$store.dispatch("getprogrammeTypes");
    // this.$store.dispatch("getPaymentTypes");
  },
};
</script>

<style></style>
