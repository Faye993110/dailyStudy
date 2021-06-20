/**
 * 同构应用通用的启动入口
 */

import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import VueMeta from 'vue-meta'

//注册插件
Vue.use(VueMeta)
Vue.mixin({
  metaInfo: {
    titleTemplate: '%s - 拉勾教育',
  },
})

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    store,
    // 将 router 挂载到根实例
    router,
    // 根实例简单的渲染应用程序组件。
    render: (h) => h(App),
  })
  return { app, router, store }
}
