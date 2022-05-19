<!-- 跳转到支付宝支付的中转页面 -->
<template>
  <div class="alipay">
    <order-header title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <loading v-if="loading"></loading>
    <div class="form" v-html="content"></div>
  </div>
</template>

<script>
import OrderHeader from '@/components/OrderHeader'
import Loading from '@/components/Loading'

export default {
  name: 'alipay',
  components: { OrderHeader, Loading },
  data() {
    return {
      orderId: this.$route.query.orderId,
      payment: 9999999, //订单总金额
      content: '', //后台返回的content
      loading: true //是否展示Loading组件
    }
  },
  mounted() {
    this.paySubmit()
  },
  methods: {
    // 先从后台拉取订单总金额，再跳转到支付宝页面
    async paySubmit() {
      await this.axios.get(`/orders/${this.orderId}`).then(res => {
        this.payment = res.payment
      })
      await this.axios
        .post('/pay', {
          orderId: this.orderId,
          orderName: 'phonemall支付订单', //扫码支付时订单名称
          amount: this.payment, //订单总金额
          payType: 1 //1支付宝，2微信
        })
        .then(res => {
          this.content = res.content
          // 设置定时器，因为content渲染到页面需要一定时间
          setTimeout(() => {
            document.forms[0].submit() //提交到支付宝平台
          }, 100)
        })
    }
  }
}
</script>
