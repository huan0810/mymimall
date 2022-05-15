// Vuex,存储用户信息，购物车数量
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  username: '', //用户名
  cartCount: 0 //购物车数量
}

// 在main.js中引用
export default new Vuex.Store({
  state, //状态
  actions, //提交到mutations
  mutations //提交到state
})
