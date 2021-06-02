<template>
<div>
      <button class="btn btn-info btn-sm" @click="modal = !modal">
                <b-icon icon="plus" scale="2" aria-hidden="true"></b-icon>
                Create Course
              </button>
    <b-modal
      id="createCourse-modal"
      ref="createCourse-modal"
      centered
      hide-footer
      hide-header
      v-model="modal"
    >
      <template #default="{ hide }">
        <div>
          <div class="card custom-bg border-0">
            <div class="card-header border-0 p-2">
              <div class="w-100 text-center">
                <span class="text-monospace">Create Course</span>

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

                 <ValidationObserver v-slot="{invalid}">
               <div class="form-group">
                   
                   <label>Course Code</label>
                   <ValidationProvider
                            :rules="{required:true, min:7}"
                            v-slot="{errors}"
                                >
                   <input class="form-control form-control-sm " :class="errors[0] ? 'is-invalid' : '' " v-model="course.code" placeholder="Course Code" />
                   <span class="text-danger">{{errors[0]}}</span>
                   </ValidationProvider>
               </div>
               <div class="form-group">
                   <label>Course Description</label>
                   <ValidationProvider
                            :rules="{required:true}"
                            v-slot="{errors}"
                                >
                   <input class="form-control form-control-sm " :class="errors[0] ? 'is-invalid' : '' " v-model="course.description" placeholder="Course Description" />
                   <span class="text-danger">{{errors[0]}}</span>
                   </ValidationProvider>
               </div>
               <div>
                   <button :disabled="invalid" class="btn btn-info btn-rounded">
                       <div class="spinner-border text-light" role="status" v-if="course.loading"></div>
                       Save</button>
               </div>
                 </ValidationObserver>
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
            modal:false,
            course:{
                code:"",
                description:"",
                loading:false,
            }
        }
    },
    methods: {
        createCourse(){
            this.course.loading = true
            axios.post('admin/upload/course',{code:this.course.code , desc:this.course.description})
            .then((response) => {
                Toast.fire({
                    icon:"info",
                    title:"Course Created"
                });
            this.course.loading = false
            }).catch((err) => {
                Toast.fire({
                    icon:"error",
                    title:"Check your fields"
                })
            this.course.loading = false
            });
        }
    },

}
</script>

<style>

</style>