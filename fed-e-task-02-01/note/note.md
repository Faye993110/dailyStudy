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
```
  prompting(){
    //Yeoman在询问用户环境自动调用此方法
    //在此方法中可以调用父类的prompt（）方法发出对用户命令的询问
    //这个方法返回一个promise
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname  //appname 为项目生成目录名称
    }]).then(answers => {
      //answer => {name: 'user input value'}
      this.answers = answers;
    })
  }
  ```

  创建一个脚手架过程
  1、选取一个项目，创建理想的项目结构，里面把自己需要重复使用的代码包含在里面 
  2、封装一个全新的generator，去生成我们的这样一个理想的项目结构,参考generator-faye-react
  3、打来文件夹generator-faye-react,运行yarn init, 初始化一个package.json文件
  4、安装一下yeoman的依赖，yarn add yeoman-generator
  5、新建一个generator的主入口文件，也就是项目文件夹下新建generators/app/index.js, 主要是prompting（）方法接收用户输入；writing（）方法写入项目templates
  6、在app 文件下面新建一个文件，templates，存放我们之前准备好的项目结构，作为模版
  7、在模版文件里面，我们把需要会变动的地方，通过我们的模版引擎去‘挖坑’，例如将项目名称替换为：<%= name %>
  8、编写index.js文件
  9、执行yarn link
  10、新建目录，运行 yo faye-react
  11、执行成功，如果在自己的templates中有用到ejs模版命令，在百分号之前添加%进行转义即可，例如： <%%= BASE_URL %>就不会有问题了



