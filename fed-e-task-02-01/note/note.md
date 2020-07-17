Yemon 的基本使用：
1、在全局范围安装yo 

```
npm install yo --global or yarn global add yo
```
2、安装对应的generator
```
npm install generator-node --global
```
3、通过yo运行generator
```
cd /project-name
yo node
```

2、可以自定义generator来建立适合自己的脚手架工具

    generator 本质上就是一个npm模块，创建Generator就是创建一个npm模块
generator 基本结构
```
|- generators/  ..............生成器目录
|   |_ app/  .................默认生成器目录
|      |_ index.js ...........默认生成器实现
|- package.json ..............模块包配置文件
```
模块名称必须是 generator-\<name> 的形式
1、新建一个目录为generator-sample 文件
2、cd generator-sample, yarn init
3、yarn add yeoman-generator
4、创建generator的基本项目结构（即按照上述结构，创建文件）
5、yarn link  ，将这个模块链接到全局，使之成为一个模块包
6、打开一个新的项目文件目录 /my-prj
7、运行 yo sample

相对于手动创建每一个文件，模版大大提高了效率，特别在文件比较多比较复杂的情况下

接收用户输入



