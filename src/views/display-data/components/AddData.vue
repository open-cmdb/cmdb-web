<template>
  <el-dialog :title="`向 ${table_name} 添加记录`" :visible.sync="is_visible" @close="on_close">
    <el-form label-width="120px" size="small" style="margin-right: 50px">
      <el-form-item v-for="(v, k) in fields" v-if="k[0]!='S'" :key="k" :label="`${k}:`" :required="v.required" :error="(errors[k])?String(errors[k]):''">
        <c-select v-if="v.type=='list'" v-model="form_data[k]" :placeholder="`${v.label?v.label:k} | type:${v.type}/${v.child.type}`" multiple filterable allow-create default-first-option remote style="width: 100%">
        </c-select>
        <el-input v-else v-model="form_data[k]" :placeholder="`${v.label?v.label:k} | type:${v.type}`"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="submit()">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import master from "@/api";
import master_2 from "@/api";
export default {
  data() {
    return {
      is_visible: true,
      form_data: {},
      fields: [],
      errors: {}
    };
  },
  props: ["table_name"],
  mounted() {
    master_2
      .options(`data/${this.table_name}`)
      .then(response => {
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
      master
        .post(`data/${this.table_name}`, this.form_data)
        .then(response => {
          this.$message.success("添加成功");
          this.errors = {};
          this.$emit("add_item", response.data._id);
          this.on_close();
        })
        .catch(exc => {
          console.log("exc.reponse:", exc.response);
          if (exc.response && exc.response.data) {
            if (exc.response.data.detail) {
              this.$message.error(exc.response.data.detail);
              return;
            }
            this.errors = exc.response.data;
            return;
          }
          console.log(exc.message);
        });
    }
  }
};
</script>
