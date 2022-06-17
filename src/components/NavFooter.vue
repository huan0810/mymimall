<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="javascript:;">帮助中心</a><span>|</span>
      <a href="javascript:;">服务支持</a><span>|</span>
      <a href="javascript:;">服务支持</a><span>|</span>
      <a href="javascript:;">关于小米</a><span>|</span>
      <a href="javascript:;">关注我们</a><span>|</span>
      <a href="javascript:;">特色服务</a>
    </div>
    <div class="copyright">
      © mi.com <a href="https://beian.miit.gov.cn" target="_blank">豫ICP备2022014711号-1</a> 京公网安备11010802020134号 京网文[2020]0276-042号
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-footer'
}
</script>

<style lang="scss">
@import '../assets/scss/config';
.footer {
  height: 234px;
  border-top: 4px solid $colorA;
  background-color: $colorB;
  color: $colorD;
  font-size: $fontI;
  text-align: center;
  .footer-logo {
    margin-top: 46px;
    margin-bottom: 31px;
    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
  }
  .footer-link {
    a {
      color: $colorD;
      display: inline-block;
    }
    span {
      margin: 0 10px;
    }
    margin-bottom: 13px;
  }
  .copyright {
    a {
      color: $colorD;
      font-size: $fontI;
      text-align: center;
    }
  }
}
</style>
