<template>
  <el-dialog :title="`${data['_index']} ${data['_id']} 修改`" :visible.sync="is_visible" @close="on_close(true)">
    <div v-loading="loading">
      <el-form label-width="100px" size="small" style="margin-right: 50px">
        <el-form-item v-for="(v, k) in fields" v-if="k[0]!='_'" :key="k" :label="`${k}:`" :required="v.required" :error="errors[k]|c_array_to_string">
          <c-select v-if="v.type=='list'" v-model="form_data[k]" :placeholder="v.label?v.lable:k+' | type:'+v.type+'/'+v.child.type" multiple filterable allow-create default-first-option remote style="width: 100%">
          </c-select>
          <el-input v-else v-model="form_data[k]" :placeholder="`${v.label?v.label:k} | ${v.type}`"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="submit()" :loading="submit_loading">提&nbsp;&nbsp;交</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" style="width: 100%" @click="clone()" :loading="clone_loading">克&nbsp;&nbsp;隆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import master from "@/api";
import df_admin from "df-admin"

export default {
  mixins: [df_admin.mixins.dialog_mixin],
  data() {
    console.log("this.props.data:", this.data);
    return {
      is_visible: true,
      loading: false,
      submit_loading: false,
      form_data: JSON.parse(JSON.stringify(this.data._source)),
      fields: [],
      errors: {},
      clone_loading: false
    };
  },
  props: ["data", "table_name"],
  mounted() {
    this.loading = true;
    master
      .options(`data/${this.data._index}`)
      .then(response => {
        this.loading = false;
        this.fields = response.data.actions.POST;
      })
      .catch(exc => {
        this.loading = false;
        if (exc.response && exc.response.data) {
          this.$message.error(this.response.data);
        }
        console.log(exc.message);
      });
  },
  methods: {
    // on_close() {
    //   this.$el.parentNode.removeChild(this.$el);
    //   this.$destroy();
    // },
    submit() {
      this.errors = {};
      this.submit_loading = true
      this.$c_master
        .put(`data/${this.data._index}/${this.data._id}`, this.form_data)
        .then(response => {
          this.submit_loading = false;
          this.$message.success("修改成功");
          this.$emit("update_item", this.form_data);
          this.on_close();
        })
        .catch(error => {
          this.submit_loading = false;
          this.errors = error.response.data;
          console.warn(error)
        });
    },
    clone() {
      this.clone_loading = true;
      this.$c_master
        .post(`data/${this.table_name}`, this.form_data)
        .then(response => {
          this.clone_loading = false;
          this.$message.success("克隆成功");
          this.errors = {};
          this.$emit("add_item", response.data._id);
          this.on_close();
        })
        .catch(error => {
          this.clone_loading = false;
          this.errors = error.response.data;
        });
    }
  }
};
</script>
