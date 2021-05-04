<template>
  <b-container fluid>
    <page-header class="mt-5" title="My Department"></page-header>
    <b-row>
      <b-col lg="6" class="my-1">
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
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

   
    </b-row>

    <!-- Main table element -->
    <b-table
      :items="coords"
      :busy="isBusy"
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
        {{ row.item.firstname }} {{ row.item.surname }}
      </template>

      <template #cell(actions)="row">
        <!-- <p>{{row.item}}</p> -->
        <template  >
        <button @click="enable(row.item , row.index)" :class="row.item.is_verified == 0 ? 'btn-outline-success' : 'btn-outline-danger' " class="mr-1 btn btn-sm ">
          {{row.item.is_verified == 0 ? 'Enable' : 'Disable'}}
        </button>
        </template>
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
</template>

<script>
import pageHeader from './layout/pageHeader.vue';
export default {
  components: { pageHeader },
   data() {
      return {
        coords:[],
        items: [
         
        ],
        fields: [
          { key: 'name', label: 'Fullname', sortable: true, sortDirection: 'desc' },
          { key: 'email', label: 'Email', sortable: true, class: 'text-center' },
          {key:"lecturer_category", label:"Role" ,  sortable: true, class: 'text-center'},
          {key:"deptname", label:"Department" ,  sortable: true, class: 'text-center'},
          {key:"phone", label:"Phone", sortable:true, class:"text-center"},
          { key: 'actions', label: 'Actions' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      // Set the initial number of items
      // this.totalRows = this.coords.length
    },
    beforeUpdate() {
      this.totalRows = this.coords.length
      
    },
    methods: {
     
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      enable(item ,index){
        console.log(item)
        axios.post("admin/enable/or/disable/pg/coords" , {id:item.login_name})
        .then((response) => {
          item.is_verified = response.data['Enable-status'] ? 10 : 0 ;
          Toast.fire({
            icon:"info",
            title:response.data['Enable-status'] ? `${response.data['Enable-status']}` : `${ response.data['Disable-status'] }`
          })
          this.$forceUpdate()
        }).catch((err) => {
          Toast.fire({
            icon:'error',
            title:"Unable to perform operation"
          })
        });   
      },
      disable(item, index){
        axios.post("admin/enable/or/disable/pg/coords", {id:item.login_name})
        .then((response) => {
          item.is_verified = 10
          Toast.fire({
            icon:"info",
            title:"PGCOORD Disabled"
          })
          this.$forceUpdate()
        }).catch((err) => {
          Toast.fire({
            icon:'error',
            title:"Unable to perform operation"
          })
        });
      },
      loadPGCOORDS(){
         this.isBusy = true
      axios.post("admin/get/pg/coords/for/hod" ,{deptName:this.$store.state.user.deptName, role:this.$store.state.user.roleInUse})
      .then((response) => {
        this.coords = response.data.pg_coords 
        this.isBusy = false
      }).catch((err) => {
        Toast.fire({
          'icon':"error",
          'title':"error fetching users"
        })
      });
      }
    },
    created() {
     this.loadPGCOORDS();
    },
};
</script>

<style></style>
