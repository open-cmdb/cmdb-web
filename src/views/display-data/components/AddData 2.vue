<template>
  <el-dialog :title="`向 ${table_name} 添加记录`" :visible.sync="is_visible" @close="on_close">
    <div v-loading="loading">
    <el-form label-width="120px" size="small" style="margin-right: 50px">
      <el-form-item v-for="(v, k) in fields" v-if="k[0]!='S'" :key="k" :label="`${k}:`" :required="v.required" :error="errors[k]|c_array_to_string">
        <c-select v-if="v.type=='list'" v-model="form_data[k]" :placeholder="`${v.label?v.label:k} | type:${v.type}/${v.child.type}`" multiple filterable allow-create default-first-option remote style="width: 100%">
        </c-select>
        <el-input v-else v-model="form_data[k]" :placeholder="`${v.label?v.label:k} | type:${v.type}`"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="submit()" :loading="submit_loading">提&nbsp;&nbsp;交</el-button>
      </el-form-item>
    </el-form>
    </div>
  </el-dialog>
</template>

<script>
import master from "@/api";
import master_2 from "@/api";
export default {
  data() {
    return {
      is_visible: true,
      loading: false,
      submit_loading: false,
      form_data: {},
      fields: [],
      errors: {}
    };
  },
  props: ["table_name"],
  mounted() {
    this.loading = true;
    master_2
      .options(`data/${this.table_name}`)
      .then(response => {
        this.loading = false;
        this.fields = response.data.actions.POST;
      })
      .catch(error => {});
  },
  methods: {
    on_close() {
      this.$el.parentNode.removeChild(this.$el);
      this.$destroy();
    },
    submit() {
      this.submit_loading = true;
      this.$c_master
        .post(`data/${this.table_name}`, this.form_data)
        .then(response => {
          this.submit_loading = false;
          this.$message.success("添加成功");
          this.errors = {};
          this.$emit("add_item", response.data._id);
          this.on_close();
        })
        .catch(error => {
          this.submit_loading = false;
          this.errors = error.response.data;
        });
    }
  }
};
</script>
