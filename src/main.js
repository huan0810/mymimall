import Vue from 'vue'
import router from './router'
import axios from 'axios'
import App from './App.vue'

// 设置响应拦截器
axios.interceptors.response.use(function (response) {
  // 注意response返回的是axios给我们封装的对象,其中response.data才是服务器真正的返回值
  let res = response.data
  if (res.status == 0) {
    return res.data
  } else if (res.status == 10) {
    //10在这里表示未登录的状态码
  }
})

Vue.config.productionTip = false
// 把axios挂载到原型上，然后在其他组件内部可以用this.axios访问了
Vue.prototype.axios = axios

new Vue({
  render: (h) => h(App),
  // 加载路由，键和值一样省略值
  router,
}).$mount('#app')
