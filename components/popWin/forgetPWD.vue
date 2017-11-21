<template>
  <div class="main-shade main-modpwd">
    <div class="shade"></div>
    <section class="shade-dialog" id="modPwd">
      <h3 class="title">忘记密码</h3>
      <i class="icon-remove" @click="closeDialog"></i>
      <div class="pop-content">
        <div class="fill-box">
          <label>手机号</label>
          <input type="text" v-model="mobile" :class="'status-' + phoneIsOk" placeholder="输入您常用的手机号码" @blur="phoneIsOk=validator();" data-pattern="^1[34578]\d{9}$" data-error="您填写的手机号码不正确">
        </div>
        <div class="fill-box">
          <label>验证码</label>
          <input type="text" id="yzm" v-model="yzm" @blur="checkCode">
          <a class="btn-getcode" @click="getYZM">获取验证码</a>
        </div>
        <div class="fill-box">
          <label>新密码</label>
          <input type="password" v-model.layer="newPassWord" @blur="checkFilled">
        </div>
        <div class="fill-box">
          <label>再次输入新密码</label>
          <input type="password" v-model.layer="aginPassWord" @blur="validatePWD">
        </div>
        <button class="bg-green" id="submit" @click="submit">提交</button>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        yzm: '',
        mobile: '',
        phoneIsOk: '',
        newPassWord: '',
        aginPassWord: ''
      }
    },
    methods: {
      closeDialog: function () {
      },
      // 获取验证码
      getYZM () {
        this.$emit('getYZM', this.mobile)
      },
      // 验证验证码
      checkCode () {
        this.$emit('checkCode', this.yzm)
      },
      checkFilled (event) {
      },
      validatePWD: function (event) {
      },
      submit () {
      }
    }
  }
</script>

<style scoped>
  #modPwd{
    width: 500px;
    height: 450px;
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
    width: 410px;
    margin: 0 auto;
  }
  .fill-box  label{
    width: 7em;
    text-align: right;
    float: left;
    margin-right: 20px;
    line-height: 2.7;
  }
  .fill-box input{
    border: 1px solid #ccc;
    line-height: 2;
    width: 190px;
    padding: 5px .5em;
    font-size: 15px;
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
  #yzm {
    width: 8em;
    margin-right: 1em;
  }
  .btn-getcode {
    font-size: 14px;
    color: #26cb9b;
    cursor: pointer;
  }
</style>
