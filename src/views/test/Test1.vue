<template>
  <div>
    <el-button @click="on_jump">jump</el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      on_jump(){
        this.$router.push("/api/v1/docs")
      }
    }
  }
</script>
