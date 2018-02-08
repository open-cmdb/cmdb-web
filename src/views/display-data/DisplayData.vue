<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input4">
        <el-button style="width: 100px" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div>
      <!--<ul v-for="item in data">-->
        <!--<data-item :data="item"></data-item>-->
      <!--</ul>-->
    </div>
  </div>
</template>

<script>

  // import dataitem from "./components/DataItem.vue"

  export default {
    name: "DisplayData",
    // components: {
    //   dataitem,
    // },
    data: ()=>{
      return {
        data: []
      }
    }
  }
</script>
