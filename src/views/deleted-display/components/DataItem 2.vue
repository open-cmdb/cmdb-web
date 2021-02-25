<template>
  <ul style="white-space:nowrap; margin: 0px; padding: 0px">
    <li style="display: inline-block;  border:1px solid #E4E7ED; padding: 9px">
      <el-button style="padding: 0px" icon="el-icon-view" @click="on_show_detail(data)"></el-button>
    </li>
    <li v-for="(value, key, index) in data['_source']" v-if="key[0]!='S'" :key="index"
        style="display: inline-block;  border:1px solid #E4E7ED; padding: 0 12px; font-size:14px; height: 40px; line-height: 40px" :style="{color: value==null ? '#C0C4CC':'#606266'}">
      {{ value==null?'null':value }}
    </li>
  </ul>
</template>

<script>
  import Vue from "vue"
  import {master_s} from "@/api"

  export default {
    name: "data-item",
    props: ["data"],
    methods: {
      on_show_detail(data){
        console.log("on_show_detail.data:", data)
        var DeletedDataDetail = Vue.component("DeletedDataDetail")
        var vm = new DeletedDataDetail({propsData: {
            data: data,
            source: data["_source"]
          }})
        vm.$mount()
        this.$el.appendChild(vm.$el)
      }
    }
  }
</script>

<style scoped>

</style>
