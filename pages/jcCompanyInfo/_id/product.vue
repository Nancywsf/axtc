<template>
  <div class="product">
    <div class="productFL-box">
      <ul class="product-tab">
        <li class="on" data-val="" @click="getCategory">全部商品</li>
        <li v-for="item in productFL" data-val="item.id" @click="getCategory">{{item.cat_name}}</li>
      </ul>
    </div>

    <section class="px-box">
      <em class="title">排序：</em>
      <em class="on" data-order="" @click="listOrder">默认排序</em>
      <em class="click-order" data-order="price " data-type="desc" @click="listOrder">价格</em>
    </section>

    <ul class="product-list" v-if="productList.length > 0">
      <li v-for="pro in productList">
        <router-link :to="{path:'/jcProductInfo',query:{pid:pro.id, cid:id}}" target="_blank">
          <div class="img-box">
            <img :src="pro.img1" :alt="pro.title">
          </div>
          <div class="bottom-txt">
            <h3 class="title">{{pro.title}}</h3>
            <p class="color-red">{{pro.price}}{{pro.unit}}</p>
          </div>
        </router-link>
      </li>
    </ul>
    <p class="no-result subtitle" v-else>抱歉，暂无产品信息 ╮(╯▽╰)╭ </p>
    <v-pagination class="page-hd fr" v-if="productList.length > 0" :page-data="pageData" v-on:goPage="getProductList"></v-pagination>

  </div>
</template>

<script type="text/ecmascript-6">
  import vPagination from '~/components/pagination/pagination'
  import axios from 'axios'
  const ERR = 0
  export default {
    components: {
      vPagination
    },
    asyncData (context) {
      function getProductFL () {
        return axios.get(context.store.state.HOST + '/zxpc/company/getCateGory')
      }
      function getProductList () {
        let data = {
          id: context.route.params.id,
          page: 0,
          pagesize: 18,
          category: '',
          order: ''
        }
        return axios.post(context.store.state.HOST + '/zxpc/company/getJcProductInfo', data)
      }
      return axios.all([
        getProductFL(),
        getProductList()
      ])
        .then((res) => {
          return {
            productFL: res[0].data.data,
            productList: res[1].data.data,
            pageData: {page: 1, pagesize: 18, pageNo: res[1].data.pageCount}
          }
        })
    },
    data () {
      return {
        id: this.$route.params.id,
        pageData: {
          page: 1,
          pagesize: 18,
          pageNo: 2
        }
      }
    },
    methods: {
      getProductList: function (data) {
        //        this.getLoading()
        axios.post(this.$store.state.HOST + '/zxpc/company/getJcProductInfo', {
          id: this.id,
          page: data.page - 1,
          pagesize: data.pagesize,
          category: data.category,
          order: data.order
        },
        {emulateJSON: true}).then((response) => {
          response = response.data
          this.$layer.closeAll('loading')
          if (response.code === ERR) {
            this.$layer.msg(response.msg)
            return false
          }
          this.productList = response.data
          this.pageData.pageNo = response.pageCount
        })
      },
      listOrder: function (event) {
        var Vthis = this
        Vthis.pageData.order = ''
        //        var $this = $(event.currentTarget)
        //        if ($this.data('order') !== '') {
        //          Vthis.pageData.order = $this.data('order') + $this.data('type')
        //          $this.data('type') === 'desc' ? $this.data('type', 'asc').addClass('desc').removeClass('asc') : $this.data('type', 'desc').addClass('asc')
        //        }
        //        this.getProductList(this.pageData)
        //        $this.addClass('on').siblings().not(':first-child').attr('class', 'click-order').data('type', 'desc')
      },
      getCategory () {
      }

    }
  }
</script>

<style scoped>
  .productFL-box{
    position: relative;
    border: 1px solid #ededed;
  }
  #toggleBtn{
    position: absolute;
    top:13.5px;
    right: 15px;
    width: 16px;
    height: 16px;
    border: 1px solid #26cb9b;
    padding:0;
  }
  #toggleBtn.on:after{
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  #toggleBtn:after{
    content: '';
    width: 16px;
    height: 16px;
    position: absolute;
    top:0;
    left:0;
    background: url(/static/img/sprit.png) no-repeat;
    background-position: 2px 5px;
    background-size: 265px auto;
    -webkit-transition: all .25s;
    -moz-transition: all .25s;
    -ms-transition: all .25s;
    -o-transition: all .25s;
    transition: all .25s;
  }
  .product-tab.on{
    height: 86px;
  }
  .product-tab{
    position: relative;
    width: 750px;
    overflow: hidden;
    height: 43px;
    line-height: 43px;
    -webkit-transition: all .25s;
    -moz-transition: all .25s;
    -ms-transition: all .25s;
    -o-transition: all .25s;
    transition: all .25s;
  }
  .product-tab li{
    font-size: 14px;
    float: left;
    padding: 0 18px;
    -webkit-transition: all .25s;
    -moz-transition: all .25s;
    -ms-transition: all .25s;
    -o-transition: all .25s;
    transition: all .25s;
  }
  .product-tab li.on{
    background: #26cb9b;
    color: #fff;
  }
  .px-box {
    width: 100%;
    padding: 0 20px;
    background: #fafafa;
    line-height: 3;
    margin: 20px 0;
    font-size: 14px;
    color: #999;
  }
  .px-box em.on{
    color: #26cb9b;
  }
  .px-box em:not(:first-child){
    margin-right: 20px;
    cursor: pointer;
    position: relative;
  }
  .px-box em:not(:first-child):not(:nth-child(2)){
    padding-right: 15px;
  }
  .product-list{
    overflow: hidden;
  }
  .product-list li{
    float: left;
    width: 243px;
    height: 340px;
    -webkit-transition: .25s all;
    -moz-transition: .25s all;
    -ms-transition: .25s all;
    -o-transition: .25s all;
    transition: .25s all;
    margin: 10px;
  }
  .product-list li:hover{
    box-shadow: 0 0 15px 0 rgba(0,0,0,.2);
  }
  .product-list .img-box{
    background: #fffcf9;
    position: relative;
    overflow: hidden;
  }
  .product-list li img{
    width: 250px;
    height: 250px;
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
  }
  .product-list li:hover img{
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
  }
  .product-list .bottom-txt{
    font-size: 14px;
    padding: 10px;
    text-align: center;
  }
  .product-list .bottom-txt .title{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-bottom: 3px;
  }
  .px-box .click-order.desc:after{
    content: '';
    position: absolute;
    top: 6px;
    right: 0;
    width: 13px;
    height: 7px;
    background: url(/static/img/sprit.png) no-repeat;
    background-position: 0 0;
    -webkit-transition: all .25s;
    transition: all .25s;
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  .px-box .click-order.asc:after{
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
</style>
