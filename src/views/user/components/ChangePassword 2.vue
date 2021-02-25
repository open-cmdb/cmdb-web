<template>
  <el-dialog width="440px" title="修改密码" :visible.sync="is_visible" @close="on_close">
    <el-form label-width="100px" style="margin-right: 50px">
      <h3 style="color: #f56c6c; text-align: center">{{ String(errors.non_field_errors?errors.non_field_errors:'') }}</h3>
      <el-form-item label="当前密码" :required="true" :error="String(errors.current_password?errors.current_password:'')">
        <el-input type="password" v-model="form_data.current_password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" :required="true" :error="String(errors.new_password?errors.new_password:'')">
        <el-input type="password" v-model="form_data.new_password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" :required="true" :error="String(errors.confirm_password?errors.confirm_password:'')">
        <el-input type="password" v-model="confirm_password"></el-input>
      </el-form-item>
      <el-button type="primary" style="width: 100%; margin-left: 50px" @click="submit()">提交</el-button>
    </el-form>
  </el-dialog>
</template>

<script>
  import master from "@/api"
  export default {
    data(){
      console.log("this.props.data:", this.data)
      return {
        is_visible: true,
        form_data: {},
        errors: {},
        countdown: 0,
        confirm_password: "",
      }
    },
    props: ["data"],
    mounted(){
    },
    methods:{
      on_close(){
        this.$el.parentNode.removeChild(this.$el)
        this.$destroy()
      },
      submit(){
        if(this.confirm_password != this.form_data.new_password){
          console.log("不一致")
          this.errors["confirm_password"] = "两次密码不一致"
          return
        }
        master.post("mgmt/user/change-password", this.form_data).then((response)=>{
          this.$message.success("修改成功")
          this.errors = {}
        }).catch((error)=>{
          if(error.response && error.response.data){
            if(error.response.data.detail){
              this.$message.error(error.response.data.detail)
              return
            }
            this.errors = error.response.data
            return
          }
          console.log(error.message)
        })
      }
    }
  }
</script>
