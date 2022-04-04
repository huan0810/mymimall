<!-- order.vue承载了购物车,支付订单等页面的头部尾部，
     <router-view></router-view>嵌入其他页面的核心代码 -->
<template>
  <div>
    <nav-header></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
export default {
  name: '',
}
</script>
