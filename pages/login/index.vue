<template>
  <div class="login">
    <section class="login-bg" style="background-image: url(/img/login-bg.jpg);"></section>
    <div class="part-box">
      <article class="right-login fr">
        <router-link to="/" class="subtitle fr">首页<i class="fa fa-home"></i></router-link>
        <div class="fill-box" v-show="page == 1">
          <ul class="tab">
            <li style="display: none;" class="tab-item" name="_smdl" @click="loginTabIndex = '0'">微信扫码登录</li>
            <!--<li style="width: 100%;" class="tab-item" name="_mmdl" @click="loginTabIndex = '1'">密码登录</li>-->
            <li style="width: 100%;" class="tab-item" name="_mmdl">密码登录</li>
            <li style="display: none;" class="magic-item" :style="'transform: translate(' + 150*loginTabIndex + 'px,0);'"></li>
          </ul>
          <div class="tab-content">
            <div class="content" :style="'transform: translate(-' + 300*loginTabIndex + 'px,0);'">
              <div style="display: none;" class="_smdl">
                <img src="~/static/img/code-sm.jpg" alt="爱心乐居扫码登录" width="190" height="190">
                <p class="subtitle">微信扫码&nbsp;&nbsp;&nbsp;&nbsp;快速登录</p>
              </div>
              <div class="_mmdl">
                <div class="fill-input">
                  <input type="text" placeholder="请输入注册手机号" class="" v-model.lazy="loginData.userPhone" @blur="checkFirstLogin">
                </div>
                <div class="fill-input">
                  <input type="password" placeholder="请输入您的密码" v-model.lazy="loginData.psw">
                </div>
                <button id="loginBtn" class="bg-green" @click="loginFun">登录</button>
                <p class="subtitle">还没账号？<em class="color-green" @click="page=2">立即注册</em> <em class="color-green fr" data-dlialog="main-modpwd" @click="openDialog()">忘记密码？</em></p>
              </div>
            </div>
          </div>
        </div>
        <div class="fill-box" v-show="page == 2">
          <ul class="tab register-tab">
            <li style="color: #333;" class="tab-item">注册</li>
          </ul>
          <div class="tab-content">
            <div class="fill-input">
              <input class="userphone" :class="'status-' + phoneIsOk" type="text" placeholder="输入您常用的手机号码" @blur="phoneIsOk=validator();checkMobile();" data-pattern="^1[34578]\d{9}$" data-error="您填写的手机号码不正确" v-model.lazy="resigterData.userPhone">
            </div>
            <div class="fill-input">
              <input type="text" placeholder="输入手机收到的验证码" @blur="checkCode" v-model.lazy="resigterData.verifiCode">
              <button class="color-green" id="getCodeBtn" @click="getCodeFun">获得验证码</button>
            </div>
            <div class="fill-input">
              <input type="password" placeholder="输入密码" v-model.lazy="resigterData.psw">
            </div>
            <div class="fill-input">
              <input type="password" placeholder="请再次输入密码" v-model.lazy="resigterData.veripsw" @blur="checkPWS">
            </div>
            <button id="registerBtn" class="bg-green" @click="resigterFun">注册</button>
            <p class="subtitle">已有账号，<em id="toLoginPage" class="color-green" @click="page=1">登录</em></p>
          </div>
        </div>
      </article>
      <div class="cl"></div>
    </div>
    <v-popWin :mobile="loginData.userPhone"></v-popWin>
    <v-forgetPWD :mobile="loginData.userPhone" v-on:getYZM="getCodeFun" v-on:checkCode="checkCode"></v-forgetPWD>
  </div>
</template>

