import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Index from '@/pages/index'

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
          component: () => import('@/pages/product.vue')
        },
        {
          path: '/detail/:id',
          name: 'detail',
          component: () => import('@/pages/detail.vue')
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/pages/cart.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/pages/order.vue'),
      children: [
        {
          path: 'confirm',
          name: 'order-confirm',
          component: () => import('@/pages/orderConfirm.vue')
        },
        {
          // 子路由的path可以写/order/list或list，但不能写/list
          path: 'list',
          name: 'order-list',
          component: () => import('@/pages/orderList.vue')
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: () => import('@/pages/orderPay.vue')
        },
        {
          path: 'alipay',
          name: 'ali-pay',
          component: () => import('@/pages/alipay.vue')
        }
      ]
    }
  ]
})
