
import Vue from "vue"



import CInputList from "@/components/InputList"
import CExport from "@/components/Export"
import CSearch from "@/components/Search"
import CPagination from "@/components/Pagination"
import COptionBar from "@/components/OptionBar"
import CDateRangeFilter from "@/components/DateRangeFilter"
import CNumberRangeFilter from "@/components/NumberRangeFilter"
import CDateFilter from "@/components/DateFilter"
import CSelect from "@/components/c-select/select"

const install = function (Vue, options) {
  Vue.component("CInputList", CInputList)
  Vue.component("CExport", CExport)
  Vue.component("CSearch", CSearch)
  Vue.component("COptionBar", COptionBar)
  Vue.component("CDateFilter", CDateFilter)
  Vue.component("CDateRangeFilter", CDateRangeFilter)
  Vue.component("CNumberRangeFilter", CNumberRangeFilter)
  Vue.component("CSelect", CSelect)
}

export default {
  install,
}
