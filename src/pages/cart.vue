<!-- cart购物车页面的头部尾部其实可以复用order的结构
     但是order/cart看上去很奇怪，所以cart单独拿出来写了 -->
<template>
  <div>
    <order-header></order-header>
    cart
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from '@/components/OrderHeader'
import NavFooter from '@/components/NavFooter.vue'
export default {
  name: 'cart',
  components: {
    OrderHeader,
    NavFooter,
  },
}
</script>
