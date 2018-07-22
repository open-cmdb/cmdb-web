import axios from "axios"

import app from "@/main"
import sso from "@/utils/sso"
import cookie from "@/utils/cookie"

import store from "@/store"

var local_token = localStorage.getItem("token")

var token = cookie.get_cookie("token")

console.log("local", local_token)
console.log(token)

if (token) {
  localStorage.setItem("token", token)
} else {
  token = localStorage.getItem("token")
}


export var baseURL = window.location.protocol + "//" + window.location.host + "/api/v1/"
// export const baseURL = process.env.NODE_ENV=="production"?window.location.protocol+"//"+window.location.host+"/api/v1/":"http://dev.work-order.hellobike.cn/api/v1/"

export const params_serializer = (params) => {
  var param_list = []
  for (let k in params) {
    if (params[k] === "" || params[k] === null) {
      continue
    }
    if (params[k] instanceof Array) {
      for (let v of params[k]) {
        param_list.push(`${k}=${v}`)
      }
      continue
    }
    if (params[k] instanceof Date) {
      var date = params[k]
      param_list.push(`${k}=${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
      continue
    }
    param_list.push(`${k}=${params[k]}`)
  }
  return param_list.join("&")
}

export const filter_out_list_empty_str = (data) => {
  var new_data = []
  for (let item of data) {
    if (item instanceof Array) {
      new_data.push(filter_out_list_empty_str(item))
      continue
    }
    if (item instanceof Object) {
      new_data.push(filter_out_empty_str(item))
      continue
    }
    if (item === "") {
      new_data.push(null)
    } else {
      new_data.push(item)
    }
  }
  return new_data
}

export const filter_out_empty_str = (data) => {
  var new_data = {};
  for (let i in data) {
    if (data[i] instanceof Array) {
      new_data[i] = filter_out_list_empty_str(data[i])
      continue
    }
    if (data[i] instanceof Object) {
      new_data[i] = filter_out_empty_str(data[i])
      continue
    }
    if (data[i] === "") {
      new_data[i] = null;
    } else {
      new_data[i] = data[i];
    }
  }
  return new_data;
}

var master = axios.create({
  baseURL: baseURL,
  timeout: 20000,
  paramsSerializer: params_serializer,
  withCredentials: true
})

master.interceptors.request.use(config => {
  config.headers.token = token
  config.cancelToken = store.state.cancel_token.token
  config.data = filter_out_empty_str(config.data)
  return config
}, error => {
  return Promise.reject(error)
})

master.interceptors.response.use(response => {
  return response
}, error => {
  if (!error.response) {
    if (axios.isCancel(error)) {
      console.log("跳转取消")
      return Promise.reject(error)
    }
    if (error.message) {
      app.$message.error(error.message)
    } else {
      app.$message.error("unknow error")
    }
    return Promise.reject(error)
  }
  if (error.response.status == 401) {
    sso.login();
    return;
  }
  var data = error.response.data
  if (data.detail) {
    app.$message.error(data.detail)
  } else {
    app.$message.error(JSON.stringify(data).slice(0, 100))
  }
  return Promise.reject(error)
})


export default master
export const master_s = master