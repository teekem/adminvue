<template>
  <div>

        <b-modal v-model="modal" modal-class="modal-fullscreen" centered hide-footer hide-header>
    <div id="institutionModal" >
     
    </div>
  </b-modal>

  

      <div class="card" ref="institution" id="institution">
        <div class="card-header custom-bg">
          Institution History
          <button
            class="btn btn-sm btn-outline-dark float-right"
             @click="print()"
          >
            <b-icon icon="printer-fill" aria-hidden="true"></b-icon>
          </button> 


        </div>
        <div class="card-body">
          <div v-for="(institution, index) in institutionHistroy" :key="index">
            <span class="d-block">
              Institution Name: <b>{{ institution.name_of_institution }}</b>
            </span>
            <span class="d-block">
              Institution Address:
              <b>{{ institution.address_of_institution }}</b>
            </span>
            <span class="d-block"
              >Date Admitted: <b>{{ institution.date_admitted }}</b>
            </span>
            <span
              >Date Graduated: <b>{{ institution.date_graduated }}</b></span
            >
            <span class="d-block"
              >Quanlification Obtained:
              <b>{{ institution.qualification_obtained }}</b></span
            >
            <span class="d-block"
              >Degree Obtained:
              <b>{{ institution.class_of_degree_obtained }}</b></span
            >
            <span class="d-block"
              >Discipline: <b>{{ institution.field_discipline }}</b></span
            >
            <hr />
          </div>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  props: ["institutionHistroy"],
  data() {
    return {
      // fullscreen:false
      modal:false,
      details:'',
    }
  },
  methods: {
   
    async print() {
      window.print();
    },
 
  },
};
</script>

<style>
.modal-fullscreen .modal-dialog {
  max-width: 100%;
  /* width: 100vw; */
   margin: 0;
  top: 0;
  /* bottom: 0; */
  left: 0;
  right: 0;
  height: 100vh;
  display: flex;
  /* position: fixed; */
  /* z-index: 100000; */
}
</style>
