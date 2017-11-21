<template>
  <!--头部 开始-->
  <div class="header" >
    <div class="header-content">
      <div class="logo fl"><a href="#"><img src="~/static/img/logo.png" alt="" width="87" height="41"></a></div>
      <div class="header-nav header-nav-left fl" id="topNav" v-if="meta.userPage !== true">
        <ul class="header-nav-list" id="topNavList">
          <li :class="{on : meta.tabIndex == 0}"><router-link to="/">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</router-link></li>
          <li :class="{on : meta.tabIndex == 1}"><router-link to="/zxCompany">装修公司</router-link></li>
          <li :class="{on : meta.tabIndex == 2}"><router-link to="/jcCompany">建材商家</router-link></li>
          <li :class="{on : meta.tabIndex == 3}"><router-link to="/zxCase">装修案例</router-link></li>
          <li :class="{on : meta.tabIndex == 4}"><router-link to="/zxxd">装修信贷</router-link></li>
          <li>
            <div class="has-drop-txt">积分商城
              <div class="has-drop">
                <div class="drop-box">
                  <p class="title">微信扫码</p>
                  <p class="subtitle">进入微信商城</p>
                  <img class="code" src="~/static/img/code-jfsc.png" alt="积分商城">
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="header-nav header-nav-right fr">
        <ul id="userLogin" v-if="userData.isLogin === true || userData.isLogin === 'true'">
          <li class="item-user" @mouseenter="showHasDrop" @mouseleave="hideHasDrop" data-id="userDrop">
            <router-link :to="{path: '/user/zxOrder'}" target="_blank">
              <div class="img-box">
                <img :src="userData.head_img" :alt="userData.nickname">
              </div>
            </router-link>
          </li>
          <li class="item-hotLine"><a><i class="fa fa-phone"></i>热线电话：400-900-8090</a></li>
          <div id="userDrop" @mouseenter="showHasDrop" @mouseleave="hideHasDrop" data-id="userDrop" class="has-drop">
            <div class="top">
              <div class="left fl">
                <h3><router-link to="/user/book" target="_blank">{{userData.nickname}}</router-link></h3>
                <p class="color-blue-light">{{userData.mobile}}</p>
              </div>
              <div class="fr">
                <button class="button-tag" :disabled="userIsQq" @click="userQD">{{userIsQq === true ? '已签到' : '签到'}}</button>
              </div>
            </div>
            <div class="middle">
              <p class="subtitle">
                <i class="icon icon-coin"></i>积分
                <em class="fr title">{{userData.integral === 'null' ? 0 : userData.integral}}</em>
              </p>
            </div>
            <div class="bottom-txt">
              <ul>
                <li>
                  <router-link :to="{path:'/user/order?type=1'}">
                    <em class="fl"><i class="icon icon-order"></i>我的装修</em>
                    <em class="fr" v-if="userData.order_count > 0"><em class="note bg-red">{{userData.order_count}}</em></em>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{path:'/user/order?type=2'}">
                    <em class="fl"><i class="icon icon-order"></i>我的建材</em>
                    <em class="fr" v-if="userData.order_count > 0"><em class="note bg-red">{{userData.order_count}}</em></em>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{path:'/user/yhqzx?type=1'}" target="_blank">
                    <em class="fl"><i class="icon icon-yhq"></i>优惠券</em>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{path:'/user/set'}" target="_blank">
                    <em class="fl"><i class="icon icon-set"></i>设置</em>
                  </router-link>
                </li>
              </ul>
              <button class="fr sign-out" @click="loginOut">退出</button>
            </div>
          </div>
        </ul>
        <ul id="topRightNav" v-else>
          <li class="item-logo"><router-link :to="{path:'/login'}">登录</router-link></li>
          <li class="item-resig"><router-link :to="{path:'/login/2'}">注册</router-link></li>
          <li class="item-hotLine"><a><i class="fa fa-phone"></i>热线电话：400-900-8090</a></li>
        </ul>
      </div>
      <div class="header-nav header-nav-left fr" id="topNav" v-if="meta.userPage === true">
        <ul class="header-nav-list" id="topNavList">
          <li><router-link to="/">首页</router-link></li>
        </ul>
      </div>
    </div>
  </div>
  <!--头部 结束-->
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  const ERR = 0
  const APIHOST = 'http://zx.axfc.cn'
  let miniToastr
  if (process.browser) {
    miniToastr = require('mini-toastr')
  }
  export default {
    props: {
      meta: {},
      userIsQq: {}
    },
    data () {
      return {
        userData: {
          isLogin: ''
        }
      }
    },
    created () {
    },
    methods: {
      showHasDrop: function (event) {
        let o = event.currentTarget
        let id = o.getAttribute('data-id')
        document.querySelector('#' + id).className = 'on'
      },
      hideHasDrop: function (event) {
        let o = event.currentTarget
        let id = o.getAttribute('data-id')
        document.querySelector('#' + id).className = ''
      },
      loginOut: function () {
        axios.get(APIHOST + '/zxpc/user/loginOut', {sid: sessionStorage.getItem('sid')}).then((response) => {
          response = response.data
          if (response.code === ERR) {
            this.showLoginError({message: response.msg, type: 'error'})
          }
          sessionStorage.setItem('isLogin', false)
          sessionStorage.setItem('mobile', '')
          sessionStorage.setItem('nickname', '')
          sessionStorage.setItem('head_img', '')
          sessionStorage.setItem('order_count', '')
          sessionStorage.setItem('yy_countame', '')
          sessionStorage.setItem('integral', '')
          sessionStorage.setItem('sid', '')
          this.userData.isLogin = false
          this.userData = {}
          this.$store.commit('login/CLEAR_USER')
          this.showLoginError({message: response.msg, type: 'info'})
        })
      },
      // 用户签到
      userQD: function () {
        window.eventBus.$emit('invokeGetUserQD')
      }
    },
    mounted () {
      this.userData.isLogin = sessionStorage.getItem('isLogin')
      this.userData.mobile = sessionStorage.getItem('mobile')
      this.userData.nickname = sessionStorage.getItem('nickname')
      this.userData.head_img = sessionStorage.getItem('head_img')
      this.userData.order_count = sessionStorage.getItem('order_count')
      this.userData.yy_countame = sessionStorage.getItem('yy_countame')
      this.userData.integral = sessionStorage.getItem('integral')
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*头部 开始*/
  .header{
    position: relative;
    height: 67px;
    line-height: 67px;
    background: #fff;
    font-size: 1.5rem;
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    /*font-weight: 700;*/
  }
  .header-nav-list{
    position: relative;
    height: 67px;
  }
  .header .header-content{
    width: 1200px;
    margin: 0 auto;
  }
  #topNavList>li{
    position: relative;
    float: left;
    margin:0 18px;
    height: 67px;
  }
  #topNavList>li.on {border-bottom: 2px solid #26cb9b;}
  #topNavList>li.on:before {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    -webkit-transform: translate(-50%,0);
    -moz-transform: translate(-50%,0);
    -ms-transform: translate(-50%,0);
    -o-transform: translate(-50%,0);
    transform: translate(-50%,0);
    border: 6px solid transparent;
    border-bottom-color: #26cb9b;
  }
  .header .header-nav>ul>li a{
    display: block;
  }
  .header .header-nav {
    position: relative;
    margin-left: 50px;
  }
  #topNavList>li.on a, #topNavList>li:hover a,#topRightNav li:hover a, #userLogin li a:hover{color: #26cb9b;}
  #magicLine{
    position: absolute;
    width: 2em;
    bottom: 0;
    left: 0;
    height: 2px;
    background: #26cb9b;
    -webkit-transition: left .3s;
    -moz-transition: left .3s;
    -ms-transition: left .3s;
    -o-transition: left .3s;
    transition: left .3s;
  }
  #magicLine:before{
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    -webkit-transform: translate(-50%,0);
    -moz-transform: translate(-50%,0);
    -ms-transform: translate(-50%,0);
    -o-transform: translate(-50%,0);
    transform: translate(-50%,0);
    border: 6px solid transparent;
    border-bottom-color: #26cb9b;
  }
  .header .header-nav-right{margin-left: 0;}
  #topRightNav li{
    float: left;
    padding: 0 20px;
    margin: 27px 0;
    line-height: 1;
    height: 13px;
    background: #fff;
  }
  #userLogin li:not(:first-child){
    float: left;
    padding: 0 20px;
    margin: 27px 0;
    line-height: 1;
    height: 13px;
    background: #fff;
  }
  .item-logo{
    border-right: 1px solid #dedee0;
  }
  #topRightNav li .fa{
    margin-right: .3em;
    float: left;
  }
  #userLogin li a{
    /*display: inline-block;*/
    /*padding: 0 5px;*/
  }
  #userDrop{
    left: 20px;
  }
  #userLogin .item-user{
    padding-left: 50px;
  }
  #topNavList .has-drop-txt{position: relative}
  #topNavList .has-drop-txt:hover{color: #26cb9b;}
  #topNavList .has-drop{
    font-size: 13px;
    position: absolute;
    left: 50%;
    margin-left: -82.5px;
    z-index: 4;
    width: 165px;
    height: 0;
    top:66px;
    border: none;
    text-align: center;
    line-height:1.5;
    background: #fff;
    padding: 0;
    overflow: hidden;
    -webkit-transition: height .25s;
    -moz-transition: height .25s;
    -ms-transition: height .25s;
    -o-transition: height .25s;
    transition: height .25s;
  }
  .drop-box{
    padding: 15px 20px 20px;
    border: 1px solid #ededed;
  }
  #topNavList .has-drop .code{
    margin-top: 5px;
  }
  #topNavList .has-drop-txt:hover .has-drop{
    height:203px;
  }
</style>
<!--<script src="/static/js/base.js"></script>-->
