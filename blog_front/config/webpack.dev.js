
// console.log(__dirname)
// console.log(__filename)
// console.log(process.cwd())
var path=require("path")
var webpack=require("webpack")
var htmlWebpackPlugin=require("html-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
var config=require("./config.js")
module.exports = {

  // entry:{
  //   main:"./src/main.js"
  // },
  entry:"./src/main.js",
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
          use:["style-loader","css-loader"],
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
  devtool: config.dev.souceMap, //开发环境推荐
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
        filename:"index.html",//输出文件名字(注意这里devserver的使用和打包时书写不一样)
        template:config.dev.index
      }),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../src/static'),
          to: config.dev.assetsSubDirectory,
          ignore: ['.*']
        }
      ])
  ],
  devServer:{
    contentBase:config.dev.outputRoot,
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /.*/, to: path.posix.join(config.dev.outputRoot, 'index.html') },
    //   ],
    // },
    port: config.dev.port,
    host: config.dev.host,
    hot: true,
    inline:true,
    open:config.dev.autoOpenBrowser,
    watchContentBase: true,
    compress: true,
    before:config.dev.middleWare,
    proxy:config.dev.proxyTable
  }
}