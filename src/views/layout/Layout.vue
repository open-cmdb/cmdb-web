<template>
  <el-container style="height: 100%">
    <el-aside width="240px;" style="height: 100%; overflow: hidden">
      <c-aside></c-aside>
    </el-aside>
    <el-container>
      <el-header>
        <c-header></c-header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
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
