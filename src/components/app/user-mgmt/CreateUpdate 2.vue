<template>
  <el-dialog width="700px" :title="p_type==='update'?'修改用户':'创建用户'" :visible.sync="is_visible" @close="on_close">
    <el-form label-width="100px" style="margin-right: 50px">
      <el-form-item label="用户名:" :error="form_errors.username">
        <el-input v-model="form_data.username"></el-input>
      </el-form-item>
      <el-form-item label="姓名:" :error="form_errors.name">
        <el-input v-model="form_data.name"></el-input>
      </el-form-item>
      <el-form-item label="管理员:" :error="form_errors.is_staff">
        <el-checkbox v-model="form_data.is_staff"></el-checkbox>
      </el-form-item>
      <el-form-item label="激活:" :error="form_errors.is_active">
        <el-checkbox v-model="form_data.is_active"></el-checkbox>
      </el-form-item>
      <el-form-item label="邮箱:" :error="form_errors.email">
        <el-input v-model="form_data.email"></el-input>
      </el-form-item>
      <!-- <el-form-item v-if="p_type==='update'" label="密码:" :error="form_errors.password">
        <el-input type="password" v-model="form_data.password"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button style="width: 100%" type="primary" :loading="submit_loading" @click="on_submit()">提交</el-button>
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
      form_data: {
        is_active: true
      }
    };
  }
};
</script>

<style scoped>
</style>
