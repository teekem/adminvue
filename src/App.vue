<template>
  <div id="app">
        <!-- <router-view/> -->
        <Login/>
        <!-- <MasterLayout/> -->
  </div>
</template>

<script>

import MasterLayout from './components/layout/master.layout'
import Login from './components/auth/Login'

export default {
  components:{MasterLayout, Login},
   name: 'App'
}
</script>


