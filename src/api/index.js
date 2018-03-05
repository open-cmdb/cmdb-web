import axios from "axios"
import router from "../router"
import store from "@/store"

import app from "@/main"

export var baseURL = window.location.protocol + "//" + window.location.host + "/api/v1/"

var master = axios.create({
  // baseURL: "http://cmdb.mingmingt.xyz/api/v1/",
  baseURL: baseURL,
  timeout: 5000,
})

export default master

export var master_s = axios.create({
  // baseURL: "http://cmdb.mingmingt.xyz/api/v1/",
  baseURL: baseURL,
  timeout: 5000,
})



master.interceptors.request.use(config => {
  if(store.state.is_logged){
    console.log("config:", config)
    if(config.data){
      for(let i in config.data){
        if(config.data[i]==""){
          delete config.data[i]
        }
      }
    }
    config.headers.Authorization = store.state.token
  }
  return config
}, error => {
  return Promise.reject(error)
})

master.interceptors.response.use( response => {
  return response
}, error => {
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
        app.$router.push({name: "login", query: {next: app.$route.fullPath}})
      })
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
    }
  }
  return Promise.reject(error)
})


master_s.interceptors.request.use(config => {
  if(store.state.is_logged){
    config.headers.Authorization = store.state.token
  }
  return config
}, error => {
  return Promise.reject(error)
})

master_s.interceptors.response.use( (response) => {
  console.log("interceptors response")
  return response
}, error => {
  console.log("interceptors error")
  if (error.response) {
    if(error.response.status == 400 || error.response.status == 404){
      console.log("400 404:", error.response.data)
      if(error.response.data.detail){
        console.log("detail")
        app.$message.error(error.response.data.detail)
      }else{
        app.$message.error(error.response.data)
      }
    }else if(error.response.status == 401){
      app.$confirm('是否前往登录', '尚未登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
        center: true
      }).then(() => {
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
    }
    return Promise.reject(error)
  }
  if(error.message){
    app.$message.error(error.message)
  }else{
    app.$message.error(error)
  }
  return Promise.reject(error)
})

