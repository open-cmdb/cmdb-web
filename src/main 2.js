// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from "element-ui"
// import VCharts from "v-charts"
import App from './App'
import router from './router'
import store from "./store"

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'


// import '@/theme/index.css'
import 'element-ui/lib/theme-chalk/index.css';
import "font-awesome/css/font-awesome.min.css"
// import 'v-charts/lib/style.css'

import c_filters from "@/utils/filters"
import c_plugins from "@/utils/plugins"
import c_components from "@/utils/components"

Vue.config.productionTip = false

Vue.use(ElementUI)
// Vue.use(VCharts)
Vue.use(c_plugins)
Vue.use(c_components)

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )
  console.log("componentName: ", componentName)
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

const require_views_component = require.context(
  './views',
  true,
  /[A-Z]\w+\.(vue|js)$/
)

require_views_component.keys().forEach(file_name => {
  if (file_name.split("/").length != 4 || file_name.split("/")[2] != "components") {
    return
  }
  const component_config = require_views_component(file_name)
  var component_name = upperFirst(
    camelCase(
      file_name.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )
  component_name = "L" + component_name.split("Components")[0] + component_name.split("Components")[1]
  console.log("component_name", component_name)
  Vue.component(
    component_name,
    component_config.default
  )
})


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
// import ChangeUser from "@/views/user-mgmt/components/ChangeUser"

Vue.component("HistoricalRecord", HistoricalRecord)
Vue.component("DataDetail", DataDetail)
Vue.component("ChangeData", ChangeData)
Vue.component("AddData", AddData)
Vue.component("ShowTable", ShowTable)
Vue.component("DeletedDataDetail", DeletedDataDetail)
Vue.component("ChangeTable", ChangeTable)
Vue.component("DeleteTable", DeleteTable)
Vue.component("ResetPassword", ResetPassword)
// Vue.component("ChangeUser", ChangeUser)
Vue.component("ChangePassword", ChangePassword)
