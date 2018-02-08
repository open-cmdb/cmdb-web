<template>
  <div>
    <i class="el-icon-circle-plus"></i>
  </div>
</template>

<script>
  export default {
    name: "test3",
    mounted(){
      console.log("test3 parent:", this.$parent)
    }
  }
</script>

<style scoped>

</style>
