<template>
    <div>
        <Header/>

        <div class="app-wrapper">
            <div  class="app-content pt-3 p-md-3 p-lg-4">
                <div class="container-xl">
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
components:{Header,Footer}
}
</script>

<style>

</style>