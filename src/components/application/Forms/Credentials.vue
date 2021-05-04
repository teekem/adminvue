<template>
  <div>
    <div class="card shadow-sm">
      <div class="d-block text-monospace custom-bg">
        <div class="text-center">
          <h5 class="m-0 p-1 d-inline font-weight-bold text-dark">
            Credentials
          </h5>
          <button @click="downloadAll"
            class="btn mt-1 mb-1 mr-1 btn-sm btn-outline-dark rounded float-right"
            v-b-tooltip.hover
            title="Download All Credentials"
          >
            <b-icon icon="download" scale="1"></b-icon>
          </button>
        </div>
      </div>
      <div class="card-body p-1">
        <ul class="list-group">
          <li class="list-group-item mb-1 border-0 p-0" v-for="(credential,  index ) in credentials.credentials" :key="index" >
            <div class="border pl-4 pr-4 pt-2 pb-2 rounded-pill">
              <label class="m-0">{{credential.type}}</label>
              <button @click="downloadFile(credential)"
                class="btn btn-sm btn-outline-primary rounded float-right"
                v-b-tooltip.hover
                title="Download File"
              >
                <b-icon icon="download" scale="1"></b-icon>
              </button>
            </div>
          </li>
        </ul>
      </div>
      <!--//app-card-body-->
    </div>
  </div>
</template>

<script>
export default {
    props:['credentials'],
    data() {
        return {
            
        }
    },
    methods: {
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
       downloadAll(){
        let files = this.credentials.credentials
        files.forEach(async (element) => {
          await this.downloadFile(element);
        });
      },
    
    },
};
</script>

<style>
.custom-bg {
  background: #edfdf6;
}
</style>
