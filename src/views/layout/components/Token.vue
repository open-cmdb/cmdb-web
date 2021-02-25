<template>
  <el-dialog title="查看API Token" :visible.sync="is_dialog_token" width="600px">
    <el-alert title="请妥善保存您的API Token" :closable="false" type="warning">
    </el-alert>
    <div style="padding: 0px 20px; padding-top: 20px">
      <span>{{ token }}</span>
      <i style="float: right; line-height: 24px" class="fa fa-eye fa-lg" aria-hidden="true" @click="get_token"></i>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="is_dialog_token = false">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
  export default {
    name: "Token"
  }
</script>

<style scoped>

</style>
