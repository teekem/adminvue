<template>
  <div>
    <div class="card">
      <div class="card-header">Import Programmes</div>
      <div class="card-body">
        <b-form-file
          v-model="file"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
      </div>
      <div class="card-footer">
          <button class="btn btn-sm btn-info " @click="saveProgrammes">save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            file:null
        }
    },
    methods: {
        saveProgrammes(){
            let formdata = new FormData();
            formdata.append("file", this.file);
            axios.post("admin/importProgrammes", formdata,{
                headers:{ "Content-Type": "multipart/form-data" }
            })
            .then((response) => {
                console.log(response)
            }).catch((err) => {
                console.log(err)
            });
        }
    },
};
</script>
