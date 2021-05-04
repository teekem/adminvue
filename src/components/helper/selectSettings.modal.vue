<template>
  <div>
    <b-modal
      id="selectSettings.modal"
      ref="selectSettings.modal"
      v-model="modal"
      centered
      hide-footer
      hide-header
    >
      <template #default="{ hide }">
        <div>
          <div class="card custom-bg border-0">
            <div class="card-header border-0 p-2">
              <div class="w-100 text-center">
                <span class="text-monospace">Select session and semester</span>
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
              <v-select
                :options="settings"
                :getOptionLabel="
                  (option) => option.session_name + ' ' + option.semester_name
                "
                v-model="selectedSettings"
              >
              <template slot="no-options">Select a session and a semester</template>
                <template v-slot:option="settings">
                  {{ settings.session_name }} {{ settings.semester_name }}
                </template>
              </v-select>
              <!-- <p>
                {{ selectedSettings }}
              </p> -->
              <div class="d-block m-2">
                <button class="btn btn-sm btn-primary" @click="onContinue">
                  Cointinue
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      selectedSettings: {},
      dataSent: null,
    };
  },
  computed: {
    settings() {
      return this.$store.state.settings;
    },
  },
  methods: {
    onContinue() {
      this.modal = false;
      Fire.$emit("FinishedSelectingSettings", {
        settings: this.selectedSettings,
        dataSent: this.dataSent,
      });
    },
  },
  created() {
    Fire.$on("SelectedSettings", (data) => {
    for (let i = 0; i < this.settings.length; i++) {
        const element = this.settings[i];
        if(element.status == 'active'){
            this.selectedSettings = element
            break;
        }
        
    }
      this.modal = true;
      this.dataSent = data;
    });
  },
};
</script>

<style></style>
