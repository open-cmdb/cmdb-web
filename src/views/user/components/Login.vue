<template>
  <el-card>
    <h1 style="width: 100%; text-align: center">登录CMDB</h1>
    <p style="width: 100%; text-align: center; color: #f56c6c">{{ errors.non_field_errors}}</p>
    <el-form style="margin-right: 40px" :model="form_data" ref="form_data" :rules="rules" title="登录CMDB" label-width="80px">
      <el-form-item label="用户名" prop="username" :error="errors.username">
        <el-input :autofocus="true" v-model="form_data.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :error="errors.password">
        <el-input type="password" v-model="form_data.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="do_login()">登录</el-button>
        <!--<el-button @click="do_reset()">重置</el-button>-->
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import ElCard from "element-ui/packages/card/src/main";
  import master from "@/api/"

  export default {
    components: {ElCard},
    name: "login",
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
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        errors: {
          username: "",
          password: "",
          non_field_errors: ""
        },
        boolll: false
      }
    },
    methods: {
      do_login(){
        console.log("do_login")
        this.$refs["form_data"].validate( (valid)=>{
          if(valid){
            var self = this
            var username = this.form_data.username
            master.post("token", this.form_data).then((response)=>{
              console.log("username:", username)
              self.$store.commit("login", {username: username, token: response.data.token})
              if(self.$route.query.next){
                self.$router.push({path: self.$route.query.next})
                return
              }
              self.$router.push({"name": "main"})
            }).catch((error)=>{
              const data = error.response.data
              for(let key in data){
                if(data[key]){
                  self.errors[key] = data[key]
                }else{
                  self.errors[key] = ""
                }
              }
            })
          }else{
            console.log("false")
            return false
          }
        })
      },
      do_reset(){
        this.$refs["form_data"].resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
