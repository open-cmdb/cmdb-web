import Vue from "vue"
import Vuex from "vuex"

import cookie from "./cookie"
import * as mutation from "./mutation"

Vue.use(Vuex)

var is_logged = false
if(cookie.get_cookie("token")){
  console.log("token:"+cookie.get_cookie("token"))
  is_logged = true
  console.log("is_logged:", is_logged)
}


const store = new Vuex.Store({
  state: {
    count: 0,
    is_logged: is_logged,
    token: cookie.get_cookie("token"),
    username: cookie.get_cookie("username")
  },
  mutations: mutation
})

export default store
