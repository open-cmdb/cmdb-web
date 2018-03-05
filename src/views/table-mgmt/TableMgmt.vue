<template>
  <div style="width: 1200px; margin: 0px auto;">
    <div id="dg" style="z-index: 9999; position: fixed;"
         v-bind:style="{right: add_location.right+'px', top: add_location.top+'px'}">
      <el-button round @click="on_add_table">
        <span style="font-size:50px">+</span>
      </el-button>
    </div>
    <el-table
      :data="tables"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="表名"
        prop="name">
      </el-table-column>
      <el-table-column
        label="别名"
        prop="alias">
      </el-table-column>
      <el-table-column
        label="创建人"
        prop="creator_username">
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="creation_time">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            style="padding: 4px"
            @click="on_show_detail(scope.row)">详情</el-button>
          <el-button
            size="mini"
            type="warning"
            style="padding: 4px"
            @click="on_change(scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            style="padding: 4px"
            @click="on_delete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import Vue from "vue"
  import master from "@/api"
  import {master_s} from "@/api"

  export default {
    name: "table-mgmt",
    data(){
      return {
        tables: [],
        add_location: {
          right: (window.innerWidth-1200)/2>20?Math.round((window.innerWidth-1200)/2):20,
          top: window.innerHeight - 140
        }
      }
    },
    mounted(){
      master.get("mgmt/table").then((response) => {
        this.tables = response["data"]
      }).catch((error)=>{
      })
    },
    methods: {
      on_show_detail(table){
        var ShowTable = Vue.component("ShowTable")
        var vm = new ShowTable({propsData: {table}})
        vm.$mount()
        this.$el.appendChild(vm.$el)
      },
      on_change(table){
        var Comp = Vue.component("ChangeTable")
        var vm = new Comp({propsData: {is_create: false, data: table}})
        vm.$mount()
        this.$el.appendChild(vm.$el)
      },
      on_delete(table){
        this.$confirm("删除表将删除表中所有数据，包括修改记录和已删除记录，是否继续？", "警告", {type: "warning"}).then(()=>{
          master_s.delete(`mgmt/table/${table.name}`).then((response)=>{
            this.$message.success("删除成功")
            this.tables.splice(this.tables.indexOf(table), 1)
          }).catch((error)=>{
            if(error.response.data && error.response.data.detail){
              this.$message.error(String(error.response.data.detail))
            }
          })
        })
      },
      on_add_table(){
        var Comp = Vue.component("ChangeTable")
        var vm = new Comp({propsData: {is_create: true}})
        vm.$mount()
        vm.$on("add_table", (table)=>{
          this.tables.push(table)
        })
        this.$el.appendChild(vm.$el)
      }
    }
  }
</script>

<style scoped>

</style>
