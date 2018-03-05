<template>
  <div>
    <el-dropdown>
  <span class="el-dropdown-link">
    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item @click="on_click">螺蛳粉</el-dropdown-item>
        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import Test6 from "./Test6.vue"
  import Vue from "vue"

  Vue.component("Test6", Test6)

  export default {
    methods: {
      on_click(){
        console.log("on_click")
      }
    }
  }
</script>

<style scoped>

</style>
