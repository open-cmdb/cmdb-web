<template>
  <el-dialog width="900px" :title="`${data['_index']} ${data['_id']} 详细信息`" :visible.sync="is_visible" @close="on_close">
    <div>
      <span class="label">创建者:</span>{{ data['_source']["_creator"]}}
    </div>
    <div>
      <span class="label">创建时间:</span>{{ data['_source']["_create_time"]}}
    </div>
    <div>
      <span class="label">删除者:</span>{{ data['_source']["_delete_people"]}}
    </div>
    <div>
      <span class="label">删除时间:</span>{{ data['_source']["_delete_time"]}}
    </div>
    <div v-for="(v, k, index) in data['_source']" v-if="k[0] != 'S'" :key="index">
      <span class="label">{{ k }}:</span>{{ v }}
    </div>
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


<style scoped>
.label {
  color: #99a9bf;
  text-align: right;
  padding-right: 10px;
  width: 120px;
  display: inline-block;
  line-height: 26px;
}
</style>
