import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Index from '@/pages/index'
import Product from '@/pages/product'
import Detail from '@/pages/detail'
import Cart from '@/pages/cart'
import Order from '@/pages/order'
import OrderConfirm from '@/pages/orderConfirm'
import OrderList from '@/pages/orderList'
import OrderPay from '@/pages/orderPay'
import AliPay from '@/pages/alipay'

// 加载插件
Vue.use(Router)

// 导出
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // 重定向
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index
        },
        {
          path: '/product/:id',
          name: 'product',
          component: Product
        },
        {
          path: '/detail/:id',
          name: 'detail',
          component: Detail
        }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      children: [
        {
          path: 'confirm',
          name: 'order-confirm',
          component: OrderConfirm
        },
        {
          // 子路由的path可以写/order/list或list，但不能写/list
          path: 'list',
          name: 'order-list',
          component: OrderList
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: OrderPay
        },
        {
          path: 'alipay',
          name: 'ali-pay',
          component: AliPay
        }
      ]
    }
  ]
})
