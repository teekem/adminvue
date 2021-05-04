<template>
<div class="letter" id="letter" v-show="false" v-html="admissionLetter">
            
        </div>
      <!-- <b-modal modal-class="modal-fullscreen modal-dialog " id="admissionLetter-modal" hide-footer hide-header v-model="show" >
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
 
      </template>
    </b-modal> -->
</template>

<script>
export default {
    props:[""],
    data() {
        return {
            show:false,
            loading:false,
            admissionLetter:null,
        }
    },
    methods: {
        // getAdmissionLetter(){
        //     axios.get('getAdmissionLetter')
        //     .then((response) => {
        //         this.admissionLetter = response.data
        //     }).catch((err) => {
                
        //     });
        // }
    },
    created() {
        Fire.$on('SHOW-ADMISSION-LETTER',(letter)=>{
            this.admissionLetter = letter
            setTimeout(() => {
                this.show = true
                this.loading = false
                var divContents = document.getElementById("letter").innerHTML;
                var a = window.open('', '', 'height=800, width=800');
                a.document.write(divContents);
                a.document.close();
                a.print();
            }, 1000);
            // if (this.admissionLetter) {
            // }
        }); 
       

        
    },
}
</script>

