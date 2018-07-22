<template>
  <div style="display: inline-block">
    <el-button @click="is_visible=true" type="primary" icon="el-icon-download" size="medium">导出</el-button>
    <el-dialog title="导出数据" width="600px" :visible.sync="is_visible" @close="is_visible=false">
      <el-form label-width="120px" style="width: 500px">
        <el-form-item label="导出格式:">
          <el-select v-model="l_params._format" placeholder="选择导出格式" style="width: 100%">
            <el-option label="Excel" value="xls"></el-option>
            <el-option label="CSV" value="csv"></el-option>
            <el-option label="JSON" value="json"></el-option>
            <el-option label="HTML" value="html"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="导出数量:">
          <el-input v-model="l_params.page_size" type="number" placeholder="单次最多1000条"></el-input>
        </el-form-item>
        <el-form-item label="导出页码:">
          <el-input v-model="l_params.page" type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-loading="loading" type="primary" @click="on_submit" style="width: 100%">提&nbsp;&nbsp;交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {baseURL, params_serializer} from "@/api"
  export default {
    props: {
      parent: {
        required: true
      }
    },
    data(){
      return {
        loading: false,
        is_visible: false,
        l_params: {
          _format: "xls",
          page: 1,
          page_size: 100
        },
        url: this.parent.url + "/export"
      }
    },
    mounted(){
    },
    methods:{
      on_submit(){
        if(this.l_params.page_size>1000){
          this.$message.warning("单次最大支持1000条")
          return
        }
        var params = Object.assign({}, this.parent.params)
        params._format = this.l_params._format
        params.page = this.l_params.page
        params.page_size = this.l_params.page_size
        var params_str = params_serializer(params)
        window.open(`${baseURL}${this.url}?${params_str}`, name="_blank")
        this.is_visible = false
      }
    }
  }
</script>
