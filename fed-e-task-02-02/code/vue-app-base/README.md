# vue-app-base

1. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
2. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
3. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
4. 尽可能的使用上所有你了解到的功能和特性

编写webpack的配置，来指定一些打包的配置项。
配置文件的名称，默认就webpack.config.js，放到vue-app-base的根目录
六个核心概念：
Entry，入口，这是Webpack执行构建的第一步，可理解为输入。
Module，模块，在Webpack中一切皆模块，一个模块即为一个文件。Webpack会从Entry开始递归找出所有的依赖模块。
Chunk，代码块，一个Chunk由多个模块组合而成，它用于代码合并与分割。
Loader，模块转换器，用于将模块的原内容按照需求转换成新内容。
Plugin，扩展插件，在Webpack构建过程的特定时机注入扩展逻辑，用来改变或优化构建结果。
Output，输出结果，源码在Webpack中经过一系列处理后而得出的最终结果。


entry，指定了模块的入口，它让源文件加入构建流程中被webpack控制。
output，配置如何输出最终的代码结果。
module，配置各种类型的模块的处理规则和解析策略。
rosolve，配置webpack寻找模块的规则。
plugin，配置扩展插件，扩展webpack的更多功能。
devServer，配置DevServer，实现本地http服务、模块热替换、source map调试等。

