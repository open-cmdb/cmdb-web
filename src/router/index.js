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
      children: [
        {
          path: "",
          name: "main",
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
        },
        {
          path: "user",
          name: "user",
          component: _import("user-mgmt/UserMgmt")
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
        }
      ]
    }
  ]
})

export default router

router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  // console.log(next)
  // if(!router.app.$store.state.is_logged){
  //   console.log("new login")
  //   login_vue = Login()
  //   login_vue.$mount()
  //   document.body.appendChild(login_vue.$el)
  // }

  // var Profile = Vue.extend({
  //   template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  //   data: function () {
  //     return {
  //       firstName: 'Walter',
  //       lastName: 'White',
  //       alias: 'Heisenberg'
  //     }
  //   }
  // })

  // var Profile = Vue.extend(require("@/views/test/components/Dialog2.vue"))
  //
  // // console.log(Vue.component("el-dialog"))
  //
  // setTimeout(()=>{
  //   var Dialog1 = Vue.component("dialog1")
  //   var dialog = new Dialog1()
  //   console.log("dialog", dialog)
  //   dialog.$mount()
  //   console.log(dialog.$el)
  //   console.log(router.app.$el)
  //   router.app.$el.appendChild(dialog.$el)
  //   console.log("dialog parent:", dialog.$parent)
  //   // setTimeout( () => {
  //   //   router.app.$el.removeChild(dialog.$el)
  //   //   dialog.$destroy()
  //   //   console.log("dialog", dialog)
  //   // }, 3000)
  // }, 100)
  next()
})
