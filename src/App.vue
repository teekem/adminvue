<template>
  <div id="app">
<<<<<<< Updated upstream
        <!-- <router-view/> -->
        <Login/>
        <!-- <MasterLayout/> -->
=======
        <router-view/>
        <!-- <MasterLayout v-if="isLoggedIn" /> -->
        <!-- <Login /> -->
>>>>>>> Stashed changes
  </div>
</template>

<script>

import MasterLayout from './components/layout/master.layout'
import Login from './components/auth/Login'

export default {
  components:{MasterLayout, Login},
   name: 'App',
   computed: {
     isLoggedIn(){
       let token = this.$store.state.user.token;
       if(token){
         return true;
       }else{
         return false;
       }
     }
   },
}
</script>


