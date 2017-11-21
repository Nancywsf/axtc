<template>
  <div>
    <v-header :meta="meta" :userInfo="userInfo"></v-header>
    <div class="main zxCase">
      <div class="cumb part-box">当前位置：首页—装修案例</div>
      <section class="choose-box part-box">
        <div class="choose-type">
          <div class="choose-type-title">风格</div>
          <div class="choose-value" data-type="style">
            <em @click="clickChild" class="on" data-val="1">不限</em>
            <em @click="clickChild" data-val="欧式">欧式</em>
            <em @click="clickChild" data-val="中等装修">中等装修</em>
            <em @click="clickChild" data-val="简装">简装</em>
            <em @click="clickChild" data-val="精装">精装</em>
          </div>
          <!--<em class="icon-toggle"></em>-->
        </div>
        <div class="choose-type">
          <div class="choose-type-title">户型</div>
          <div class="choose-value" data-type="huxing">
            <em @click="clickChild" class="on" data-val="1">不限</em>
            <em @click="clickChild" data-val="一室">一室</em>
            <em @click="clickChild" data-val="二室">二室</em>
            <em @click="clickChild" data-val="三室">三室</em>
            <em @click="clickChild" data-val="四室">四室</em>
            <em @click="clickChild" data-val="复室">复室</em>
          </div>
        </div>
      </section>
      <section class="zxCase-wrap part-box">
        <waterfall :line-gap="305" :watch="caseList" class="zxCase-list">
          <waterfall-slot v-for="(item, index) in caseList" :class="{special: item.height === undefined}" :width="item.width" :height="item.height === undefined ? item.width : item.height" :order="index" :key="item.id">
            <section class="item-case">
              <router-link :to="'/zxCaseInfo/' + item.id " target="_blank">
                <div class="top-img">
                  <img :src="item.img" alt="标题">
                  <div class="top-img-txt"><i class="fa fa-building"></i>{{item.company_name}}承接</div>
                </div>
                <div class="bottom-txt">
                  <h3 class="title">{{item.huxing}}/{{item.style}}/{{item.money}}万元</h3>
                  <p class="subtitle">
                    <i class="fa fa-map-marker"></i>{{item.cell_name}}
                    <em class="color-red fr">{{item.img_count}}张</em>
                  </p>
                </div>
              </router-link>
            </section>
          </waterfall-slot>
        </waterfall>
        <p class="no-reslut" v-show="caseList.length === 0">很抱歉，暂时没有您想要的装修案例 ╮(╯▽╰)╭</p>
      </section>
      <v-pagination v-if="caseList.length > 0" :page-data="pageData" v-on:goPage="getCaseList"></v-pagination>
    </div>
    <v-footer :meta="meta"></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import vFooter from '~/components/footer/footer'
  import vHeader from '~/components/header/header'
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  import vPagination from '~/components/pagination/pagination'
  import axios from 'axios'
  export default {
    components: {
      vHeader, vFooter, vPagination, Waterfall, WaterfallSlot
    },
    //    asyncData (context) {
    //      let data = {
    //        page: 0,
    //        pagesize: 12,
    //        huxing: 1,
    //        style: 1
    //      }
    //      return axios.post(context.store.state.HOST + '/zxpc/jdcase/getAllCase', data).then((res) => {
    //        return {
    //          caseList: res.data.data,
    //          casePagination: {page: 1, pagesize: 9, pageNo: res.data.pageCount}
    //        }
    //      })
    //    },
    data () {
      return {
        meta: { tabIndex: 3, hideHeader: true, hideFooter: true },
        userInfo: {isLogin: false},
        pageData: {
          page: 1,
          pagesize: 12,
          huxing: '1',
          style: '1',
          pageNo: ''
        },
        caseList: {}
      }
    },
    created () {
      this.getCaseList()
    },
    methods: {
      getCaseList () {
        axios.post(this.$store.state.HOST + '/zxpc/jdcase/getAllCase',
          {
            page: this.pageData.page - 1,
            pagesize: this.pageData.pagesize,
            huxing: this.pageData.huxing,
            style: this.pageData.style
          },
          {emulateJSON: true}).then((response) => {
          response = response.data
          //          this.$layer.closeAll('loading')
          if (response.code === 0) {
            return false
          }
          this.pageData.pageNo = response.pageCount
          if (response.pageCount === 0) {
            this.caseList = response.data
            return false
          }
          this.checkPicurl(response.data)
        })
      },
      checkPicurl: function (array) {
        var that = this
        var runIndex = 0
        for (var i = 0; i < array.length; i++) {
          (function (i) {
            var img = new Image()
            img.src = array[i].img
            array[i].width = 283
            img.onload = function () {
              array[i].height = (img.height / img.width * 283 + 110).toFixed(0)
              runIndex++
              if (runIndex === array.length) {
                that.caseList = array
              }
            }
          })(i)
        }
      },
      clickChild (event) {
        let o = event.currentTarget
        if (o.className.indexOf('on') >= 0) { return false }
        for (let i = 0; i < o.parentNode.childNodes.length; i++) {
          o.parentNode.childNodes[i].className = ''
        }
        o.className += ' on'
        let type = o.parentNode.getAttribute('data-type')
        this.pageData[type] = event.currentTarget.innerText
        this.getCaseList(this.pageData)
      }
    }
  }
