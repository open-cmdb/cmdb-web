<template>
  <el-input style="float: right; width: 300px" size="medium"
            v-model="parent.params.search"
            :autofocus="true"
            @keyup.enter.native="parent.get_data(true)"
            :placeholder="placeholder">
    <el-button @click="parent.get_data(true)" slot="append">搜索</el-button>
  </el-input>
</template>

<script>
  export default {
    data(){
      console.log(this.$parent.params)
      return {}
    },
    props: {
      parent: {
        request: true
      },
      placeholder: {
        required: false,
        default: ""
      },
      // params: {
      //   required: true,
      // },
      // on_search: {
      //   required: true,
      //   type: "function"
      // }
    }
  }
</script>

<style scoped>

</style>
