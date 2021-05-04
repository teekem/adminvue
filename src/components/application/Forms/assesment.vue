<template>
  <div>
    <div class="card">
      <div class="card-header custom-bg text-center p-1 font-weight-bold">
        Assessment
          <button  class="btn btn-sm btn-outline-dark float-right" @click="print(this)">
          <b-icon icon="printer-fill" aria-hidden="true"></b-icon>
        </button>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">NYSC COMPLETED ?</b> <br />
              <label>{{ assessment.nysc_completed ? 'YES' : 'NO' }}</label>
            </div>
          </div>
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Campus</b> <br />
              <label>{{ assessment.choose_campus }}</label>
            </div>
          </div>
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Essay</b> <br />
              <label>{{ assessment.essay ? 'File Uploaded' : 'NO FILE' }}</label>
              <button v-if="assessment.essay" @click="downloadEssay(assessment.essay)"
                class="btn ml-1 btn-sm btn-outline-dark rounded"
                v-b-tooltip.hover
                title="Download File"
              >
                <b-icon icon="download" scale="1"></b-icon>
              </button>
            </div>
          </div>
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Academic Distinctions</b> <br />
              <template v-if="assessment.academic_distinction_prize">
                  <button class="btn btn-sm btn-success" @click="readDistinctions(assessment.academic_distinction_prize)"> Read </button>
                  <!-- modal here -->
              </template>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Publications</b> <br />
              <template v-if="assessment.publications">
                  <button class="btn btn-success btn-sm" @click="readPublications(assessment.publications)">Read </button>
              </template>
              <!-- <label>{{ assessment.publications }}</label> -->
            </div>
          </div>
          <div class="col">
              
              <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Currently attending any college</b> <br />
              <label>{{ assessment.college_attending_currently ? 'YES' :'NO' }}</label>
            </div>
          </div>

          <div class="col">
              <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Relevant Information </b> <br />
              <template v-if="assessment.relevant_info">
                  <div>
                      <button class="btn btn-sm btn-success" @click="relevantInfo(assessment.relevant_info)"> Read </button>
                  </div>
              </template>
            </div>
          </div>
          <div class="col">
              <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Relevat File </b> <br />
              <template v-if="assessment.relevant_file">
                  <div>
                      <button class="btn btn-sm btn-success" @click="readRelevantFile(assessment.relevant_file)"> View </button>
                  </div>
              </template>
              <!-- <label>{{ assessment.relevant_file }}</label> -->
            </div>
          </div>
          
        </div>
        <div class="row">
            <div class="col">
                 <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Applied For</b> <br />
              <label>{{ assessment.apply_for }}</label>
            </div>
            </div>
            <div class="col">
                <div class="app-card pl-1 border-left-decoration">
              <b class="mb-1">Programme</b> <br />
              <label>{{ assessment.programme }}</label>
            </div>
            </div>
        </div>

      </div>
    </div>
     <b-modal :id="infoModal.modal" :ref="infoModal.modal" v-model="modal" centered
      hide-footer
      hide-header>
       <template #default="{ hide }">
        <div>
          <div class="card custom-bg border-0">
            <div class="card-header border-0 p-2">
              <div class="w-100 text-center">
                <span class="text-monospace">{{infoModal.title}}</span>

                <b-icon
                  icon="x-circle"
                  scale="1"
                  variant="danger"
                  @click="hide()"
                  class="card-tools float-right"
                ></b-icon>
              </div>
            </div>
            <div class="card-body">
             <template v-if="infoModal.distinctions">
               <div class="d-block border-left border-5 border-dark mb-1" v-for="(distinctions, index) in infoModal.distinctions" :key="index">
                <b class="p-1">{{distinctions}}</b>
               </div>
             </template>
             <template v-if="infoModal.publications">
               <div class="d-block border-left border-5 border-dark mb-1" v-for="(publications, index) in infoModal.publications" :key="index">
                 <b class="p-1">{{publications}}</b>
               </div>
             </template>
             <template v-if="infoModal.relevantInfo">
               <div>
                 {{infoModal.relevantInfo}}
               </div>
             </template>
             <template v-if="infoModal.relevantFile">
               <div  class="d-block border-left border-5 border-dark mb-1" v-for="(file , index) in infoModal.relevantFile" :key="index">
                  <b class="p-1">{{file.name}}</b> 
                  <button class="btn ml-1 btn-outline-dark btn-sm" @click="downloadFile(file)">
                     <b-icon icon="download" scale="0.5"></b-icon>
                    </button> 
               </div>
             </template>
            </div>
          </div>
        </div>
      </template>
  </b-modal>
  </div>
</template>

<script>
export default {
    props:['assessment'],
    data() {
      return {
        infoModal:{},
        modal:false,
        
      }
    },
  methods: {
    print(){
      window.print();
    },
    readDistinctions(value){
      this.infoModal = {};
      this.infoModal.modal = "readDistinctions";
      this.infoModal.title = "View Distinctions";
      this.infoModal.distinctions = value;
      // this.$refs[`${this.infoModal.modal}`].show();
      this.modal = true;
      // console.log(this.infoModal)
    },
    readPublications(value){
      this.infoModal = {};
      this.infoModal.modal = "readPublications";
      this.infoModal.title = "View Publications";
      this.infoModal.publications = value
      // console.log(value)
      this.modal = true;
    },
    relevantInfo(value){
      this.infoModal = {};
      // console.log(value)
      this.infoModal.modal = "readRelevantInfo";
      this.infoModal.title = "View Relevant Info";
      this.infoModal.relevantInfo = value
      this.modal = true;
    },
    readRelevantFile(value){
      this.infoModal = {};
      this.infoModal.modal = "readRelevantFile";
      this.infoModal.title = "View Relevant File";
      this.infoModal.relevantFile = value
      this.modal = true;
    },
    downloadFile(file){
       return new Promise((res, rej)=>{
          axios({
          url:"admin/downloadFile",
          methods:"GET",
          params:{path:file.path},
          responseType:"blob"
        })
        .then((response) => {
          var fileURL = window.URL.createObjectURL(
                        new Blob([response.data])
                    );
          var fileLink = document.createElement("a");
                    fileLink.href = fileURL;
                    fileLink.setAttribute(
                        "download",
                        file.name
                    );
                    document.body.appendChild(fileLink);
                    fileLink.click();
          res(true)
        }).catch((err) => {
          console.log(err)
          rej(false)
        });

       })
    },
    downloadEssay(essay){
      // console.log(essay)
      this.downloadFile(essay)
    }
    
  },

};
</script>

<style>
.modal-body {
  padding: 0px !important;
}
</style>
