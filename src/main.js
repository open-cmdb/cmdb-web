// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import store from "./store"

Vue.config.productionTip = false

Vue.use(ElementUI)

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
Vue.component("ResetPassword", ResetPassword)
Vue.component("ChangeUser", ChangeUser)
Vue.component("ChangePassword", ChangePassword)
