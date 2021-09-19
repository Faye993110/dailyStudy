const path = require('path')

module.exports = {
  mode: 'none',
  entry: './src/main.css',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    //其他模块加载s的规则
    rules: [
      {
        test: /.css$/,
        //多个loader， 执行顺序是从后往前
        use: [
          'style-loader', //把css loader 执行的结果，以style标签的形式插入到页面中
          'css-loader',
        ],
      },
    ],
  },
}
