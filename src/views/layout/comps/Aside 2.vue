<template>
  <div style="height: 100%; display: flex">
    <el-menu class="el-menu-vertical-demo" style="height: 100%; display: inline-block" :default-active="$route.name"
             @select="on_select" :collapse="is_collapse">
      <c-menu-item v-for="(item, index) in $store.state.filtered_menu" :key="index" :item="item">
      </c-menu-item>
    </el-menu>
    <div style="height: 100%; display: inline-block; display: flex; align-items: center">
      <i @click="is_collapse=!is_collapse" style="color: #909399; cursor: pointer;" class="fa fa-outdent"
         :class="{'fa-rotate-180': is_collapse}"></i>
    </div>
  </div>
</template>

<script>
  import CMenuItem from "../../display-data/components/MenuItem";

  export default {
    name: "Aside",
    data() {
      return {
        is_collapse: true,
        api_url:
          window.location.protocol + "//" + window.location.host + "/api-docs"
      };
    },
    methods() {
    },
    methods: {
      on_select(key, path) {
        this.$router.push({name: key});
      }
    },
    computed: {},
    components: {
      CMenuItem
    }
  };
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 400px;
  }
</style>
