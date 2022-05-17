<!-- 登录页面不需要引入任何组件，没有其他页面与之共用。是独立页面 -->
<template>
  <div class="register">
    <div class="container">
      <a href="/#/index"><img src="/imgs/login-logo.png" alt=""></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <img src="/imgs/register.jpg" class="register-bg">
        <div class="register-form">
          <h3>
            <span class="checked">账号注册</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username">
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
          <div class="input">
            <input type="email" placeholder="请输入邮箱" v-model="email">
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="register">立即注册</a>
          </div>
          <div class="tips">
            <a href="/#/login" class="sms">去登录</a>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavFooter from '@/components/NavFooter.vue'
export default {
  name: 'login',
  components: { NavFooter },
  data() {
    return {
      username: '',
      password: '',
      email: ''
    }
  },
  methods: {
    register() {
      let { username, password, email } = this
      this.axios
        .post('/user/register', {
          username,
          password,
          email
        })
        .then(() => {
          this.$message.success('注册成功')
          this.username = ''
          this.password = ''
          this.email = ''
        })
    }
  }
}
</script>
<style lang="scss">
.register {
  & > .container {
    height: 113px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    .container {
      height: 576px;
      .register-bg {
        margin-top: 40px;
        width: 800px;
      }
      .register-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 510px;
        background-color: #ffffff;
        border: 2px solid #ff6600;
        position: absolute;
        bottom: 29px;
        right: 0;
        h3 {
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;
        }
        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          cursor: pointer;
          .sms {
            color: #ff6600;
          }
        }
        .btn {
          width: 100%;
          line-height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>