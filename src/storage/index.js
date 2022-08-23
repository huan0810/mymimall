// 封装sessionStorage存储方法
const STORAGE_KEY = 'mall'
export default {
  // 一个存储数据的例子:{user: {userName: "jack", age: 89, sex: 1}}
  // 之所以对sessionStorage的API重新封装，是因为想把所有信息存储在一个对象mall里，数据更清晰

  // 存储值
  setItem(key, value, module_name) {
    // (1)传入模块module_name时,需要先找到模块,在模块里添加key,value
    if (module_name) {
      let val = this.getItem(module_name) //取user模块
      val[key] = value
      // 用新值复写原来的user模块
      this.setItem(module_name, val)
    } else {
      // (2)没有传入模块module_name时,设置key value,即跟user同级的数据
      let val = this.getStorage()
      val[key] = value
      // 因为此处面向模块编程,sessionStorage上下文可能找不到,所以加上window
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    }
  },

  // 获取值
  getItem(key, module_name) {
    // 如果传入了第二个参数,module_name表示user,key表示username,即获取user对象里的username
    if (module_name) {
      // this表示当前暴露的对象,getItem是对象里封装的方法
      let val = this.getItem(module_name) //取user模块
      if (val) return val[key]
    }
    // 如果只传入一个参数key,那key就表示user,要获取user整个对象
    return this.getStorage()[key]
  },

  // 获取整个Storage数据
  getStorage() {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
  },

  // 清空某一个值,可能是清空user模块,也可能是清空user模块下面的某个值
  clear(key, module_name) {
    // delete删除对象某个属性
    let val = this.getStorage() //先获取整个Storage数据
    if (module_name) {
      if (!val[module_name]) return
      delete val[module_name][key]
    } else {
      delete val[key]
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }
}
