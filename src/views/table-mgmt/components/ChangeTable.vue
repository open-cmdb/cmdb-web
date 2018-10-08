<template>
  <el-dialog width="900px" :title="data?'修改表 '+data.name:'创建表'" :visible.sync="is_visible" @close="on_close">
    <el-form size="small" label-width="60px" style="margin-right: 30px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="表名:" :error="String(errors.name?errors.name:'')">
            <el-input v-model="form_data.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="别名:" :error="String(errors.alias?errors.alias:'')">
            <el-input v-model="form_data.alias"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="自诉:" :error="String(errors.readme?errors.readme:'')">
        <el-input v-model="form_data.readme" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <el-form v-for="(item, index) in form_data.fields" :key="index" size="small" :inline="true" label-width="60px">
      <el-form-item label="字段:" style="margin-right: 0px"></el-form-item>
      <el-form-item style="width: 80px" :error="String(errors.fields&&errors.fields[index].name?errors.fields[index].name:'')">
        <el-input v-model="item.name" placeholder="字段名"></el-input>
      </el-form-item>
      <el-form-item style="width: 80px" :error="String(errors.fields&&errors.fields[index]['alias']?errors.fields[index]['alias']:'')">
        <el-input v-model="item.alias" placeholder="别名"></el-input>
      </el-form-item>
      <el-form-item style="width: 140px" :error="String(errors.fields&&errors.fields[index].type?errors.fields[index]['type']:'')">
        <el-select v-model="item.type" placeholder="选择字段类型">
          <el-option label="字符串" :value="0"></el-option>
          <el-option label="整数" :value="1"></el-option>
          <el-option label="浮点数" :value="2"></el-option>
          <el-option label="日期时间" :value="3"></el-option>
          <el-option label="日期" :value="4"></el-option>
          <el-option label="布尔" :value="5"></el-option>
          <el-option label="IP地址" :value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :error="String(errors.fields&&errors.fields[index].required?errors.fields[index]['required']:'')">
        <el-checkbox v-model="item.required" :disabled="item.is_multi">必填</el-checkbox>
      </el-form-item>
      <el-form-item :error="String(errors.fields&&errors.fields[index].is_multi?errors.fields[index]['is_multi']:'')">
        <el-checkbox v-model="item.is_multi">多值</el-checkbox>
      </el-form-item>
      <el-form-item :error="String(errors.fields&&errors.fields[index].readme?errors.fields[index]['readme']:'')">
        <el-input v-model="item.readme" placeholder="自述" style="width: 176px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" style="margin: 0px 1px" icon="el-icon-plus" @click="on_add_field(item, index)"></el-button>
        <el-button size="mini" type="danger" style="margin: 0px 1px" icon="el-icon-delete" @click="on_delete_filed(item, index)"></el-button>
      </el-form-item>
    </el-form>
    <div v-show="form_data.fields.length==0">
      <el-button size="mini" type="primary" style="margin: 10px 60px" icon="el-icon-plus" @click="on_add_field({}, 0)">添加字段</el-button>
    </div>
    <el-form label-width="60px" style="margin-right: 30px">
      <el-form-item>
        <el-button size="small" style="width: 100%" type="primary" :loading="loading" @click="on_submit">提&nbsp;&nbsp;&nbsp;&nbsp;交</el-button>
      </el-form-item>
    </el-form>
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
      form_data: !this.is_create
        ? JSON.parse(JSON.stringify(this.data))
        : {
            name: "",
            alias: "",
            readme: "",
            fields: [
              {
                name: "",
                alias: "",
                readme: "",
                is_multi: false,
                required: false
              }
            ]
          },
      errors: {}
    };
  },
  props: ["is_create", "data"],
  mounted() {
    // this.data.fields.push({"id":121,"name":"xxxxx","alias":null,"readme":"","type":0,"is_multi":false,"required":true})
  },
  methods: {
    on_close() {
      this.$el.parentNode.removeChild(this.$el);
      this.$destroy();
    },
    on_add_field(item, index) {
      this.form_data.fields.splice(index + 1, 0, {
        // id: Math.floor(Math.random() * 10000000 + 10000000),
        name: "",
        alias: "",
        readme: "",
        // type: 0,
        is_multi: false,
        required: false
      });
      if (!this.errors.fields) {
        return;
      }
      this.errors.fields.splice(index + 1, 0, {});
    },
    on_delete_filed(field, index) {
      console.log("this.from_data:", this.form_data);
      this.form_data.fields.splice(index, 1);
      // if (JSON.stringify(this.errors) == "{}" && !this.errors.fields) {
      //   return;
      // }
      if (this.errors.fields) {
        this.errors.fields.splice(index, 1);
      }
    },
    on_submit() {
      if (this.is_create) {
        this.loading = true;
        master_s
          .post("mgmt/table", this.form_data)
          .then(response => {
            this.loading = false;
            this.$message.success("添加成功 请重启后端服务");
            this.errors = {};
            this.$emit("add_table", response.data);
            this.on_close();
          })
          .catch(error => {
            this.loading = false;
            this.errors = error.response.data;
          });
      } else {
        master_s
          .put(`mgmt/table/${this.data.name}`, this.form_data)
          .then(response => {
            this.$message.success("修改成功");
            this.errors = {};
            for (let key in this.form_data) {
              this.data[key] = this.form_data[key];
            }
            this.on_close();
          })
          .catch(error => {
            this.errors = error.response.data;
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
