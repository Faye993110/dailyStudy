//generator 的核心入口
//需要导出一个继承自Yeoman Generator 的类型
//Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法
//在这些方法中可以调用父类提供的一些工具方法实现一些功能

const Generator = require ('yeoman-generator');

module.exports = class extends Generator{
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


  writing(){
    //yeoman在生成文件的时候自动调用这个方法
    //尝试在项目中写入文件
   // this.fs.write(this.destinationPath('temp.txt'),Math.random().toString());

   //通过模版方式写入文件到目标目录

   //模版文件路径
   //this.templatePath 自动获取当前目录下templates下的文件路径
   const tmpl = this.templatePath('foo.txt');

   //输出路径
   const output = this.destinationPath('foo.txt');

   //模版路径上下文
   const context = {title: this.answers.name};

   this.fs.copyTpl(tmpl,output,context);
  }
}

