<!-- 购物车或订单列表没有数据时显示 -->
<template>
  <div class="no-data">
    <img src="/imgs/icon-no-data.png" alt="">
    <p>
      <slot name="tip"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'no-data'
}
</script>

<style lang='scss'>
.no-data {
  text-align: center;
  font-size: 18px;
  color: #999;
  margin: 50px 0;
  img {
    width: 240px;
    height: 180px;
    margin-bottom: 30px;
  }
}
</style>