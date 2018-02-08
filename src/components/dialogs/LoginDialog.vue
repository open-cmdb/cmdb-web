<template>
  <el-dialog title="收货地址" :visible.sync="is_show" @close="do_close()">
    <el-form :model="form_data" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form_data.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form_data.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="do_login()">提交</el-button>
        <el-button @click="do_reset()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    name: "login.vue",
    data(){
      return {
        is_show: true,
        form_data: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, message: '用户名不能为空', trigger: 'blur' }
          ],
          username: [
            { type: "password", required: true, message: '请输入密码', trigger: 'blur' },
            { min: 1, message: '密码不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      do_login(){
        console.log("do_login")
        this.$refs["form_data"].validate( (valid)=>{
          if(valid){
            console.log("yes")
          }else{
            console.log("false")
            return false
          }
        })
      },
      do_reset(){
        this.$refs["form_data"].resetFields()
      },
      do_close(){
        console.log("do_close")
        this.$el.parentNode.removeChild(this.$el)
        this.destroy()
      }
    }
  }
</script>

<style scoped>

</style>
