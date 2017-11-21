<template>
  <div class="member">
    <div v-if="memberList.length > 0">
      <section  class="part part-member" v-for="item in memberList">
        <div class="top-title">
          <em class="title">{{item.team_name}}</em>
        </div>
        <ul class="bottom-member">
          <li v-for="person in item.people">
            <div class="top-img">
              <img :src="person.head_img" :alt="person.name">
            </div>
            <div class="bottom-txt">
              <h4><em>{{person.name}}</em> / {{person.job}}</h4>
              <!--<div class="subtitle">{{person.introdution}}</div>-->
            </div>
          </li>
        </ul>
      </section>
    </div>
    <p class="no-result subtitle" v-else>抱歉，暂无团队成员信息 ╮(╯▽╰)╭ </p>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  export default {
    asyncData (context) {
      return axios.get(context.store.state.HOST + '/zxpc/jdcase/getTeamsByCid?cid=' + context.route.params.id).then((res) => {
        return {memberList: res.data.data}
      })
    }
  }
</script>

<style scoped>
  .part-member .top-title{
    position: relative;
    font-size: 17px;
  }
  .part-member .top-title:after{
    content: '';
    position: absolute;
    top: 10px;
    left:0;
    width: 100%;
    height: 1px;
    background: #eeeeee;
    z-index: 1;
  }
  .part-member .top-title .title{
    background: #fff;
    position: relative;
    z-index: 5;
    padding-right: 10px;
  }
  .bottom-member{
    overflow: hidden;
  }
  .bottom-member>li{
    width: 248px;
    height: 220px;
    float: left;
    font-size: 15px;
    border: 1px solid #ededed;
    -webkit-transition: all .25s;
    -moz-transition: all .25s;
    -ms-transition: all .25s;
    -o-transition: all .25s;
    transition: all .25s;
    margin: 10px;
  }
  .bottom-member>li:nth-child(3n){
    margin-right:0;
  }
  .bottom-member>li:nth-child(3n + 1){
    margin-left: 7px;
  }
  .bottom-member>li:hover{
    box-shadow: 0 0 15px 0 rgba(0,0,0,.2);
  }
  .bottom-member>li img{
    width: 100%;
    height: 185px;
    -webkit-transition: 1s all;
    -moz-transition: 1s all;
    -ms-transition: 1s all;
    -o-transition: 1s all;
    transition: 1s all;
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -o-transform: scale(1);
    transform: scale(1);
  }
  .bottom-member>li .top-img{
    position: relative;
    overflow: hidden;
  }
  .bottom-member>li:hover .top-img img{
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -ms-transform: scale(1.05);
    -o-transform: scale(1.05);
    transform: scale(1.05);
  }
  .bottom-txt h4 em{
    font-weight: bold;
    font-size: 16px;
  }
  .bottom-member .bottom-txt{
    padding: 10px;
  }
  .part-member:not(:last-child){
    margin-bottom: 30px;
  }
  .part-member .top-title{
    margin: 0 0 10px;
  }
</style>
