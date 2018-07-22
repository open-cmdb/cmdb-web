<template>
  <el-dialog width="800px" :title="`${iccid} 关联的单车`" :visible.sync="is_visible" @close="on_close">
    <el-table :data="table_data" fit stripe v-loading="loading" :show-overflow-tooltip="true">
      <el-table-column prop="bike_no" label="编号"></el-table-column>
      <el-table-column prop="bike_sim" label="SIM卡iccid"></el-table-column>
      <el-table-column label="单车状态">
        <template slot-scope="scope">
          <span>{{ BIKE_STATUS_MAP[scope.row.bike_status] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="city_name" label="城市名车"></el-table-column>
      <el-table-column prop="city_code" label="城市代码"></el-table-column>
      <el-table-column prop="create_date" label="创建时间"></el-table-column>
      <el-table-column prop="update_date" label="更新时间"></el-table-column>
      <el-table-column prop="heart_time" label="最后一次心跳时间"></el-table-column>
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
        BIKE_STATUS_MAP: maps.BIKE_STATUS_MAP
      }
    },
    props: ["iccid"],
    mounted(){
      master.get(`bikeinfo?bike_sim=${this.iccid}&ordering=-update_date`).then((response)=>{
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
