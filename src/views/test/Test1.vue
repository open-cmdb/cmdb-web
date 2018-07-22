<template>
<div>
  <!-- <tmm-select
    v-model="value10"
    multiple
    filterable
    allow-create
    default-first-option
    placeholder="请选择文章标签">
    <el-option
      v-for="item in options5"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </tmm-select> -->
  <c-select
    v-model="value10"
    multiple
    filterable
    allow-create
    default-first-option
    placeholder="请选择文章标签">
    <!-- <el-option
      v-for="item in options5"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option> -->
  </c-select>
  </div>
</template>

<script>
// import CSelect from "./select/src/select"
  export default {
    data() {
      return {
        options5: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
        value10: []
      }
    },
    components: {
      // CSelect,
    }
  }
</script>