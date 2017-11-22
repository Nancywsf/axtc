<template>
  <div>
    <v-header :meta="meta" :userInfo="userInfo"></v-header>
    <div>
      <!--banner 开始-->
      <div class="banner" style="background-image: url(/img/banner-xd.jpg)">
        <div class="part-box">
          <section class="banner-title">
            <h1>我们希望，每个人都能拥有理想中的家具</h1>
            <p>同城壹家覆盖了南通家装领域所有品类的商家，</p>
            <p>申请贷款之后，你就可以在同城壹家分期所有的合作商家里消费</p>
            <button class="btn-mfsj" @click="showFill">立刻申请</button>
          </section>
          <section class="banner-fill-box">
            <h1 class="title">简单一步<br>立即申请借贷</h1>
            <div class="fill-item">
              <input type="text" placeholder="输入您的姓名" v-model="userData.user_name">
            </div>
            <div class="fill-item">
              <input type="text" placeholder="输入您的手机号码" v-model="userData.phone" :class="'status-' + phoneIsOk" @blur="phoneIsOk=validator();" data-pattern="^1[34578]\d{9}$" data-error="您填写的手机号码不正确">
            </div>
            <button class="btn-mfsj" @click="getXD">提交</button>
          </section>
        </div>
      </div>
      <!--banner 结束-->

      <section class="part part-bg part-bg-zxdk">
        <div class="bg"></div>
      </section>

      <section class="part part-bg part-bg-wmdys">
        <div class="bg"></div>
      </section>

      <section class="part part-bg part-bg-dkdb">
        <div class="bg"></div>
      </section>

      <section class="part part-dkjs">
        <h1 class="part-title">在线贷款计算器</h1>
        <div class="part-box">
          <div class="left-box">
            <div class="fl">
              <input v-model="totalPrice" type="number" id="dkPrice" placeholder="输入贷款金额" @keyup="jshk">
              <em class="unit">元</em>
            </div>
            <em class="choose-time">
              选择还款时间：
              <em class="item-time" v-for="(item, index) in hkMonth" :class="{'on' : index === 0}" @click="gethkmonth" :data-month="item">{{item}}个月</em>
            </em>
          </div>
          <div class="left-box">
            <div class="fl">
              <p class="left-fl">借款金额：<em class="color-red">{{totalPrice}}</em>元</p>
              <p class="left-fl">借款期限：<em class="color-red">{{month}}</em>个月</p>
              <p class="left-fl">还款总额：<em class="color-red">{{totalPrice_h}}</em>元</p>
            </div>
            <div class="right">
              每月还款：<em class="price">{{priceMon}}</em>元
            </div>
          </div>
          <div class="right-box">
            <button class="bg-green" @click="jshk">立即计算</button>
            <em class="reset-btn" @click="reset">重置</em>
          </div>
        </div>
      </section>

      <section class="part part-bg part-bg-sqtj">
        <div class="bg"></div>
      </section>

      <section class="part part-bg part-bg-sqlc">
        <div class="bg"></div>
      </section>
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
    data () {
      return {
        meta: { removeML: true, hideHeader: true, hideFooter: true },
        userInfo: {isLogin: false},
        userData: {
          user_name: '',
          phone: ''
        },
        phoneIsOk: '',
        totalPrice: '',
        totalPrice_h: 0,
        hkMonth: [12, 24, 36],
        month: 12,
        priceMon: 0
      }
    },
    methods: {
      clickCheckBox (event) {
      },
      showFill () {
      },
      getXD () {
        axios.post(this.$store.state.HOST + '/zxpc/FreeDesign/xd', this.userData, {emulateJSON: true}).then((response) => {
          response = response.body
          if (response.code === 0) {
            this.$layer.msg(response.msg)
            return false
          }
          this.$layer.msg(response.msg)
        })
      },
      gethkmonth (event) {
      },
      jshk () {
      },
      reset () {
        this.totalPrice = 0
        this.jshk()
      }
    }
  }
</script>

