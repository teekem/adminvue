<template>
  <div>
      <Header/>
        <div class="app-wrapper">
      <div  class="app-content pt-3 p-md-3 p-lg-4">
           <div class="container-xl">
                    <div class="row g-3 mb-4 align-items-center justify-content-between">
            <div class="col-auto">
              <h1 class="app-page-title mb-0">Applicants</h1>
            </div>
            <div class="col-auto">
              <div class="page-utilities">
                <div
                  class="row g-2 justify-content-start justify-content-md-end align-items-center"
                >
                  <div class="col-auto">
                    <form class="table-search-form row gx-1 align-items-center">
                      <div class="col-auto">
                        <input
                          type="text"
                          id="search-orders"
                          name="searchorders"
                          class="form-control search-orders"
                          placeholder="Search"
                        />
                      </div>
                      <div class="col-auto">
                        <button type="submit" class="btn app-btn-secondary">
                          Search
                        </button>
                      </div>
                    </form>
                  </div>
                  <!--//col-->
                  <div class="col-auto">
                    <select class="form-select w-auto">
                      <option selected value="option-1">All</option>
                      <option value="option-2">This week</option>
                      <option value="option-3">This month</option>
                      <option value="option-4">Last 3 months</option>
                    </select>
                  </div>
                  <div class="col-auto">
                    <a class="btn app-btn-secondary" href="#">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        class="bi bi-download mr-1"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                        />
                      </svg>
                      Download CSV
                    </a>
                  </div>
                </div>
                <!--//row-->
              </div>
              <!--//table-utilities-->
            </div>
            <!--//col-auto-->
          </div>
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
                       <AllApplications  :listOfAllApplicants= applicants />
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
                <div class="app-card-body"> C
                  </div> 
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
                <div class="app-card-body">  D
                  </div>  
                  </div>  
                  </div>  
            </div>
           </div>
      </div>
       
      </div>
        
       <Footer/>
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import AllApplications from '@/components/application/AllApplications'
import PendApplications from '@/components/application/PendApplications'
import GetApplicants from '@/components/application/GetApplications'


import {mapGetters, mapActions} from 'vuex'
export default {
 components:{Footer, Header,AllApplications, PendApplications,GetApplicants},
  props: {
      id: {type:Number}
  },
 data(){
    return{
      data1 : true,
      applicants: this.$store.getters['User/getAllUsers'],
      test: 2

    }
 },
 
 methods: {

   displaycontent(value){

      if (value === 'data1') {this.data1 = true
                              this.idvalue = 'orders-all-tab'
                              this.hrefvalue = '#orders-all'
                              this.data2 = false}
     if (value === 'data2') { this.data2 = true
                              this.idvalue = 'orders-paid-tab'
                              this.hrefvalue = '#orders-paid'
                              this.data1 = false }
      // else {this.data1 = true}

   },
   
    registerRoute() {
      this.$router.push({ 
        name: "applicant" ,
         params: { name : {'value': this.test} }
        });
    }
 },
 created() {
   
   this.$store.dispatch('User/loadUser')
 },

 computed:{
    
   
 },

 mounted(){
  //  console.log(this.$route)
 }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

