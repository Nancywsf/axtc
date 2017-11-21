<template>
  <div class="main-shade main-changepwd">
    <div class="shade"></div>
    <section class="shade-dialog" id="modPwd">
      <h3 class="title">修改密码</h3>
      <i class="icon-remove" @click="closeDialog"></i>
      <div class="pop-content">
        <div class="fill-box">
          <label>原密码</label>
          <input type="password" v-model.layer="oldPassWord">
        </div>
        <div class="fill-box">
          <label>新密码</label>
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
  const ERR = 0
  let miniToastr
  if (process.browser) {
    miniToastr = require('mini-toastr')
  }
  export default {
    data () {
      return {
        newPassWord: '',
        aginPassWord: '',
        oldPassWord: ''
      }
    },
    methods: {
      closeDialog: function () {
        let shade = document.querySelector('.main-shade')
        shade.style.display = 'none'
        shade.className = shade.className.replace(' show', '')
      },
      checkFilled: function (event) {
        let o = event.currentTarget
        if (this.newPassWord.trim() === '') {
          o.className += ' status-false'
          return false
        }
        if (this.newPassWord.length < 6) {
          o.className += ' status-false'
          this.showLoginError({message: '长度不能小于6', type: 'error'})
          return false
        }
        o.className = o.className.replace(' status-false', '')
      },
      validatePWD: function (event) {
        let o = event.currentTarget
        if (this.newPassWord !== this.aginPassWord) {
          o.className += ' status-false'
          this.showLoginError({message: '两次密码输入不一致', type: 'error'})
          return false
        }
        o.className = o.className.replace(' status-false', '')
      },
      submit: function () {
        this.$http.post(this.$store.state.HOST + '/zxpc/my/changeUserPassword', {old_password: this.oldPassWord, new_password: this.newPassWord, confirm_password: this.aginPassWord, sid: sessionStorage.getItem('sid')},
          {emulateJSON: true}).then((response) => {
          response = response.data
          if (response.code === ERR) {
            this.$layer.msg(response.msg)
            return false
          }
          this.$layer.msg('密码修改成功！')
          this.newPassWord = ''
          this.aginPassWord = ''
          this.closeDialog()
        })
      }
    },
    mounted () {
      miniToastr.init()
    },
    notifications: {
      showLoginError: {
        title: '',
        message: 'Hello from nuxt.js',
        type: 'warn'
      }
    }
  }
</script>

<style scoped>
  #modPwd{
    width: 500px;
    height: 390px;
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
    padding: 15px 10px;
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
    padding: 7px 30px;
    border: none;
    display: block;
    margin: 30px auto 0;
  }
</style>
