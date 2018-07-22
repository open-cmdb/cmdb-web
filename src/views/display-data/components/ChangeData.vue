<template>
  <el-dialog :title="`${data['_index']} ${data['_id']} 修改`" :visible.sync="is_visible" @close="on_close">
    <el-form label-width="100px" size="small" style="margin-right: 50px">
      <el-form-item v-for="(v, k) in fields" v-if="k[0]!='S'" :key="k" :label="`${k}:`" :required="v.required" :error="(errors[k])?String(errors[k]):''">
        <c-select v-if="v.type=='list'" v-model="form_data[k]" :placeholder="v.label?v.lable:k+' | type:'+v.type+'/'+v.child.type" multiple filterable allow-create default-first-option remote style="width: 100%">
        </c-select>
        <el-input v-else v-model="form_data[k]" :placeholder="`${v.label?v.label:k} | ${v.type}`"></el-input>
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
      form_data: JSON.parse(JSON.stringify(this.data._source)),
      fields: [],
      errors: {}
    };
  },
  props: ["data"],
  mounted() {
    master
      .options(`data/${this.data._index}`)
      .then(response => {
        this.fields = response.data.actions.POST;
        // for(let key in this.fields){
        //   this.errors[key] = ""
        // }
      })
      .catch(exc => {
        if (exc.response && exc.response.data) {
          this.$message.error(this.response.data);
        }
        console.log(exc.message);
      });
  },
  methods: {
    on_close() {
      this.$el.parentNode.removeChild(this.$el);
      this.$destroy();
    },
    submit() {
      this.errors = {};
      master
        .put(`data/${this.data._index}/${this.data._id}`, this.form_data)
        .then(response => {
          this.$message.success("修改成功");
          this.$emit("update_item", this.form_data);
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
