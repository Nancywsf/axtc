<template>
  <div class="">
    <v-header :meta="meta" :userInfo="userInfo"></v-header>
    <div class="main">
      <div class="cumb part-box txtAligin-right cl">当前位置：首页—装修公司—{{com.title}}</div>
      <div class="part part-top part-top-company">
        <div class="part-box">
          <div class="left-img fl">
            <img :src="com.img1" :alt="com.title">
            <p class="left-img-bottom color-blue-light">交易量：{{com.yuyue}}</p>
          </div>
          <div class="middle-info fl">
            <h2 class="title"><em class="fl">{{com.title}}</em> <em class="bg-red isCertify">已认证</em></h2>
            <div class="cl"></div>
            <div class="tags tags-company"><em class="bg-red">营</em><em class="bg-yellow">金</em><em class="bg-blue">惠</em></div>
            <div class="subtitle-aspiration color-blue-d" :title="com.introduction">{{com.introduction}}</div>
            <div class="color-blue-light middle-info-buttom">
              预约热线：<em class="color-red-d">{{com.mobile}}</em>
              <!--装修案例：<em class="color-red-d">{{com.count}}个</em>-->
              地址：<em class="color-red-d">{{com.address}}</em>
            </div>
          </div>
          <div class="right-rate fr">
            <div class="sore"><em class="color-red-d">{{Number(com.pingfeng).toFixed(1)}}</em>/5</div>
            <button class="btn-yy bg-green" data-dlialog="main-yysj" @click="clickYY(com);">立即预约</button>
          </div>
        </div>
        <div class="cl"></div>
      </div>
      <div class="part part-tab">
        <div class="part-box">
          <router-link :to="{path: '/zxCompanyInfo/' + com.id  + '/case'}" :class="{on: $route.path.indexOf('case') >= 0 }">装修案例</router-link>
          <router-link :to="{path: '/zxCompanyInfo/' + com.id  + '/member'}" :class="{on: $route.path.indexOf('member') >= 0 }">团队成员</router-link>
          <!--<em class="subtitle">（{{com.evaluate_count}}）</em>-->
          <router-link :to="{path: '/zxCompanyInfo/' + com.id  + '/comment'}" :class="{on: $route.path.indexOf('comment') >= 0 }">业主评价</router-link>
          <router-link :to="{path: '/zxCompanyInfo/' + com.id  + '/introduction'}" :class="{on: $route.path.indexOf('introduction') >= 0 }">公司简介</router-link>
        </div>
      </div>

      <section class="part main-part">
        <div class="part-box">
          <article class="part-left fl">
            <nuxt-child/>
          </article>
          <section class="part-right part-ad fl">
            <a class="right-content-item">
              <img src="~/static/img/ad03.jpg" alt="积分嘉年华">
            </a>
            <a href="/we/partner" class="right-content-item">
              <img src="~/static/img/ad04.jpg" alt="商家入驻">
            </a>
          </section>
        </div>
      </section>
      <div class="cl"></div>

    </div>

    <v-footer :meta="meta"></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import vHeader from '~/components/header/header'
  import vFooter from '~/components/footer/footer'
  import axios from 'axios'
  export default {
    components: {
      vHeader, vFooter
    },
    asyncData (context) {
      return axios.get(context.store.state.HOST + '/zxpc/company/getZxCompanyById?id=' + context.route.params.id).then((res) => {
        return { com: res.data.data }
      })
    },
    data () {
      return {
        meta: { tabIndex: 1, hideHeader: true, hideFooter: true },
        userInfo: {isLogin: false}
      }
    }
  }
</script>

<style scoped>
  .cumb{line-height: 60px;}
  .part-top-company{
    background: #fafafa;
    font-size: 14px;
    padding-bottom: 5px;
  }
  .part-top-company .left-img{
    margin-top: -40px;
    text-align: center;
    width: 162px;
  }
  .part-top-company .left-img img{
    width: 162px;
    height: 163px;
    display: block;
    border: 9px solid #fafafa;
  }
  .left-img-bottom{
    margin: 9px 0;
    background: #e2e7f1;
    display: inline-block;
    padding: .1em .5em;
  }
  .part-top-company .middle-info{
    width: 720px;
    padding: 18px;
  }
  .part-top-company .middle-info .title{
    font-size: 23px;
  }
  .part-top-company .middle-info .isCertify{
    font-size: 13px;
    padding: .2em .4em;
    margin-left: 20px;
    background: #fb4a4a;
  }
  .subtitle-aspiration{
    margin: 24px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .middle-info-buttom em{
    margin-right: 40px;
  }
  .part-top-company .right-rate{
    width: 200px;
    text-align: right;
  }
  .part-top-company .right-rate button{
    border: none;
    width: 120px;
    height: 40px;
    font-size: 18px;
  }
  .part-top-company .right-rate .sore{
    padding: 45px 0 30px;
    width: 120px;
    text-align: center;
    float: right;
    color: #999;
  }
  .part-top-company .right-rate .sore em{
    font-size: 38px;
    margin-right: 2px;
  }
  .part-tab{
    margin: 30px 0;
    background: #fafafa;
    line-height: 90px;
    font-size: 18px;
    overflow: hidden;
  }
  .part-box>a{
    display: block;
    float: left;
    padding: 0 40px;
  }
  .part-box>a.on{
    color: #26cb9b;
    border-bottom: 4px solid #26cb9b;
  }
  .part-box>a.on em{
    color: #26cb9b !important;
  }
  .main-part .part-left{
    width: 820px;
    border-right: 7px solid #f6f6f6;
    padding-right: 20px;
  }
  .part-right{
    width: 355px;
    padding-left: 20px;
  }
  .part-ad a{
    margin-bottom: 20px;
    display: block;
  }
</style>
