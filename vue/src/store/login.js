import Cookies from "js-cookie"
import router from "../router"

const state = {
  isAuthenticated: JSON.parse(Cookies.get(`isAuthenticated`) || "false"),
  userInfo: JSON.parse(Cookies.get(`userInfo`) || "{}"),
}
const actions = {}

const mutations = {
  setUserInfo(state, data) {
    Cookies.set("userInfo", JSON.stringify(data))
    state.userInfo = data
  },

  setToken(state, data) {
    if (!data) return
    Cookies.set("isAuthenticated", !!data)
    state.isAuthenticated = !!data
    router.push({ path: "/" })
  },

  goFindPwd(state, data) {
    router.push({ path: "/goFindPwd" })
  },

  goBackLogin(state, data) {
    router.push({ path: "/login" })
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
