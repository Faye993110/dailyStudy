const modulesFiles = require.context("@/components", true, /.vue$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^.\/(.*)\.vue/, "$1")
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const subGroup = {
  install: (Vue) => {
    for (const [key, val] of Object.entries(modules)) {
      Vue.component(key, val)
    }
  }
}

export default subGroup
