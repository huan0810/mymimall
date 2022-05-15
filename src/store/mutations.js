// 商城vuex-mutations，定义方法
export default {
  saveUserName(state, username) {
    state.username = username
  },
  saveCartCount(state, count) {
    state.cartCount = count
  }
}
