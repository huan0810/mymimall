// 因为此文件是给webpack打包用的，所以用commonJS规范

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
})