</script>

<style scoped>
  .choose-box{
    border: 1px solid #ededed;
    padding: 15px;
    font-size: 1.4rem;
    margin-bottom: 20px;
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
  .choose-box em.on{
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
    padding: 0 20px;
    background: #fafafa;
    line-height: 3;
    margin: 20px auto;
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
  .zxCase-wrap{
    width: 1220px;
    min-height: 200px;
  }
  .zxCase-list{
    overflow: hidden;
    /*margin-left: -10px;*/
  }
  .zxCase-list li, .zxCase-list>div{
    float: left;
    width: 285px;
    font-size: 14px;
    line-height: 2;
  }
  .zxCase-list .bottom-txt{
    padding: 10px 20px;
    height: 110px;
    line-height: 3;
  }
  .zxCase-list .fa{
    margin-right: 5px;
  }
  .zxCase-list .top-img{
    position: relative;
    overflow: hidden;
  }
  .zxCase-list .top-img img{
    -webkit-transition: 2s all;
    -moz-transition: 2s all;
    -ms-transition: 2s all;
    -o-transition: 2s all;
    transition: 2s all;
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
    opacity: .85;
  }
  .zxCase-list .item-case:hover .top-img img{
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
    opacity: 1;
  }
  .zxCase-list .item-case{
    -webkit-transition: .25s all;
    -moz-transition: .25s all;
    -ms-transition: .25s all;
    -o-transition: .25s all;
    transition: .25s all;
  }
  .zxCase-list .item-case:hover{
    box-shadow: 0 0 15px 0 rgba(0,0,0,.2);
  }
  .zxCase-list .top-img .top-img-txt{
    position: absolute;
    left:0;
    bottom:0;
    width: 100%;
    line-height: 2.5;
    background: rgba(67,162,92,.8);
    color: #fff;
    font-size: 14px;
    padding: 0 1em;
    -webkit-transform: translate(0, 100%);
    -moz-transform: translate(0, 100%);
    -ms-transform: translate(0, 100%);
    -o-transform: translate(0, 100%);
    transform: translate(0, 100%);
    -webkit-transition: all .25s;
    -moz-transition: all .25s;
    -ms-transition: all .25s;
    -o-transition: all .25s;
    transition: all .25s;
  }
  .zxCase-list .item-case:hover .top-img .top-img-txt{
    -webkit-transform: translate(0, 0);
    -moz-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    -o-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  .zxCase-list .item-case{
    position: absolute;
    top:10px;
    left: 10px;
    right:10px;
    bottom:10px;
    border: 1px solid #ededed;
  }
  .pager{margin-top: 80px !important;}
  .vue-waterfall-slot.special img{
    height: 170px;
  }
</style>
