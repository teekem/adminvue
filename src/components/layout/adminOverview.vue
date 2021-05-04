<template>
    <div>
       <page-header class="mt-5" title="OverView"></page-header>
       <div class="container">
           <div class="card">
               <div class="card-body">
                   <p>{{$router.history.current.name}}</p>
               </div>
           </div>
       </div>
    </div>
</template>
<script>
import pageHeader from './pageHeader.vue'
export default {
  components: { pageHeader },
    created() {
        // console.log(this.$router)
    },
}
</script>