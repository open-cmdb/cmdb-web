<template>
  <el-menu class="el-menu-demo" @select="handleSelect">
    <el-menu-item v-for="item in tables" style="height: 40px; border-bottom: 1px solid #ebeef5; display: flex; align-items: center" :key="item.id" index="item.id">
        <el-button size="mini" style="padding: 2px; margin: 2px">添加</el-button>
        <el-button size="mini" style="padding: 2px; margin: 2px">详情</el-button>
      {{ item.name }}
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "table-list",
    methods: {
      handleSelect(){

      }
    },
    props: {
      tables: {
        required: true
      }
    }
  }
</script>

<style scoped>

</style>
