<template>
  <div class="case">
    <ul class="case-list" v-if="caseList.length > 0">
      <li v-for="item in caseList">
        <a>
          <div class="top-img">
            <img :src="item.img[0]" :alt="item.title">
          </div>
          <div class="bottom-txt">
            <h3 class="title">{{item.title}}</h3>
            <div class="info">
              <i class="fa fa-map-marker"></i>{{item.cell_name}}
            </div>
          </div>
        </a>
      </li>
    </ul>
    <p class="no-result subtitle" v-else>很抱歉，没有相关项目 ╮(╯▽╰)╭ </p>
    <v-pagination class="page-hd fr" v-if="caseList.length > 0" :page-data="casePagination" v-on:goPage="getJCProjectList"></v-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import vPagination from '~/components/pagination/pagination'
  import axios from 'axios'
  export default {
    components: {
      vPagination
    },
    asyncData (context) {
      return axios.get(context.store.state.HOST + '/zxpc/company/getJcProjectInfo?id=' + context.route.params.id + '&page=0&pagesize=12')
        .then((res) => {
          return {caseList: res.data.data, casePagination: {page: 1, pagesize: 12, pageNo: res.data.pageCount}}
        })
    },
    data () {
      return {
        casePagination: {
          page: 1,
          pagesize: 12,
          pageNo: ''
        }
      }
    },
    methods: {
      getJCProjectList () {}
    }
  }
</script>

<style scoped>
  .case-list{
    overflow: hidden;
  }
  .case-list>li{
    float: left;
    width: 244px;
    height: 280px;
    padding: 10px;
    border: 1px solid #ededed;
    margin: 10px;
    -webkit-transition: all .25s;
    -moz-transition: all .25s;
    -ms-transition: all .25s;
    -o-transition: all .25s;
    transition: all .25s;
  }
  .case-list>li:hover{
    box-shadow: 0 0 15px 0 rgba(0,0,0,.1);
  }
  .case-list li .top-img img{
    width: 225px;
    height: 190px;
  }
  .bottom-txt{
    margin-top: 15px;
    font-size: 15px;
  }
  .bottom-txt h3{
    text-indent: .5em;
  }
  .bottom-txt .info{
    color: #26547c;
    font-size: 14px;
    margin-top: 5px;
    vertical-align: bottom;
  }
  .bottom-txt .info .price{
    font-size: 17px;
  }
  .bottom-txt .fa{
    color: #666;
    margin: 0 5px;
    font-size: 16px;
  }
  .page-hd{
    margin: 50px 50px 0;
  }
  .no-result{font-size: 14px;}
</style>
