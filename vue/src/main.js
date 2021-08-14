import { createApp } from "vue"
import jsCookie from "js-cookie"

import App from "./App.vue"
import router from "./router"
import store from "./assets/js/store"

import Http from "./assets/js/fetch"

// elementUI
import ElementPlus from "element-plus"
import "element-plus/lib/theme-chalk/index.css"

// 重置全局样式
import "./assets/css/reset.css"

// 全局组件
import component from "./assets/js/component"

// 字段加密
import { encrypt } from "./assets/js/JSEncrypt"

const app = createApp(App)
// 挂载全局
app.config.globalProperties.$Cookies = jsCookie
app.config.globalProperties.$Http = Http
app.config.globalProperties.$encrypt = (data) => encrypt(data)

app.use(store).use(router)
app.use(ElementPlus).use(component)
app.mount("#app")
