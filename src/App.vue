<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // 如果声明组件时没有为组件指定name,则组件名称默认是注册时的名称
  name: 'app',
  components: {},
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style lang="scss">
@import './assets/scss/reset';
@import './assets/scss/config';
@import './assets/scss/button';
</style>
