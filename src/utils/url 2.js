


const get_para = (name) => {
  var l = window.location.href.split("?")
  if(l.length == 1){
    return undefined
  }
  var ret = {}
  var l_2 = l[1].split("&")
  for (let k_v of l_2){
    let l_3 = k_v.split("=")
    ret[l_3[0]] = l_3[1]
  }
  console.log("ret:", ret)
  return ret[name]
}

export default {
  get_para
}
