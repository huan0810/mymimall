<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <div class="order" v-for="(item,i) in list" :key="i">
            <div class="order-title">
              <div class="item-info fl">
                {{item.createTime}}
                <span>|</span>
                {{item.receiverName}}
                <span>|</span>
                订单号：{{item.orderNo}}
                <span>|</span>
                {{item.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{item.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list" v-for="(itemVo,j) in item.orderItemVoList" :key="j">
                  <div class="good-img">
                    <img v-lazy="itemVo.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{itemVo.productName}}</div>
                    <div class="p-money">{{itemVo.currentUnitPrice}} X {{itemVo.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="item.status==10">
                <a href="javascript:;" @click="goPay(item.orderNo)">{{item.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;">{{item.statusDesc}}</a>
              </div>
            </div>
          </div>
          <!-- 滚动加载更多,通过npm插件vue-infinite-scroll实现 -->
          <!-- v-infinite-scroll="loadMore" 自定义指令,loadMore是加载更多的方法 -->
          <!-- infinite-scroll-disabled="busy"  控制禁用/放开滚动加载 -->
          <!-- infinite-scroll-distance="410" 离底部有多远是开始滚动加载 -->
          <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="410">
            <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" v-show="scrollLoading">
          </div>
          <no-data v-if="!loading && list.length==0">
            <template v-slot:tip>
              当前暂无提交的订单记录
            </template>
          </no-data>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from '@/components/OrderHeader'
import Loading from '@/components/Loading'
import NoData from '@/components/NoData'
import infiniteScroll from 'vue-infinite-scroll'

export default {
  name: 'order-list',
  components: { OrderHeader, Loading, NoData },
  directives: { infiniteScroll },
  data() {
    return {
      list: [], //订单列表
      loading: true,
      pageNum: 1, //页码
      busy: true, //是否触发滚动加载更多,true禁用滚动加载
      scrollLoading: false //滚动加载的动画
    }
  },
  mounted() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      this.scrollLoading = true //请求之前,显示滚动加载的动画
      // this.busy = true
      this.axios
        .get('/orders', {
          params: {
            pageNum: this.pageNum
          }
        })
        .then(res => {
          this.loading = false
          this.list = this.list.concat(res.list)
          this.scrollLoading = false //请求后,隐藏滚动加载的动画
          // this.busy = false
          // 判断是否有下一页
          if (res.hasNextPage) {
            this.busy = false //释放busy
          } else {
            this.busy = true //禁用滚动加载
          }
        })
        .catch(() => {
          this.loading = false
        })
    },
    goPay(orderNo) {
      // 未付款的订单,去支付页面
      this.$router.push({
        path: '/order/pay',
        query: {
          orderNo
        }
      })
    },
    loadMore() {
      // 滚动加载更多
      this.busy = true //禁用滚动加载
      setTimeout(() => {
        this.pageNum++
        this.getOrderList()
      }, 500)
    }
  }
}
</script>

<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
      .pagination {
        text-align: right;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff6600;
      }
      .el-button--primary {
        background-color: #ff6600;
        border-color: #ff6600;
      }
      .load-more {
        text-align: center;
      }
    }
  }
}
</style>
