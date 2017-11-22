<template>
  <section class="container">
    <!--头部-->
    <div class="main">

      <!--我们的服务 开始-->
      <div class="part part-wmdfw">
        <div class="part-box">
          <router-link to="mfsj">
            <section class="item-wmdfw item-wmdfw-mfsj">
              <h3>免费设计</h3>
              <p>为您获取三份设计方案</p>
            </section>
          </router-link>
          <router-link to="zxfy">
            <section class="item-wmdfw item-wmdfw-mflf">
              <h3>免费报价</h3>
              <p>为您获取三份设计方案</p>
            </section>
          </router-link>
          <router-link to="zxxd">
            <section class="item-wmdfw item-wmdfw-zxsj">
              <h3>装修信贷</h3>
              <p>为您获取三份设计方案</p>
            </section>
          </router-link>
          <router-link to="zxbz">
            <section class="item-wmdfw item-wmdfw-zxbz">
              <h3>装修保障</h3>
              <p>为您获取三份设计方案</p>
            </section>
          </router-link>
        </div>
      </div>
      <!--我们的服务 结束-->

      <!--装修商家 开始-->
      <div class="part part-zxsj">
        <div class="part-box">
          <h1 class="part-title title">装修商家</h1>
          <p class="part-subtitle subtitle">推荐优秀的装修商家</p>
          <div class="part-content">
            <ul class="zxsj-list">
              <li v-for="item in zxsj">
                <div class="img-box">
                  <router-link :to="{path:'/zxCompanyInfo/'+ item.id + '/case'}" target="_blank">
                    <img :src="item.img1" :alt="item.title">
                    <div class="tag bg-red">免费设计</div>
                  </router-link>
                </div>
                <div class="bottom-txt">
                  <router-link :to="{path:'/zxCompanyInfo/'+ item.id + '/case'}" target="_blank">
                    <h3 class="title" :title="item.title"><i class="fa fa-building"></i>{{item.title}}</h3>
                    <p class="subtitle">
                      <em class="fl">案例：<em class="color-red">{{item.case_total}}</em></em>
                      <em class="fr">好评：<em class="color-red">{{(Number(item.pingfeng) / 5 * 100).toFixed(1) + '%'}}</em></em>
                    </p>
                  </router-link>
                  <a :data-id="item.id" class="linkBtn btn-yysj" target="_blank" data-dlialog="main-yysj" @click="clickYY(item)">预约商家</a>
                </div>
              </li>
            </ul>
          </div>
          <router-link :to="{path:'/zxCompany'}" class="linkBtn-formore">更多&nbsp;&nbsp;&gt;&gt;</router-link>
        </div>
      </div>
      <!--装修商家 结束-->

      <!--服务流程 开始-->
      <div class="part part-fwlc">
        <div class="part-box">
          <h1 class="part-title title">{{fwlc.title}}</h1>
          <p class="part-subtitle subtitle">{{fwlc.subtitle}}</p>
          <div class="part-content">
            <ul class="fwlc-list">
              <li v-for="item in fwlc.steps">
                <div class="img-box" :style="'background-image: url(' + item.img + ');'"></div>
                <h4 class="title">{{item.title}}</h4>
                <p class="subtitle">{{item.subtitle}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--服务流程 结束-->

      <!--今日资讯 开始-->
      <div class="part part-jrzx">
        <h1 class="part-title title">今日资讯</h1>
        <p class="part-subtitle subtitle">实时，时效，专注</p>
        <div class="part-content part-box">
          <ul class="tab-list">
            <li :class="{'on': newstab === 0}" data-tab="_gsdt" @click="newstab = 0">公司动态</li>
            <li :class="{'on': newstab === 1}" data-tab="_mtbd" @click="newstab = 1">媒体报道</li>
            <li :class="{'on': newstab === 2}" data-tab="_hyzx" @click="newstab = 2">行业资讯</li>
          </ul>
          <div class="tab-content">
            <div class="_gsdt" v-show="newstab === 0">
              <ul class="news-list news-txt fl">
                <li class="header-news"><a href="">重磅！江苏1123李振ad防守打法</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li class="hot-news"><a href="">重磅！江苏李振ad防守打法</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
              </ul>
              <ul class="news-list news-img fl">
                <li><a href=""><img src="/img/banner.jpg" alt="风生水起！"><div class="bottom">风生水起！风生水起！风生水起！风生水起！</div></a></li>
                <li><a href=""><img src="/img/banner.jpg" alt="风生水起！"><div class="bottom">风生水起！风生水起！风生水起！风生水起！</div></a></li>
                <li><a href=""><img src="/img/banner.jpg" alt="风生水起！"><div class="bottom">风生水起！风生水起！风生水起！风生水起！</div></a></li>
                <li><a href=""><img src="/img/banner.jpg" alt="风生水起！"><div class="bottom">风生水起！风生水起！风生水起！风生水起！</div></a></li>
                <li><a href=""><img src="/img/banner.jpg" alt="风生水起！"><div class="bottom">风生水起！风生水起！风生水起！风生水起！</div></a></li>
              </ul>
            </div>
            <div class="_mtbd" v-show="newstab === 1" style="display: none;">
              <ul class="news-list news-txt fl">
                <li class="header-news"><a href="">重磅！江苏1123李振ad防守打法</a></li>
                <li><a href="">·&nbsp;媒体报道</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li class="hot-news"><a href="">重磅！江苏李振ad防守打法</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
              </ul>
              <ul class="news-list news-img fl">
                <li><a href=""><img src="/img/banner.jpg" alt="风生水起！"><div class="bottom">风生水起！风生水起！风生水起！风生水起！</div></a></li>
                <li><a href=""><img src="/img/banner.jpg" alt="风生水起！"><div class="bottom">风生水起！风生水起！风生水起！风生水起！</div></a></li>
                <li><a href=""><img src="/img/banner.jpg" alt="风生水起！"><div class="bottom">风生水起！风生水起！风生水起！风生水起！</div></a></li>
                <li><a href=""><img src="/img/banner.jpg" alt="风生水起！"><div class="bottom">风生水起！风生水起！风生水起！风生水起！</div></a></li>
                <li><a href=""><img src="/img/banner.jpg" alt="风生水起！"><div class="bottom">风生水起！风生水起！风生水起！风生水起！</div></a></li>
              </ul>
            </div>
            <div class="_hyzx" v-show="newstab === 2" style="display: none;">
              <ul class="news-list news-txt fl">
                <li class="header-news"><a href="">重磅！江苏1123李振ad防守打法</a></li>
                <li><a href="">·&nbsp;行业资讯</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li class="hot-news"><a href="">重磅！江苏李振ad防守打法</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
                <li><a href="">·&nbsp;啊咧啊咧啊咧啊咧啊咧啊咧啊咧</a></li>
              </ul>
              <ul class="news-list news-img fl">
                <li><a href=""><img src="/img/banner.jpg" alt="风生水起！"><div class="bottom">风生水起！风生水起！风生水起！风生水起！</div></a></li>
                <li><a href=""><img src="/img/banner.jpg" alt="风生水起！"><div class="bottom">风生水起！风生水起！风生水起！风生水起！</div></a></li>
                <li><a href=""><img src="/img/banner.jpg" alt="风生水起！"><div class="bottom">风生水起！风生水起！风生水起！风生水起！</div></a></li>
                <li><a href=""><img src="/img/banner.jpg" alt="风生水起！"><div class="bottom">风生水起！风生水起！风生水起！风生水起！</div></a></li>
                <li><a href=""><img src="/img/banner.jpg" alt="风生水起！"><div class="bottom">风生水起！风生水起！风生水起！风生水起！</div></a></li>
              </ul>
            </div>
          </div>
          <router-link to="/news" class="fr for-more color-green">更多&nbsp;&gt;</router-link>
        </div>
      </div>
      <!--今日资讯 结束-->

      <!--我们的优势 开始-->
      <div class="part part-advans">
        <div class="part-box">
          <ul>
            <li>
              <div class="img-box"><i class="icon"></i>自由比价</div>
              <h5 class="title">三家公司 自由比价</h5>
              <p class="subtitle">对比三家公司出报价和方案</p>
            </li>
            <li>
              <div class="img-box"><i class="icon"></i>品质服务</div>
              <h5 class="title">优质服务 品质保障</h5>
              <p class="subtitle">严格监督装修每一步，保障装修质量</p>
            </li>
            <li>
              <div class="img-box"><i class="icon"></i>诚信商家</div>
              <h5 class="title">诚信商家 安全保障</h5>
              <p class="subtitle">商家诚信，为业主良心考虑，真正做好装修</p>
            </li>
            <li>
              <div class="img-box"><i class="icon"></i>重金保障</div>
              <h5 class="title">高额保障 诚信服务</h5>
              <p class="subtitle">商家高额保障金，严格把关每一步装修流程</p>
            </li>
          </ul>
        </div>
      </div>
      <!--我们的优势 结束-->

    </div>
    <!--底部-->
  </section>
</template>

<script>
  import axios from 'axios'
  const ERR = 0
  let miniToastr
  if (process.browser) {
    miniToastr = require('mini-toastr')
  }
  export default {
    asyncData (context) {
      function zxsj () {
        return axios.get(context.store.state.HOST + '/zxpc/company/get_index_zx_company')
      }
      return axios.all([
        zxsj()
      ])
        .then((res) => {
          return {
            zxsj: res[0].data.data
          }
        })
    },
    data () {
      return {
        meta: { tabIndex: 0, hideHeader: true, hideFooter: true },
        userInfo: {isLogin: ''},
        sid: '',
        indexSwiperOption: {
          notNextTick: true,
          loop: true,
          setWrapperSize: true,
          pagination: '#indexSwiper .swiper-pagination',
          paginationClickable: true,
          autoplay: 3000
        },
        searchTabIndex: 0,
        searchKey: '',
        yhqSwiperOption: {
          notNextTick: true,
          slidesPerView: 4,
          spaceBetween: 30,
          prevButton: '#yhqSwiper .swiper-button-prev',
          nextButton: '#yhqSwiper .swiper-button-next'
        },
        swiperOption_jc: {
          notNextTick: true,
          slidesPerView: 3,
          spaceBetween: 30,
          prevButton: '#jcsjSwiper-wrap .swiper-button-prev',
          nextButton: '#jcsjSwiper-wrap .swiper-button-next'
        },
        fwlc: {
          title: '服务流程',
          subtitle: '认真服务每一步，给您温暖的家',
          steps: [{
            img: '/img/icon-time.png',
            title: '预约商家',
            subtitle: '提交姓名和电话'
          }, {
            img: '/img/icon-files.png',
            title: '对比方案',
            subtitle: '对比多家公司方案'
          }, {
            img: '/img/icon-dialogs.png',
            title: '线下沟通',
            subtitle: '线下与商家沟通'
          }, {
            img: '/img/icon-con.png',
            title: '签订合同',
            subtitle: '签订合同条款协议'
          }, {
            img: '/img/icon-zx.png',
            title: '开始装修',
            subtitle: '装修开始阶段'
          }, {
            img: '/img/icon-speed.png',
            title: '支付费用',
            subtitle: '支付装修所需费用'
          }, {
            img: '/img/icon-wc.png',
            title: '验收完成',
            subtitle: '所有项目完成验收'
          }]
        },
        swiperOption: [
          {
            notNextTick: true,
            loop: true,
            setWrapperSize: true,
            prevButton: '#zxalSwiper .swiper-button-prev',
            nextButton: '#zxalSwiper .swiper-button-next'
          }
        ],
        newstab: 0
      }
    },
    created () {
    },
    methods: {
      changSearchKey (event) {
        //        event.
        //        $this.addClass('on').siblings().removeClass('on')
        //        $this.parents('.search-wrap').find('input').attr('placeholder', $this.data('placeholder'))
        //        $('#searchKey').data('type', $this.data('type'))
      },
      searchKeyWord () {},
      clickYY (item) {
        if (this.userInfo.isLogin === 'true') { // 已登录
          let data = {
            company_id: item.id,
            cpmpanyName: item.title,
            username: sessionStorage.getItem('nickname'),
            mobile: sessionStorage.getItem('mobile'),
            sid: sessionStorage.getItem('sid')
          }
          let res = this.$store.dispatch('yyShop', data)
          if (res) { this.showLoginError({message: '预约成功', type: 'info'}) }
          return false
        }
        // 未登录
        // this.openDialog()
      },
      buyYHQ (event) {
        var data = {}
        let o = event.currentTarget
        data.pay_points = o.getAttribute('data-point')
        data.coupon_id = o.getAttribute('data-id')
        if (this.userInfo.isLogin === 'false') {
          this.showLoginError({message: '请先登录，再领取优惠券', type: 'error'})
          return false
        }
        var mobile = sessionStorage.getItem('mobile')
        axios.post(
          this.$store.state.HOST + '/zxpc/my/duihuan',
          {mobile: mobile, pay_points: data.pay_points, coupon_id: data.coupon_id, sid: sessionStorage.getItem('sid')},
          {emulateJSON: true}
        ).then((response) => {
          response = response.data
          if (response.code === ERR) {
            this.showLoginError({message: response.msg, type: 'error'})
            return false
          }
          this.showLoginError({message: response.msg, type: 'info'})
          if (response.code === 1) {
            let shade = document.querySelector('.main-shade')
            shade.style.display = 'none'
            shade.className += shade.className.replace('show', '')
          }
        })
      },
      zxalImgItem (event) {
        let o = event.currentTarget
        let siblings = o.parentNode.childNodes
        let index = 0
        for (let i = 0; i < siblings.length; i++) {
          if (o === siblings[i]) {
            siblings[i].className = 'on'
            index = i
          } else {
            siblings[i].className = ''
          }
        }
        let swiperSiblings = document.querySelector('#zxalSwiper').childNodes
        let swiper = document.querySelector('#zxalSwiper').childNodes[index]
        for (let i = 0; i < swiperSiblings.length; i++) {
          if (swiper === swiperSiblings[i]) {
            swiperSiblings[i].className += ' on'
            index = i
          } else {
            swiperSiblings[i].className = swiperSiblings[i].className.replace(' on', '')
          }
        }
        if (swiper.getAttribute('data-init') === true) { return false }
      }
    },
    mounted () {
      miniToastr.init()
      this.userInfo.isLogin = sessionStorage.getItem('isLogin')
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
  :after, :not(.fa):before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    clear: both;
    display: table;
    content: " ";
  }
  /*banner 开始*/
  .banner{
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .home-banner{
    height: 550px;
  }
  .banner-search{
    position: absolute;
    width: 566px;
    height: 105px;
    padding: 5px;
    left: 50%;
    bottom: 110px;
    margin-left: -283px;
    background: rgba(0,0,0,.6);
    border-radius: 0;
    z-index: 10;
  }
  #indexSwiper{height: 100%;}
  #indexSwiper img {
    width: 100%;
    height: 100%;
  }
  #indexSwiper .swiper-pagination{bottom:20px;}
  .banner-search .keyword-list{
    height: 46px;
  }
  .banner-search .keyword-list li{
    position: relative;
    float: left;
    color: #999;
    font-size: 15px;
    margin: 8px 15px 15px;
    cursor: pointer;
    height: 24px;
  }
  .banner-search .keyword-list li.on:after{
    position: absolute;
    left: 50%;
    margin-left: -12px;
    bottom: -14px;
    border: 10px solid transparent;
    border-bottom-color: #fff;
  }
  .banner-search .keyword-list li.on,.banner-search .keyword-list li:hover{
    color: #fff;
  }
  .banner-search .search-fill{
    position: relative;
    width: 100%;
    padding: 1px;
    background: #fff;
    font-size: 1.5rem;
    border-radius: 0;
  }
  .banner-search .search-fill input{
    float: left;
    width: 448px;
    border: none;
    font-size: 1.5rem;
    text-indent: 50px;
    line-height: 3;
  }
  .banner-search .search-fill .fa-search{
    position: absolute;
    top: 15px;
    left: 13px;
    font-size: 2rem;
    color: #999;
  }
  .banner-search .search-fill button{
    float: right;
    width: 105px;
    line-height: 47px;
    font-size: 2rem;
    border:none;
    border-radius: 0;
  }
  /*banner 结束*/

  .part{
    padding-top: 100px;
  }
  .part .part-box{
    position: relative;
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding-bottom: 55px;
  }
  .part-advans .part-box {
    padding-bottom: 0;
  }
  .part .part-title{
    font-size: 3.4rem;
    text-align: center;
    font-weight: bold;
  }
  .part .part-title:before{
    content:'······';
    display: inline;
    color: #cfcfcf;
    letter-spacing: 10px;
    font-weight: normal;
  }
  .part .part-title:after{
    content:'······';
    display: inline;
    color: #cfcfcf;
    letter-spacing: 10px;
    margin-left: 10px;
    font-weight: normal;
  }
  .part .part-subtitle{
    font-size: 1.5rem;
    margin-top: 5px;
    margin-bottom: 50px;
    text-align: center;
  }
  .part-content{position: relative;}
  /*服务流程 开始*/
  .part-fwlc{
    background: #fafafa;
  }
  .fwlc-list li{
    position: relative;
    float: left;
    width: 14.2%;
  }
  .fwlc-list li:not(:last-child):after{
    content: "》";
    position: absolute;
    right: 0;
    top: 25%;
    color: transparent;
    font-size: 1.6rem;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAgCAYAAAArBentAAAABGdBTUEAALGPC/xhBQAAAc1JREFUOBGdlD1LA0EQhs3mDhGrgMQUptRSk3CxEBvFTuy0sNImVkrQHxDwF5hGMXUstLWRWGmbLw3B+AcEm7SSy0ES33fdO+4jF9GBZWdnnn2HnRtuauovVq/X9d94Ua1WC6PR6KtWq21NgkUkEpkDSMXziaCu6yUCgNeguhoGi1Qq9QbVRwWchoJMCCEuuEN1t9VqLdD3m2Agk8lUoPoOV7Ms68QP8SxBQCP4RQXkoDqrfGeTIE+JRKKMC12Uj0H10CGU44DJZLIH6Jpx7HmsiBt2QAbxqCuoWnAXm83mdihoGMYnkrcEBoOBp1UeRQKapslWwd1sNBrLjNECYDqdfkX5JybdqgGQAEyq4sJ+u92eZ2AsCOABOXZh2jRN+aix4HA43AE4g2Xi0j32UEX7xWV0ojsWRP8MlFxnEh2wP2tQES89IwSrYFg6P66vNEcMantMRqNRu5+S9TwGw3CMqIbVgZo9zF5QjdYRo1Ar4rUcPcd4W1q/3z+AEwPQjcfjNyrsbLK0Gqm8ipY4cg6hHAmqkVqCmoV16Yd4liC+hN2SOzVqAVZAbQWlN1TG0xI3LdDgHAMo+ZzNZl/cSbfPX8oHAj20pOBO/Nv/Bv6Yohj/co5EAAAAAElFTkSuQmCC);
  }
  .fwlc-list .img-box{
    position: relative;
    width: 85px;
    height: 85px;
    margin: 0 auto 15px;
    background-repeat: no-repeat;
    background-position: center;
    font-size: 1.5rem;
    margin-bottom: 15px;
    background-size: auto 90%;
  }
  .fwlc-list li:hover .img-box{
    -webkit-animation: float ease-in-out 2s infinite;
    animation: float ease-in-out 2s infinite;
  }
  .fwlc-list .title, .fwlc-list .subtitle{
    font-size: 1.5rem;
    margin-top: 5px;
  }
  /*服务流程 结束*/

  /*经典案例 开始*/
  .part-jdal .left-swiper{
    position: relative;
    width: 800px;
    height: 555px;
    overflow: hidden;
  }
  .part-jdal .right-allist{
    /*width: 52%;*/
    width: calc(100% - 800px);
    width: -webkit-calc(100% - 800px);
    height: 555px;
    float: left;
  }
  #zxalSwiper .swiper-container{
    position: absolute;
    top:0;
    left:0;
    /*display: none;*/
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  #zxalSwiper .swiper-container.on, #zxalSwiper .swiper-container-horizontal.on{
    z-index: 2;
  }
  #zxalSwiper img{
    width: 100%;
    height: 555px;
    vertical-align: middle;
  }
  #zxalSwiper .swiper-container .bottom-txt{
    position: absolute;
    bottom:0;
    left:0;
    width: 100%;
    background: rgba(0,0,0,.5);
    color: #fff;
    font-size: 1.4rem;
    /*line-height: 3;*/
    padding: 1em 0 1em 10rem;
  }
  #zxalSwiper .swiper-button-prev, #zxalSwiper .swiper-button-next{
    width: 62px;
    height: 62px;
    text-align: center;
    line-height: 59px;
    background: #37bd98;
    color: #fff;
    font-size: 4rem;
    bottom: 100px;
    top: auto;
  }
  #zxalSwiper .swiper-button-prev{
    left:auto;
    right: 130px;
  }
  #zxalSwiper .swiper-button-next{
    right: 50px;
  }
  .part-jdal .right-allist li{
    padding: 23px 25px;
    border-left: 4px solid transparent;
    height: 139px;
    border-top: 1px solid #ededed;
    -webkit-transition: all .25s;
    -moz-transition: all .25s;
    -ms-transition: all .25s;
    -o-transition: all .25s;
    transition: all .25s;
  }
  .part-jdal .right-allist li:last-child{
    border-bottom: 1px solid #ededed;
  }
  .part-jdal .right-allist li.on{
    border-left: 4px solid #36bc97;
    background: #f6f6f6;
  }
  .part-jdal .right-allist .left-img-box{
    width: 92px;height:92px;

  }
  .part-jdal .right-allist .left-img-box img{
    width: 100%;
    height:100%;
  }
  .part-jdal .right-allist .right-txt{
    float: left;
    margin-left: 15px;
  }
  .part-jdal .right-txt .title{
    font-size: 1.6rem;
    margin-bottom: 15px;
    margin-top: 8px;
  }
  .part-jdal .right-txt .subtitle{
    font-size: 1.4rem;
    margin-top: 5px;
  }
  .part-jdal .right-txt .fa{
    margin-right: 5px;
    width: 1em;
    color: #666;
    text-align: center;
  }
  .part-jdal .linkBtn-formore{
    clear: both;
    display: block;
    margin: 45px auto 0;
    font-size: 1.4rem;
    width: 6em;
    color: #3fbd98;
    padding: .3em 0;
    border-radius: 5px;
    border: 1px solid #3fbd98;
    text-align: center;
  }
  /*经典案例 结束*/

  /*装修商家 开始*/
  .part-zxsj{
    background: url(/static/img/zx_bg.jpg) no-repeat;
    background-size: cover;
    height: 655px;
  }
  .zxsj-list li{
    position: relative;
    float: left;
    width: 23.5%;
    box-shadow: 0 0 15px rgba(0,0,0,.1);
    background: #fff;
    -webkit-transition: all 1s;
    -moz-transition: all 1s;
    -ms-transition: all 1s;
    -o-transition: all 1s;
    transition: all 1s;
  }
  .zxsj-list li + li{
    margin-left: 2%;
  }
  .zxsj-list li img{
    width:100%;
    height: 100%;
    -webkit-transition: transform 1s;
    -moz-transition: transform 1s;
    -ms-transition: transform 1s;
    -o-transition: transform 1s;
    transition: transform 1s;
  }
  .zxsj-list li:hover{
    box-shadow: 0 0 25px rgba(0,0,0,.3);
  }
  .zxsj-list li:hover img{
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
  }
  .zxsj-list li .tag{
    position: absolute;
    top:0;
    left: 0;
    padding: .5em 1em;
    font-size: 1.4rem;
  }
  .zxsj-list li .img-box{
    height: 200px;
    overflow: hidden;
  }
  .zxsj-list .bottom-txt{
    height: 155px;
    padding: 20px 15px;
    font-size: 1.6rem;
    text-align: left;
  }
  .zxsj-list .bottom-txt .title{
    font-size: 1.7rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .zxsj-list .bottom-txt .fa{
    font-size: 1.5rem;
    float: left;
    padding-top: 5px;
    margin-right: 9px;
    color: #555;
  }
  .zxsj-list .bottom-txt .subtitle{
    color: #333;
    font-size: 1.5rem;
  }
  .zxsj-list .bottom-txt .subtitle em:before,.zxsj-list .bottom-txt .subtitle em:after{
    display: inline-block;
  }
  .zxsj-list .btn-yysj{
    position: relative;
    display: block;
    width: 6em;
    text-align: center;
    font-size: 1.5rem;
    color: #999;
    border: 1px solid #999;
    padding: .3em 0;
    margin: 22px auto 0;
    clear: both;
    z-index:2;
    overflow: hidden;

    -webkit-transition: all .25s;
    -moz-transition: all .25s;
    -ms-transition: all .25s;
    -o-transition: all .25s;
    transition: all .25s;
  }
  .zxsj-list .btn-yysj:before{
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 90px;
    height: 90px;
    display: block;
    margin: auto;
    background: #37bd98;
    box-shadow: 0 0 20px 20px #37bd98;
    border-radius: 100%;
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transition-property: transform;
    transition-property: transform;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }
  .zxsj-list .btn-yysj:hover:before{
    -webkit-transform: scale(2);
    transform: scale(2);
  }
  .zxsj-list li .btn-yysj:hover{
    /*background-color: #37bd98;*/
    color: #fff;
    border-color: #37bd98;
  }
  .part-zxsj .linkBtn-formore{
    color: #37bd98;
    float: right;
    display: inline-block;
    margin: 20px 0;
    font-size: 1.4rem;
  }
  /*装修商家 结束*/

  /*建材商家 开始*/
  /*.part-jcsj{background-color: #fafafa;}*/
  #allJcsj{
    position: absolute;
    right:0;
    font-size: 1.4rem;
    color: #37bd98;
  }
  #jcsjSwiper .swiper-slide{
    background: #fff;
    text-align: left;
    margin-top: 15px;
    margin-bottom: 15px;
    -webkit-transition: all .25s;
    -moz-transition: all .25s;
    -ms-transition: all .25s;
    -o-transition: all .25s;
    transition: all .25s;
    border: 1px solid #e5e5e5;
  }
  #jcsjSwiper .swiper-slide:hover{
    box-shadow: 0 0 15px 0 rgba(0,0,0,.3);
  }
  .part-jcsj .top-logo{
    height: 100px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 100%;
  }
  .part-jcsj .img-box img{
    width: 100%;
    height: 250px;
    -webkit-transition: transform 1s;
    -moz-transition: transform 1s;
    -ms-transition: transform 1s;
    -o-transition: transform 1s;
    transition: transform 1s;
  }
  #jcsjSwiper .swiper-slide .img-box{
    overflow: hidden;
  }
  #jcsjSwiper .swiper-slide:hover .img-box img{
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
  }
  #jcsjSwiper .bottom-txt{
    height: 100px;
    padding: 20px 25px;
  }
  #jcsjSwiper .bottom-txt .title{
    font-size: 1.7rem;
    margin-bottom: 10px;
  }
  #jcsjSwiper .tags em{
    font-size: 1.4rem;
    border-width: 1px;
    border-style: solid;
    padding: .2em .8em;
    margin-right: 10px;
  }
  #jcsjSwiper .tags em:before, #jcsjSwiper .tags em:after{
    display: inline-block;
  }
  #jcsjSwiper-wrap .swiper-button-prev, #jcsjSwiper-wrap .swiper-button-next{
    background: rgba(0,0,0,.4);
    width: 55px;
    height: 55px;
    border-radius: 50px;
    color: #fff;
    font-size: 3rem;
    line-height: 52px;
    text-align: center;
    top:50%;
    margin-top: -22.5px;
  }
  #jcsjSwiper-wrap .swiper-button-prev{
    left: -30px;
  }
  #jcsjSwiper-wrap .swiper-button-next{
    right: -30px;
  }
  /*建材商家 结束*/

  /*我们的优势 开始*/
  .part-advans li{
    float: left;
    width: 25%;
    text-align: left;
    font-size: 1.4rem;
  }
  .part-advans li .img-box{
    width: 100%;
    height: 50px;
    font-size: 1.7rem;
    line-height: 50px;
  }
  .part-advans .img-box .icon{
    float: left;
    width:43px;
    height: 50px;
    margin-right: 5px;
    background-repeat: no-repeat;
    background-position: left center;
    background-image: url(/static/img/icon-price.svg);
  }
  .part-advans li:hover .icon{
    -webkit-animation: round ease-in-out .3s;
    animation: round ease-in-out .3s;
  }
  .part-advans li:nth-child(2) .img-box .icon{
    background-image: url(/static/img/icon-diamond.svg);
  }
  .part-advans li:nth-child(3) .img-box .icon{
    background-image: url(/static/img/icon-store.svg);
  }
  .part-advans li:nth-child(4) .img-box .icon{
    background-image: url(/static/img/icon-safeguard.svg);
  }
  .part-advans li .title{
    margin: 20px 0 10px;
  }
  .part-advans li .title,.part-advans li .subtitle{
    font-size: 1.4rem;
  }
  /*我们的优势 结束*/

  .part-wmdfw {
    padding: 55px 0 0;
    margin: -35px 0;
  }
  .part-wmdfw .part-box {
    display: flex;
  }
  .part-wmdfw .part-box>a{
    flex: 1;
    margin:0 40px;
  }
  .item-wmdfw {
    position: relative;
    font-size: 15px;
    text-align: left;
    padding: 2rem 0 2rem 6rem;
  }
  .item-wmdfw:before{
    content: '';
    position: absolute;
    top:2rem;left: 0;
    width: 5rem;
    height: 5rem;
    background-repeat: no-repeat;
    background-size: 235px;
    background-position: center;
    background-image: url(/static/img/icons.png);
  }
  .item-wmdfw + .item-wmdfw {
    border-left: 1px dashed #e5e5e5;
  }
  .item-wmdfw p{font-size: 14px; color: #666;margin-top: .5em;}
  .item-wmdfw-mfsj:before {
    background-position: 0 0;
  }
  .item-wmdfw-mflf:before {
    background-position: -88px 0;
  }
  .item-wmdfw-zxsj:before {
    background-position: -180px 0;
  }
  .item-wmdfw-zxbz:before {
    background-position: -102px -387px;
  }
  #yhqSwiper p {
    padding: 1rem 5px 1rem 0;
    font-size: 1.5rem;
  }
  .btn-getyhq {
    color: #ff2424;
    cursor: pointer;
  }
  .btn-getyhq:hover{
    text-decoration: underline;
  }
  #yhqSwiper{
    height: 270px;
  }
  .part-yhq{position: relative;background: #fafafa;}
  .part-yhq:before{
    position: absolute;
    top:0;
    width: 100%;
    height: 5px;
    /*background: url(/static/img/bg.jpg) repeat;*/
  }
  #yhqSwiper img{
    height: 127px;
  }
  #yhqSwiper .swiper-button-next, #yhqSwiper .swiper-button-prev {
    background: #d8d8d8;
    width: 50px;height: 50px;
    font-size: 40px;
    line-height: 50px;
    color: #fff;
    bottom: 30px;margin:0;
    top:auto;
  }
  #yhqSwiper .swiper-button-next{
    right: 0;
  }
  #yhqSwiper .swiper-button-prev{
    right: 100px;left: auto;
  }
  .icon-up {
    width: 50px;height: 50px;
    margin: 0 auto;
    background: url(/static/img/icon-top.png) no-repeat center;
    background-size: 100%;
    -webkit-animation: up-down ease-in-out 2s infinite;
    animation: up-down ease-in-out 2s infinite;
  }
  .login-txt {
    font-size: 1.4rem;
    color: #666;
  }
  .login-txt em{
    color: #000;
    font-weight:bold;
    display: inline-block;
  }
  #yhqSwiper .price{
    position: absolute;
    top: 10px;
    font-size: 43px;
    left:109px;
    color: #f86868;
  }
  .part-jrzx {
    margin-top: 50px;
    background: #fafafa;
    font-size: 15px;
    padding-bottom: 50px;
  }
  .part-jrzx .part-content {background: #fff;padding: 30px;}
  .part-jrzx .tab-list li{
    display: inline-block;
    width: 4em;
    margin: 0 1em 1.5em;
    font-size: 25px;
    line-height: 1.8;
    cursor: pointer;
  }
  .part-jrzx .tab-list li:hover{
    color: #37bd98;
  }
  .part-jrzx .tab-list li.on {
    border-bottom: 2px solid #37bd98;
    color: #37bd98;
  }
  .part-jrzx .news-list{
    width: 400px;
    margin-right: 60px;
  }
  .part-jrzx .news-list li {
    position: relative;
    line-height: 2;
    font-size: 16px;
    text-align: left;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .part-jrzx .news-list li a {
    position: relative;
    color: #666;
  }
  .part-jrzx .news-list li a:hover {
    color: #37bd98;
  }
  .part-jrzx .news-txt .header-news a, .part-jrzx .news-txt .hot-news a{
    font-weight: bold;
    font-size: 17px;
    color: #333;
    line-height: 3;
  }
  .part-jrzx .news-txt .header-news a:after {
    content: '头条';
    position: absolute;
    top: -15px;right:-38px;
    font-size: 12px;
    height: 1em;
    width:33px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background: #f74343;
    color: #fff;
  }
  .part-jrzx .news-txt .header-news a:before{
    content: '';
    position: absolute;
    top: 2px;
    right: -11px;
    border: 3px solid #f74343;
    border-right-color: transparent;
    border-bottom-color: transparent;
  }
  .part-jrzx .news-txt .hot-news a:after{
    content: '热点';
    position: absolute;
    top: -15px;right:-38px;
    font-size: 12px;
    height: 1em;
    width:33px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background: #458ce6;
    color: #fff;
  }
  .part-jrzx .news-txt .hot-news a:before{
    content: '';
    position: absolute;
    top: 2px;
    right: -11px;
    border:3px solid #458ce6;
    border-right-color: transparent;
    border-bottom-color: transparent;
  }
  .part-jrzx .news-img {
    width:679px;
    margin-right: 0;
  }
  .part-jrzx .news-img li{
    display: inline-block;
    float: left;
    height: 200px;
    position: relative;
  }
  .part-jrzx .news-img li a {
    height: 200px;
    display: block;
  }
  .part-jrzx .news-img li:nth-child(1) {
    width: 446px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .part-jrzx .news-img li:nth-child(2) {
    width: 213px;
    margin-bottom: 20px;
  }
  .part-jrzx .news-img li:nth-child(3) {
    width: 213px;
    margin-right: 20px;
  }
  .part-jrzx .news-img li:nth-child(4) {
    width: 213px;
    margin-right: 20px;
  }
  .part-jrzx .news-img li:nth-child(5) {
    width: 213px;
  }
  .part-jrzx .news-img li img {
    width: 100%;height: 100%;
  }
  .part-jrzx .news-img .bottom {
    position: absolute;
    bottom: 0;
    background: rgba(0,0,0,.6);
    color: #fff;
    font-size: 13px;
    width: 100%;
    z-index: 5;
    padding: 0 .5em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .part-jrzx .news-img li:hover .bottom {
    background: rgba(55,189,151,1);
  }
  .part-jrzx .for-more {
    margin-top: 20px;
  }
</style>
