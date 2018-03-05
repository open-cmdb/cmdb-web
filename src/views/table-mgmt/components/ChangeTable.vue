<template>
  <el-dialog width="900px" :title="data?'修改表 '+data.name:'创建表'" :visible.sync="is_visible" @close="on_close">
    <el-form  :inline="true" size="small" label-width="60px">
      <el-form-item label="表名:" :error="String(errors.name?errors.name:'')">
        <el-input v-model="form_data.name" style="width: 350px"></el-input>
      </el-form-item>
      <el-form-item label="别名:" :error="String(errors.alias?errors.alias:'')">
        <el-input v-model="form_data.alias" style="width: 350px"></el-input>
      </el-form-item>
    </el-form>
    <el-form  label-width="60px" size="small">
      <el-form-item label="自诉:"  :error="String(errors.readme?errors.readme:'')">
        <el-input v-model="form_data.readme" type="textarea"></el-input>
      </el-form-item>
    </el-form>

    <el-form v-for="(item, index) in form_data.fields" :key="item.id" size="small" :inline="true" label-width="60px">
      <el-form-item label="字段:" style="margin-right: 0px"></el-form-item>
      <el-form-item style="width: 80px" :error="String(errors.fields&&errors.fields[index].name?errors.fields[index].name:'')">
        <el-input v-model="item.name" placeholder="字段名"></el-input>
      </el-form-item>
      <el-form-item style="width: 80px" :error="String(errors.fields&&errors.fields[index]['alias']?errors.fields[index]['alias']:'')">
        <el-input v-model="item.alias" placeholder="别名"></el-input>
      </el-form-item>
      <el-form-item :error="String(errors.fields&&errors.fields[index].type?errors.fields[index]['type']:'')">
        <el-radio-group v-model="item.type" size="mini">
          <el-radio-button label="0">字符串</el-radio-button>
          <el-radio-button label="1">整数</el-radio-button>
          <el-radio-button label="2">浮点数</el-radio-button>
          <el-radio-button label="3">日期时间</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item :error="String(errors.fields&&errors.fields[index].required?errors.fields[index]['required']:'')">
        <el-checkbox v-model="item.required" :disabled="item.is_multi">必填</el-checkbox>
      </el-form-item>
      <el-form-item :error="String(errors.fields&&errors.fields[index].is_multi?errors.fields[index]['is_multi']:'')">
        <el-checkbox v-model="item.is_multi">多值</el-checkbox>
      </el-form-item>
      <el-form-item :error="String(errors.fields&&errors.fields[index].readme?errors.fields[index]['readme']:'')">
        <el-input v-model="item.readme" placeholder="自述" style="width: 150px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="danger" icon="el-icon-delete" style="padding: 2px 4px" @click="on_delete_filed(item, index)"></el-button>
      </el-form-item>
    </el-form>
    <el-button size="small" style="width: 800px; margin: 10px 40px" icon="el-icon-circle-plus-outline" @click="on_add_field">添加字段</el-button>
    <el-button size="small" style="width: 800px; margin: 10px 40px" type="primary" @click="on_submit">提交</el-button>
  </el-dialog>
</template>

<script>
  import master from "@/api"
  import { master_s } from "@/api"

  export default {
    name: "change-table",
    data(){
      return {
        is_visible: true,
        form_data: !this.is_create?JSON.parse(JSON.stringify(this.data)):{
          name: "",
          alias: "",
          readme: "",
          fields: [
            {
              "name": "",
              "alias": "",
              "readme": "",
              "type": 0,
              "is_multi": false,
              "required": false
            }
          ]
        },
        errors: {}
      }
    },
    props: ["is_create", "data"],
    mounted(){
      // this.data.fields.push({"id":121,"name":"xxxxx","alias":null,"readme":"","type":0,"is_multi":false,"required":true})
    },
    methods: {
      on_close(){
        this.$el.parentNode.removeChild(this.$el)
        this.$destroy()
      },
      on_add_field(){
        this.form_data.fields.push({
          id: Math.floor((Math.random()*10000000)+10000000),
          name: "",
          alias: "",
          readme: "",
          type: 0,
          is_multi: false,
          required: false
        })
        if(JSON.stringify(this.errors) == "{}" && !this.errors.fields){
          return
        }
        this.errors.fields.push({})
      },
      on_delete_filed(field, index){
        console.log("this.from_data:",this.form_data)
        this.form_data.fields.splice(index, 1)
        if(JSON.stringify(this.errors) == "{}" && !this.errors.fields){
          return
        }
        if(errors.fields){
          this.errors.fields.splice(index, 1)
        }
      },
      on_submit(){
        if(this.is_create){
          master_s.post("mgmt/table", this.form_data).then((response)=>{
            this.$message.success("添加成功")
            this.errors = {}
            this.$emit("add_table", response.data)
          }).catch((error)=>{
            this.errors = error.response.data
          })
        }else{
          master_s.put(`mgmt/table/${this.data.name}`, this.form_data).then((response)=>{
            this.$message.success("修改成功")
            this.errors = {}
            for(let key in this.form_data){
              this.data[key] = this.form_data[key]
            }
          }).catch((error)=>{
            this.errors = error.response.data
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
