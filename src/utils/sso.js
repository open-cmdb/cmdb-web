
import axios from "axios"
import app from "@/main"

const check_token = (token=null) => {
  return axios.post('http://sso.hellobike.cn/service/checkToken', {
    token: token ? token : app.$route.query.token,
    userAgent: navigator.userAgent
  })
}

const logout = (token=null) => {
  window.open(`http://sso.hellobike.cn/?redirect_url=${window.location.href}`, name="_self")
  // return axios.post('http://sso.cheyaoshi.com/service/logout', {
  //   token: token ? token : app.$route.query.token,
  //   userAgent: navigator.userAgent
  // })
}

const login = () => {
  window.open(`http://sso.hellobike.cn/?redirect_url=${window.location.href}`, name="_self")
}




export default {
  check_token,
  login,
  logout
}
