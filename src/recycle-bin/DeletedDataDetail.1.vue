<template>
  <el-dialog width="900px" :title="`${data['_index']}\\${data['_id']} 详细信息`" :visible.sync="is_visible" @close="on_close">
    <el-table :data="[data['_source']]" fit stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="S-creator" label="创建者"></el-table-column>
      <el-table-column prop="S-creation-time" label="创建时间"></el-table-column>
      <el-table-column prop="S-delete-people" label="删除者"></el-table-column>
      <el-table-column prop="S-delete-time" label="删除时间"></el-table-column>
      <el-table-column v-for="(value, key) in data['_source']" v-if="key[0] != 'S'" :label="key" :key="key">
        <template slot-scope="scope">
          <span>{{ value }}</span>
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
