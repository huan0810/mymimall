<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// 导入storage下的index,index可以省略
import storage from '@/storage'
export default {
  // 如果声明组件时没有为组件指定name,则组件名称默认是注册时的名称
  name: 'app',
  data() {
    return {}
  },
  components: {},
  mounted() {
    // storage.setItem('a', 111)
    // storage.setItem('user', { a: 1, b: 2 })
    // storage.setItem('c', 3, 'user')
    // storage.clear('b')
    // storage.clear('b', 'user')
    // storage.getItem('user')
  },
}
</script>

<style></style>
