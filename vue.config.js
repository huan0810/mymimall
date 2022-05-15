// 因为此文件是给webpack打包用的，所以用commonJS规范

// 接口代理，实现跨域请求
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
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
  productionSourceMap: true,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  }
}

// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
