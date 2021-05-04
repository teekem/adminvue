<template>
<<<<<<< Updated upstream
  <div class="app app-login p-0" >
    <div class="row g-0 app-auth-wrapper">
      <div class="col-12 auth-main-col text-center p-5">
        <div class="d-flex flex-column align-content-end">
          <div class="app-auth-body mx-auto">
            <div class="app-auth-branding mb-4">
              <a class="app-logo" href="index.html"
                ><img
                  class="logo-icon mr-2"
                  src="assets/images/logo1.jpg"
                  alt="logo"
              /></a>
            </div>
            <h2 class="auth-heading text-center mb-5">Log in to Portal</h2>
            <div class="auth-form-container text-left">
              <form @submit.prevent="sendLoginRequest()" class="auth-form login-form">
                <div class="email mb-3">
                  <label class="sr-only" for="signin-email">Email</label>
                  <input
                    v-model="credentials.email"
                    id="signin-email"
                    name="signin-email"
                    type="email"
                    class="form-control signin-email"
                    placeholder="Email address"
                    required="required"
                  />
                </div>
                <!--//form-group-->
                <div class="password mb-3">
                  <label class="sr-only" for="signin-password">Password</label>
                  <input
                     v-model="credentials.password"
                    id="signin-password"
                    name="signin-password"
                    type="password"
                    class="form-control signin-password"
                    placeholder="Password"
                    required="required"
                  />
                  <div class="extra mt-3 row justify-content-between">
                    <div class="col-6">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="RememberPassword"
                        />
                        <label class="form-check-label" for="RememberPassword">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <!--//col-6-->
                    <div class="col-6">
                      <div class="forgot-password text-right">
                        <a href="reset-password.html">Forgot password?</a>
=======
  <div class="app app-login p-0">
    <b-overlay :show="show" rounded="lg">
      <div class="row g-0 app-auth-wrapper">
        <div class="col-12 auth-main-col text-center p-5">
          <div class="d-flex flex-column align-content-end">
            <div class="app-auth-body mx-auto">
              <div class="app-auth-branding mb-4">
                <a class="app-logo" href="index.html"
                  ><img
                    class="logo-icon mr-2"
                    src="assets/images/logo1.jpg"
                    alt="logo"
                /></a>
              </div>
              <h2 class="auth-heading text-center mb-5">Log in to Portal</h2>
              <div class="auth-form-container text-left">
                <div class="auth-form login-form">
                  <div class="email mb-3">
                    <label class="sr-only" for="signin-email">Email</label>
                    <input
                      v-model="email"
                      id="signin-email"
                      name="signin-email"
                      type="email"
                      class="form-control signin-email"
                      placeholder="Email address"
                      required="required"
                    />
                  </div>
                  <!--//form-group-->
                  <div class="password mb-3">
                    <label class="sr-only" for="signin-password"
                      >Password</label
                    >
                    <input
                      v-model="password"
                      id="signin-password"
                      name="signin-password"
                      type="password"
                      class="form-control signin-password"
                      placeholder="Password"
                      required="required"
                    />
                    <div class="extra mt-3 row justify-content-between">
                      <div class="col-6"></div>
                      <!--//col-6-->
                      <div class="col-6">
                        <div class="forgot-password text-right">
                          <a href="#">Forgot password?</a>
                        </div>
>>>>>>> Stashed changes
                      </div>
                      <!--//col-6-->
                    </div>
                    <!--//extra-->
                  </div>
                  <!--//form-group-->
                  <div class="text-center">
                    <button
                      @click="Login"
                      class="btn app-btn-primary btn-block theme-btn mx-auto border"
                    >
                      <div
                        class="spinner-grow-sm mr-2 text-info spinner-grow"
                        role="status"
                        v-if="loginBtn.status"
                      ></div>
                      <label class="text-center">Log In</label>
                    </button>
                  </div>
                </div>

                <div class="auth-option text-center pt-5">
                  Our Redeemer is
                  <a class="text-link" href="http://run.edu.ng">Strong</a>.
                </div>
              </div>
              <!--//auth-form-container-->
            </div>
            <!--//auth-body-->

            <footer class="app-auth-footer">
              <div class="container text-center py-3">
                <!--/* This template is free as long as you keep the footer attribution link. If you'd like to use the template without the attribution link, you can buy the commercial license via our website: themes.3rdwavemedia.com Thank you for your support. :) */-->
                <small class="copyright"
                  >Designed by
                  <a class="app-link" href="http://run.edu.ng" target="_blank"
                    >Redeemer
                  </a>
                  University</small
                >
<<<<<<< Updated upstream
                University</small
              >
            </div>
          </footer>
          <!--//app-auth-footer-->
        </div>
        <!--//flex-column-->
      </div>
     
    </div>
=======
              </div>
            </footer>
            <!--//app-auth-footer-->
          </div>
          <!--//flex-column-->
        </div>
      </div>
    </b-overlay>
>>>>>>> Stashed changes
    <!--//row-->
  </div>
</template>

<script>
<<<<<<< Updated upstream
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'Login',
  data(){
    return{

      credentials :{
        email : '',
        password: ''
      }
    }
  },
  methods:{
    sendLoginRequest(){
      this.$store.dispatch('User/login', this.credentials)
      .then(resp => {
        console.log(resp)
      })
      .catch(err => { console.log(err)})
    }
  }
=======
export default {
  data() {
    return {
      email: "",
      password: "",
      show: false,
      loginBtn: {
        status: false,
      },
    };
  },
  methods: {
    Login() {
      console.log("clicked");
      this.loginBtn.status = true;
      this.$store
        .dispatch("adminLogin", { email: this.email, password: this.password })
        .then((response) => {
          console.log("logged iN");
          this.$router.push("/admin");
          this.loginBtn.status = false;
        })
        .catch((err) => {
          this.loginBtn.status = false;
        });
    },
    fromStaffPortal() {
      console.log(this.$router.history);
      if (this.$router.history.current.query) {
        this.show = true;
        axios
          .post("admin/auto/login/staff", {
            params: this.$router.history.current.query.p,
          })
          .then((response) => {
            console.log(response)
            if (response.data.token) {
              this.$store
                .dispatch("setStaff", {
                  token: response.data.token,
                  user: response.data.record,
                  deptName: response.data.record.deptname,
                })
                .then(() => {
                  console.log("Logged In");
                  this.$router.push("/admin");
                })
                .catch((err) => {});
            } else {
              Swal.fire({
                icon: "error",
                title: response.data.msg,
                text: "",
              });
            }
            this.show = false;
            console.log(response.data);
          })
          .catch((err) => {
            this.show = false;
            console.error(err);
          });
      }
    },
  },
  mounted() {
    this.fromStaffPortal();
    // console.log("here")
    console.log(this.$router.history.current.query);
  },
>>>>>>> Stashed changes
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
