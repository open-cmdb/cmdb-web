import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store"

import app from "@/main"

import url from "@/utils/url"
import { menu } from "@/router/menu"

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: "/test2",
      name: "test2",
      component: _import("test/Test2"),
    },
    {
      path: "/test3",
      name: "test3",
      component: _import("test/Test3"),
    },
    {
      path: "/test4",
      name: "test4",
      component: _import("test/Test4"),
    },
    {
      path: "/login",
      name: "login",
      component: _import("login/Login"),
    }
  ]
})

export default router

const is_all_permission = (permissions) => {
  for (let permission of permissions) {
    if (store.state.user_permissions.indexOf(permission) == -1) {
      return false
    }
  }
  return true
}


const filter_route_item = (items) => {
  var ret_items = []
  for (let item of items) {
    if (!item.meta.permissions || is_all_permission(item.meta.permissions)) {
      let filtered_item = Object.assign({}, item)
      if (!item.children) {
        ret_items.push(filtered_item)
        continue
      }
      filtered_item.children = filter_route_item(item.children)
      if (filtered_item.children.length > 0) {
        ret_items.push(filtered_item)
      }
    }
  }
  return ret_items
}


export const init_router = () => {
  if (store.state.filtered_menu.length) {
    console.log("重复初始化路由")
    return
  }
  var filtered_menu = []
  // 如果为管理员和具有read_all权限的挂载所有
  // if (store.state.user_info.is_staff) {
  if (store.state.user_info.is_staff || store.state.user_permissions.indexOf("read_all") != -1) {
    filtered_menu = menu
  } else {
    filtered_menu = filter_route_item(menu)
  }
  if (filtered_menu.length == 0) {
    app.$alert('很抱歉 您没有权限 请联系管理员', '提示', {
      confirmButtonText: '确定',
      callback: action => {
        app.$router.push({ name: "login", query: { next_path: app.$route.fullPath } })
      }
    });
  }
  var root_router = {
    path: "/",
    name: "root",
    component: _import("layout/Layout"),
  }
  if (filtered_menu.length) {
    root_router.redirect = { "name": filtered_menu[0].name }
  }
  var routers = [{
    path: "/app/",
    name: "app",
    component: _import("layout/Layout"),
    children: filtered_menu
  }]
  routers.push(root_router)
  console.log("routers:", routers)
  router.addRoutes(routers)
  store.state.filtered_menu = filtered_menu
}

//每次路由跳转预处理
router.beforeEach((to, from, next) => {
  // 如果为测试页面直接跳转
  if (to.name && to.name.startsWith("test")) {
    next()
    return
  }
  // 如果尚未登录且访问的不是登录页面跳转到登录页面
  if (to.name != "login" && !store.state.user_info.id) {
    next({ name: "login", query: { "next_path": to.fullPath } })
    return
  }
  // 如果访问的页面不存在返回上一页 如果上一页也不存在了 跳转到根目录
  if (to.matched.length === 0) {                                                  //如果未匹配到路由
    app.$message.warning("您访问的页面不存在或没有权限 自动跳转到上一页")
    if (from.name && from.name !== "login") {
      next({ name: from.name })
      return
    }
    next("/")
    return
  }
  store.commit("reset_canceltoken")                                             //取消当前所有访问
  next()                                                                         //如果匹配到正确跳转
})
