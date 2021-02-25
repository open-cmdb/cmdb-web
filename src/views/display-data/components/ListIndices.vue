<template>
  <div style="height: 100%; display: flex">
    <el-menu class="el-menu-vertical-demo" style="height: 100%; display: inline-block; overflow: auto"
             :default-active="$route.name" @select="(key, path)=>$emit('change_table', key)" :collapse="is_collapse"
    >
      <el-menu-item v-for="item in data" :key="item.name" :index="item.name">
        <i class="fa" :class="item.icon" style="margin-right: 5px"></i>
        <span slot="title" style="display: inline-block; width: 140px">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
    <div style="height: 100%; display: flex; align-items: center">
      <i @click="is_collapse=!is_collapse" style="color: #909399; cursor: pointer;" class="fa fa-outdent"
         :class="{'fa-rotate-180': is_collapse}"></i>
    </div>
  </div>
</template>

<script>
  import df_admin from "df-admin"
  import CMenuItem from "./MenuItem";

  export default {
    mixins: [df_admin.mixins.list_mixin],
    data() {
      return {
        is_collapse: true,
        url: "mgmt/tables",
        height: window.innerHeight - 60,
        params: {
          page_size: 200
        }
      };
    },
    mounted() {
      this.get_data()
    },
    methods: {
      // on_select(key, path) {
      //   this.$router.push({name: key});
      // }
      after_get_data() {
        if (this.data.length > 0) {
          this.$emit("change_table", this.data[0].name)
        }
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
