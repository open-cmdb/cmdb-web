<template>
  <el-submenu v-if="item.children" :index="item.name">
    <template slot="title">
      <i class="fa" :class="item.meta.icon" style="margin-right: 5px"></i>
      <span style="display: inline-block">{{ item.meta.name }}</span>
    </template>
    <el-menu-item v-for="(child_item, index) in item.children" :key="index" :index="child_item.name">
      <i class="fa" :class="child_item.meta.icon" style="margin-right: 5px"></i>
      <span slot="title" style="display: inline-block; width: 140px">{{ child_item.meta.name }}</span>
    </el-menu-item>
  </el-submenu>
  <el-menu-item v-else :index="item.name">
    <i class="fa" :class="item.meta.icon" style="margin-right: 5px"></i>
    <span slot="title" style="display: inline-block">{{ item.meta.name }}</span>
  </el-menu-item>
</template>


<script>
export default {
  props: ["item"]
};
</script>

