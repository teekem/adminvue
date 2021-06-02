<template>
  <div>
    <div class="mt-5">
      <div class="container container-fluid">
        <div class="card mb-2">
          <div class="card-body">
            <div class="d-block text-right mb-2">
            <create-course/>
            </div>
            <b-form-group label="Select File " label-cols-sm="2">
              <b-form-file
                id="file-default" 
               
                v-model="uploadData.file"
              ></b-form-file>
            </b-form-group>
            <div class="text-center">
              <button class="btn rounded-pill mx-2 btn-dark text-center">
                preview
              </button>
              <button
                class="btn rounded-pill mx-2 btn-info text-center"
                @click="uploadExcel"
              >
                Upload
              </button>
            </div>
            <div class="text-center mt-2">
              <b-progress v-if="uploadData.percentage"
                :value="uploadData.percentage"
                max="100"
                show-progress
                animated
                :variant="uploadData.status ? 'success' : 'danger'"
              ></b-progress>
              <div v-if="uploadData.percentage == 100">
                <label :class="uploadData.status ? 'text-success' : 'text-danger'"><b>{{uploadData.status ? 'Upload Successful' : 'Upload Failed'}}</b></label>
              </div>
                  
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">Table to preview</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateCourse from './create.course.vue'

export default {
  components:{CreateCourse},
  data() {
    return {
      uploadData: {
        percentage: "",
        file: null,
        status: true,

      },
    };
  },
  methods: {
    uploadExcel() {
      let formData = new FormData();
      formData.append("courses", this.uploadData.file);
      axios
        .post("/admin/upload/courses", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: function (progressEvent) {
            this.uploadData.percentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          }.bind(this),
        })
        .then((response) => {
          this.uploadData.status = true
          Toast.fire({
            icon:"info",
            title:"Upload Successful"
          })
          this.resetUpload()
        })
        .catch((err) => {
          this.uploadData.status = false
          Toast.fire({
            icon:"error",
            title:"Error Uploading courses"
          })
          this.resetUpload()
        });
    },
    resetUpload(){
      setTimeout(() => {
        this.uploadData.percentage = "";
        this.uploadData.file = null;
        this.uploadData.status=true
      }, 7000);
    }
  },
};
</script>

<style></style>
