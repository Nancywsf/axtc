<template>
  <!--头部 开始-->
  <div class="header">
    <div class="header-content">
      <div class="logo fl"><a href="#"><img src="/static/img/logo.png" alt="" width="87" height="41"></a></div>
      <div class="header-nav header-nav-left fl" id="topNav">
      </div>
      <div class="header-nav header-nav-right fr">
        <ul id="userLogin">
          <li><router-link to="/index">首页</router-link></li>
          <li class="item-user" @mouseenter="showHasDrop" @mouseleave="hideHasDrop" data-id="userDrop">
            <div class="img-box">
              <img :src="userInfo.head_img" :alt="userInfo.nickname">
            </div>
          </li>
          <li class="item-hotLine"><a><i class="fa fa-phone"></i>热线电话：400-900-8090</a></li>
          <div id="userDrop" @mouseenter="showHasDrop" @mouseleave="hideHasDrop" data-id="userDrop" class="has-drop">
            <div class="top">
              <div class="left fl">
                <h3><router-link to="/user/book" target="_blank">{{userInfo.nickname}}</router-link></h3>
                <p class="color-blue-light">{{userInfo.mobile}}</p>
              </div>
              <div class="fr">
                <button class="button-tag" :disabled="userIsQq" @click="userQD">{{userIsQq === true ? '已签到' : '签到'}}</button>
              </div>
            </div>
            <div class="middle">
              <p class="subtitle">
                <i class="icon icon-coin"></i>积分
                <em class="fr title">{{userInfo.integral === 'null' ? 0 : userInfo.integral}}</em>
              </p>
            </div>
            <div class="bottom-txt">
              <ul>
                <!--<li>-->
                  <!--<router-link :to="{path:'/user/book'}">-->
                    <!--<em class="fl"><i class="icon icon-time"></i>我的预约</em>-->
                    <!--<em class="fr" v-if="userInfo.yy_count > 0"><em class="note bg-red">{{userInfo.yy_count}}</em></em>-->
                  <!--</router-link>-->
                <!--</li>-->
                <li>
                  <router-link :to="{path:'/user/order?type=1'}">
                    <em class="fl"><i class="icon icon-order"></i>我的装修</em>
                    <em class="fr" v-if="userInfo.order_count > 0"><em class="note bg-red">{{userInfo.order_count}}</em></em>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{path:'/user/order?type=2'}">
                    <em class="fl"><i class="icon icon-order"></i>我的建材</em>
                    <em class="fr" v-if="userInfo.order_count > 0"><em class="note bg-red">{{userInfo.order_count}}</em></em>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{path:'/user/yhqzx?type=1'}">
                    <em class="fl"><i class="icon icon-yhq"></i>优惠券</em>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{path:'/user/set'}">
                    <em class="fl"><i class="icon icon-set"></i>设置</em>
                  </router-link>
                </li>
              </ul>
              <button class="fr sign-out" @click="loginOut">退出</button>
            </div>
          </div>
        </ul>
      </div>
    </div>
  </div>
  <!--头部 结束-->
</template>

<script>
  import $ from 'jquery';
  const ERR = 0;
  const APIHOST = 'http://zx.axfc.cn';
  export default {
    props: {
      meta: {},
      userInfo: {},
      userIsQq: {}
    },
    data() {
      return {
      };
    },
    created() {
    },
    methods: {
      showHasDrop: function (event) {
        var $this = $(event.currentTarget);
        $('#' + $this.data('id')).addClass('on');
      },
      hideHasDrop: function (event) {
        var $this = $(event.currentTarget);
        $('#' + $this.data('id')).removeClass('on');
      },
      loginOut: function () {
        this.$http.get(APIHOST + '/zxpc/user/loginOut', {sid: sessionStorage.getItem('sid')}).then((response) => {
          response = response.body;
          if (response.code === ERR) {
            this.$layer.msg(response.msg);
          }
          sessionStorage.setItem('isLogin', false);
          sessionStorage.setItem('mobile', '');
          sessionStorage.setItem('nickname', '');
          sessionStorage.setItem('head_img', '');
          sessionStorage.setItem('order_count', '');
          sessionStorage.setItem('yy_countame', '');
          sessionStorage.setItem('integral', '');
          sessionStorage.setItem('sid', '');
          this.userInfo.isLogin = false;
          this.userInfo = {};
          this.$router.push('/index');
        });
      },
      // 用户签到
      userQD: function () {
        window.eventBus.$emit('invokeGetUserQD');
      }
    }
  };
</script>

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
    float: left;
    margin:0 30px;
  }
  .header .header-nav>ul>li a{
    display: block;
  }
  .header .header-nav {
    position: relative;
    margin-left: 160px;
  }
  #topNavList>li.on a, #topNavList>li:hover a,#userLogin li:hover a, #userLogin li a:hover{color: #26cb9b;}
  .header .header-nav-right{margin-left: 0;}
  #userLogin li{
    float: left;
    padding: 0 20px;
    margin: 27px 0;
    line-height: 1;
    height: 13px;
    background: #fff;
  }
  #userLogin>li:nth-child(2){
    padding: 10px;
    margin: 0 20px;
    height: 100%;
  }
</style>
