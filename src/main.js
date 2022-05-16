import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookies'
import store from './store' //导入vuex
import App from './App.vue'

// 接口代理proxy进行跨域
axios.defaults.baseURL = '/api' //转发时把/api置为空
axios.defaults.timeout = 8000

// 响应拦截器,接口错误拦截
axios.interceptors.response.use(function (response) {
  // response返回的是axios给我们封装的对象,其中response.data才是服务器真正的返回值
  let res = response.data
  let path = location.hash //location 属性用于获取或设置窗体的 URL
  if (res.status == 0) {
    // 成功，状态码为0
    return res.data
  } else if (res.status == 10) {
    // 未登录，状态码10
    if (path !== '#/index') {
      //首页在未登录状态下也可以访问
      window.location.href = '/#/login'
    }
    return Promise.reject(res)
  } else {
    alert(res.msg)
    return Promise.reject(res)
  }
})

Vue.config.productionTip = false
// 把axios挂载到原型上，然后在其他组件内部可以用this.axios访问了
Vue.prototype.axios = axios
Vue.use(VueCookie)
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bubbles.svg'
})

new Vue({
  render: (h) => h(App),
  // 加载路由，键和值一样省略值
  router,
  store
}).$mount('#app')
