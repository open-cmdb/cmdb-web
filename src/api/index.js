import axios from "axios"
import router from "../router"
import store from "@/store"

import app from "@/main"

var master = axios.create({
  baseURL: "http://cmdb.mingmingt.xyz/api/v1/",
  timeout: 5000,
})

master.interceptors.request.use(config => {
  console.log("primary.interceptors.request.use")
  console.log(config)
  if(store.state.is_logged){
    console.log("add authoriztion:", store.state.token)
    config.headers.Authorization = store.state.token
  }
  return config
}, error => {
  console.log("request error")
  return Promise.reject(error)
})

master.interceptors.response.use( response => {
  return response
}, error => {
  console.log("interceptors:")
  console.log(error.response)
  if (error.response) {
    if(error.response.status == 400){
      return Promise.reject(error)
    }else if(error.response.status == 401){
      app.$confirm('是否前往登录', '尚未登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
        center: true
      }).then(() => {
        console.log("app.$router.path")
        console.log(app.$route.path)
        app.$router.push({name: "login", query: {next: app.$route.fullPath}})
      })
      return
    }else if(error.response.status == 403){
      if(error.response.data.detail == "Signature has expired." || "Error decoding signature." == error.response.data.detail ){
        app.$confirm('是否前往登录', '登录过期', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
          center: true
        }).then(() => {
          app.$router.push({name: "login", params: {next: app.$router.path}})
        })
        return
      }
      app.$message({
        message: "没有权限",
        type: "warning"
      })
      return
    }else{
      app.$message.error("后台错误:"+error.response.status)
      console.log(error.response.status, ":", error.response.data)
      return
    }
  } else {
    console.log('Error', error.message);
  }
  console.log(error.config);
  app.$message.warning("未知错误")
})

export default master