<style scoped>
  .banner {
    width: 100%;
    height: 625px;
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .part-box{position: relative;height: 100%;}
  .banner-fill-box {
    position: absolute;
    top: 50%;right:0;
    margin-top: -285px;
    width: 350px;
    height: 570px;
    background: rgba(0,0,0,.2);
    padding: 60px 35px;
    border-radius: 10px;

    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -ms-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0);
    transform-origin: -250px 500px;
  }
  .banner-fill-box .title{color: #fff;font-size: 30px;margin-bottom: 130px;}
  .fill-item input{
    width:100%;
    background: #fafafa;
    border: 1px solid #e5e5e5;
    font-size: 1.4rem;
    line-height: 3;
    padding:0 .8em;
  }
  .fill-item {margin: 35px 0;}
  .btn-mfsj {
    background: #fe4a4a;
    border: none;
    display: block;
    width: 100%;
    line-height: 2.8;
    color: #fff;
    font-size: 17px;
    width: 10em;
    display: block;
    margin: 160px auto 0;
  }
  .banner-fill-box .btn-mfsj{margin-top: 60px;}
  .banner-title {
    color: #fff;
    font-size: 25px;
    text-align: center;
    padding-top: 170px;
    opacity: 1;

    -webkit-transition: .3s all;
    -moz-transition: .3s all;
    -ms-transition: .3s all;
    -o-transition: .3s all;
    transition: .3s all;
  }
  .banner-title.hidden{
    display: block;
    opacity: 0;
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -ms-transform: scale(0);
    -o-transform: scale(0);
    transform: scale(0);
  }
  .banner-title h1 {
    font-weight: bold;
    margin-bottom: 80px;
  }
  .banner-title p{
    font-size: 18px;
    line-height: 1;
    margin: 20px 0;
  }

  @-webkit-keyframes bounceInLeft{
    0%,60%,75%,90%,100%{-webkit-transition-timing-function:cubic-bezier(0.215,.610,.355,1.000);transition-timing-function:cubic-bezier(0.215,.610,.355,1.000)}
    0%{transform:scale(0);opacity:0;}
    50%{opacity:1;transform: scale(1.03);}
    75%{transform: scale(.95);}
    85%{transform: scale(1.005);}
    100%{transform: scale(1);}
  }
  @keyframes bounceInLeft{
    0%,60%,75%,90%,100%{-webkit-transition-timing-function:cubic-bezier(0.215,.610,.355,1.000);transition-timing-function:cubic-bezier(0.215,.610,.355,1.000)}
    0%{transform:scale(0);opacity:0;}
    50%{opacity:1;transform: scale(1.03);}
    75%{transform: scale(.95);}
    85%{transform: scale(1.005);}
    100%{transform: scale(1);}
  }
  .bounceInLeft{-webkit-animation: bounceInLeft .7s both;}
  .part {
    padding: 75px 0;
    text-align: center;
    font-size: 14px;
    clear: both;
  }
  .part h1.title{
    font-size: 30px;
    margin-bottom: 10px;
  }
  .part-xyjk h1.title{
    color: #4eb1ee;
  }
  .part-xyjk .content .item {
    overflow: hidden;
    width: 50%;
    float: left;
  }
  .part-xyjk .item{
    padding-top: 100px;
  }
  .part-xyjk .item .left {
    float: left;
    width: 90px;height: 90px;
    margin-left: 10px;
    background: #fafafa;
    border: 1px solid #e5e5e5;
    font-size: 40px;
    line-height: 90px;
    color: #666;
  }
  .part-xyjk .item .info{
    text-align: left;
    padding-left: 40px;
    margin-left: 100px;
    color: #666;
  }
  .part-xyjk .item .info h4{
    font-size: 17px;
    margin: 15px 0 10px;
    color: #d8a19f;
  }
  .part-xyjk .content{overflow: hidden}
  .part-sqlc {
    background: url(/static/img/xd-bg.png) repeat;
  }
  .part-sqlc .content{overflow: hidden}
  .part-sqlc .content .item {
    position: relative;
    /*overflow: hidden;*/
    width: 25%;
    float: left;
    padding-bottom: 60px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e5e5e5;
  }
  .part-sqlc .content .item:after {
    content: '1';
    position: absolute;
    left: 50%;
    margin-left: -20px;
    bottom: -20px;
    width: 40px;height: 40px;
    line-height: 40px;
    border: 1px solid #e5e5e5;
    background: #fafafa;
    border-radius: 50%;
  }
  .part-sqlc .content .item:nth-child(2):after{content: '2';}
  .part-sqlc .content .item:nth-child(3):after{content: '3';}
  .part-sqlc .content .item:nth-child(4):after{content: '4';}
  .part-sqlc h1.title{
    color: #d7b69e;
  }
  .part-sqlc .item{
    line-height: 2;
  }
  .part-sqlc .item .img{
    width: 95px;height: 95px;
    margin: 50px auto 20px;
    background: url(/static/img/icons.png) no-repeat;
    background-size: 235px;
    background-position: 7px -69px;
  }
  .part-sqlc .item:nth-child(2) .img{
    background-position: -108px -68px;
  }
  .part-sqlc .item:nth-child(3) .img{
    background-position: 0px -181px;
  }
  .part-sqlc .item:nth-child(4) .img{
    background-position: -106px -181px;
  }
  .part-sqlc h3{
    font-size: 18px;
  }
  .part-sqlc p {
    color: #666;
    line-height: 2;
  }
  .part-ljsq .btn-mfsj{
    margin:20px auto;
    font-size: 20px;
    border: 4px solid #ff7e7e;
    border-radius: 5px;
  }
  .icon-eidt {
    display: inline-block;
    width: 1.2em;height: 1.2em;
    background: url(/static/img/icon-edit.png) no-repeat center;
    background-size: auto 100%;
    margin-right: 5px;
    vertical-align: text-bottom;
  }
  .part-bg {
    width: 100%;
  }
  .part-bg .bg{
    width:1200px;
    margin:0 auto;
    height: 500px;
    background-size: 100% auto;
    background-repeat: no-repeat;
  }
  .part-bg-zxdk .bg{
    background-image: url(/static/img/xd-bg1.png);
  }
  .part-bg-wmdys{background-color: #fafafa;}
  .part-bg-wmdys .bg{
    height: 420px;
    background-image: url(/static/img/xd-wmdys.png);
  }
  .part-bg-dkdb .bg{
    height: 310px;
    background-image: url(/static/img/xd-dkdb.png);
  }
  .part-bg-sqtj .bg{
    width: 900px;
    height: 320px;
    background-image: url(/static/img/xd-sqtj.png);
  }
  .part-bg-sqlc{padding-bottom: 0;}
  .part-bg-sqlc .bg{
    height: 550px;
    background-image: url(/static/img/xd-sqlc.png);
  }
  .part-dkjs {
    background-color: #fafafa;
    /*background: #fafafa url(/static/img/);*/
    overflow: hidden;
    font-size: 16px;
  }
  .part-dkjs .part-box {
    border: 1px solid #e5e5e5;
    overflow: hidden;
    margin-top: 20px;
  }
  .part-title{
    font-size: 28px;
  }
  .part-dkjs .left-box {
    width: 900px;
    float: left;
    padding: 1em;
    line-height: 50px;
    border-right: 1px solid #e5e5e5;
  }
  .part-dkjs .left-box + .left-box{
    border-top: 1px solid #e5e5e5;
  }
  #dkPrice{
    width: 250px;
    float: left;
    height: 50px;
    font-size: 16px;
    padding: .2em .5em;
    margin-left: 20px;
    margin-right: 10px;
    border: 1px solid #e5e5e5;
    line-height: 2.8;
  }
  .item-time {
    font-size: 16px;
    border: 1px solid #37bd98;
    padding: .5em 1em;
    line-height: 1;
    display: inline-block;
    margin-right: 10px;
    color: #37bd98;
    cursor: pointer;
  }
  .item-time.on{
    background: #37bd98;
    color: #fff;
  }
  .left-box{
    font-size: 16px;
  }
  .left-box:nth-child(2)>.fl {
    width: 50%;
    text-align: left;
    margin-left: 20px;
  }
  .price {
    color: #e6ab64;
    font-size: 40px;
  }
  .right{
    margin-left: 50%;
    text-indent: -10rem;
    line-height: 3;
  }
  .right-box .bg-green{
    display: block;
    width: 200px;
    border: none;
    font-size: 16px;
    line-height: 3;
    margin: 90px auto 20px;
  }
  .reset-btn{
    color: #666;
    cursor: pointer;
  }
</style>
