<template>
  <div style="display: inline-block; margin: 0 20px">
    <span style="color: #606266; font-size: 14px; font-weight: 400; line-height: 36px; margin-right: 4px">{{ label }}:</span>
    <el-input
      style="display: inline-block; width: 120px"
      v-model="parent.params[start_para]"
      @change="on_change"
      clearable
      type="number"
      :size="size"
      placeholder="大于等于">
    </el-input>
    -
    <el-input
      style="display: inline-block; width: 120px"
      v-model="parent.params[end_para]"
      @change="on_change"
      clearable
      type="number"
      :size="size"
      placeholder="小于等于">
    </el-input>
  </div>

</template>

<script>
  export default {
    props: {
      parent: {
        required: true
      },
      label: {
        default: ""
      },
      start_para: {
        required: true
      },
      end_para: {
        required: true
      },
      size: {
        default: "medium"
      }
    },
    methods: {
      on_change(){
        this.parent.get_data(true)
      }
    }
  }
</script>

<style scoped>

</style>
