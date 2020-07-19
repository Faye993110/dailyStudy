// 实现这个项目的构建任务


// exports.foo = done => {
//   console.log('foo task working~');
//   done() //标识任务完成
// }


// exports.default = done => {
//   console.log('default task working');
//   done();
// }

// //gulp 4.0 以前, 不被推荐
// const gulp = require('gulp');

// gulp.task('bar', done => {
//   console.log('bar working~');
//   done();
// })

const {src, dest, parallel, series, watch} = require('gulp')

//del ， 可以在做构建之前删除dist文件
const del = require('del')

//插入插件，自动化加载插件
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()

//热更新开发服务器
const browserSync = require('browser-sync')
const bs = browserSync.create()

//const sass = require('gulp-sass')
// const babel = require('gulp-babel') 
// const swig = require('gulp-swig')
// const imagemin = require('gulp-imagemin')

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

const clean = () => {
  return del(['dist','temp'])
}

const style = () => {
  return src('src/assets/styles/*.scss',{ base: 'src' })
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

const script = () => {
  return src('src/assets/scripts/*.js',{ base: 'src' })
    .pipe(plugins.babel({presets:['@babel/preset-env']}))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

const page = () => {
  return src('src/**.html',{ base: 'src' })
    .pipe(plugins.swig({data, defaults: { cache: false }}))// 防止模板缓存导致页面不能及时更新
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const extra = () => {
  return src('public/**', { base: 'public' })
    .pipe(dest('dist'))
}

const serve = () => {
  //watch监视文件变化
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/*.html', page)
  // watch('src/assets/images/**', image)
  // watch('src/assets/fonts/**', font)
  // watch('public/**', extra)
  //开发期间监视images/fonts/public 没有意义，增加构建开销
  //一旦资源有更新，就会重新reload
  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ], bs.reload)

  bs.init({
    // notify: false,
    // port: 2080,
    // open: false,
   // files: 'dist/**',  //监听的文件目录， 添加了 .pipe(bs.reload({ stream: true }))，就不用file了
    server: {
      //按照顺序请求文件
       baseDir: ['temp', 'src', 'public'],
      // routes: {
      //   '/node_modules': 'node_modules'
      // }
      routes: {//请求制定到这里
        '/node_modules': 'node_modules'
      }
    }
  })
}

//
const useref = () => {
  //读写流冲突，需要放在不同的文件下
  return src('temp/*.html', { base: 'temp' })
    .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
    //压缩  html js css
    //安装插件
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      //html 需要指定额外的压缩规则， 可以参考文档
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    })))
    .pipe(dest('dist'))
}

const compile = parallel(script, page)

// 上线之前执行的任务
const build =  series(
  clean,
  parallel(
    series(compile, useref),
    image,
    font,
    extra
  )
)

const develop = series(compile, serve)

module.exports = {
  clean,
  build,
  develop
}