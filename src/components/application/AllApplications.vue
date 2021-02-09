<template>
  <div>  
                
               
                  <div class="table-responsive">
                    <table class="table app-table-hover mb-0 text-left">
                      <thead>
                        <tr>
                          <th class="cell">S/N</th>
                          <th class="cell">Name</th>
                          <th class="cell">Email</th>
                          <th class="cell">Date</th>
                          <th class="cell">Admission Status</th>
                          <th class="cell"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="applicant in listOfAllApplicants" :key="applicant.id">
                          <td class="cell">{{applicant.id}}</td>
                          <td class="cell">
                            <span class="truncate">{{applicant.name}}</span>
                          </td>
                          <td class="cell">{{applicant.email}}</td>
                          <td class="cell">
                            <span class="note">{{applicant.created_at}}</span>
                          </td>
                          <td class="cell">
                            <span class="badge bg-success">Pending</span>
                          </td>
                          <td class="cell">$259.35</td>
                          <td class="cell">
                              <router-link :to="{
                                        path: '/getapplication',
                                        query: { item : applicant }
                                         }">
                            <button  type="button" class="btn btn-outline-secondary">View</button>
                                </router-link>
                          </td>
                        </tr>
                       
                      </tbody>
                    </table>
                  </div>
                  <!--//table-responsive-->
              
      
  </div>
</template>

<script>
export default {
    props : {
        listOfAllApplicants: Array
    }

}
</script>

<style>

</style>