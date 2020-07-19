简答题
1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。
答：工程化是为了解决在开发中面临的问题，例如：想要使用ES6，但兼容性有问题；想要使用sass/less增强css的编程性，但是运行环境不能直接支持；想要使用模块化的方式提高项目的可维护性，但运行环境不能支持；部署上线前需要手动压缩代码以及资源文件部署过程需要手动上传代码到服务器；无法多人协作开发统一代码风格；有些功能需要等到后端接口完成才能开发等等。
总结就是：
·传统语言或语法的弊端 ；
·无法使用模块化/组件化
·重复的机械式工作
·代码风格统一、质量保证
·依赖后端服务接口支持
·整体依赖后端项目

公司现在做的这个项目，在没有重构之前，遇到很多问题，比如多人协作困难，因为代码模块化不清晰，版本管理困难；还会遇到前端开发不能独立进行，过度依赖后台接口，前后端没有分离，代码在一个大项目里面；以及代码重复使用率高；在使用前端工程化之后，上述问题都得到改善。

2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？
答：还可以提供项目项目规范和约定；
用来解决创建项目的过程中：
·相同的组织结构、
·相同的开发范式
·相同的模块依赖
·相同的工具配置
·相同的基础代码

编程题
1、概述脚手架实现的过程，并完成一个自定义的小型脚手架工具（老师这里我读题不清楚，没用node js， 直接用了yeoman generator）
实现代码见：

开发脚手架之前的理解：
yoman就像一个脚手架运行平台，通过yoman搭配不同的generator去创建任何类型的项目，也就是说我们可以创建自己的generator从而去定制自己的前端脚手架。

实现过程：
1）明确自己的需求
2）找到合适的Generator,全局安装，通过yo运行对应的Generator 
3）通过命令行填写交互选项
4）生成所需的项目结构

作业code文件夹为：generator-faye-react
https://github.com/Faye993110/dailyStudy/tree/master/fed-e-task-02-01/code/generator-faye-react
在这里我实现了一个可以生成一个基础网页的react项目，项目里面的store以及reducer都是自动建好的，可以直接后续使用。

2、尝试使用 Gulp 完成项目的自动化构建

1)在项目中安装gulp的项目依赖 ：yarn add gulp --dev
2)样式编译，使用到gulp-sass 插件，这里需要注意的是node-sass模版，可以使用淘宝镜相进行安装
3)脚本编译,使用到gulp-babel插件，要额外安装@babel/core, @babel/preset-env,并进行相应的配置
4）页面模版编译，安装gulp-swig插件，这里需要传入data，来代替模版中的数据，
5）图片和文字转换，安装gulp-imagemin
6)文件清除，引用del 模块
7）引用gulp-load-plugins插件，自动加载插件，这样不用每个模块编译都手动安装
8）热更新开发服务器，引用browser-sync
9）使用useref 来处理文件引用的问题

代码为：gulpfile.js

https://github.com/Faye993110/dailyStudy/blob/master/fed-e-task-02-01/code/pages-boilerplate/gulpfile.js
//就是把老师的写的自己跑了一遍

3、使用 Grunt 完成项目的自动化构建
1)在grunt.initConfig里面加构建任务
https://github.com/Faye993110/dailyStudy/blob/master/fed-e-task-02-01/code/pages-boilerplate/gruntfile.js
代码为gruntfile.js


2-3 题项目基础代码下载地址：

百度网盘：https://pan.baidu.com/s/1AyGApMTFEfCeGfQBdykOGg 提取码: bw3r

说明：
本次作业中的编程题要求大家完成相应代码后（二选一）

1.  简单录制一个小视频介绍一下实现思路，并演示一下相关功能。

2.  提交一个项目说明文档，要求思路流程清晰。

最终将录制的视频或说明文档和代码统一提交至作业仓库。s
