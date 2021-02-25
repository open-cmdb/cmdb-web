<template>
  <el-dialog width="700px" title="重置密码" :visible.sync="is_visible" @close="on_close">
    <el-form label-width="100px" style="margin-right: 50px">
      <el-form-item label="新密码:" :error="form_errors.password" required>
        <el-input type="password" v-model="form_data.password" autofocus @keydown.enter.native="on_submit(null)"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" :loading="submit_loading" @click="on_submit(null)">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { dialog_mixin } from "@/utils/mixins";

export default {
  mixins: [dialog_mixin],
  data() {
    return {
      success_msg: "重置成功",
      action_url: "reset-password-by-admin"
    };
  }
};
</script>