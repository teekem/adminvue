<template>
  <div>
    <page-header class="mt-5" title="Upload Schedule" />
    <div class="container-fluid">
      <div class="card">
        <div class="card-body">
          <div>
            <button
              v-b-modal.uploadScheduleModal
              class="btn btn-outline-info btn-sm"
            >
              Upload Schedule
            </button>
          </div>

          <b-modal hide-footer id="uploadScheduleModal" title="Upload Schedule">
            <div class="pl-4 pr-3 pt-1 pb-1">
              <label class="m-0 d-block">Select a file </label>
              <b-form-file
                v-model="feeSchedule"
                accept="xlsx, xls, csv"
                class="mt-1 border w-100"
                plain
              ></b-form-file>
              <button
                class="btn btn-sm btn-outline-primary mt-2 mb-2"
                @click="uploadSchedule"
              >
                Upload
              </button>
              <template v-if="uploadPercentage > 0">
                <b-progress
                  :value="uploadPercentage"
                  show-progress
                  animated
                ></b-progress>
              </template>
            </div>
          </b-modal>
          <preview-schedule />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageHeader from "../layout/pageHeader.vue";
import PreviewSchedule from "./preview.schedule.vue";
export default {
  components: { pageHeader, PreviewSchedule },
  data() {
    return {
      feeSchedule: null,
      uploadPercentage: 0,
    };
  },
  methods: {
    uploadSchedule() {
      let formData = new FormData();
      formData.append("fee", this.feeSchedule);
      axios
        .post("admin/upload/fee/categories", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: function (progressEvent) {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          }.bind(this),
        })
        .then((response) => {
          this.feeSchedule = null;
          this.uploadPercentage = 0;
        })
        .catch((err) => {});
    },
  },
};
</script>

<style></style>
