<template>
  <el-col :xs="12" :sm="12" :lg="6">
    <div style="height: 108px; margin: 0px 20px; border: 1px solid #ebebeb; border-radius: 3px; cursor: pointer" :style="{cursor: router_name?'pointer':'auto'}" @click="on_click">
      <div style="float: left; margin-top: 30px; margin-left: 30px">
        <i class="fa fa-3x" v-bind:class="icon" style="color: #40c9c6"></i>
      </div>
      <div style="float: right; margin-top: 26px; margin-right: 30px">
        <div style="font-size: 16px; font-weight: 700; color: rgb(140, 140, 140); margin-bottom: 12px">{{ name }}</div>
        <div style="font-size: 20px; font-weight: 700; color: #666">{{ count }}</div>
      </div>
    </div>
  </el-col>
</template>

<script>
  export default {
    name: "cart-panel",
    props: {
      icon: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      count: {
        required: true,
      },
      router_name: {
        default: null
      }
    },
    methods: {
      on_click(){
        if(this.router_name){
          this.$router.push({name: this.router_name})
        }
      }
    }
  }
</script>

<style scoped>
</style>
