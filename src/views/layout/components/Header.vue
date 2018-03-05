<template>
  <el-menu style="padding: 0px" class="el-menu-demo" mode="horizontal" background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b"
           @select="on_click_menu">
    <div style="float: left; border-right: 1px solid #FFF; width: 200px; height: 60px; line-height: 60px; color: #FFF; text-align: center; font-size: 30px">CMDB</div>
    <el-menu-item index="main">主页</el-menu-item>
    <el-menu-item index="deleted">已删除</el-menu-item>
    <el-menu-item index="table">表管理</el-menu-item>
    <el-menu-item index="user">用户管理</el-menu-item>
    <el-menu-item :index="api_url">API接口</el-menu-item>
    <el-menu-item index="https://zhuanlan.zhihu.com/p/34191320">帮助</el-menu-item>
    <el-menu-item index="https://github.com/open-cmdb/cmdb">源代码</el-menu-item>
    <el-menu-item index="https://github.com/open-cmdb/cmdb/issues">我要吐槽</el-menu-item>
    <el-dropdown style="float: right; margin: 18px">
      <span class="el-dropdown-link" style="font-size: 22px; color: #FFF">{{ username }}<i class="el-icon-arrow-down el-icon--right"></i></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <span style="width: 100%" @click="on_change_pw">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span style="width: 100%" @click="logout">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
  import Vue from "vue"

  export default {
    name: "Header",
    data(){
      return {
        username: this.$store.state.username,
        api_url: window.location.protocol + "//" + window.location.host + "/api/v1/docs"
      }
    },
    computed: {
    },
    methods: {
      logout(){
        console.log("logout")
        this.$store.commit("logout")
        this.$router.push({name: "login"})
      },
      on_click_menu(key, key_path){
        if(key.indexOf("http")==0){
          window.open(key)
          return
        }else if(key.indexOf("/")==0){
          this.$router.push(key)
          return
        }
        this.$router.push({name: key})
      },
      on_change_pw(){
        var Comp = Vue.component("ChangePassword")
        var vm = new Comp()
        vm.$mount()
        this.$el.appendChild(vm.$el)
      }
    },
    // computed: {
    //   state(){
    //     return this.$store.state
    //   }
    // }
  }
</script>

<style scoped>

</style>
