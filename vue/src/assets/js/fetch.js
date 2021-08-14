import axios from "axios"
import Cookies from "js-cookie"

const Http = axios.create({
  timeout: 5000,
  baseURL: process.env.VUE_APP_BASE_API,
  headers: { "Content-Type": "application/json" },
})

// 请求拦截器
Http.interceptors.request.use(
  (config) => {
    let userInfo = JSON.parse(Cookies.get(`userInfo`) || "{}")
    if (userInfo) config.headers["Authorization"] = userInfo.token
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
Http.interceptors.response.use(
  (response) => {
    // do something...
    return response
  },
  (error) => Promise.reject(error)
)

export default Http
