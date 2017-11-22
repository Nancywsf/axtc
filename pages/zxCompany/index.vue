<template>
  <div>
    <v-header :meta="meta" :userInfo="userInfo"></v-header>

    <div class="main main-searchList main-searchList-zx">
      <div class="part part-search">
        <div class="part-box">
          <div class="search-box">
            <input type="text" placeholder="搜索您想要的公司" @keyup.enter="searchListByKey" v-model.lazy="pageData.keyword">
            <button class="bg-green btn-search" @click="searchListByKey" v-model.lazy="pageData.keyWord">搜索</button>
          </div>
          <p class="hot-word">
            热门搜索：
            <a v-for="item in hotKey" @click="clickKeyWord">{{item.keyword}}</a>
          </p>
        </div>
      </div>

      <div class="cumb part-box">当前位置：首页—装修公司</div>

      <div class="search-wrap">
        <div class="part-box">
          <div class="search-left fl">
            <!--<section class="choose-box">-->
            <!--<div class="choose-type" v-for="type in allChoose" :data-type="type.value">-->
            <!--<div class="choose-type-title">{{type.txt}}</div>-->
            <!--<div class="choose-any">不限</div>-->
            <!--<div class="choose-value">-->
            <!--<em v-for="item in type.list" :data-val="item.value">{{item.key}}</em>-->
            <!--</div>-->
            <!--<em class="icon-toggle" @click="openChoose"></em>-->
            <!--</div>-->
            <!--</section>-->
            <section class="px-box">
              <em class="title">排序：</em>
              <em class="on" data-order="" @click="listOrder">默认排序</em>
              <em class="click-order" data-order="case_total " data-type="desc" @click="listOrder">综合实力</em>
              <em class="click-order" data-order="pingfeng " data-type="desc" @click="listOrder">口碑排名</em>
            </section>
            <section class="company-box">
              <ul class="company-list" v-if="zxCompanyList.length > 0">
                <li v-for="com in zxCompanyList">
                  <div class="left-img fl">
                    <div class="img-box">
                      <img :src="com.img1" :alt="com.title">
                    </div>
                    <!--<p>咨询人数：<em class="color-red">{{com.ConsuNumber}}</em></p>-->
                  </div>
                  <div class="middle-info fl">
                    <router-link class="title" :to="{path: 'zxCompanyInfo/'+ com.id+'/case'}" :title="com.title" target="_blank">{{com.title}}</router-link>
                    <div class="tags">
                      <em class="bg-red">营</em><em class="bg-yellow">金</em><em class="bg-blue">惠</em>
                      <div class="fr">案例：<em class="color-red">{{com.case_total}}</em>个</div>
                    </div>
                    <div class="address">地址：{{com.address}}</div>
                    <div class="link-wrap">
                      <button class="bg-green icon-hot" :data-id="com.id" data-dlialog="main-yysj" @click="clickYY(com);">预约商家</button>
                      <!--<a href='' class="color-green">免费报价</a>-->
                    </div>
                    <div class="subtitle simple-info">公司简介：{{com.introduction}} &nbsp;&nbsp;&gt;</div>
                  </div>
                  <div class="right-rate fl">
                    <div class="color-red">{{Number(com.pingfeng).toFixed(1)}}</div>
                    <p class="subtitle">综合评价</p>
                    <div class="right-bottom">好评率：<em class="color-red">{{(Number(com.pingfeng) / 5 * 100).toFixed(1) + '%'}}</em></div>
                  </div>
                </li>
              </ul>
              <p class="no-result subtitle" v-else>很抱歉，没有您想要的搜索结果 ╮(╯▽╰)╭ </p>
              <div class="page-hd fr">
                <v-pagination v-if="zxCompanyList.length > 0" :page-data="pageData" v-on:goPage="getCompanyList"></v-pagination>
              </div>
            </section>
          </div>
          <div class="search-right fr">
            <section class="mfsh-box yysj-box">
              <h2 class="title"></h2>
              <p class="subtitle">提供多家装修公司方案</p>
              <div class="fill-box">
                <i class="fa fa-user"></i>
                <input type="text" placeholder="您的姓名" class="userName" v-model.lazy="userYYSJ.username">
              </div>
              <div class="fill-box">
                <i class="fa fa-phone"></i>
                <input type="text" placeholder="电话号码" class="userPhone" v-model.lazy="userYYSJ.mobile" :class="'status-' + phoneIsOk" @blur="phoneIsOk=validator()" data-pattern="^1[34578]\d{9}$">
              </div>
              <a href="" class="color-blue formore-yh">申请享受更多优惠</a>
              <button class="bg-red mfsj-submit" @click="yuyueShopFun(userYYSJ)">立即提交申请</button>
            </section>
            <a class="right-content-item">
              <img src='~/static/img/ad01.png' alt="团队一心，其利断金">
            </a>
            <a class="right-content-item">
              <img src='~/static/img/ad02.png' alt="与梦想共舞">
            </a>
          </div>
          <div class="cl"></div>
        </div>
      </div>
    </div>

    <v-footer :meta="meta"></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import vHeader from '~/components/header/header'
  import vFooter from '~/components/footer/footer'
  import vPagination from '~/components/pagination/pagination'
  import axios from 'axios'

  const ERR = 0
  const APIHOST = 'http://zx.axfc.cn'

  export default {
    components: {
      vHeader, vFooter, vPagination
    },
    asyncData (context) {
      function getHotWord () {
        return axios.get(context.store.state.HOST + '/zxpc/company/getHotKeyword?type=1')
      }
      function getCompanyList () {
        let data = {
          page: 0,
          pagesize: 5,
          keyword: '',
          order: ''
        }
        return axios.post(context.store.state.HOST + '/zxpc/company/getZxCompanyList', data)
      }
      return axios.all([
        getHotWord(),
        getCompanyList()
      ])
        .then((res) => {
          return {
            hotKey: res[0].data.data,
            zxCompanyList: res[1].data.data
          }
        })
    },
    data () {
      return {
        meta: { tabIndex: 1, hideHeader: true, hideFooter: true },
        userInfo: {isLogin: false},
        pageData: {
          page: 1,
          pagesize: 5,
          pageNo: 0,
          order: '',
          keyword: this.$route.query.keyword === undefined ? '' : this.$route.query.keyword
        },
        userYYSJ: {
          username: '',
          mobile: '',
          company_id: '',
          yzm: ''
        },
        phoneIsOk: ''
      }
    },
    created () {
    },
    methods: {
      // 获取公司列表
      getCompanyList: function (data) {
        this.getLoading()
        this.$http.post(
          APIHOST + '/zxpc/company/getZxCompanyList',
          {page: data.page - 1, pagesize: data.pagesize, keyword: data.keyword, order: data.order},
          {emulateJSON: true}
        ).then((response) => {
          response = response.body
          this.$layer.closeAll('loading')
          if (response.code === ERR) {
            this.$layer.msg(response.msg)
            return false
          }
          this.zxCompanyList = response.data
          this.pageData.pageNo = response.pageCount
        })
      },
      clickKeyWord: function (event) {
        this.pageData.keyword = event.currentTarget
        this.getCompanyList(this.pageData)
      },
      searchListByKey: function () {
        this.getCompanyList(this.pageData)
      },
      listOrder: function (event) {
      }
    }
  }
