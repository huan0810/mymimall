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
  mounted() {
    this.getUser()
    this.getCartCount()
  },
  methods: {
    getUser() {
      // 拉取用户信息保存到vuex里
      this.axios.get('/user').then(res => {
        // 用户名保存到vuex里
        this.$store.dispatch('saveUserName', res.username)
      })
    },
    getCartCount() {
      this.axios.get('/carts/products/sum').then(res => {
        // 购物车数量保存vuex里
        this.$store.dispatch('saveCartCount', res)
      })
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset';
@import './assets/scss/config';
@import './assets/scss/button';
</style>
