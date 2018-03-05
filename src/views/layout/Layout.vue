<template>
  <el-container style="height: 100%">
    <el-header style="padding: 0px; height: 63px">
      <c-header></c-header>
    </el-header>
    <el-main style="padding: 10px">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>

  import CHeader from "./components/Header.vue"
  import CAside from "./components/Aside.vue"

  export default {
    name: "Layout",
    components: {
      CHeader,
      CAside
    }
  }
</script>
