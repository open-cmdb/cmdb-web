<template>
  <el-dialog :title="`${iccid} 详细信息`" :visible.sync="is_visible" @close="on_close">
    <el-table :data="table_data" fit stripe v-loading="loading">
      <el-table-column
          prop="iccid"
          label="iccid">
        </el-table-column>
        <el-table-column
          label="厂商">
          <template slot-scope="scope">
            <span>{{ OPERATOR_MAP[scope.row.operator] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="user_status"
          label="物联卡状态">
          <template slot-scope="scope">
            <span>{{ STATUS_MAP[scope.row.user_status] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="work_status"
          label="工作状态">
          <template slot-scope="scope">
            <span>{{ STATUS_MAP[scope.row.work_status] }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="account_date"
          sortable
          label="开户日期">
        </el-table-column>
        <el-table-column
          prop="activate_date"
          sortable
          label="激活日期">
        </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  import master from "@/api"
  import maps from "@/public/maps"
  export default {
    data(){
      return {
        loading: true,
        is_visible: true,
        table_data: [],
        STATUS_MAP: maps.STATUS_MAP,
        OPERATOR_MAP: maps.OPERATOR_MAP
      }
    },
    props: ["iccid"],
    mounted(){
      master.get(`sim?iccid=${this.iccid}`).then((response)=>{
        this.loading = false
        this.table_data=response.data.results
      }).catch((error)=>{
        this.loading = false
      })
    },
    methods:{
      on_close(){
        this.$el.parentNode.removeChild(this.$el)
        this.$destroy()
      }
    }
  }
</script>
