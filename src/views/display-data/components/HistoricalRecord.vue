<template>
  <el-dialog width="1000px" :title="`${data_index} ${data_id} 历史版本`" :visible.sync="is_visible" @close="on_close">
    <el-table v-if="data.length > 0" :data="data" :max-height="max_height" stripe>
      <el-table-column prop="_changer" label="修改者" fixed></el-table-column>
      <el-table-column prop="_update_time" label="修改时间" fixed></el-table-column>
      <el-table-column v-for="(value, key) in data[0]" v-if="key[0] != '_'" :label="key" :key="key">
        <template slot-scope="scope">
          <span :style="{color: value==null ? '#C0C4CC':'#606266'}">{{ scope.row[key]==null?'null':scope.row[key] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <p style="text-align: center" v-else>没有修改记录</p>
  </el-dialog>
</template>

<script>
  import master from "@/api"

  export default {
    data(){
      return {
        is_visible: true,
        data: [],
        max_height: 0
      }
    },
    props: ["data_index", "data_id"],
    mounted(){
      this.max_height = window.innerHeight*0.65 > 420 ? window.innerHeight*0.65 : 420
      console.log("height:",this.max_height)
      master.get(`record-data/${this.data_index}/${this.data_id}`).then((response)=>{
        for(let key in response.data.hits){
          this.data.push(response.data.hits[key]["_source"])
        }
      }).catch((exc)=>{
        if(exc.response && exc.response.data){
          this.$message.error(exc.response.data)
        }
        console.log(exc.message)
      })
    },
    methods:{
      on_close(){
        console.log("this.id:2", this.data_id)
        this.$el.parentNode.removeChild(this.$el)
        this.$destroy()
      }
    }
  }
</script>
