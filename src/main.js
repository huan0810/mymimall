import axios from 'axios'
import Vue from 'vue'
import router from './router'
import App from './App.vue'

Vue.config.productionTip = false
// 把axios挂载到原型上，然后在其他组件内部可以用this.axios访问了
Vue.prototype.axios = axios

new Vue({
  render: (h) => h(App),
  // 加载路由，键和值一样省略值
  router,
}).$mount('#app')
