const Generator = require('yeoman-generator');


module.exports = class extends Generator{
  prompting(){
    return this.prompt([{
      type:'input',
      name:'name',
      message:'Your project name',
      default: this.appname
    }]).then(answers => {
      this.answers = answers
    })
  }

  writing(){
    //把每一个文件都通过模版转换到目标路径
    const templates = [
      'README.md',
      'package.json',
      'public/robots.txt',
      'public/manifest.json',
      'public/logo512.png',
      'public/logo192.png',
      'public/index.html',
      'public/favicon.ico',
      'public/api/detail.json',
      'public/api/headerList.json',
      'public/api/home.json',
      'public/api/homeList.json',
      'public/api/login.json',
      'src/App.js',
      'src/index.css',
      'src/index.js',
      'src/style.js',
      'src/common/header/header.css',
      'src/common/header/index.js',
      'src/common/header/store/actionCreator.js',
      'src/common/header/store/constants.js',
      'src/common/header/store/index.js',
      'src/common/header/store/reducer.js',
      'src/pages/detail/index.js',
      'src/pages/detail/loadable.js',
      'src/pages/detail/style.css',
      'src/pages/detail/store/actionCreators.js',
      'src/pages/detail/store/constants.js',
      'src/pages/detail/store/index.js',
      'src/pages/detail/store/reducer.js',
      'src/pages/home/index.js',
      'src/pages/home/style.css',
      'src/pages/home/store/actionCreators.js',
      'src/pages/home/store/constants.js',
      'src/pages/home/store/index.js',
      'src/pages/home/store/reducer.js',
      'src/pages/home/components/List.js',
      'src/pages/home/components/Recommend.js',
      'src/pages/home/components/topic.css',
      'src/pages/home/components/Topic.js',
      'src/pages/home/components/Writer.js',
      'src/pages/login/index.js',
      'src/pages/login/style.css',
      'src/pages/login/store/actionCreators.js',
      'src/pages/login/store/constants.js',
      'src/pages/login/store/index.js',
      'src/pages/login/store/reducer.js',
      'src/pages/write/index.js',
      'src/statics/logo.png',
      'src/statics/confont/iconfont.css',
      'src/statics/confont/iconfont.eot',
      'src/statics/confont/iconfont.svg',
      'src/statics/confont/iconfont.ttf',
      'src/statics/confont/iconfont.woff',
      'src/statics/confont/iconfont.woff2',
      'src/store/index.js',
      'src/store/reducer.js'
    ];
    
    // const tmpl = this.templatePath('foo.txt');

    // //输出路径
    // const output = this.destinationPath('foo.txt');
 
    // //模版路径上下文
    // const context = {title: this.answers.name};
 
   // this.fs.copyTpl(tmpl,output,context);
    templates.forEach(item => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        {name: this.answers.name}
      )
    })
  }
}