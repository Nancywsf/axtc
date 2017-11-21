<template>
  <div class="main-shade" style="display: block;">
    <div class="shade" style="display: block;opacity: 1;"></div>
    <section class="shade-dialog" id="getYhqDialog">
      <h2 class="title">领取优惠券</h2>
      <i class="icon-remove" @click="closeDialog"></i>
      <div class="yhq-box">
        <em class="price">{{yhq.price}}</em>
        <img v-if="yhq.leixing === 1" src="/static/img/temp/yhq-3.jpg" :alt="yhq.pay_points">
        <img v-if="yhq.leixing === 2" src="/static/img/temp/yhq-2.jpg" :alt="yhq.pay_points">
        <img v-if="yhq.leixing === 3" src="/static/img/temp/yhq-1.jpg" :alt="yhq.pay_points">
      </div>
      <p>兑换积分：{{yhq.pay_points}}</p>
      <button class="bg-green" :data-id="yhq.id" :data-point="yhq.pay_points" @click="buyYHQ">立即兑换</button>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery';
  const ERR = 0;
  const APIHOST = 'http://zx.axfc.cn';

  export default {
    props: {
      type: {}
    },
    data() {
      return {
        yhq: {}
      };
    },
    created() {
      this.getYHQ();
    },
    methods: {
      closeDialog: function () {
        $('.main-shade').fadeOut().removeClass('show');
      },
      getYHQ() {
        this.$http.post(
          APIHOST + '/zxpc/Coupon/showCoupon',
          {weizhi: this.type},
          {emulateJSON: true}
        ).then((response) => {
          response = response.body;
          if (response.code === ERR) {
            this.$layer.msg(response.msg);
            return false;
          }
          this.yhq = response.data[0];
        });
      },
      buyYHQ(event) {
        var data = {};
        data.pay_points = $(event.currentTarget).data('point');
        data.coupon_id = $(event.currentTarget).data('id');
        window.eventBus.$emit('invokeBuyYHQ', data);
      }
    }
  };
</script>

<style scoped>
  #getYhqDialog {
    position: absolute;
    top:0;right:0;left:0;bottom: 0;
    width: 400px;height: 360px;
    border-radius: 0;
  }
  #getYhqDialog .title{
    background: #fafafa;
    text-align: center;
    font-size: 18px;
    line-height: 3;
  }
  #getYhqDialog .icon-remove {
    top: 10px;
    right: 10px;
    border-radius: 50%;
    border: 1px solid #e5e5e5;
    background-position: -20.5px 7px;
  }
  .yhq-box{position: relative;}
  .yhq-box img {
    display: block;
    width: 90%;
    margin: 20px auto;
  }
  .yhq-box .price{
    position: absolute;
    top: 23px;
    font-size: 43px;
    left: 162px;
    color: #f86868;
  }
  #getYhqDialog p{
    text-align: center;
    font-size: 1.5rem;
  }
  #getYhqDialog .bg-green{
    display: block;
    border: none;font-size: 1.6rem;
    line-height: 3;
    width: 90%;
    margin: 10px auto;
  }
</style>
