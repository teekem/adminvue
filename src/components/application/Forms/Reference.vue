<template>
  <div>
    <div ref="referee" id="referee" class="card">
      <div class="card-header custom-bg">Refeere's Details
        <button  class="btn btn-sm btn-outline-dark float-right" @click="print(this)">
          <b-icon icon="printer-fill" aria-hidden="true"></b-icon>
        </button>
      </div>
      <div class="card-body">
        <div v-for="(reference, index) in reference" :key="index">
          <span class="d-block"
            >Title: <b>{{ reference.title }}</b>
          </span>
          <span class="d-block"
            >Fullname: <b>{{ reference.fullname }}</b></span
          >
          <span class="d-block"
            >Phone: <b>{{ reference.phone }}</b></span
          >
          <span class="d-block"
            >Email: <b>{{ reference.email }}</b></span
          >
          <span class="d-block"
            >Organisation: <b>{{ reference.organisation }}</b></span
          >
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["reference"],

  methods: {
    print(ref) {
      window.print();

    },
  },
};
</script>

<style></style>
