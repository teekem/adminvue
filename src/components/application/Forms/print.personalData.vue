<template>
  <div class="d-inline">
    <button class="btn btn-sm btn-outline-dark float-right" @click="print">
      <b-icon icon="printer-fill" aria-hidden="true"></b-icon>
    </button>
    <b-modal
      v-model="show"
      modal-class="modal-fullscreen"
      centered
      hide-footer
      hide-header @shown="printnow"
      
    >
      <template #default="{ hide }">
        <div>
          <b-icon
            icon="x-circle"
            scale="1"
            variant="danger"
            @click="hide()"
            media="print"
            class="mt-1 mr-2 float-right dontprint"
          ></b-icon>
        </div>
        <div class="p-2">
            <div class="p-2 w-100 border border-4">
               <div class="text-center"> <h5 class=" text-center font-weight-bold">Personal Data</h5></div>

            </div>
          <div class="row m-3">
            <div class="col">
              <label class="d-block" style="font-weight: bold">Fullname</label
              ><label class="p-2 w-100 border">{{personalData.name}}</label>
            </div>
            <div class="col col-3">
              <label class="d-block" style="font-weight: bold">Title</label
              ><label class="p-2 w-100 border text-capitalize">{{personalData.title}}</label>
            </div>
            <div class="col col-3">
              <label class="d-block" style="font-weight: bold">Gender</label
              ><label class="p-2 w-100 border">{{personalData.gender == 'F' ? 'FEMALE' : 'MALE'}}</label>
            </div>
          </div>
          <div class="row m-3">
            <div class="col">
              <label class="d-block" style="font-weight: bold"
                >Marital Status</label
              ><label class="p-2 w-100 border text-capitalize">{{personalData.marital_status}}</label>
            </div>
            <div class="col">
              <label class="d-block" style="font-weight: bold"
                >Date of Birth</label
              ><label class="p-2 w-100 border">{{personalData.date_of_birth}}</label>
            </div>
            <div class="col">
              <label class="d-block" style="font-weight: bold"
                >State of Birth</label
              ><label class="p-2 w-100 border">{{personalData.state_of_origin}}</label>
            </div>
            <div class="col">
              <label class="d-block" style="font-weight: bold"
                >Place of birth</label
              ><label class="p-2 w-100 border">{{personalData.place_of_birth }}</label>
            </div>
          </div>
          <div class="row m-3">
            <div class="col">
              <label class="d-block" style="font-weight: bold"
                ><strong>Place of birth LG</strong><br /></label
              ><label class="p-2 w-100 border">{{personalData.place_of_birth_LG}}</label>
            </div>
            <div class="col">
              <label class="d-block" style="font-weight: bold"
                ><strong>Nationality</strong><br /></label
              ><label class="p-2 w-100 border">{{personalData.nationality}}</label>
            </div>
            <div class="col">
              <label class="d-block" style="font-weight: bold"
                ><strong>Health Status</strong><br /></label
              ><label class="p-2 w-100 border">{{personalData.health_status}}</label>
            </div>
          </div>
          <div class="row m-3">
            <div class="col">
              <label class="d-block" style="font-weight: bold"
                ><strong>Residential Address</strong><br /></label
              ><label class="p-2 w-100 border">{{personalData.residential_address}}</label>
            </div>
            <div class="col">
              <label class="d-block" style="font-weight: bold"
                ><strong>Contact Address</strong><br /></label
              ><label class="p-2 w-100 border">{{personalData.contact_address}}</label>
            </div>
          </div>
          <div class="row m-3">
            <div class="col">
              <label class="d-block" style="font-weight: bold"
                ><strong>Next of kin&#39;s name</strong><br /></label
              ><label class="p-2 w-100 border">{{personalData.next_of_kin_name}}</label>
            </div>
            <div class="col">
              <label class="d-block" style="font-weight: bold"
                ><strong>Next of kin&#39;s relationship</strong><br /></label
              ><label class="p-2 w-100 border">{{personalData.next_of_kin_relationship}}</label>
            </div>
            <div class="col">
              <label class="d-block" style="font-weight: bold"
                ><strong>Next of kin&#39;s phone</strong><br /></label
              ><label class="p-2 w-100 border">{{personalData.next_of_kin_phone}}</label>
            </div>
          </div>
          <div class="row m-3">
            <div class="col">
              <label class="d-block" style="font-weight: bold"
                ><strong>Next of kin&#39;s email</strong><br /></label
              ><label class="p-2 w-100 border">{{personalData.next_of_kin_email}}</label>
            </div>
            <div class="col">
              <label class="d-block" style="font-weight: bold"
                ><strong>Next of kin&#39;s address</strong><br /></label
              ><label class="p-2 w-100 border">{{personalData.next_of_kin_address}}</label>
            </div>
          </div>
          <div class="row m-3">
            <div class="col">
              <label class="d-block" style="font-weight: bold"
                ><strong>Hobbies</strong><br /></label
              ><label class="p-2 w-100 border">{{personalData.hobbies}}</label>
            </div>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ["personalData"],
  data() {
    return {
      show: false,
    };
  },
  methods: {
    print() {
      this.show = true;
      
    },
    printnow(){

        window.print();
    }

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
