const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
  grunt.initConfig({
        sass: {
            options: {
                sourceMap: true,
                implementation: sass
            },
            main: {
                files: {
                    'dist/assets/styles/main.css': 'src/assets/styles/main.scss'
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            main: {
                files: {
                    'dist/assets/scripts/main.js': 'src/assets/scripts/main.js'
                }
            }
        },
        watch: {
            js: {
                files: ['src/*.js'],
                task: ['babel']
            },
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass']
            }
        }
    })

    //自动加载所有grunt 插件任务
   // loadGruntTasks(grunt)

    grunt.registerTask('default', ['sass', 'babel', 'watch'])
    grunt.loadNpmTasks('grunt-sass')
    grunt.loadNpmTasks('grunt-babel')
}

// module.exports = grunt => {

//   // 构建任务配置
//   grunt.initConfig({

//       //读取package.json的内容，形成个json数据
//       pkg: grunt.file.readJSON('package.json'),

//       //javascript检查纠错
//       // jshint: {
//       //     all: ['Gruntfile.js', 'js/allChose.js', 'js/header.js', 'js/index.js', 'register.js', 'table.js']
//       // },

//       //压缩js
//       uglify: {
//           //文件头部输出信息
//           options: {
//               banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//           },
//           my_target: {
//               files: [
//                   {
//                       expand: true,
//                       //相对路径
//                       cwd: 'js/',
//                       src: '*.js',
//                       dest: 'dest/js'
//                   }
//               ]
//           }
//       },

//       //文件合并
//       // concat: {
//       //     option: {
//       //         separator: ';'
//       //     },
//       //     dist: {
//       //         src: ['dest/js/allChose.js', 'dest/js/header.js', 'dest/js/index.js', 'dest/js/register.js', 'dest/js/table.js'],
//       //         dest: 'dest/lib.min.js'
//       //     }
//       // },

//       //压缩css
//       cssmin: {
//           //文件头部输出信息
//           options: {
//               banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
//               //美化代码
//               beautify: {
//                   //中文ascii化，非常有用！防止中文乱码的神配置
//                   ascii_only: true
//               }
//           },
//           my_target: {
//               files: [
//                   {
//                       expand: true,
//                       //相对路径
//                       cwd: 'style/',
//                       src: '*.css',
//                       dest: 'dest/css'
//                   }
//               ]
//           }
//       },

//       //图片优化
//       imagemin: {
//           dist: {
//               files: [
//                   {
//                       expand: true,
//                       //相对路径
//                       cwd: 'style/image',
//                       src: ['*.{gif,jpg,png}'],
//                       dest: 'dest/img'

//                   }
//               ]
//           }
//       }
//   });

//   // 加载指定插件任务
//   // grunt.loadNpmTasks('grunt-contrib-jshint');
//   // grunt.loadNpmTasks('grunt-contrib-uglify');
//   // grunt.loadNpmTasks('grunt-contrib-concat');
//   // grunt.loadNpmTasks('grunt-contrib-cssmin');
//   // grunt.loadNpmTasks('grunt-contrib-imagemin');


//   loadGruntTasks(grunt)
//   // 默认执行的任务
//   grunt.registerTask('default', ['uglify', 'cssmin', 'imagemin']);

// };