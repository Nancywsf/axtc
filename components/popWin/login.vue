<template>
  <div class="main-shade main-shade-login">
    <div class="shade" @click="hideShade"></div>
    <section class="shade-dialog" id="modPwd">
      <h3 class="shade-dialog-title">请先预约再登录</h3>
      <i class="icon-remove" @click="closeDialog"></i>
      <div class="pop-content-title">密码登录</div>
      <div class="pop-content">
        <div class="fill-box">
          <input type="text" placeholder="请输入您的电话号码">
        </div>
        <div class="fill-box">
          <input type="password" placeholder="请输入密码">
        </div>
        <button class="bg-green" id="submit">登录</button>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery';
  export default {
    methods: {
      closeDialog: function () {
        this.hideShade();
      },
      hideShade: function () {
        $('.main-shade').fadeOut().removeClass('show');
      }
    }
  };
</script>

<style scoped>
  .main-shade {display: none;}
  .main-shade .shade {
    opacity: 1;
  }
  #modPwd{
    width: 400px;
    height: 470px;
    border-radius: 0;
  }
  #modPwd .shade-dialog-title{
    background: #26cb9b;
    color: #fff;
    font-size: 16px;
    text-align: left;
    line-height: 56px;
    padding:0 1em;
  }
  .icon-remove{
    top: 14px;
    right: 14px;
    background-position: -19px 7px;
  }
  .fill-box{
    position: relative;
    font-size: 16px;clear: both;
    padding: 15px 10px;
    color: #666;
    width: 350px;
    margin: 0 auto;
  }
  .fill-box label{
    width: 6em;
    text-align: right;
    float: left;
    margin-right: 20px;
  }
  .fill-box input{
    border: none;
    height: 55px;
    width: 350px;
    background: #fafafa;
    padding: 0 .5em;
    font-size: 16px;
  }
  .pop-content{
  }
  .pop-content-title{
    text-align: center;
    font-size: 20px;
    margin: 1.5em 0 1em;
  }
  #submit{
    font-size: 16px;
    padding: 7px 30px;
    border: none;
    display: block;
    margin: 30px auto 0;
  }
</style>
