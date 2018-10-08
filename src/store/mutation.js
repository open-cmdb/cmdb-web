import axios from "axios"
import cookie from "./cookie"

export function increment(state) {
  state.count++
}
export function logout(state) {
  // state.is_logged = false
  // cookie.set_cookie("token", "")
  // cookie.set_cookie("username", "")
  // state.token = ""
  // state.username = ""
  state.user_info = {}
  state.token = null
  localStorage.removeItem("token")
}

export const login = (state, data) => {
  state.token = "JWT " + data.token
}

export function reset_canceltoken(state) {
  state.cancel_token.cancel("跳转取消")
  state.cancel_token = axios.CancelToken.source()
}
