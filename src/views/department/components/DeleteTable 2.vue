<template>
  <el-dialog :title="'删除表'+data.name" :visible.sync="is_visible" @close="on_close">
    <el-alert title="删除表将删除表所有记录和删除记录 请输入您的用户名确认" type="warning">
    </el-alert>
    <el-form size="small" label-width="60px" style="width: 100%; margin-top: 30px">
      <el-form-item label="用户名:" :error="errors.confirm" style="width: 100%">
        <el-input v-model="form_data.confirm" style="width: 100%"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="on_close">取 消</el-button>
      <el-button type="primary" @click="on_submit" :loading="loading">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import master from "@/api";
import { master_s } from "@/api";

export default {
  name: "change-table",
  data() {
    return {
      is_visible: true,
      loading: false,
      form_data: {},
      errors: {}
    };
  },
  props: ["data"],
  mounted() {
    // this.data.fields.push({"id":121,"name":"xxxxx","alias":null,"readme":"","type":0,"is_multi":false,"required":true})
  },
  methods: {
    on_close() {
      this.$el.parentNode.removeChild(this.$el);
      this.$destroy();
    },
    on_add_field() {
      this.form_data.fields.push({
        id: Math.floor(Math.random() * 10000000 + 10000000),
        name: "",
        alias: "",
        readme: "",
        type: 0,
        is_multi: false,
        required: false
      });
      if (JSON.stringify(this.errors) == "{}" && !this.errors.fields) {
        return;
      }
      this.errors.fields.push({});
    },
    on_delete_filed(field, index) {
      console.log("this.from_data:", this.form_data);
      this.form_data.fields.splice(index, 1);
      if (JSON.stringify(this.errors) == "{}" && !this.errors.fields) {
        return;
      }
      if (errors.fields) {
        this.errors.fields.splice(index, 1);
      }
    },
    on_submit() {
      this.loading = true;
      this.$c_master
        .delete(`mgmt/table/${this.data.name}`, {params: this.form_data})
        .then(response => {
          this.loading = false;
          this.$message.success("删除成功");
          this.$emit("delete_item", this.data);
          this.on_close();
        })
        .catch(error => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
</style>
