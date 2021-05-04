<template>
  <div>
    <div class="card shadow-sm" ref="personalData" id="personalData">
      <div class="card-header custom-bg text-center p-1 font-weight-bold">
        Personal Data
        <print-personal-data :personalData="personalData" />
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col">
            <b-overlay :show="applicantImg.loading" rounded="sm">
              <template v-if="applicantImg.error">
                <label class="text-danger">
                  <b>{{applicantImg.img}}</b>
                </label>
              </template>
              <template v-else>
                <img
                class="logo-icon mr-2 img-fluid w-25 float-right"
                :src="applicantImg.img"
                alt="applicant image"
              />
              </template>
            </b-overlay>
          </div>
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Title</b> <br />
              <label>{{ personalData.title }}</label>
            </div>
          </div>
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Gender</b> <br />
              <label>{{
                personalData.gender == "F" ? "FEMALE" : "MALE"
              }}</label>
            </div>
          </div>
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Marital Status</b> <br />
              <label>{{ personalData.marital_status }}</label>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">mobile</b> <br />
              <label>{{ personalData.mobile }}</label>
            </div>
          </div>
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">email</b> <br />
              <label>{{ personalData.email }}</label>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Date of Birth</b> <br />
              <label>{{ personalData.date_of_birth }}</label>
            </div>
          </div>
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">State of origin</b> <br />
              <label>{{ personalData.state_of_origin }}</label>
            </div>
          </div>
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Place of birth</b> <br />
              <label>{{ personalData.place_of_birth }}</label>
            </div>
          </div>
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Place of birth LG</b> <br />
              <label> {{ personalData.place_of_birth_LG }} </label>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Nationality </b> <br />
              <label>{{ personalData.nationality }}</label>
            </div>
          </div>
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Health Status</b> <br />
              <label>{{ personalData.health_status }}</label>
            </div>
          </div>
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Residential Address</b> <br />
              <label> {{ personalData.residential_address }}</label>
            </div>
          </div>
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Contact Address</b> <br />
              <label>{{ personalData.contact_address }}</label>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Next of kin's name </b> <br />
              <label>{{ personalData.next_of_kin_name }}</label>
            </div>
          </div>
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Next of kin's relationship</b> <br />
              <label> {{ personalData.next_of_kin_relationship }}</label>
            </div>
          </div>
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Next of kin's email</b> <br />
              <label> {{ personalData.next_of_kin_email }}</label>
            </div>
          </div>
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Next of kin's phone</b> <br />
              <label> {{ personalData.next_of_kin_phone }} </label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col align-self-center">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Next of kin's address</b> <br />
              <label>{{ personalData.next_of_kin_address }} </label>
            </div>
          </div>
          <div class="col align-self-center">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Hobbies</b> <br />
              <label>{{ personalData.hobbies }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrintPersonalData from "./print.personalData.vue";
export default {
  components: { PrintPersonalData },
  props: ["personalData"],
  data() {
    return {
      applicantImg: {
        loading: true,
        img: null,
        error:null,
      },
    };
  },
  methods: {},
  created() {
    Fire.$on("ApplicantImageLoaded", (data) => {
      this.applicantImg.loading = false;
      this.applicantImg.img = data.error ? "No image uploaded" : data.url;
      this.applicantImg.error = data.error ? true : false;
    });
  },
  activated() {
    console.log("ere");
    console.log(this.personalData);
    this.applicantImg.loading = true
    //  axios.post("api/viewProfileImage", {'imgPath':this.personalData.applicantData.picture}, {responseType:"blob"})
    // .then((response) => {
    //   console.log(response)
    //    let applicantImageUrl = URL.createObjectURL(response.data);
    //   //  console.log(applicantImageUrl)
    //     this.applicantImg.img = applicantImageUrl;
    // this.applicantImg.loading = false
    // }).catch((err) => {
    //   // console.log(err)
    // });
  },
};
</script>

<style></style>
