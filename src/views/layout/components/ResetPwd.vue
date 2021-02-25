<template>
  <el-dialog width="700px" title="重置密码" @close="on_close" :visible.sync="is_visible">
    <el-form label-width="100px" style="margin-right: 50px">
      <el-form-item label="新密码:" :error="form_errors.password" required>
        <el-input type="password" v-model="form_data.password" autofocus
                  @keydown.enter.native="on_submit_update_password(null)"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" :loading="update_password_loading"
                   @click="on_submit_update_password(null)">提交
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import df_admin from "df-admin"

  export default {
    mixins: [df_admin.mixins.dialog_mixin],
    data() {
      return {
        form_data: {},
        form_errors: {},
        update_password_loading: false
      }
    },
    methods: {
      on_submit_update_password() {
        this.update_password_loading = true;
        this.$c_master
          .post("mgmt/user/update-password", this.form_data)
          .then(response => {
            this.update_password_loading = false;
            this.is_visible_update_password = false;
            this.$message.success("修改成功");
          })
          .catch(error => {
            this.update_password_loading = false;
          });
      }
    }
  }
</script>

<style scoped>

</style>
