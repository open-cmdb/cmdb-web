// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from "element-ui"
import VCharts from "v-charts"
import App from './App'
import router from './router'
import store from "./store"


import '@/theme/index.css'
import "font-awesome/css/font-awesome.min.css"
import 'v-charts/lib/style.css'

import c_filters from "@/utils/filters"
import c_plugins from "@/utils/plugins"
import c_components from "@/utils/components"

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(VCharts)
Vue.use(c_plugins)
Vue.use(c_components)

/* eslint-disable no-new */

var app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export default app

import HistoricalRecord from "@/views/display-data/components/HistoricalRecord"
import DataDetail from "@/views/display-data/components/DataDetail"
import ChangeData from "@/views/display-data/components/ChangeData"
import AddData from "@/views/display-data/components/AddData"
import ShowTable from "@/views/display-data/components/ShowTable"
import DeletedDataDetail from "@/views/deleted-display/components/DeletedDataDetail"
import ChangeTable from "@/views/table-mgmt/components/ChangeTable"
import DeleteTable from "@/views/table-mgmt/components/DeleteTable"
import ResetPassword from "@/views/user/components/ResetPassword"
import ChangePassword from "@/views/user/components/ChangePassword"
import ChangeUser from "@/views/user-mgmt/components/ChangeUser"

Vue.component("HistoricalRecord", HistoricalRecord)
Vue.component("DataDetail", DataDetail)
Vue.component("ChangeData", ChangeData)
Vue.component("AddData", AddData)
Vue.component("ShowTable", ShowTable)
Vue.component("DeletedDataDetail", DeletedDataDetail)
Vue.component("ChangeTable", ChangeTable)
Vue.component("DeleteTable", DeleteTable)
Vue.component("ResetPassword", ResetPassword)
Vue.component("ChangeUser", ChangeUser)
Vue.component("ChangePassword", ChangePassword)
