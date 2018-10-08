import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from "@/components/Login"

import store from "../store"
import app from "../main.js"

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/test1',
      name: 'test1',
      component: _import('test/Test1')
    },
    {
      path: '/test2',
      name: 'test2',
      component: _import('test/Test2')
    },
    {
      path: '/test3',
      name: 'test3',
      component: _import('test/Test3')
    },
    {
      path: '/test4',
      name: 'test4',
      component: _import('test/Test4')
    },
    {
      path: '/test5',
      name: 'test5',
      component: _import('test/Test5')
    },
    {
      path: '/test6',
      name: 'test6',
      component: _import('test/Test6')
    },
    {
      path: '/',
      name: 'index',
      component: _import('layout/Layout'),
      redirect: { name: "data" },
      children: [
        {
          path: "data",
          name: "data",
          component: _import("display-data/DisplayData")
        },
        {
          path: "deleted",
          name: "deleted",
          component: _import("deleted-display/DisplayData")
        },
        {
          path: "table",
          name: "table",
          component: _import("table-mgmt/TableMgmt")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: _import("login/Login"),
    }
    // {
    //   path: "/user",
    //   component: _import("user/User"),
    //   children: [
    //     {
    //       path: "login",
    //       name: "login",
    //       component: _import("user/components/Login")
    //     }
    //   ]
    // }
  ]
})

export default router

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {                                                  //如果未匹配到路由
    router.app.$message.warning("您访问的页面不存在 自动跳转到上一级")
    from.name ? next({ name: from.name }) : next('/')                              //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  }
  else if (to.name && to.name.startsWith("test")) {
    next()
  }
  else if (to.name != "login" && !store.state.user_info.username) {
    store.state.next_path = to.fullPath
    next({ name: "login", query: { "next_path": to.fullPath } })
    return
  }
  else {
    store.commit("reset_canceltoken")                                             //取消当前所有访问
    next()                                                                         //如果匹配到正确跳转
  }
})
