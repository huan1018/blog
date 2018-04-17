var path = require('path')

module.exports = {
  build: {
    outputRoot:path.join(__dirname,"../dist"),  //打包文件夹根目录
    entry:'./src/main.js',
    index: path.resolve(__dirname, '../src/index.html'), //入口html的地址
    output:"js",  //输出打包文件地址
    assetsSubDirectory: 'static', //静态文件拷贝路径，注意这里使用相对output文件夹的目录名(dist/js)
    assetsPublicPath: '/',
    // html的压缩
    htmlMinify: {
      removeComments: true,          //去除注释
      collapseWhitespace: true,     //去除空格
      removeAttributeQuotes: true,   //移除属性的引号
      removeEmptyAttributes:true,    //去除空属性
    },
    souceMap: false,
    uglifyJsSourceMap:false,
    
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    outputRoot:path.join(__dirname,"../dist"),  //
    entry:'./src/main.js',
    index: path.resolve(__dirname, '../src/index.html'), //入口html的地址
    output:"js",  //输出
    port: 8080,
    host:"localhost",
    autoOpenBrowser: true,
    assetsSubDirectory: 'static', //静态文件拷贝路径，注意这里使用相对dist文件夹的目录名
    assetsPublicPath: '/',
    souceMap:"cheap-module-eval-source-map",
    proxyTable: {},
    middleWare:function(app){
        app.get("/api",function(req,res,next){
          res.send("1234")
        })
    }
  },
  babel:{
    "presets":[
        "env" 
    ],
    "plugins": [
      
    ]
  }
}
