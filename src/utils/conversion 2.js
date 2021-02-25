


const install = (Vue, options=null)=>{
  Vue.c_flow_conversion = (flow)=>{
    const UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB"]
    function conversion(flow, unit){
      var b = flow/1024
      if(b<0){
        return flow.toFixed(2) + UNITS[unit]
      }
      conversion(b, unit+1)
    }
    return conversion(flow, 0)
  }
}
