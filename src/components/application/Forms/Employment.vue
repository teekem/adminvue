<template>
  <div>
    <div class="card" ref="employment" id="employment">
      <div class="card-header custom-bg">
        Employment History
        <button  class="btn btn-sm btn-outline-dark float-right" @click="print()">
          <b-icon icon="printer-fill" aria-hidden="true"></b-icon>
        </button>
      </div>
      <div class="card-body">
        <div v-for="(employment ,index) in employmentHistory" :key="index">
          <span class="d-block">Organisation Name: <b>{{employment.organisation}}</b> </span>
          <span class="d-block ">Address: <b> {{employment.address}} </b></span>
          <span class="d-block"> Date Started: <b>{{employment.start_date}}</b> </span>
          <span class="d-block"> Date Ended: <b>{{employment.end_date}}</b></span>
          <span class="d-block">Salary: <b>{{employment.last_salary_per_annum}}</b></span>
          <span class="d-block">Reason for leaving: <b>{{employment.reason_for_leaving}}</b> </span>
          <hr/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props:['employmentHistory'],
    methods: {
        print() {
      window.print();
    },
    },
}
</script>

<style>

</style>