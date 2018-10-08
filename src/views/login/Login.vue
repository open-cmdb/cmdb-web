<template>
  <div style="width: 560px; margin: 30vh auto auto;" v-if="!$store.state.token">
    <el-card>
      <h1 style="width: 100%; text-align: center">登录CMDB</h1>
      <p style="width: 100%; text-align: center; color: #f56c6c">{{ errors.non_field_errors}}</p>
      <el-form style="margin-right: 40px" :model="form_data" ref="form_data" :rules="rules" title="登录CMDB" label-width="80px">
        <el-form-item label="用户名" prop="username" :error="errors.username">
          <el-input :autofocus="true" @keyup.enter.native="do_login()" v-model="form_data.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :error="errors.password">
          <el-input type="password" @keyup.enter.native="do_login()" v-model="form_data.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" :loading="submit_loading" @click="do_login()">登 录</el-button>
          <!--<el-button @click="do_reset()">重置</el-button>-->
        </el-form-item>
      </el-form>
      <div>
        <el-popover ref="no_account" placement="top" width="160" v-model="visible">
          <p>请联系CMDB管理员创建</p>
          <div style="text-align: right; margin: 0">
            <el-button type="primary" size="mini" @click="visible=false">确定</el-button>
          </div>
        </el-popover>
        <el-button type="text" style="float: left" v-popover:no_account>没有账号</el-button>
        <el-button type="text" style="float: right" @click="on_reset_password">忘记密码</el-button>
      </div>
    </el-card>
  </div>
  <div v-else v-loading="true" element-loading-text="登录中。。。" style="height: 100%">
  </div>
</template>

<script>
import Vue from "vue";
import ElCard from "element-ui/packages/card/src/main";
import master from "@/api/";
import {init_router} from "@/router"

export default {
  components: { ElCard },
  data() {
    return {
      is_show: true,
      submit_loading: false,
      form_data: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      errors: {},
      boolll: false,
      visible: false
    };
  },
  mounted() {
    if (this.$store.state.token) {
      this.get_user_info(this.$store.state.token);
    }
  },
  methods: {
    do_login() {
      console.log("do_login");
      this.$refs["form_data"].validate(valid => {
        if (valid) {
          var self = this;
          var username = this.form_data.username;
          this.submit_loading = true;
          master
            .post("token", this.form_data)
            .then(response => {
              this.submit_loading = false;
              console.log("username:", username);
              localStorage.setItem("token", "JWT " + response.data.token);
              self.$store.commit("login", {
                username: username,
                token: response.data.token
              });
              this.get_user_info();
            })
            .catch(error => {
              this.submit_loading = false;
              this.errors = error.response.data;
            });
        } else {
          console.log("false");
          return false;
        }
      });
    },
    get_user_info(token) {
      this.submit_loading = true;
      this.$c_master
        .get("mgmt/user/get-my-info")
        .then(response => {
          this.submit_loading = false;
          this.$store.state.user_info = response.data;
          var next_path = this.get_next_path();
          if (!next_path || next_path.startsWith === "/login") {
            next_path = "/";
          }
          console.log("next_path:", next_path);
          init_router()
          this.$router.push({ path: next_path });
        })
        .catch(error => {
          this.submit_loading = false;
          if (error.response && error.response.status === 401) {
            this.$message.error("会话已过期 请重新登录");
            return;
          }
          this.$message.error("获取用户信息失败 请重试");
        });
    },
    do_reset() {
      this.$refs["form_data"].resetFields();
    },
    on_reset_password() {
      var Comp = Vue.component("ResetPassword");
      var vm = new Comp();
      vm.$mount();
      this.$el.appendChild(vm.$el);
    },
    get_next_path() {
      console.log("get_next_path:", window.location.href);
      var l = window.location.href.split("next_path=");
      if (l.length >= 2) {
        var next_path = l[1].split("&token")[0];
        return decodeURIComponent(next_path);
      }
      return null;
    }
  }
};
</script>

<style scoped>
</style>
