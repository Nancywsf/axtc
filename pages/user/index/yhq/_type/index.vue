<template>
  <div class="content-tabContent">
    <!--未使用 开始-->
    <div v-show="isUsed === 'false'">
      <ul class="yhq-list">
        <li v-for="item in yhqListNouse">
          <div class="left fl">
            <p class="yhq-price">{{item.price}}</p>
            <p class="subtitle">抵用券</p>
          </div>
          <div class="right fl">
            <h3 class="title">{{item.title}}</h3>
            <p class="hx-number">核销码：{{item.hx_number}}</p>
            <p class="subtitle">有效期：不限</p>
          </div>
        </li>
      </ul>
      <p class="no-result" v-if="yhqListNouse.length == 0">您还没有{{typePagecn}}优惠券，赶紧去兑换吧 (●'◡'●)ﾉ♥ </p>
      <v-pagination v-if="yhqListNouse.length > 0" :page-data="pageDataNouse" v-on:goPage="getyhqListNoUse"></v-pagination>
    </div>
    <!--未使用 结束-->

    <!--已使用 开始-->
    <div v-show="isUsed === 'true'" class="used-yhq">
      <ul class="yhq-list">
        <li v-for="item in yhqListUsed">
          <div class="left fl">
            <p class="yhq-price">{{item.price}}</p>
            <p class="subtitle">抵用券</p>
          </div>
          <div class="right fl">
            <h3 class="subtitle">{{item.title}}</h3>
            <p class="hx-number">核销码：{{item.hx_number}}</p>
            <p class="subtitle">有效期：不限</p>
          </div>
        </li>
      </ul>
      <p class="no-result" v-if="yhqListUsed.length == 0">您还没有使用过{{typePagecn}}优惠券哦 (●'◡'●)ﾉ♥ </p>
      <v-pagination v-if="yhqListUsed.length > 0" :page-data="pageDataUsed" v-on:goPage="getyhqListUsed"></v-pagination>
    </div>
    <!--已使用 结束-->
  </div>
</template>

<script type="text/ecmascript-6">
  import vPagination from '~/components/pagination/pagination'
  import axios from 'axios'
  const ERR = 0
  export default {
    props: {
      isUsed: {},
      type: {}
    },
    data () {
      return {
        typePagecn: this.type === '1' ? '装修' : '建材',
        yhqListNouse: {},
        pageDataNouse: {
          page: 1,
          pagesize: 6,
          pageNo: ''
        },
        yhqListUsed: {},
        pageDataUsed: {
          page: 1,
          pagesize: 6,
          pageNo: ''
        }
      }
    },
    created () {
      //      this.$layer.loading(2, {
      //        shade: [0.1, '#fff'] // 0.1透明度的白色背景
      //      })
      this.getyhqListNoUse(this.pageDataNouse)
      this.getyhqListUsed(this.pageDataUsed)
    },
    methods: {
      getyhqListNoUse: function (data) {
        let params = {
          page: data.page - 1,
          pagesize: data.pagesize,
          type: this.type,
          status: 0,
          sid: ''
        }
        if (process.browser) {
          params.sid = sessionStorage.getItem('sid')
        }
        axios.post('/zxpc/my/getMyCoupon',
          params, {emulateJSON: true}
        ).then((response) => {
          response = response.data
          if (response.code === ERR) {
            this.$layer.msg(response.msg)
            return false
          }
          this.yhqListNouse = response.data
          this.pageDataNouse.pageNo = response.pageCount
          // this.$layer.closeAll('loading')
        })
      },
      getyhqListUsed: function (data) {
        let params = {
          page: data.page - 1,
          pagesize: data.pagesize,
          type: this.type,
          status: 1,
          sid: ''
        }
        if (process.browser) {
          params.sid = sessionStorage.getItem('sid')
        }
        axios.post('/zxpc/my/getMyCoupon',
          params, {emulateJSON: true}
        ).then((response) => {
          response = response.data
          if (response.code === ERR) {
            this.$layer.msg(response.msg)
            return false
          }
          this.yhqListUsed = response.data
          this.pageDataUsed.pageNo = response.pageCount
          this.$layer.closeAll('loading')
        })
      }
    },
    components: {
      vPagination
    },
    watch: {
      type: function () {
        this.getyhqListNoUse(this.pageDataNouse)
        this.getyhqListUsed(this.pageDataUsed)
        this.typePagecn = this.type === '1' ? '装修' : '建材'
      }
    }
  }
</script>

<style scoped>
  .content-tabContent {
    padding: 35px 50px;
  }
  .yhq-list li{
    width: 415px;
    height: 100px;
    border: 1px solid #ededed;
    float: left;
    padding: 18px 25px;
    font-size: 14px;
    margin-bottom: 40px;
    -webkit-transition: .25s all;
    -moz-transition: .25s all;
    -ms-transition: .25s all;
    -o-transition: .25s all;
    transition: .25s all;
  }
  .yhq-list li:hover{
    box-shadow: 0 0 10px 0 rgba(0,0,0,.1);
  }
  .yhq-list li:nth-child(odd) {
    margin-right: 60px;
  }
  .yhq-list li .left{
    text-align: center;
    max-height: 200px;
  }
  .yhq-price{
    font-size: 30px;
    color: #f54949;
    margin-bottom: 10px;
  }
  .yhq-list li .right{
    margin-left: 40px;
  }
  .hx-number{
    color: #387bff;
  }
  .used-yhq .yhq-price, .used-yhq .hx-number {
    color: #999;
  }
  .yhq-list{
    overflow: hidden;
  }
</style>
