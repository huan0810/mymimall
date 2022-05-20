// 因为此文件是给webpack打包用的，所以用commonJS规范

module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    //接口代理,实现跨域请求
    proxy: {
      '/api': {
        target: 'http://mall-pre.springboot.cn',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  // 关闭SourceMap，无法定位源码
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  }
}

// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
