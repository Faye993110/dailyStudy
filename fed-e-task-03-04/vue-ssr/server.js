//const Vue = require('vue')
const express = require('express')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const setupDevServer = require('./build/setup-dev-server')

const isProd = process.env.NODE_ENV === 'production'
const templatePath = './index.template.html'

//创建一个server实例
const server = express()
//当请求/dist路径下时，使用中间件，来dist目录下来查找静态资源
//express.static 是处理物理磁盘中的文件
server.use('/dist', express.static('./dist'))

let renderer
let onReady

//得到一个渲染器

// 生产模式，直接基于已构建好的包创建渲染器
if (isProd) {
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const template = fs.readFileSync('./index.template.html', 'utf-8')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false, // 推荐
    template, // (可选)页面模板
    clientManifest, // (可选)客户端构建 manifest
  })
} else {
  // 开发模式
  // 打包构建(客户端 + 服务端)
  // ↓
  //创建渲染器
  //模板 + 客户端 bundle + 服务端 bundle
  //改变 -> 从新生成渲染器
  //源码改变 -> 打包客户端 Bundle + 服务端 Bundle
  //onReady 是一个 Promise,当它完成的时候意味着初始构建已完成
  // onReady = require('./build/setup-dev-server')(
  //   app,
  //   templatePath,
  //   (serverBundle, options) => {
  //     // 该回调函数是重复调用的
  //     // 每当生成新的 template、客户端 bundle、服务端 bundle 都会重新生成新的渲染器
  //     renderer = createBundleRenderer(serverBundle, {
  //       runInNewContext: false, // 推荐
  //       ...options,
  //     })
  //   }
  // )

  // 开发模式 -> 监视打包构建 -> 重新生成 Renderer 渲染器
  onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
    renderer = createBundleRenderer(serverBundle, {
      template,
      clientManifest,
    })
  })
}

const render = async (req, res) => {
  //const context = { url: req.url }
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦!
  // bundle renderer 在调用 renderToString 时，
  // 它将自动执行「由 bundle 创建的应用程序实例」所导出的函数(传入上下文作为参数)，然后渲染它。
  try {
    const html = await renderer.renderToString({
      title: '拉勾教育',
      meta: `
        <meta name="description" content="拉勾教育">
      `,
      url: req.url,
    })
    res.send(html)
  } catch (err) {
    res.status(500).end(err.message)
  }
}

//设置一些路由

server.get(
  '*',
  isProd
    ? render // 生产模式:使用构建好的包直接渲染
    : async (req, res) => {
        // 开发模式:等编译构建好再渲染
        await onReady
        render(req, res)
      }
)

server.listen(3000, () => {
  console.log('Server running at port 3000')
})
