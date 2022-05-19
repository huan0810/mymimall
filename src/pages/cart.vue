<!-- cart购物车页面的头部尾部其实可以复用order的结构
     但是order/cart看上去很奇怪，所以cart单独拿出来写了 -->
<template>
  <div class="cart">
    <order-header :title="'我的购物车'">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <loading v-if="loading"></loading>
        <div class="cart-box" v-if="list.length>0">
          <ul class="cart-item-head">
            <li class="col-1"><span class="checkbox" :class="{'checked':selectedAll}" @click="toggleAll"></span>全选</li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="(item,index) in list" :key="index">
              <div class="item-check">
                <span class="checkbox" :class="{'checked':item.productSelected}" @click="updateCart(item)"></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.productMainImage" alt="">
                <span>{{item.productName}} {{item.productSubtitle}}</span>
              </div>
              <div class="item-price">{{item.productPrice}}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item,'-')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;" @click="updateCart(item,'+')">+</a>
                </div>
              </div>
              <div class="item-total">{{item.productTotalPrice}}</div>
              <div class="item-del" @click="delProduct(item)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix" v-if="list.length>0">
          <div class="cart-tip fl">
            <a href="/">继续购物</a>
            共<span>{{list.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
          </div>
          <div class="total fr">
            合计：<span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
        <no-data v-if="!loading && list.length==0">
          <template v-slot:tip>
            啊哦,购物车空空如也~
            <a href="/#/index" class="goIndex">去逛逛</a>
          </template>
        </no-data>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from '@/components/OrderHeader'
import ServiceBar from '@/components/ServiceBar'
import NavFooter from '@/components/NavFooter'
import Loading from '@/components/Loading'
import NoData from '@/components/NoData'

export default {
  name: 'cart',
  components: {
    OrderHeader,
    ServiceBar,
    NavFooter,
    Loading,
    NoData
  },
  data() {
    return {
      list: [], //商品列表
      selectedAll: false, //是否全选
      cartTotalPrice: 0, //购物车总金额
      checkedNum: 0, //选中的商品数量
      loading: true //是否展示loading组件
    }
  },
  mounted() {
    this.getCartList()
  },
  methods: {
    getCartList() {
      // 获取购物车列表
      this.axios
        .get('/carts')
        .then(res => {
          this.renderData(res)
        })
        .catch(() => {
          this.loading = false
        })
    },
    updateCart(item, type) {
      // 更新购物车内商品数量和单选按钮,item是当前操作的商品信息，type是操作类型
      let quantity = item.quantity
      let selected = item.productSelected
      if (type == '-') {
        // 减少商品数量
        if (quantity == 1) {
          this.$message.warning('商品至少保留一件')
          return
        }
        --quantity
      } else if (type == '+') {
        // 增加商品数量
        if (quantity > item.productStock) {
          this.$message.warning('商品购买数量不能超过库存数量')
          return
        }
        ++quantity
      } else {
        // 当前商品选中状态的切换
        selected = !item.productSelected
      }
      this.axios
        .put(`/carts/${item.productId}`, {
          quantity,
          selected
        })
        .then(res => {
          // 把购物车重新渲染一遍
          this.renderData(res)
        })
    },
    delProduct(item) {
      // 删除当前商品
      this.axios.delete(`/carts/${item.productId}`).then(res => {
        this.$message.success('删除成功')
        this.renderData(res)
      })
    },
    toggleAll() {
      // 全选按钮的切换
      let url = this.selectedAll ? '/carts/unSelectAll' : '/carts/selectAll'
      this.axios.put(url).then(res => {
        // 把购物车重新渲染一遍
        this.renderData(res)
      })
    },
    renderData(res) {
      // 获取数据后，渲染购物车各项数据
      this.list = res.cartProductVoList || []
      this.selectedAll = res.selectedAll
      this.cartTotalPrice = res.cartTotalPrice
      this.checkedNum = this.list.filter(item => item.productSelected).length
      this.loading = false
    },
    order() {
      // 购物车“去结算”
      let isCheck = this.list.every(item => !item.productSelected)
      if (isCheck) {
        this.$message.warning('请选择一件商品')
      } else {
        this.$router.push('/order/confirm')
      }
    }
  }
}
</script>

<style lang="scss">
.cart {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 114px;
    .cart-box {
      background-color: #fff;
      font-size: 14px;
      color: #999999;
      text-align: center;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url('/public/imgs/icon-gou.png') #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #e5e5e5;
          font-size: 16px;
          .item-check {
            flex: 1;
          }
          .item-name {
            flex: 3;
            font-size: 18px;
            color: #333333;
            display: flex;
            align-items: center;
            img {
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }
            span {
              margin-left: 30px;
            }
          }
          .item-price {
            flex: 1;
            color: #333333;
          }
          .item-num {
            flex: 2;
            .num-box {
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #e5e5e5;
              font-size: 14px;
              a {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
              span {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
            }
          }
          .item-total {
            flex: 1;
            color: #ff6600;
          }
          .item-del {
            flex: 1;
            width: 14px;
            height: 12px;
            background: url('/public/imgs/icon-close.png') no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
        }
      }
    }
    .order-wrap {
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      .cart-tip {
        margin-left: 29px;
        a {
          color: #666666;
          margin-right: 37px;
        }
        span {
          color: #ff6600;
          margin: 0 5px;
        }
      }
      .total {
        font-size: 14px;
        color: #ff6600;
        span {
          font-size: 24px;
        }
        a {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }
    }
    .goIndex {
      color: #ff6600;
    }
  }
}
</style>
