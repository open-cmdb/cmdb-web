<template>
  <el-dialog width="460px" title="导入" :visible.sync="is_visible" @close="on_close">
    <div style="display: flex; justify-content: center">
      <div>
        <el-upload
          accept="xlsx"
          :auto-upload="false"
          class="upload-demo"
          :headers="{'Authorization': store.state.token}"
          ref="upload"
          drag
          :on-success="on_success"
          :on-error="on_error"
          :action="action"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传xlsx/csv文件</div>
        </el-upload>
        <el-button @click="on_upload" :loading="submit_loading" type="primary" style="width: 100%; margin-top: 20px"
                   size="medium">开始导入
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import new_mixins from "@/utils/new_mixins"
  import store from "@/store"
  import config from "@/config"

  import df_admin from "df-admin"

  export default {
    mixins: [df_admin.mixins.dialog_mixin],
    props: ["item"],
    data() {
      return {
        store: store,
        submit_loading: false,
      }
    },
    methods: {
      on_upload() {
        this.$refs.upload.submit();
        this.submit_loading = true;
      },
      on_error(err) {
        console.log("err: ", err)
        this.submit_loading = false;
        this.$message.error("导入失败")
      },
      on_success(response) {
        this.submit_loading = false;
        this.$message.success(response.detail)
      }
    },
    computed: {
      action() {
        return `${config.base_url}data/${this.item.name}/import`
      }
    }
  }
</script>

<style scoped>

</style>
