<template>
  <el-dialog width="900px" :title="`${data['_index']}\\${data['_id']} 详细信息`" :visible.sync="is_visible" @close="on_close">
    <el-table :data="[data['_source']]" fit stripe>
      <el-table-column prop="S-creator" label="创建者"></el-table-column>
      <el-table-column prop="S-creation-time" label="创建时间"></el-table-column>
      <el-table-column prop="S-last-modified" label="最后修改人"></el-table-column>
      <el-table-column v-for="(value, key) in data['_source']" v-if="key[0] != 'S'" :label="key" :key="key">
        <template slot-scope="scope">
          <span :style="{color: value==null ? '#C0C4CC':'#606266'}">{{ value==null?'null':value }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>

  export default {
    data(){
      console.log("this.props.data:", this.data)
      return {
        is_visible: true,
        ddd: [
          {name: "zhangsan"}
        ]
      }
    },
    props: ["data", "source"],
    mounted(){
      console.log("mounted")
      console.log("data:", this.data)
        console.log("table_data:", this.table_data)
    },
    methods:{
      on_close(){
        this.$el.parentNode.removeChild(this.$el)
        this.$destroy()
      }
    }
  }
</script>
