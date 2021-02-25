

import Vue from "vue"

Vue.filter("storage", (value) => {
  if (!value) {
    return value
  }
  const UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB"]
  function conversion(value, unit) {
    var b = value / 1024
    if (b < 1) {
      return value.toFixed(2) + " " + UNITS[unit]
    }
    return conversion(b, unit + 1)
  }
  return conversion(value, 0)
})

Vue.filter("c_datetime", (value) => {
  return value ? value.substr(0, 16) : value
})

Vue.filter("c_timestamp", (value) => {
  if (!value) {
    return value
  }
  var date = new Date(value)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}`
})

Vue.filter('c_array_to_string', function (value) {
  if (!value) {
    return ""
  }
  if (value instanceof Array) {
    return value.join("、")
  }
  return value
})