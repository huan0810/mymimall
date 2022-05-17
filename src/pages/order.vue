<!-- order.vue承载了支付订单相关页面的头部尾部，
     <router-view></router-view>嵌入其他页面的核心代码 -->
<template>
  <div>
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
// 加载组件
import ServiceBar from '@/components/ServiceBar'
import NavFooter from '@/components/NavFooter'
export default {
  name: 'order',
  components: {
    ServiceBar,
    NavFooter
  }
}
</script>
