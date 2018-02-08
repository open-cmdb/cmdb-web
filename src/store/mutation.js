import cookie  from "./cookie"

export function increment(state){
  state.count++
}
export function logout(state){
  state.is_logged = false
  cookie.set_cookie("token", "")
  cookie.set_cookie("username", "")
  state.token = ""
  state.username = ""
}

export const login = (state, data) => {
  console.log("data:", data)
  console.log("data.username:", data.username)
  cookie.set_cookie("token", "JWT "+data.token, 1)
  cookie.set_cookie("username", data.username, 1)
  state.is_logged = true
  state.token = "JWT "+data.token
  state.username = data.username
}
