<template>
  <div style="display: inline-block; margin: 0 20px">
    <span style="color: #606266; font-size: 14px; font-weight: 400; line-height: 36px; margin-right: 4px">{{ label }}</span>
    <el-date-picker
      v-model="parent.params[filter_para]"
      @change="parent.get_data(true)"
      :type="type"
      :size="size"
      :value-format="format_map[type]"
      placeholder="日期筛选">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    props: {
      parent: {
        required: true
      },
      label: {
        default: "日期筛选"
      },
      filter_para: {
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
        format_map: {
          date: "yyyy-MM-dd",
          month: "yyyy-MM-dd"
        }
      }
    }
  }
</script>

<style scoped>

</style>
