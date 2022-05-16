<!-- 产品参数组件，用于产品详情页，产品大图展示页顶部 -->
<template>
  <div class="nav-bar" :class="{'is_fixed':isFixed}">
    <div class="container">
      <div class="pro-title">
        {{title}}
      </div>
      <div class="pro-param">
        <a href="javascript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a href="javascript:;">用户评价</a>
        <!-- 后面的按钮用插槽，灵活引入 -->
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  // 接收父组件传递的值
  props: ['title'],
  data() {
    return {
      isFixed: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.initHeight)
  },
  methods: {
    initHeight() {
      // 参数组件的吸顶功能
      // 获取页面被卷去的头部距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.isFixed = scrollTop > 152 ? true : false
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.initHeight, false)
  }
}
</script>

<style lang='scss'>
@import '../assets/scss/config';
@import '../assets/scss/mixin';

.nav-bar {
  height: 70px;
  line-height: 70px;
  border-top: 1px solid $colorH;
  background-color: $colorG;
  z-index: 10;
  &.is_fixed {
    position: fixed;
    top: 0;
    width: 100%;
    box-shadow: 0 3px 7px $colorE;
  }
  .container {
    @include flex();
    .pro-title {
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }
    .pro-param {
      font-size: $fontJ;
      a {
        color: $colorC;
      }
      & a:last-of-type {
        margin-right: 10px;
      }
      span {
        margin: 0 10px;
      }
    }
  }
}
</style>