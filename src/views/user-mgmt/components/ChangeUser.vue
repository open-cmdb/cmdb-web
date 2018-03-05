<template>
  <el-dialog width="440px" :title="data?'修改用户 '+data.username:'创建用户'" :visible.sync="is_visible" @close="on_close">
    <el-form label-width="100px" style="margin-right: 50px">
      <el-form-item label="用户名:" :error="String(errors.username?errors.username:'')">
        <el-input v-model="form_data.username"></el-input>
      </el-form-item>
      <el-form-item label="是否为管理员">
        <el-checkbox v-model="form_data.is_staff"></el-checkbox>
      </el-form-item>
      <el-form-item label="邮箱:" :error="String(errors.email?errors.email:'')">
        <el-input v-model="form_data.email"></el-input>
      </el-form-item>
      <el-form-item v-if="!is_create" label="密码:" :error="String(errors.password?errors.password:'')">
        <el-input type="password" v-model="form_data.password"></el-input>
      </el-form-item>
      <el-form-item>
      </el-form-item>
    </el-form>
        <el-button style="width: 360px; margin: 0 20px" type="primary" @click="on_submit">提交</el-button>
  </el-dialog>
</template>

<script>
  import master from "@/api"
  import {master_s} from "@/api"

  export default {
    name: "change-user",
    data(){
      return {
        is_visible: true,
        form_data: !this.is_create?JSON.parse(JSON.stringify(this.data)):{
          username: "",
          is_staff: false,
          email: ""
        },
        errors: {}
      }
    },
    props: ["is_create", "data"],
    mounted(){
      console.log("data:",this.data)
    },
    methods: {
      on_close(){
        this.$el.parentNode.removeChild(this.$el)
        this.$destroy()
      },
      on_submit(){
        if(this.is_create){
          master_s.post("mgmt/user", this.form_data).then((response)=>{
            this.$message.success("添加成功")
            this.errors = {}
          }).catch((error)=>{
            this.errors = error.response.data
          })
        }else{
          master_s.patch(`mgmt/user/${this.data.id}`, this.form_data).then((response)=>{
            this.$message.success("修改成功")
            this.errors = {}
            for(let key in this.form_data){
              this.data[key] = this.form_data[key]
            }
          }).catch((error)=>{
            this.errors = error.response.data
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
