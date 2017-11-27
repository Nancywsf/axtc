<template>
  <div class="user-content">
    <ul class="content-tab">
      <li class="on" name="_zx" data-type="1"><a>装修订单</a></li>
    </ul>
    <div class="content-tabContent">
      <!--建材订单 开始-->
      <div class="_jx">
        <ul class="main-content">
          <li v-for="item in JCOrderList">
            <div class="item-top">
              <div class="fl order-data title">订单日期：{{item.add_time}}</div>
              <div class="fl order-id subtitle">订单编号：{{item.id}}</div>
              <!--<div class="fr state color-green" :class="{'color-yellow': item.status == 1 || item.status == 4}">{{orderState(item.status)}}&gt;</div>-->
              <div class="fr state color-blue">{{orderState(item.status)}}&gt;</div>
            </div>
            <div class="item-bottom">
              <div class="left-part  fl">
                <div class="title fl company-title"><i class="icon-company"></i>{{item.title}}</div>
                <div class="cl"></div>
                <div class="fl subtitle pingfen">商家好评：{{Number(item.pingfeng).toFixed(1) / 5 * 100 + '%'}}</div>
              </div>
              <!--<router-link :to="{path:'/user/order/orderInfo', query:{oid:item.id}}" class="btn-openOrder fr" :data-id="item.id" @click="">查看</router-link>-->
              <router-link v-if="item.status === 2" :to="{path:'/user/order/orderpj', query:{oid:item.id, type:3}}" class="btn-openOrder fr" :data-id="item.id">评价</router-link>
            </div>
          </li>
        </ul>
        <p class="no-result" v-if="JCOrderList.length == 0">您还没有建材订单，赶紧去预约吧 (●'◡'●)ﾉ♥ </p>
        <v-pagination v-if="JCOrderList.length > 0" :page-data="jcPageData" v-on:goPage="getJCOrderList"></v-pagination>
      </div>
      <!--建材订单 结束-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import vPagination from '~/components/pagination/pagination'
  import axios from 'axios'
  const ERR = 0
  export default {
    data () {
      return {
        zxOrderList: {},
        zxPageData: {
          page: 1,
          pagesize: 5,
          pageNo: ''
        },
        JCOrderList: {},
        jcPageData: {
          page: 1,
          pagesize: 5,
          pageNo: ''
        }
      }
    },
    created () {
      this.getJCOrderList(this.jcPageData)
    },
    methods: {
      // 获取建材订单
      getJCOrderList: function (data) {
        let params = {
          page: data.page - 1,
          pagesize: data.pagesize,
          type: 2,
          sid: ''
        }
        if (process.browser) {
          params.sid = sessionStorage.getItem('sid')
        }
        axios.post('/zxpc/my/myorder', params, {emulateJSON: true}).then((response) => {
          response = response.data
          if (response.code === ERR) {
            this.$layer.msg(response.msg)
            return false
          }
          this.JCOrderList = response.data
          this.jcPageData.pageNo = response.pageCount
        })
      },
      // 订单状态 数字 转 文字
      orderState: function (state) {
        var stateString = ''
        switch (state) {
          case 1:
            stateString = '已预约'
            break
          case 2:
            stateString = '已签约'
            break
          case 3:
            stateString = '已评价'
            break
        }
        return stateString
      },
      // 时间戳转换
      formatDate (date) {
        return new Date(parseInt(Number(date)) * 1000).toLocaleString().substr(0, 10).replace(/年|月/g, '-').replace(/日/g, '  ')
      }
    },
    components: {
      vPagination
    }
  }
</script>

<style scoped>
  .content-tab {
    border-bottom: 1px solid #ededed;
    height: 47px;
    margin-left: -1px;
  }
  .content-tab li {
    width: 135px;
    height: 47px;
    font-size: 15px;
    line-height: 45px;
    text-align: center;
    float: left;
    border-top: 2px solid transparent;
  }
  .content-tab li a{
    display: block;
    color: #999;
  }
  .content-tab li + li {
    /*border-left: 1px solid #ededed;*/
  }
  .content-tab li.on{
    border-top-color: #26cb9b;
    border-bottom-color: transparent;
    border-right: 1px solid #ededed;
    border-left: 1px solid #ededed;
  }
  .content-tab li.on a{
    height: 49px;
    background: #fff;
    color: #26cb9b;
  }
</style>
<style scoped>
  .main-content{
    padding: 15px;
  }
  .main-content>li {
    margin-bottom: 20px;
    border: 1px solid #ededed;
    overflow: hidden;
    padding: 10px 20px;
    font-size: 15px;
    -webkit-transition: .25s all;
    -moz-transition: .25s all;
    -ms-transition: .25s all;
    -o-transition: .25s all;
    transition: .25s all;
  }
  .main-content>li:hover{
    box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
  }
  .main-content>li .item-top{
    padding-bottom: 10px;
    overflow: hidden;
    border-bottom: 1px solid #ededed;
  }
  .main-content>li>div{
    padding: 5px 0;
  }
  .main-content>li .item-bottom{
    overflow: hidden;
    padding-top: 10px;
    padding-bottom: 0;
  }
  .main-content>li .order-data{
    margin-right: 100px;
  }
  .main-content>li .company-title{
    margin-bottom: 5px;
  }
  .icon-company{
    float: left;
    width: 15px;
    height: 15px;
    margin-top:5px;
    background: url(/static/img/sprit.png) no-repeat;
    background-position: 0 -255px;
    margin-right: 5px;
  }
  .btn-openOrder{
    border: 1px solid #f33838;
    color: #f33838;
    border-radius: 20px;
    padding: 3px 18px;
    margin-top: 10px;
    -webkit-transition: .25s all;
    -moz-transition: .25s all;
    -ms-transition: .25s all;
    -o-transition: .25s all;
    transition: .25s all;
  }
  .btn-openOrder:hover{
    background: #ff6c6c;
    color: #fff;
  }
  .pingfen{
    font-size: 14px;
  }
  .state.color-yellow{
    color: #f4b05f !important;
  }
  .color-blue{color: #2d6aad !important;}
</style>
