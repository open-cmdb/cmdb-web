import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from "@/components/Login"

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
      path: '/',
      name: 'index',
      component: _import('layout/Layout'),
      children: [
        {
          path: "main",
          name: "main",
          component: _import("display-data/DisplayData")
        }
      ]
    },
    {
      path: "/user",
      component: _import("user/User"),
      children: [
        {
          path: "login",
          name: "login",
          component: _import("user/components/Login")
        },
        {
          path: "registry",
          name: "registry",
          component: _import("user/components/Registry")
        }
      ]
    }
  ]
})

export default router

router.beforeEach((to, from, next) => {
  next()
})
