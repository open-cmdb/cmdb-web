import Vue from "vue"
import Vuex from "vuex"
import  axios from "axios"

import cookie from "./cookie"
import * as mutation from "./mutation"

Vue.use(Vuex)

// var is_logged = false
// if(cookie.get_cookie("token")){
//   console.log("token:"+cookie.get_cookie("token"))
//   is_logged = true
//   console.log("is_logged:", is_logged)
// }

const store = new Vuex.Store({
  state: {
    count: 0,
    token: localStorage.getItem("token")?localStorage.getItem("token"): null,
    username: cookie.get_cookie("username"),
    loading_num: 0,
    user_info: {},
    cancel_token: axios.CancelToken.source(),
    page_size: 0,
    next: "root",
    next_path: "/",
    filtered_menu: [],
    user_permissions: []
  },
  mutations: mutation
})

export default store