<script type="text/ecmascript-6">
  import vPopWin from '~/components/popWin/popWin'
  import vForgetPWD from '~/components/popWin/forgetPWD'
  import axios from 'axios'
  let ERR = 0

  let miniToastr
  if (process.browser) {
    miniToastr = require('mini-toastr')
  }

  export default {
    data () {
      return {
        loginData: {
          userPhone: '',
          psw: ''
        },
        resigterData: {
          userPhone: '',
          verifiCode: '',
          psw: '',
          veripsw: ''
        },
        page: 1,
        phoneIsOk: '',
        loginTabIndex: ''
      }
    },
    components: {
      vPopWin, vForgetPWD
    },
    methods: {
      login () {
        let that = this
        let data = {
          mobile: '18761776812',
          password: '123456'
        }
        axios.post(that.$store.state.HOST + '/zxpc/user/login', data).then((res) => {
          sessionStorage.setItem('sid', res.data.data)
          // that.$store.commit('login/SET_USER', res.data)
          that.$router.push('/')
        })
      },
      getCodeFun: function (mobile) {
      },
      checkCode: function (yzm) {
      },
      checkPWS: function (event) {
      },
      setWaitTime: function (obj) {
      },
      resigterFun: function () {
      },
      loginFun: function () {
        let that = this
        let data = {
          mobile: that.loginData.userPhone,
          password: that.loginData.psw
        }
        axios.post(that.$store.state.HOST + '/zxpc/user/login', data)
          .then((response) => {
            response = response.data
            if (response.code === ERR || response.code === 2) {
              that.showLoginError({message: response.msg, type: 'error'})
              return false
            }
            if (response.code === 1) {
              that.showLoginError({message: response.msg, type: 'info'})
              sessionStorage.setItem('sid', response.data)
              // this.$emit('loginFun', response.data)
              that.getUserInfo(response.data)
              that.$store.commit('login/SET_SID', response.data)
            }
          })
      },
      // 登录成功后，获取用户信息
      getUserInfo: function (sid) {
        let that = this
        this.$store.dispatch('getUserData', {sid: sid})
        setTimeout(function () {
          that.$router.push('/')
        }, 2000)
        //        let that = this
        //        axios.post(this.$store.state.HOST + '/zxpc/my/info', {sid: sid}, {emulateJSON: true}).then((response) => {
        //          response = response.data
        //          if (response.code === ERR) {
        //            // 用户未登录
        //            sessionStorage.setItem('isLogin', false)
        //            sessionStorage.setItem('mobile', '')
        //            sessionStorage.setItem('nickname', '')
        //            sessionStorage.setItem('head_img', '')
        //            sessionStorage.setItem('order_count', '')
        //            sessionStorage.setItem('yy_countame', '')
        //            sessionStorage.setItem('integral', '')
        //            this.userInfo.isLogin = false
        //            this.userInfo = {}
        //            return false
        //          }
        //          this.userInfo = response.data
        //          this.userInfo.isLogin = true
        //          this.userInfo.head_img = response.data.head_img === null ? 'http://vip.axfc.cn/user/img/wxfx.jpg' : response.data.head_img
        //          this.userInfo.integral = response.data.integral === null ? 0 : response.data.integral
        //          sessionStorage.setItem('isLogin', true)
        //          sessionStorage.setItem('mobile', this.userInfo.mobile)
        //          sessionStorage.setItem('nickname', this.userInfo.nickname)
        //          sessionStorage.setItem('head_img', this.userInfo.head_img)
        //          sessionStorage.setItem('order_count', this.userInfo.order_count)
        //          sessionStorage.setItem('yy_countame', this.userInfo.yy_countame)
        //          sessionStorage.setItem('integral', this.userInfo.integral)
        //
        //          that.$store.commit('login/SET_USER', this.userInfo)
        //          setTimeout(function () {
        //            that.$router.push('/')
        //          }, 2000)
        //        })
      },
      // 判断是否第一次登录
      checkFirstLogin () {
        if (this.loginData.userPhone.trim() === '') {
          return false
        }
        axios.get(this.$store.state.HOST + '/zxpc/user/userIsFirstLogin?phone=' + this.loginData.userPhone).then((response) => {
          response = response.data
          if (response.code === 2) {
            //                您是第一次登录电脑端网页，2s后为您跳转到设置密码页面
            // $('.main-setpwd').fadeIn().addClass('show')
            return false
          }
          if (response.code === 0) {
            this.showLoginError({message: response.msg, type: 'error'})
            return false
          }
        })
      },
      checkMobile: function () {
      }
    },
    mounted () {
      miniToastr.init()
    },
    notifications: {
      showLoginError: {
        title: '',
        message: 'Hello from nuxt.js',
        type: 'warn'
      }
    }
  }
