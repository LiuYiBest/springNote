<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main"></div>
          <div class="form">

            <h3 @click="showRegister">创建账户</h3>
            <!--  加入动画   -->
            <transition name="slide">
              <!--   双向绑定，得到输入框的数据-->
              <div v-bind:class="{show: isShowRegister}" class="register">
                <!--   监听用户输入 绑定用户名和密码  -->
                <input type="text" v-model="register.username" placeholder="用户名">
                <input type="password" v-model="register.password" @keyup.enter="onRegister" placeholder="密码">
                <p v-bind:class="{error: register.isError}"> {{ register.notice }}</p>
                <div class="button" @click="onRegister">创建账号</div>
              </div>
            </transition>

            <h3 @click="showLogin">登录</h3>
            <transition name="slide">
              <div v-bind:class="{show: isShowLogin}" class="login">
                <input type="text" v-model="login.username" placeholder="输入用户名">
                <input type="password" v-model="login.password" @keyup.enter="onLogin" placeholder="密码">
                <p v-bind:class="{error: login.isError}"> {{ login.notice }}</p>
                <div class="button" @click="onLogin"> 登录</div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/helpers/request";
import Auth from "../apis/auth";

// Auth.getInfo().then(data => {
//
// })

// 模拟一个请求的使用
// request('/auth/login','Post',{username:"hunger",password:"123456"})
//   .then(data=>{
//     console.log(data)
// })

//调用用户接口 获取用户的状态
// request('/auth')
//   .then(data => {
//     console.log("用户的登录状态",data)
//   })

export default {
  name: 'Login',
  data() {
    return {
      isShowLogin: true,   //展示登录
      isShowRegister: false, //展示注册
      register: {
        username: '',
        password: '',
        notice: '创建账户后请记住用户名和密码',
        isError: false
      },
      login: {
        username: '',
        password: '',
        notice: '请输入用户名和密码',  //报错提示
        isError: false   //控制notice的提示展示
      }
    }
  },
  methods: {
    showRegister() {
      this.isShowRegister = true
      this.isShowLogin = false
    },
    showLogin() {
      this.isShowRegister = false
      this.isShowLogin = true
    },
    //监听用户输入
    validRegister() {
      console.log(this.register.username)
    },
    //用户注册
    onRegister() {
      // console.log('register')
      //  判断用户名是否合法
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.register.username)) {
        this.register.isError = true
        this.register.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
        return
      }
      //判断密码是否合法
      if (!/^.{6,16}$/.test(this.register.password)) {
        this.register.isError = true
        this.register.notice = '密码长度为6~16个字符'
        return
      } else {
        this.register.isError = false
        this.register.notice = ''

        //调用请求接口，实现注册功能
        // console.log(`开始注册..., username用户名: ${this.register.username} , password密码: ${this.register.password}`)
        Auth.register({username: this.register.username, password: this.register.password})
          .then(data => {
            this.register.isError = false
            this.register.notice = ''
            this.$router.push({path: 'notebooks'})
            console.log('注册', data)
          }).catch(data => {
          console.log(data)
          this.register.isError = true
          this.register.notice = data.msg
        })
      }
    },
    //用户登录
    onLogin() {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.login.username)) {
        this.login.isError = true
        this.login.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
        return
      }
      if (!/^.{6,16}$/.test(this.login.password)) {
        this.login.isError = true
        this.login.notice = '密码长度为6~16个字符'
        return
      }

      //调用请求接口，实现登录功能
      // console.log(`开始登录..., username: ${this.login.username} , password: ${this.login.password}`)
      Auth.login({username: this.login.username, password: this.login.password})
        .then(data => {
          //登录成功隐藏提示
          this.login.isError = false
          this.login.notice = ''
          this.$router.push({path: 'notebooks'})
          console.log('登录', data)
        }).catch(data => {
        console.log('登录失败'.data)
        this.login.isError = true
        this.login.notice = data.msg   //提示密码不正确
      })
    },
  }
}
</script>


<style lang="less">
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  height: 500px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;

  .main {
    flex: 1;
    background: #36bc64 url(//cloud.hunger-valley.com/17-12-13/38476998.jpg-middle) center center no-repeat;
    background-size: contain;
  }

  .form {
    width: 270px;
    border-left: 1px solid #ccc;
    overflow: hidden;

    h3 {
      padding: 10px 20px;
      margin-top: -1px;
      font-weight: normal;
      font-size: 16px;
      border-top: 1px solid #eee;
      cursor: pointer;

      &:nth-of-type(2) {
        border-bottom: 1px solid #eee;
      }
    }

    .button {
      background-color: #2bb964;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-weight: bold;
      color: #fff;
      border-radius: 4px;
      margin-top: 18px;
      cursor: pointer;
    }

    .login, .register {
      padding: 0px 20px;
      border-top: 1px solid #eee;
      height: 0;
      overflow: hidden;
      transition: height .4s;

      &.show {
        height: 193px;
      }

      //input框聚焦特效
      input {
        display: block;
        width: 100%;
        height: 35px;
        line-height: 35px;
        padding: 0 6px;
        border-radius: 4px;
        border: 1px solid #ccc;
        outline: none;
        font-size: 14px;
        margin-top: 10px;
      }

      input:focus {
        border: 3px solid #9dcaf8;
      }

      p {
        font-size: 12px;
        margin-top: 10px;
        color: #444;
      }

      .error {
        color: red;
      }
    }

    .login {
      border-top: 0;
    }
  }
}
</style>