</script>

<style scoped>
  .main-searchList-zx .part-search{
    width: 100%;
    height: 230px;
    background: url(/static/img/banner1.jpg) no-repeat;
    background-position: center;
  }
  .search-box{
    width: 800px;
    padding-top: 80px;
    overflow: hidden;
  }
  .search-box input{
    float: left;
    width: 655px;
    height: 50px;
    background: #fff;
    font-size: 1.6rem;
    padding: 0 .5em;
    color: #666;
  }
  .btn-search{
    float: left;
    width: 130px;
    height: 50px;
    margin-left: 10px;
    border: none;
    font-size: 20px;
  }
  .part-search .hot-word{
    color: #ececec;
    font-size: 1.5rem;
    margin-top: 20px;
    font-weight: 100;
  }
  .part-search .hot-word a{
    color: #d9d9d9;
    margin-right: 15px;
    -webkit-transition: all .25s;
    -moz-transition: all .25s;
    -ms-transition: all .25s;
    -o-transition: all .25s;
    transition: all .25s;
  }
  .part-search .hot-word a:hover{
    text-decoration: underline;
    color: #ececec;
  }
  .search-wrap .part-box{
    /*overflow: hidden;*/
  }
  .search-wrap  .search-left{
    width: 875px;
  }
  .choose-box{
    border: 1px solid #ededed;
    padding: 15px;
    font-size: 1.4rem;
  }
  .choose-type{
    position: relative;
    overflow: hidden;
  }
  .choose-type:not(:last-child){
    margin-bottom: 20px;
  }
  .choose-type-title, .choose-any, .choose-value{
    float: left;
    vertical-align: middle;

  }
  .choose-type-title{
    background: #f6f6f6;
    margin-right: 20px;
    padding: .3em .7em;
  }
  .choose-any{
    background: #37bd98;
    color: #ffffff;
    padding: .5em .8em;
    cursor: pointer;
    padding: .3em .7em;
  }
  .choose-value{
    color: #637b87;
    margin-left: 10px;
    height: 29px;
    width: 600px;
    overflow: hidden;
    -webkit-transition: all .25s;
    -moz-transition: all .25s;
    -ms-transition: all .25s;
    -o-transition: all .25s;
    transition: all .25s;
  }
  .choose-value.on{
    height: auto;
  }
  .choose-value em{
    display: inline-block;
    cursor: pointer;
    margin-right: 10px;
    padding: .3em .7em;
  }
  .icon-toggle{
    position: absolute;
    top: 0;
    right:0;
    width: 14px;
    height: 14px;
    background: url(/static/img/arrow-top.png) no-repeat center;
    border: 1px solid #36bc97;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  .px-box{
    width: 100%;
    padding: 0 20px;
    background: #fafafa;
    line-height: 3;
    margin: 0 0 20px;
    font-size: 14px;
    color: #999;
  }
  .px-box em.title{margin-right: 10px;}
  .px-box em:not(:first-child){
    margin-right: 20px;
    cursor: pointer;
    position: relative;
  }
  .px-box em.on, .px-box em:not(:first-child):hover{
    color: #26cb9b;
  }
  .company-list>li{
    background: #fafafa;
    padding: 20px;
    font-size: 14px;
    overflow: hidden;
    margin-bottom: 25px;

    -webkit-transition: all .25s;
    -moz-transition: all .25s;
    -ms-transition: all .25s;
    -o-transition: all .25s;
    transition: all .25s;
  }
  .company-list>li:hover{
    box-shadow: 0 0 15px 5px rgba(0,0,0,.1);
  }
  .company-list>li img{
    width: 215px;
    height: 160px;
  }
  .company-list .left-img{
    width: 215px;
    /*flex: 1;*/
  }
  .company-list .left-img p{
    margin-top: 25px;
    text-align: center;
  }
  .company-list .middle-info{
    width: 440px;
    padding: 0 30px;
    border-right: 1px dashed #dedede;
  }
  .company-list .right-rate{
    position: relative;
    width: 180px;
    text-align: center;
    height: 215px;
  }
  .company-list .right-rate>.color-red{
    font-size: 38px;
    color: #ee4367;
    margin-top: 54px;
    margin-bottom: 20px;
  }
  .company-list .right-rate .right-bottom{
    margin-top: 52px;
    color: #666;
  }
  .company-list .title{
    font-size: 18px;
    margin-bottom: 10px;
    display: block;
  }
  .company-list .title:hover{
    text-decoration: underline;
  }
  .company-list .tags>em{
    padding: .2em .4em;
    margin-right: 1em;
    font-size: 12px;
  }
  .company-list .bg-red{background-color: #fa9696;color: #b94142;}
  .company-list .bg-yellow{color: #a28535;}
  .company-list .bg-blue{color: #4081a9;}
  .company-list .address{
    color: #516878;
    font-size: 14px;
    margin: 15px 0 18px;
    height: 42px;
  }
  .company-list .link-wrap{
    margin-bottom: 30px;
  }
  .company-list .link-wrap button, .company-list .link-wrap a{
    border: none;
    font-size: 14px;
  }
  .company-list .link-wrap button{
    position: relative;
    width: 115px;
    height: 35px;
    background: #37bd98;
    margin-right: 50px;
  }
  .company-list .link-wrap button:after{
    content: '';
    position: absolute;
    top: -10px;
    right: -15px;
    width: 24px;
    height: 20px;
    background: url(/static/img/hot.png) no-repeat top right;
  }
  .page-hd ul li{
    line-height: 30px;
    text-align: center;
    font-size: 13px;
    float: left;
    margin-left: 1em;
    margin-top: 10px;
  }
  .page-hd ul li a{
    color: #666;
    display: block;
    border: 1px solid #efefef;
    line-height: 30px;
    padding: 0 10px;
  }
  .page-hd ul li a.on{
    background: #26cb9b;
    color: #fff;
    border-color: #26cb9b;
  }
  .search-wrap .search-right{
    float: right;
    width: 300px;
  }
  .mfsh-box{
    border: 5px solid #f0f0f0;
    padding: 20px 15px;
    background: #fafafa;
    font-size: 15px;
  }
  .mfsh-box .title{
    width:100%;
    height: 38px;
    background: url(/static/img/mfsj-title.jpg) no-repeat center;
  }
  .mfsh-box .subtitle{
    font-size: 14px;
    text-align: center;
    margin: 10px 0 15px;
  }
  .mfsh-box .fill-box{
    position: relative;
    font-size: 15px;
    color: #666;
    font-size: 15px;
    margin-top: 15px;
  }
  .mfsh-box .fill-box .fa{
    position: absolute;
    top:15px;
    left: 15px;
    color: #999;
  }
  .mfsh-box .fill-box input{
    width: 100%;
    line-height: 39px;
    text-indent: 3em;
    font-size: 15px;
    border: 1px solid transparent;
    background: #fff;
    color: #666;
  }
  .mfsh-box .formore-yh{
    display: block;
    text-align: center;
    margin: 35px 0 24px;
  }
  .mfsh-box .mfsj-submit{
    width: 258px;
    height: 47px;
    border: none;
    font-size: 15px;
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
    -webkit-transition-property: color;
    transition-property: color;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    background: #ee4367;
  }
  .mfsh-box .mfsj-submit:before{
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 100%;
    background: #ff6666;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    -webkit-transform-origin: 50%;
    transform-origin: 50%;
    -webkit-transition-property: transform;
    transition-property: transform;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }
  .mfsh-box .mfsj-submit:hover:before{
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
  }
  .right-content-item{
    margin: 25px 0;
    display: block;
    border: 1px solid #e8e8e8;
  }
  .search-wrap .simple-info{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .px-box em:not(:first-child):not(:nth-child(2)){
    padding-right: 15px;
  }
  .px-box .click-order.desc:after{
    content:'';
    position: absolute;
    top:6px;
    right:0;
    width: 13px;
    height: 7px;
    background: url(/static/img/sprit.png) no-repeat;
    background-position: 0 0;
    -webkit-transition: all .25s;
    -moz-transition: all .25s;
    -ms-transition: all .25s;
    -o-transition: all .25s;
    transition: all .25s;
  }
  .px-box .click-order.desc:after{
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  .px-box .click-order.asc:after{
    content:'';
    position: absolute;
    top:6px;
    right:0;
    width: 13px;
    height: 7px;
    background: url(/static/img/sprit.png) no-repeat;
    background-position: 0 0;
    -webkit-transition: all .25s;
    -moz-transition: all .25s;
    -ms-transition: all .25s;
    -o-transition: all .25s;
    transition: all .25s;
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  .no-result{
    font-size: 16px;
    margin: 40px 0;
  }
</style>