</script>

<style scoped>
  .login-bg{
    position: absolute;
    top:0;
    left:0;
    width: 50vw;
  }
  .login-bg, .right-login{
    height: 100vh;
    background-color: #fff;
    padding: 30px 0 30px 30px;
  }
  .right-login{
    position: relative;
    width: 50%;
  }
  .login-bg{
    background-position: bottom center;
    background-size: cover;
  }
  .right-login>.subtitle{
    font-size: 13px;
  }
  .right-login>.subtitle>.fa{margin-left: 5px;}
  .login .fill-box{
    position: absolute;
    width: 300px;
    height: 400px;
    top: 0;
    left: 0;
    bottom:0;
    right:0;
    margin: auto;
  }
  .login .fill-box .tab{
    position: relative;
    font-size: 16px;
    overflow: hidden;
  }
  .login .fill-box .tab li{
    position: relative;
    float: left;
    width: 50%;
    border-bottom: 2px solid #e0e0e0;
    text-align: center;
    line-height: 3;
  }
  .login .fill-box .tab li.magic-item{
    position: absolute;
    bottom: 0;
    width: 50%;
    height: 2px;
    border-bottom-color: #37bd97;
    z-index: 0;
    -webkit-transform: translate(0,0);
    -moz-transform: translate(0,0);
    -ms-transform: translate(0,0);
    -o-transform: translate(0,0);
    transform: translate(0,0);
    -webkit-transition: transform .25s;
    -moz-transition: transform .25s;
    -ms-transition: transform .25s;
    -o-transition: transform .25s;
    transition: transform .25s;
  }
  .login .fill-box .tab li.magic-item:after{
    content: '';
    position: absolute;
    border: 4px solid transparent;
    border-bottom-color: #37bd97;
    bottom: 0;
    left: 50%;
    margin-left: -4px;
  }
  .login .fill-box .tab li.on{
    border-color: #37bd97;
  }
  .tab-content{overflow: hidden}
  .tab-content .content{
    width: 200%;
    position: relative;
    -webkit-transform: translate(0,0);
    -moz-transform: translate(0,0);
    -ms-transform: translate(0,0);
    -o-transform: translate(0,0);
    transform: translate(0,0);
    -webkit-transition: transform .25s;
    -moz-transition: transform .25s;
    -ms-transition: transform .25s;
    -o-transition: transform .25s;
    transition: transform .25s;
  }
  ._smdl, ._mmdl{
    width: 300px;
    float: left;
  }
  ._mmdl{
    padding-top: 40px;
  }
  .tab-content ._smdl img{
    display: block;
    margin: 0 auto;
    margin: 70px auto 40px;
  }
  .tab-content ._smdl .subtitle{
    text-align: center;
    font-size: 14px;
  }
  .tab-content input{
    width: 100%;
    border: none;
    border-bottom: 1px solid #ededed;
    line-height: 2.5;
    font-size: 14px;
  }
  .tab-content .fill-input{
    position: relative;
    margin-top: 20px;
  }
  #loginBtn, #registerBtn{
    width: 100%;
    line-height: 44px;
    border: none;
    font-size: 16px;
    margin-top: 20px;
    letter-spacing: 1em;
    text-indent: 1em;
  }
  .tab-content .subtitle{
    margin-top: 20px;
    font-size: 15px;
  }
  .login .fill-box .register-tab li{
    width: 100%;
    color: #26cb9b;
  }
  .register-tab{
    margin-bottom: 20px;
  }
  #getCodeBtn{
    position: absolute;
    right: 5px;
    bottom:10px;
    font-size: 15px;
    border: none;
    background: transparent;
    cursor: pointer;
  }
  #getCodeBtn.disabled{
    opacity: .5;
    cursor: text;
  }
  input.status-false{
    border-color: red;
  }
</style>
