<template>
  <div class="main-shade main-setpwd">
    <div class="shade"></div>
    <section class="shade-dialog" id="modPwd">
      <h3 class="title">设置密码</h3>
      <i class="icon-remove" @click="closeDialog"></i>
      <div class="pop-content">
        <div class="fill-box">
          <label>密码</label>
          <input type="password" v-model.layer="newPassWord" @blur="checkFilled">
        </div>
        <div class="fill-box">
          <label>再次输入密码</label>
          <input type="password" v-model.layer="aginPassWord" @blur="validatePWD">
        </div>
        <button class="bg-green" id="submit" @click="submit">提交</button>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      mobile: {}
    },
    data () {
      return {
        newPassWord: '',
        aginPassWord: ''
      }
    },
    methods: {
      closeDialog: function () {
      },
      checkFilled: function (event) {
      },
      validatePWD: function (event) {
      },
      submit: function () {
      }
    }
  }
</script>

<style scoped>
  #modPwd{
    width: 500px;
    height: 300px;
    border-radius: 0;
  }
  #modPwd .title{
    background: #26cb9b;
    color: #fff;
    fot-size: 18px;
    text-align: center;
    line-height: 56px;
    font-size: 20px;
  }
  .icon-remove{
    top: 14px;
    right: 14px;
    background-position: -19px 7px;
  }
  .fill-box{
    font-size: 16px;clear: both;
    padding: 10px;
    color: #666;
    width: 350px;
    margin: 0 auto;
  }
  .fill-box  label{
    width: 6em;
    text-align: right;
    float: left;
    margin-right: 20px;
  }
  .fill-box input{
    border: 1px solid #ccc;
    height: 30px;
    width: 190px;
    padding: 5px;
  }
  .pop-content{
    padding-top: 40px;
  }
  #submit{
    font-size: 16px;
    padding: 7px 20px;
    border: none;
    display: block;
    margin: 30px auto 0;
  }
</style>
