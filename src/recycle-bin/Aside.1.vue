<template>
  <div style="height: 100%; display: flex">
    <el-menu style="height: 100%; display: inline-block" :default-active="$route.name" @select="on_select" :collapse="is_collapse">
      <el-menu-item index="data">
        <i class="fa fa-home" style="margin-right: 5px"></i>
        <span slot="title" style="display: inline-block">主页</span>
      </el-menu-item>
      <el-menu-item index="deleted">
        <i class="fa fa-recycle" style="margin-right: 5px"></i>
        <span slot="title" style="display: inline-block; width: 200px">已删除</span>
      </el-menu-item>
      <el-menu-item index="table">
        <i class="fa fa-table" style="margin-right: 5px"></i>
        <span slot="title" style="display: inline-block; width: 200px">表管理</span>
      </el-menu-item>
    </el-menu>
    <div style="height: 100%; display: inline-block; display: flex; align-items: center">
      <i @click="is_collapse=!is_collapse" style="color: #909399; cursor: pointer;" class="fa fa-outdent" :class="{'fa-rotate-180': is_collapse}"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is_collapse: false,
      api_url:
        window.location.protocol + "//" + window.location.host + "/api-docs"
    };
  },
  methods: {
    on_select(key, path) {
      if (key == "spit-slot") {
        this.on_show_spit_slot();
        return;
      }
      if (key.indexOf("http") == 0) {
        window.open(key);
        return;
      } else if (key.indexOf("/") == 0) {
        this.$router.push(key);
        return;
      }
      this.$router.push({ name: key });
    },
    on_show_spit_slot() {
      this.$alert("请联系tangmingming@hellobike.com", "我要吐槽", {
        confirmButtonText: "确定"
      });
    }
  }
};
</script>

<style scoped>
</style>
