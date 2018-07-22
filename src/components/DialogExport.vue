<template>
  <el-dialog title="导出数据" width="600px" :visible.sync="is_visible" @close="on_close">
    <el-form label-width="120px" style="width: 500px">
      <el-form-item label="导出格式:">
        <el-select v-model="params.format" placeholder="选择导出格式" style="width: 100%">
          <el-option label="xls" value="xls"></el-option>
          <el-option label="csv" value="csv"></el-option>
          <el-option label="json" value="json"></el-option>
          <el-option label="html" value="html"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="导出数量:">
        <el-input v-model="params.page_size" type="number" placeholder="单次最多1000条"></el-input>
      </el-form-item>
      <el-form-item label="导出页码:">
        <el-input v-model="params.page" type="number"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button v-loading="loading" type="primary" @click="on_submit" style="width: 100%">提&nbsp;&nbsp;交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    data(){
      return {
        loading: false,
        is_visible: true,
        params: Object.assign({}, this.ps)
      }
    },
    props: ["ps", "url"],
    mounted(){
      // this.params.format = "xls"
      // this.params.page_size = 100
      // this.params.page = 1
    },
    methods:{
      on_submit(){
        var url = this.url + "/export"
        this.loading = true
        this.$c_master.get(url, this.params).then((response)=>{
          this.loading = false
          this.$message.success("导出成功，正在下载")
          this.on_close()
        }).catch((error)=>{
          this.loading = false
        })
      },
      on_close(){
        this.$el.parentNode.removeChild(this.$el)
        this.$destroy()
      }
    }
  }
</script>
