<template>
  <div style="display: inline-block; margin: 0 20px">
    <span style="color: #606266; font-size: 14px; font-weight: 400; line-height: 36px; margin-right: 4px">{{ label }}</span>
    <el-date-picker
      v-model="parent.params[start_para]"
      @change="on_change"
      :type="type"
      :size="size"
      :style="{width: this.width_map[this.type]+'px'}"
      placeholder="开始日期">
    </el-date-picker>
    -
    <el-date-picker
      v-model="parent.params[end_para]"
      @change="on_change"
      :type="type"
      :size="size"
      :style="{width: this.width_map[this.type]+'px'}"
      placeholder="结束日期">
    </el-date-picker>
  </div>

</template>

<script>
  import moment from "moment"
  export default {
    props: {
      parent: {
        required: true
      },
      label: {
        default: "日期筛选"
      },
      start_para: {
        required: true
      },
      end_para: {
        required: true
      },
      size: {
        default: "medium"
      },
      type: {
        default: "date"
      }
    },
    data(){
      return {
        width_map: {
          "year": 90,
          "month": 120,
          "date": 144,
          "datetime": 220
        }
      }
    },
    methods: {
      on_change(){
        const map = {
          date: "day",
          month: "month",
          year: "year"
        }
        if(this.type=="datetime"){
          this.parent.get_data(true);
          return
        }
        if(this.parent.params[this.start_para]){
          this.parent.params[this.start_para] = moment(this.parent.params[this.start_para]).startOf(map[this.type]).toDate()
        }
        if(this.parent.params[this.end_para]){
          this.parent.params[this.end_para] = moment(this.parent.params[this.end_para]).endOf(map[this.type]).toDate()
        }
        this.parent.get_data(true)
      }
    }
  }
</script>

<style scoped>

</style>
