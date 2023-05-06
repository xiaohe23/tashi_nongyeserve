const { defineConfig } = require('@vue/cli-service')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/', //1.打包前设置项目的根路径,如果没设置，会影响打包后的静态资源的访问
  outputDir: "mydist",
  lintOnSave: process.env.NODE_ENV !== 'production',//eslint 语法检查，如果是生产环境将该检查关闭
  productionSourceMap: process.env.NODE_ENV !== 'production', // 生产环境是否生成 sourceMap 文件, 显示源文件错误在第几行，有利于调试;false 优化性能
  chainWebpack: config => {
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {//process.env.NODE_ENV 获取环境信息
      // 为生产环境修改配置...
      config.mode = 'production'
      // 将每个依赖包打包成单独的js文件
      let optimization = {
        // runtimeChunk: 'single',
        // splitChunks: {
        //   chunks: 'all',
        //   maxInitialRequests: Infinity,
        //   minSize: 20000,
        //   cacheGroups: {
        //     vendor: {
        //       test: /[\\/]node_modules[\\/]/,
        //       name(module) {
        //         // get the name. E.g. node_modules/packageName/not/this/part.js
        //         // or node_modules/packageName
        //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
        //         // npm package names are URL-safe, but some servers don't like @ symbols
        //         return `npm.${packageName.replace('@', '')}`
        //       }
        //     }
        //   }
        // },
        minimizer: [new UglifyPlugin({
          uglifyOptions: {
            compress: {
              //warnings: false,
              drop_console: true, // console  
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })]
      }
      Object.assign(config, {
        optimization
      })
    }
  }
})
