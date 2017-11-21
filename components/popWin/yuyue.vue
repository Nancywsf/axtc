<template>
  <div class="main-shade main-yysj">
    <div class="shade" @click="hideShade"></div>
    <section class="shade-dialog yysj-box yysj-box-isLogin" v-if="isLogin == 'true'">
      <img class="yuyue-img" src="/static/img/yuyue.png" alt="预约该商家？">
      <p class="subtitle">是否确定预约</p>
      <p class="title">{{userYYSJ.cpmpanyName}}？</p>
      <button class="bg-green btn-yuyue" @click="submit">确定预约</button>
    </section>
    <section class="shade-dialog yysj-box" v-else>
      <i class="icon-remove" @click="closeDialog"></i>
      <div class="content-top tjyy-img"></div>
      <div class="form-wrap">
        <div class="fill-box">
          <input type="text" placeholder="输入您的姓名" :value="userYYSJ.username" v-model.lazy="userYYSJ.username">
        </div>
        <div class="fill-box">
          <input type="text" placeholder="输入您的电话" :value="userYYSJ.mobile" :class="'status-' + phoneIsOk" data-pattern="^1[34578]\d{9}$" data-error="您填写的手机号码不正确" v-model.lazy="userYYSJ.mobile" @blur="phoneIsOk=validator();">
        </div>
      </div>
      <div class="foot-btn">
        <a class="btn-remove" @click="closeDialog">取消</a>
        <button class="btn-submit bg-green" @click="submit">提交</button>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery';
  export default {
    props: {userYYSJ: {}},
    data() {
      return {
        isLogin: sessionStorage.getItem('isLogin'),
        phoneIsOk: ''
      };
    },
    created() {
//      console.log(this.isLogin);
    },
    methods: {
      closeDialog: function () {
        $('.main-yysj').fadeOut().removeClass('show');
      },
      submit: function () {
        this.$emit('submit', this.userYYSJ);
      },
      hideShade: function () {
        $('.main-shade').fadeOut().removeClass('show');
      }
    }
  };
</script>

<style scoped>
  .main-shade {position: fixed;top:0;left:0;display: none;}
  .main-shade .shade {
    position: fixed;top:0;left:0;opacity: 1;
  }
  .main-shade .shade-dialog.yysj-box-isLogin {
    position: fixed;top:0;left:0;right:0;bottom:0;margin:auto;width: 420px;height:325px;background-color: #fff;
    border-radius: 0;
    text-align: center;
  }
  .yuyue-img {
    width: 130px;
    margin: 30px 0 20px;
  }
  .subtitle {font-size: 14px;}
  .title{font-size: 20px;}
  .btn-yuyue {
    border: none;
    font-size: 18px;
    line-height: 3;
    margin-top: 20px;
    width: 80%;
  }
  .yysj-box{
    width: 515px;
    height: 510px;
  }
  .yysj-box .tjyy-img {
    width: 380px;
    height: 300px;
    margin: -45px auto 0;
    background: url(/static/img/yytj.png) no-repeat top center;
    background-size: 100%;
  }
  .yysj-box .fill-box {
    position: relative;
    width: 300px;
    overflow: hidden;
    font-size: 1.4rem;
    margin: 12px 40px;
  }
  .yysj-box .fill-box input {
    width: 100%;
    padding: .5em;
    border: none;
    border-bottom: 1px solid #ededed;
    font-size: 1.4rem;
    line-height: 1.8;
    color: #333;
  }
  .yysj-box .foot-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 3;
    text-align: center;
    font-size: 1.6rem;
    border-top: 1px solid #ededed;
  }
  .yysj-box .foot-btn>* {
    float: left;
    display: inline-block;
    width: 50%;
    color: #999;
  }
  .yysj-box .foot-btn .btn-submit {
    border: none;
    font-size: 18px;
    line-height: 3;
    border-bottom-right-radius: 20px;
    color: #fff;
  }
  #yzm{
    width: 150px;
  }
  #getCodeBtn{
    position: absolute;
    right: 10px;
    top: 10px;
  }
</style>
