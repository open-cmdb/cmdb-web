
import Vue from "vue"
import master from "@/api"
import store from "@/store"

import COptionBar from "@/components/OptionBar"
import CCartPanel from "@/components/CartPanel"
import axios from "axios/index";

const install = function (Vue, options) {
  Vue.component("COptionBar", COptionBar)
  // Vue.component("CCreateFilter", CCreateFilter)
  Vue.component("CCartPanel", CCartPanel)

  Vue.prototype.$c_add_dialog = (parent, name, props = {}) => {
    var Comp = Vue.component(name)
    var vm = new Comp({ propsData: props })
    vm.$mount()
    parent.$el.appendChild(vm.$el)
    return vm
  }
  Vue.prototype.g_add_dialog = (name, props = {}) => {
    var Comp = Vue.component(name)
    var vm = new Comp({ propsData: props })
    vm.$mount()
    document.body.appendChild(vm.$el)
    return vm
  }
  Vue.prototype.$c_master = master
  Vue.prototype.$c_ajax_get = (self, get_count = false, callback = null) => {
    store.commit("reset_canceltoken")
    self.loading = true
    master.request({
      url: self.url,
      method: "get",
      params: self.params
    }).then((response) => {
      self.loading = false
      self.data = response.data.results
      if (!get_count) {
        self.count = response.data.count
      }
      if (callback) {
        callback()
      }
    }).catch((error) => {
      if (axios.isCancel(error)) {
        return
      }
      self.loading = false
    })
    if (get_count) {
      self.page_loading = true
      master.request({
        url: self.url + "/count",
        method: "get",
        params: self.params,
        cancelToken: store.state.cancel_token.token
      }).then((response) => {
        self.page_loading = false
        self.count = response.data.count
      }).catch((error) => {
        self.page_loading = false
      })
    }
  }

  Vue.prototype.$date_to_string = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }
  Vue.prototype.$c_dt_to_string = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }
  Vue.prototype.$c_calc_page_size = (line_height = 49, other_height = 350, mini = 7) => {
    var page_size = Math.floor((window.innerHeight - other_height) / line_height)
    return page_size > mini ? page_size : mini
  }
  Vue.prototype.$get_day_start = (day_ago) => {
    var datetime = new Date()
    datetime.setTime(datetime.getTime() - 3600 * 1000 * 24 * day_ago)
    return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate(), 0, 0, 0)
  }

  Vue.prototype.$get_day_end = (day_ago) => {
    var datetime = new Date()
    datetime.setTime(datetime.getTime() - 3600 * 1000 * 24 * day_ago)
    return new Date(datetime.getFullYear(), datetime.getMonth(), datetime.getDate(), 23, 59, 59)
  }

  Vue.prototype.$c_month_mobile = (count) => {
    var MAP = {
      1: 31,
      2: 28,

    }
  }
  Vue.prototype.$c_get_page_size = (line_height = 49, other_height = 321, mini = 8) => {
    var page_size = Math.floor((window.innerHeight - other_height) / line_height)
    return page_size > mini ? page_size : mini
  }
}

export const g_calc_page_size = (line_height = 49, other_height = 340, mini = 8) => {
  var page_size = Math.floor((window.innerHeight - other_height) / line_height)
  return page_size > mini ? page_size : mini
}



export default {
  install,
}
