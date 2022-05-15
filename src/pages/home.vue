<!-- home.vue承载了index.vue, product.vue, detail.vue的头部尾部，
     <router-view></router-view>嵌入这三个页面的核心代码 -->
<template>
  <div>
    <nav-header></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'
export default {
  name: 'nav-home',
  components: {
    NavHeader,
    NavFooter
  }
}
</script>
