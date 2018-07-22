<template>
  <router-view></router-view>
</template>

<script>
  import cookie from "@/utils/cookie"
  import sso from "@/utils/sso"
  import url from "@/utils/url"
  import master from "@/api"
  export default {
    name: 'App'
  }
</script>

<style>
  body{
    margin: 0;
    height: 100%;
    /* overflow-y: hidden; */
  }
  html{
    height: 100%;
  }
  .el-button--text {
    user-select: text !important;
  }
</style>
