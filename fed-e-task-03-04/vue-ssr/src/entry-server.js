/**
 * 服务端启动入口
 */
import { createApp } from './app'
export default async (context) => {
  const { app, router, store } = createApp()

  const meta = app.$meta()

  // set server-side router's location
  router.push(context.url)

  context.meta = meta

  // wait until router has resolved possible async components and hooks
  await new Promise(router.onReady.bind(router))
  // const matchedComponents = router.getMatchedComponents()

  context.rendered = () => {
    // 在应用渲染完成以后，服务端 Vuex 容器中已经填充了状态数据
    // 这里手动的把容器中的状态数据放到 context 上下文中
    // Renderer 在渲染页面模板的时候会把 state 序列化为字符串串内联到页面中 // window.__INITIAL_STATE__ = store.state
    context.state = store.state
  }
  return app
}
