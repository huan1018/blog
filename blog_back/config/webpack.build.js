
// console.log(__dirname)
// console.log(__filename)
// console.log(process.cwd())
var path=require("path")
var webpack=require("webpack")
var htmlWebpackPlugin=require("html-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin') 
var config=require("./config.js")
module.exports = {

  // entry:{
  //   main:"./src/main.js"
  // },
  entry:config.build.entry,
  output:{
    path:config.build.outputRoot,
    filename:config.build.output+"/[name].js",
    publicPath:config.dev.assetsPublicPath, 
    chunkFilename: config.build.output+"/components/[id][name][hash].js"  //异步加载文件的存储路径和文件名
  },
  module:{
      rules:[
        {
          test:/\.js$/,
          use:[{
            loader:"babel-loader",
            options:config.babel
          }],
        },
        {
          test:/\.vue$/,
          use:["vue-loader"],
        },
        {
          test:/\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          }),
        },
        {
          test:/\.(jpg|png|gif)$/,
          use:["url-loader"],
        },
        {
          test:/\.html$/,
          use:["html-loader"],
        }
      ]
  },
  resolve: {
    extensions: ['.js', '.vue'],//省略后缀名
    alias: {
        "vue": "vue/dist/vue.js"
    }
  },
  devtool: config.build.souceMap,
  // "cheap-module-eval-source-map", //开发环境推荐
  // cheap-source-map生产环境推荐
  plugins:[
      new webpack.optimize.CommonsChunkPlugin({
        name: "common",
        filename: config.build.output+"/common/common.js"
      }),
      // new webpack.optimize.UglifyJsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new htmlWebpackPlugin({
        // path: ,//输出文件路径
        filename:"index.html",//输出文件名字
        template:config.build.index,
        minify:config.build.htmlMinify
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../src/static'),
          to: config.build.assetsSubDirectory,
          ignore: ['.*']
        },
        {
          from: path.resolve(__dirname, 'server.js'),
          to: path.resolve(config.build.outputRoot, 'server.js')
        }
      ]),
      // 压缩js
      new UglifyJsPlugin({
       
        uglifyOptions: {
          include: /\/src/,
          compress: {
            warnings: false
          },
          sourceMap:config.build.uglifyJsSourceMap,
          parallel: true   //使用多进程并行运行和文件缓存来提高构建速度
        },
      }),
      // 提取css
      new ExtractTextPlugin({
        filename: 'css/[name].[contenthash].css',
        allChunks: true,
      })
  ]
}