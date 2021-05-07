<template>
  <div>
    <div class="mt-5">
      <b-container fluid>
        <div class="card mb-1">
          <div class="card-body py-2 px-3">
            <div class="row">
              <div class="col">
                 <div class="form-group m-0 p-0">
                  <label>Select Session</label>
                  <select class="form-control form-control-sm" v-model="session" @change="loadTransactions">
                    <option v-for="(s, index) in sessions " :key="index"  >{{s}}</option>
                  </select>
                </div>
              </div>
              <div class="col">
                 <div class="form-group m-0 p-0">
                  <label>Select Semester</label>
                  <select class="form-control form-control-sm" v-model="semester" @change="loadTransactions" >
                    <option v-for=" (s, index) in semesters " :key="index" :value="s">{{s}}</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="form-group m-0 p-0">
                  <label>Select Degree</label>
                 <select
                class="form-control form-control-sm"
                v-model="programme_type" 
                @change="loadTransactions"
              >
                <option v-for="(type , index) in programme_types" :key="index" :value="type.programme_type">{{type.programme_type}}</option> 
              </select>
                </div>
              </div>
              <div class="col">
                <div class="form-group m-0 p-0">
                  <label>Select Payment Type</label>
                  <select class="form-control form-control-sm" v-model="paymentType" @change="loadTransactions" >
                    <option value="" >All</option>
                    <option v-for="(type, index) in paymentTypes" :key="index" :value="type.value" >{{type.name}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class=" row justify-content-evenly">
          <div class="col-4">
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
          <div class="col-4">
          <div class="text-center">
            <button v-if="!student.clicked" @click="student.clicked = !student.cliked" class=" btn btn-sm btn-info rounded-pill" > Enter Application Number </button>
            <div v-else class="">
              <div class="input-group">
  <input type="text" class="form-control form-control-sm" placeholder="Enter Application Number" aria-label="Application Number" v-model="student.application_number" >
  <button class="btn btn-info btn-sm" type="button" @click="loadTransactions">Load</button>
  <button class="btn btn-danger btn-sm"  @click="student.clicked = false">Cancel</button>
</div>
            </div>
          </div>
          </div>
          <div class="col-4">
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
          <template #cell(name)="row">
            {{ row.value.surname}}
          </template>

          <template #cell(actions)="row">
            <b-button
              size="sm"
              @click="info(row.item, row.index, $event.target)"
              class="mr-1"
            >
              View on Remita
            </b-button>
            <!-- <b-button size="sm" @click="row.toggleDetails">
              {{ row.detailsShowing ? "Hide" : "Show" }} Details
            </b-button> -->
          </template>

          <template #row-details="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">
                  {{ key }}: {{ value }}
                </li>
              </ul>
            </b-card>
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

        <!-- Info modal -->
        <b-modal
          :id="infoModal.id"
          :title="infoModal.title"
          ok-only
          @hide="resetInfoModal"
        >
        <b-badge variant="success">Payment type is <b>{{infoModal.content.type}}</b></b-badge>
          <div class="">
            <b-overlay :show="infoModal.show" rounded="sm">
              <div class="shadow-sm p-2 rounded">
                <span>Amount: <b> ₦ {{infoModal.rrrStatus.amount}}</b> </span> <br>
                <span> Message: <b>{{infoModal.rrrStatus.message}}</b> </span> <br>
                <span> Transaction Time : <b>{{infoModal.rrrStatus.transactiontime}}</b> </span>
              </div>
    </b-overlay>
          </div>
        </b-modal>
      </b-container>
    </div>
  </div>
</template>

<script>
import pageHeader from "../layout/pageHeader.vue";

export default {
  components: { pageHeader },
  data() {
    return {
      isBusy:false,
      items: [],
      fields: [
        {
          key: "surname",
          label: "Surname",
          sortable: true,
          class: "text-center",
        },
        {
          key: "lastname",
          label: "Lastname",
          sortable: true,
          class: "text-center",
        },
        {
          key: "mobile",
          label: "Mobile",
          sortable: true,
          class: "text-center",
        },
        {
          key: "rrr",
          label: "RRR",
          sortable: true,
          class: "text-center",
        },
        {
          key:"amount",
          label:"Amount",
          sortable:true,
          class:"text-center"
        },
        {
          key:'type',
          label:"Type",
          sortable:true,
          class:"text-center"
        },
        {
          key: "status",
          label: "Status",
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
        show:true,
        title: "",
        content: "",
        rrrStatus:""
      },
      semesters:[],
      semester:"",
      sessions:[],
      session:"",
      programme_types:'',
      programme_type:"",
      paymentTypes:[
        {name:"Application FEE", value:'application'},
        {name:"Acceptance FEE" , value:'acceptance'},
        {name:"Caution FEE", value:'caution'},
      ],
      paymentType:"",
      application_number:"",
      student:{
        application_number:null,
        clicked:false
      }
    };
  },
  computed: {
    settings() {
      return this.$store.state.settings;
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
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  beforeUpdate() {
    this.totalRows = this.items.length;
  },
  methods: {
    info(item, index, button) {
      this.infoModal.show = true;
      this.infoModal.title = item.surname+' '+item.lastname ;
      this.infoModal.content = item
      this.getRRRStatus(item.rrr);
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
   loadProgrammeTypes(){
     axios.post('api/getProgrammeTypesForApplication')
      .then((response) => {
        this.programme_types = response.data.types;
      }).catch((err) => {
        Toast.fire({
          icon:'error',
          title:'Network Error'
        })
      });
   },
   loadTransactions(){
     this.isBusy = true
     let data = {
       session:this.session ? this.session : null,
       semester:this.semester ? this.semester : null, 
       applicationFee:this.paymentType == 'application' ? true : null,
        acceptanceFee:this.paymentType == 'acceptance' ? true : null,
       mcFee:this.paymentType == 'caution' ? true : null, 
       degree:this.programme_type ? this.programme_type : null, 
       application_number:this.student.application_number? this.student.application_number:null};
       console.log(this.paymentType)
      axios
      .post("admin/all/applicants/payments", data)
      .then((response) => {
     this.isBusy = false
        this.items = response.data.transaction 
      })
      .catch((err) => {
     this.isBusy = false
      });
   },
   getRRRStatus(rrr){
     axios.post('api/checkRRRStatus' , {rrr:rrr})
     .then((response) => {
       this.infoModal.rrrStatus = response.data
       this.infoModal.show = false
     }).catch((err) => {
       
     });
   }

  },
  created() {
    this.loadProgrammeTypes();
    this.loadTransactions();
    this.$store.dispatch('getSettings')
  },
  watch: {
    settings(){
      let semester = ['Select Semester'];
        let session = ['Select Session'];
      for (let i = 0; i < this.settings.length; i++) {
        // this.semester = new Set()
        semester.push(this.settings[i].semester_name);
        session.push(this.settings[i].session_name);
      }
      let Unisemester = new Set(semester);
     let  Unisession = new Set(session);
     this.semesters = [...Unisemester] ;
     this.sessions = [...Unisession];
    }
  },
};
</script>

<style></style>
