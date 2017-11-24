<template>
  <div class="comment" >
    <div v-if="comment.length > 0">
      <div class="item-comment" v-for="item in comment">
        <div class="left-img">
          <img :src="item.headimgurl" :alt="item.evaluate_name" class="fl">
        </div>
        <div class="left-info">
          <div class="fl">
            <h3 class="title">{{item.evaluate_name}}</h3>
            <div class="star on" v-for="star in item.star"></div>
          </div>
          <div class="data subtitle fr">{{item.reply_time}}</div>
          <div class="cl"></div>
          <p class="subtitle">{{item.content}}</p>
          <div class="sj-replay" v-if="item.reply">商家<em class="color-blue">回复</em>{{item.evaluate_name}}：{{item.reply}}</div>
        </div>
      </div>
      <v-pagination class="fr" v-if="comment.length > 0" :page-data="pageData" v-on:goPage="getCommentList"></v-pagination>
    </div>
    <p class="no-result subtitle" v-else>抱歉，暂无业主评论信息 ╮(╯▽╰)╭ </p>
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
      let data = {
        id: context.route.params.id,
        page: 0,
        pagesize: 5,
        pageNo: 1
      }
      return axios.get(context.store.state.HOST + '/zxpc/company/getJcEvaluateByCompanyID?id=' + context.route.params.id + '&page=0&pagesize=5').then((res) => {
        return {
          comment: res.data.data,
          pageData: {page: 1, pagesize: data.pagesize, pageNo: res.data.pageCount}
        }
      })
    },
    data () {
      return {
        id: this.$route.params.id,
        pageData: {
          page: 1,
          pagesize: 5,
          pageNo: 1
        }
      }
    },
    methods: {
      getCommentList: function (data) {
        axios.post(
          this.$store.state.HOST + '/zxpc/jdcase/getEvaluateByCompanyID',
          {page: data.page - 1, pagesize: data.pagesize, cid: this.id},
          {emulateJSON: true}
        ).then((response) => {
          response = response.data
          if (response.error === ERR) {
            this.$layer.msg(response.msg)
          }
          this.comment = response.data
          this.pageData.pageNo = response.pageCount
        })
      }
    }
  }
</script>

<style scoped>
  .left-img{
    overflow: hidden;
    float: left;
  }
  .left-img img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 15px;
  }
  .item-comment{
    clear: both;
    padding: 25px 0;
    overflow: hidden;
    font-size: 15px;
  }
  .item-comment + .item-comment{
    border-top: 1px dashed #ededed;
  }
  .left-info{
    margin-left: 75px;
  }
  .star{
    margin-top: 7px;
    float: left;
    width: 16px;
    height: 16px;
    background: url(/static/img/sprit.png) no-repeat;
    background-size: 200px auto;
    background-position: -40px 0;
  }
  .star.on{
    background-position: -40px -23px;
  }
  .sj-replay{
    margin: 1em 0 0;
    background: #fafafa;
    padding: .5em 1em;
  }
  .bottom-img{
    overflow: hidden;
    margin-top: 25px;
  }
  .bottom-img li{
    float: left;
    width: 165px;
    height: 165px;
    margin-right: 20px;
  }
  .bottom-img li img{
    width: 165px;
    height: 165px;
  }
</style>
