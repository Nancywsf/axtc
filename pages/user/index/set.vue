<template>
  <div class="user-content">
    <ul class="content-tab">
      <li class="on"><a>基本资料</a></li>
    </ul>
    <div class="content-tabContent">
      <!--基本资料 开始-->
      <div class="base-data">
        <div class="top">
          <div class="fl user-photo">
            <img :src="userData.head_img" :alt="userData.nickname" v-model="userData.head_img">
          </div>
          <div class="upload-box">
            <input type="file" class="fl btn-changevalue" @change="changeUserPhoto">
            <button class="btn-changevalue">修改头像</button>
          </div>
        </div>
        <div class="fill-box">
          <label for="username">用户名：</label>
          <input type="text" name="username" :value="userData.nickname" v-model="userData.nickname" id="userName">
        </div>
        <div class="fill-box">
          <label for="userpwd">密码：</label>
          <div class="user-pwd fl">******</div>
          <button class="btn-changevalue" @click="changePWD">修改密码</button>
        </div>
        <div class="fill-box">
          <label for="mobile">已绑定手机：</label>
          <div class="user-mobile fl">{{userData.mobile}}</div>
          <!--<button class="btn-changevalue">更换手机号码</button>-->
        </div>
        <div class="cl"></div>
        <button class="bg-green btn-submit" @click="changeUserInfo">提交</button>
      </div>
      <!--基本资料 结束-->

      <!--修改密码 开始-->
      <change-pwd></change-pwd>
      <!--修改密码 结束-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import changePwd from '~/components/popWin/changePWD'
  import axios from 'axios'
  const ERR = 0
  let miniToastr
  if (process.browser) {
    miniToastr = require('mini-toastr')
  }
  export default {
    data () {
      return {
        userData: {
          isLogin: '',
          mobile: ''
        }
      }
    },
    created () {
    },
    methods: {
      // 修改密码
      changePWD: function () {
        let popChange = document.querySelector('.main-changepwd')
        popChange.style.display = 'block'
        popChange.className += ' show'
      },
      changeUserPhoto: function (event) {
        //        var that = this
        //        var $this = $(event.currentTarget)
        //        var img = $this.val()
        //        if (img === '') {
        //          this.$layer.msg('请添加图片')
        //          return false
        //        }
        //        // this.$layer.msg('正在上传...', function () {})
        //        var data = new FormData()
        //        data.append('img', event.currentTarget.files[0])
        //        $.ajax({
        //          url: APIHOST + '/zxpc/Uploadimg/uploadImg',
        //          type: 'POST',
        //          data: data,
        //          dataType: 'JSON',
        //          cache: false,
        //          processData: false,
        //          contentType: false
        //        }).done(function(response) {
        //          if (response.code === 0) {
        //            this.$layer.msg('图片上传失败！')
        //          } else {
        //            $('.notify').fadeOut()
        //            that.userData.head_img = response.data
        //          }
        //        })
      },
      // 修改用户信息
      changeUserInfo: function () {
        axios.post(this.$store.state.HOST + '/zxpc/my/changeUserInfo', {
          head_img: this.userData.head_img,
          nickname: this.userData.nickname,
          sid: sessionStorage.getItem('sid')
        }, {emulateJSON: true}).then((response) => {
          response = response.data
          if (response.code === ERR) {
            // this.$layer.msg(response.msg)
            this.showLoginError({message: response.msg, type: 'error'})
            return false
          }
          this.$store.dispatch('getUserData', {sid: sessionStorage.getItem('sid')})
          this.showLoginError({message: '修改成功', type: 'info'})
        })
      }
    },
    components: {
      changePwd
    },
    mounted () {
      this.userData.isLogin = sessionStorage.getItem('isLogin')
      this.userData.mobile = sessionStorage.getItem('mobile')
      this.userData.nickname = sessionStorage.getItem('nickname')
      this.userData.head_img = sessionStorage.getItem('head_img')
      this.userData.order_count = sessionStorage.getItem('order_count')
      this.userData.yy_countame = sessionStorage.getItem('yy_countame')
      this.userData.integral = sessionStorage.getItem('integral')
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
  .content-tab {
    border-bottom: 1px solid #ededed;
    height: 47px;
    margin-left: -1px;
  }
  .content-tab li {
    width: 135px;
    height: 47px;
    font-size: 15px;
    line-height: 45px;
    text-align: center;
    float: left;
    border-top: 2px solid transparent;
  }
  .content-tab li a{
    display: block;
    color: #999;
  }
  .content-tab li + li {
    /*border-left: 1px solid #ededed;*/
  }
  .content-tab li.on{
    border-top-color: #26cb9b;
    border-bottom-color: transparent;
    border-right: 1px solid #ededed;
    border-left: 1px solid #ededed;
  }
  .content-tab li.on a{
    height: 49px;
    background: #fff;
    color: #26cb9b;
  }
</style>
<style scoped>
  .content-tabContent{
    padding: 15px;
    font-size: 15px;
  }
  .base-data{padding: 30px 40px;
    color: #666;}
  .user-photo {
    width: 90px;
    height: 90px;
    overflow: hidden;
    border-radius: 50%;
    border:1px solid #26cb9b;
    margin-right: 30px;
    margin-bottom: 20px;
  }
  .user-photo img{
    width: 100%;
    height: 100%;
  }
  .btn-changevalue{
    border: none;
    background: transparent;
    font-size: 14px;
    color: #007aff;
  }
  .fill-box{
    clear: both;padding: 10px 0;
    line-height: 30px;
  }
  .fill-box label{
    float: left;
    width: 90px;
    text-align: right;
    margin-right: 30px;
  }
  #userName{
    width: 230px;
    padding: 7px 10px;
    font-size: 14px;
    border:1px solid #bebebe;
  }
  .user-pwd{
    padding-top:3px;
    width: 130px;
  }
  .user-mobile{
    width: 130px;
  }
  .btn-submit{
    padding: 8px 25px;
    font-size: 15px;
    border: none;
    margin-top: 40px;
    margin-left: 120px;
  }
  .upload-box{
    width: 4em;
    float: left;
    position: relative;
    margin-top: 40px;
  }
  .upload-box input{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    opacity: 0;
  }

</style>
