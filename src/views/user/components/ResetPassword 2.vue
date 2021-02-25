<template>
  <el-dialog width="600px" title="重置密码" :visible.sync="is_visible" @close="on_close">
    <el-form label-width="100px" style="margin-right: 50px">
      <h3 style="color: #f56c6c; text-align: center">{{ String(errors.non_field_errors?errors.non_field_errors:'') }}</h3>
      <el-form-item label="用户名" :required="true" :error="String(errors.username?errors.username:'')">
        <el-input v-model="form_data.username" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="验证码" :required="true" :error="String(errors.verify_code?errors.verify_code:'')">
        <el-input v-model="form_data.verify_code" style="width: 275px"></el-input>
        <el-button type="primary" :disabled="countdown ? true:false" @click="send_verify_code">{{ countdown?countdown+"|重新发送":"发送验证码" }} </el-button>
      </el-form-item>
      <el-form-item label="密码" :required="true" :error="String(errors.new_password?errors.new_password:'')">
        <el-input type="password" v-model="form_data.new_password" @keydown.enter.native="submit()"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="submit()">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import master from "@/api";
export default {
  data() {
    console.log("this.props.data:", this.data);
    return {
      is_visible: true,
      form_data: {},
      errors: {},
      countdown: 0
    };
  },
  props: ["data"],
  mounted() {},
  methods: {
    on_close() {
      this.$el.parentNode.removeChild(this.$el);
      this.$destroy();
    },
    send_verify_code() {
      master
        .post("mgmt/user/send-verify-code", {
          username: this.form_data.username
        })
        .then(response => {
          this.$message.success("验证码已发送至" + response.data.email);
          if (this.errors.username) {
            this.errors.username = "";
          }
          this.countdown = 60;
          var self = this;
          function minus_one() {
            self.countdown -= 1;
            if (self.countdown <= 0) {
              return;
            }
            setTimeout(minus_one, 1000);
          }
          minus_one();
        })
        .catch(error => {
          if (error.response && error.response.data) {
            if (error.response.data.detail) {
              this.$message.error(error.response.data.detail);
              return;
            }
            this.errors = error.response.data;
            return;
          }
          console.log(error.message);
        });
    },
    submit() {
      master
        .post("mgmt/user/reset-password-email", this.form_data)
        .then(response => {
          this.$message.success("重置成功");
          this.on_close();
        })
        .catch(error => {
          if (error.response && error.response.data) {
            if (error.response.data.detail) {
              this.$message.error(error.response.data.detail);
              return;
            }
            this.errors = error.response.data;
            return;
          }
          console.log(error.message);
        });
    }
  }
};
</script>
