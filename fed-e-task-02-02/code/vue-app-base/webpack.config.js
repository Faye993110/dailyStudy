
const path = require('path')
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  entry: path.join(__dirname, "src/main.js"),
  output: {
    filename: "boundle.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        loader: "css-loader",
      },
     {
        test: /.less$/, // 通过正则表达式匹配所有以.css后缀的文件
        use: [ // 要使用的加载器，这两个顺序一定不要乱; 配置了多个属性时，是从后往前执行
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test:/\.js$/, //用正则匹配文件，用require或者import引入的都会匹配到
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        },
        exclude:/node_modules/ //排除node_modules目录，我们不加载node模块中的js
      },
      {
        test:/.png$/,
        use:'file-loader',
        use: {
          loader: 'url-loader',
          options:{
            esModule: false,
            limit: 100*1024 
          }
        }
      },
    ],
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hello World app',
      template: path.resolve(__dirname,'./public','index.html')
    })
  ],
};