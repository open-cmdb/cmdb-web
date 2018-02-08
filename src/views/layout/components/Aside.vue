<template>
  <div style="border: 2px solid #ebeef5; height: 100%">
    <el-card>
      <!--<p style="font-size:23px; text-align: center;  margin: 0px 0px">CMDB</p>-->
      <h1 style="text-align: center; font-size:24px; margin: 0px 0px">CMDB</h1>
    </el-card>
    <el-select v-model="selected" style="width: 100%" multiple filterable placeholder="请选择">
      <el-option
        v-for="item in tables"
        :key="item.id"
        :label="item.name"
        :value="item.id">
        <el-button size="mini" style="padding: 2px; margin: 2px">添加</el-button>
        <el-button size="mini" style="padding: 2px; margin: 2px">详情</el-button>
        <span>{{ item.name }}</span>
      </el-option>
    </el-select>
    <table-list :tables="tables"></table-list>
  </div>
</template>

<script>
  import master from "@/api"
  import TableList from "./TableList.vue"

  export default {
    name: "Aside",
    components:{
      TableList
    },
    data(){
      return {
        tables: [],
        selected: []
      }
    },
    mounted(){
      var self = this
      master.get("mgmt/table").then((response) => {
        self.tables = response["data"]
        console.log(response)
      })
    },
    methods: {
      add_data(table){
        console.log("table:", table)
      }
    }
  }
</script>

<style scoped>

</style>
