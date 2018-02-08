<template>
  <div>
  <ul v-for="item in data">
    <li style="display: inline; float: left; border: 1px #606266 solid; padding: 10px">
      <el-button type="text">详情</el-button>
      <el-button type="text">版本</el-button>
      <el-button type="text">修改</el-button>
      <el-button type="text">删除</el-button>
    </li>

    <li v-for="key in item['_source']" style="display: inline; float: left; border: 1px #606266 solid; padding: 10px">
      <!--<p style="margin: 0px 0px">item["_source"]["key"]</p>-->
      <p style="margin: 0px 0px">key</p>
    </li>

  </ul>
    </div>
</template>

<script>
  export default {
    name: "data-item",
    props: [data,]
  }
</script>

<style scoped>

</style>
