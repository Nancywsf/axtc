<template>
  <div>
    <v-header :meta="meta"></v-header>
    <div class="main user-page">
      <div class="cumb part-box">当前位置：首页—个人中心</div>
      <div class="user-top-img part-box">
        <div class="left-img fl">
          <img :src="userData.head_img" :alt="userData.nickname">
        </div>
        <div class="left-txt fl">
          <h3 class="title">{{userData.nickname}}</h3>
          <p class="user-mobile"><a class="bind-phone">{{userData.mobile}}</a></p>
          <p class="subtitle jf-value">积分：{{userData.integral}}</p>
        </div>
      </div>
      <div class="user-bottom part-box">
        <div class="left-user-nav fl">
          <ul class="left-nav-list">
            <li :class="{on: $route.fullPath.indexOf('/user/zxOrder') >= 0 }" @click="clickUserNav">
              <router-link :to="{path: '/user/zxOrder'}"><i class="icon icon-time"></i>我的装修</router-link>
            </li>
            <li :class="{on: $route.fullPath.indexOf('/user/jcOrder') >= 0 }" @click="clickUserNav">
              <router-link :to="{path: '/user/jcOrder'}"><i class="icon icon-order"></i>我的建材</router-link>
            </li>
            <li @click="clickUserNav" :class="{open: $route.path.indexOf('/user/yhq') >= 0 }">
              <router-link :to="{path: '/user/yhq/1'}">
                <i class="icon icon-yhq"></i>优惠券
                <i class="fa fa-angle-left fr"></i>
              </router-link>
              <ul class="sub-nav" :class="{on: $route.path.indexOf('/user/yhq') >= 0}">
                <li @click="clickUserNav" :class="{on: $route.path.indexOf('/user/yhq/1') >= 0 }"><router-link :to="{path: '/user/yhq/1'}">装修优惠券</router-link></li>
                <li @click="clickUserNav" :class="{on: $route.path.indexOf('/user/yhq/2') >= 0 }"><router-link :to="{path: '/user/yhq/2'}">建材优惠券</router-link></li>
              </ul>
            </li>
            <li :class="{on: $route.path.indexOf('/user/set') >= 0 }" @click="clickUserNav">
              <router-link :to="{path: '/user/set'}"><i class="icon icon-set"></i>设置</router-link>
            </li>
            <li>
              <a><i class="icon icon-jqqd"></i>敬请期待</a>
            </li>
          </ul>
        </div>
        <div class="right-user-content fl">
          <nuxt-child/>
        </div>
      </div>
    </div>
    <v-footer :meta="meta"></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import vHeader from '~/components/header/header'
  import vFooter from '~/components/footer/footer'
  export default {
    components: {
      vHeader, vFooter
    },
    data () {
      return {
        meta: { removeML: true, hideHeader: true, hideFooter: true, userPage: true },
        userData: {
          isLogin: ''
        }
      }
    },
    created () {
      if (process.browser) {
        this.userData.isLogin = sessionStorage.getItem('isLogin')
        this.userData.mobile = sessionStorage.getItem('mobile')
        this.userData.nickname = sessionStorage.getItem('nickname')
        this.userData.head_img = sessionStorage.getItem('head_img')
        this.userData.order_count = sessionStorage.getItem('order_count')
        this.userData.integral = sessionStorage.getItem('integral')
      }
    },
    methods: {
      clickUserNav () {}
    },
    mounted () {
    }
  }
</script>

<style scoped>
  .user-top-img{
    background: url(/static/img/user-bg.jpg) no-repeat;
    height: 125px;
    margin-bottom: 20px;
    padding: 17px 30px;
  }
  .user-top-img .left-img{
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 1px solid #26cb9b;
    margin-right: 25px;
  }
  .user-top-img .left-img img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .user-top-img .left-txt{
    color: #666;
  }
  .user-top-img .left-txt .title{
    font-size: 16px;
    margin: 10px 0 5px;
  }
  .bind-phone{
    background: #e2e7f1;
    color:#aab6c9;
    padding: 3px;
    font-size: 14px;
  }
  .user-mobile{
    margin: 10px 0;
  }
  .jf-value{
    font-size: 14px;
    margin: 5px 0;
  }
  .left-user-nav{
    width: 180px;
    min-height: 450px;
    margin-right: 18px;
    border: 1px solid #ededed;
    color: #999;
    background: #fafafa;
  }
  .left-nav-list li{
    font-size: 16px;
  }
  .left-nav-list>li>a{
    display: block;
    padding: 20px 30px;
    color: #999;
  }
  .left-user-nav li .icon{
    float: left;
    width: 20px;
    height: 23px;
    display: block;
    background: url(/static/img/sprit.png) no-repeat;
    margin-right: 5px;
  }
  .left-user-nav li .icon-time{
    background-position: -1px -150px;
  }
  .left-user-nav li .icon-order{
    background-position: 0 -70px;
  }
  .left-user-nav li .icon-yhq{
    background-position: 0 -112px;
  }
  .left-user-nav li .icon-set{
    background-position: 0 -186px;
  }
  .left-user-nav li .icon-jqqd{
    background-position: -1px -221px;
  }
  .left-user-nav li.on .icon-time{
    background-position: -30px -150px;
  }
  .left-user-nav li.on .icon-order{
    background-position: -30px -70px;
  }
  .left-user-nav li.on .icon-yhq{
    background-position: -30px -112px;
  }
  .left-user-nav li.on .icon-set{
    background-position: -30px -186px;
  }
  .left-user-nav li.on .icon-jqqd{
    background-position: -30px -221px;
  }
  .left-user-nav li.on{
    /*background: #26cb9b;*/
  }
  .left-user-nav li.on>a{
    color: #fff;
    background: #26cb9b;
  }
  .right-user-content {
    width: 1000px;
    padding-bottom: 20px;
    min-height: 400px;
  }
  .user-bottom{overflow: hidden;}
  .right-user-content{
    border: 1px solid #ededed;
  }
  .left-user-nav .fa-angle-left{
    margin-top:4px;
    -webkit-transition: .25s all;
    -moz-transition: .25s all;
    -ms-transition: .25s all;
    -o-transition: .25s all;
    transition: .25s all;
  }
  .left-user-nav .open .fa-angle-left{
    -webkit-transform: rotate(-90deg);
    -moz-transform: rotate(-90deg);
    -ms-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
    transform: rotate(-90deg);
  }
  .sub-nav{
    height: 0;
    overflow: hidden;
    -webkit-transition: .25s height;
    -moz-transition: .25s height;
    -ms-transition: .25s height;
    -o-transition: .25s height;
    transition: .25s height;
  }
  .sub-nav.on{
    height: 102px;
  }
  .sub-nav li a{
    color: #999;
    display: block;
    padding:15px 0 15px 60px;
    font-size: 14px;
  }
</style>
