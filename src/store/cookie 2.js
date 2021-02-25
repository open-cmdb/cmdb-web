

var set_cookie = (name, value, valid_time=1) => {
  var date = new Date()
  date.setTime(date.getTime()+valid_time*24*3600*1000)
  document.cookie = name+"="+value+";expires="+date.toString()
}

var get_cookie = (name) => {
  var cookies = document.cookie.split("; ")
  for(let i of cookies){
    var name_value = i.split("=")
    if(name==name_value[0]){
      return name_value[1]
    }
  }
}

export default {
  set_cookie,
  get_cookie
}
