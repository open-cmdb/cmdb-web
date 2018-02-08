<template>
  <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">
      <router-link style="text-decoration: none" :to="{name: 'main'}">主页</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link style="text-decoration: none" :to="{name: 'main'}">已删除</router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <router-link style="text-decoration: none" :to="{name: 'main'}">表管理</router-link>
    </el-menu-item>
    <el-menu-item index="4">
      <router-link style="text-decoration: none" :to="{name: 'main'}">API接口</router-link>
    </el-menu-item>
    <el-menu-item index="5">
      <router-link style="text-decoration: none" :to="{name: 'main'}">帮助</router-link>
    </el-menu-item>
    <el-menu-item index="6">
      <router-link style="text-decoration: none" :to="{name: 'main'}">意见&反馈</router-link>
    </el-menu-item>
    <el-dropdown style="float: right; margin: 18px">
      <span class="el-dropdown-link" style="font-size: 22px">t{{ state.username }}<i class="el-icon-arrow-down el-icon--right"></i></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click="logout()">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
  export default {
    name: "Header",
    computed: {
    },
    methods: {
      logout(){
        this.$store.commit("logout")
      }
    },
    computed: {
      state(){
        return this.$store.state
      }
    }
  }
</script>

<style scoped>

</style>
