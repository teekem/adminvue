<template>
  <div>
    <div class="mt-5">
      <div class="container container-fluid">
        <div class="card mb-2">
          <div class="card-body">
            <b-form-group label="Default:" label-cols-sm="2">
              <b-form-file
                id="file-default"
                accept=".xlsx"
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
              <b-progress
                value="20"
                max="100"
                show-progress
                animated
              ></b-progress>
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
export default {
  data() {
    return {
      uploadData: {
        percentage: "",
        file: null,
        status: "",
      },
    };
  },
  methods: {
    uploadExcel() {
      let formData = new FormData();
      formData.append("file", this.uploadData.file);
      axios
        .post("/admin/upload/courses", {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: function (progressEvent) {
            this.uploadData.percentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          }.bind(this),
        })
        .then((response) => {
          this.uploadData.status = "File uploaded"
        })
        .catch((err) => {});
    },
  },
};
</script>

<style></style>
