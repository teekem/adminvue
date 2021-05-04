<template>
    <div>
        
        <Header/>
        <div class="app-wrapper">
            <div  class="app-content pt-3 p-md-3 p-lg-4">
                <div class="">
                    <!-- <h1 class="app-page-title">{{pageTitle}}</h1> -->
                    <router-view/>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
export default {
components:{Header,Footer},
data() {
    return {
        pageTitle:"Page Title",
        routeName:"",
    }
},
created() {
    // console.log(this.$router.history.current)
},
methods: {
    
},
// beforeUpdate() {
//     console.log(this.$router)
// },
//  beforeRouteUpdate (to, from, next) {
//    console.log(to)
//    console.log(from)
//    console.log(next)
//   }
}
</script>

<style>

</style>