<template>
  <div>
    <v-header :meta="meta" :userInfo="userInfo"></v-header>
    <div class="main">
      <div class="cumb part-box">当前位置：首页—装修公司-案例详情</div>
      <div class="part-box">
        <div class="left-content">
          <div v-swiper:mySwiper="swiperOptionTop" ref="swiperTop" class="gallery-top">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="img in caseList.img"><img :src="img"></div>
            </div>
          </div>
          <div class="bottom-swiper">
            <div v-swiper:myThumbsSwiper="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="img in caseList.img"><img :src="img"></div>
              </div>
            </div>
            <div class="swiper-button-prev" slot="button-prev">&lt;</div>
            <div class="swiper-button-next" slot="button-next">&gt;</div>
          </div>
        </div>
        <div class="right-ad fr">
          <v-adposition></v-adposition>
        </div>
      </div>
    </div>
    <v-footer :meta="meta"></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import vFooter from '~/components/footer/footer'
  import vHeader from '~/components/header/header'
  import vAdposition from '~/components/ADPosition/adposition'
  import axios from 'axios'
  export default {
    components: {
      vHeader, vFooter, vAdposition
    },
    asyncData (context) {
      return axios.post(context.store.state.HOST + '/zxpc/jdcase/getCaseByID', {id: context.route.params.id})
        .then((res) => {
          return { caseList: res.data.data }
        })
    },
    data () {
      return {
        meta: { tabIndex: 3, hideHeader: true, hideFooter: true },
        userInfo: {isLogin: false},
        swiperOptionTop: {
          notNextTick: true,
          spaceBetween: 10
        },
        swiperOptionThumbs: {
          notNextTick: true,
          spaceBetween: 25,
          slidesPerView: 5,
          centeredSlides: true,
          touchRatio: 0.2,
          slideToClickedSlide: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev'
        },
        caseId: this.$route.query.cid
      }
    },
    mounted () {
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperTop.params.control = swiperThumbs
      swiperThumbs.params.control = swiperTop
    }
  }
</script>

<style scoped>
  .cumb{
    margin: 20px auto 15px;
  }
  .swiper-container {
    background-color: #fff;
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  .gallery-top {
    height: 570px;
    width: 880px;
  }
  .gallery-top img{
    position: absolute;
    top:0;left:0;
    right:0;bottom:0;
    margin: auto;
    /*width: 100%;height: 100%;*/
    max-width: 100%;
    max-height:100%;
  }
  .gallery-thumbs {
    width: 710px;
    margin: 30px auto 0;
    height: 120px;
    box-sizing: border-box;
    padding: 0;
  }
  .gallery-thumbs img{
    width: 120px;
    height: 120px;
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
    border: 2px solid #ededed;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
    border-color: #26cb9b;
  }
  .swiper-button-prev, .swiper-button-next{
    background: rgba(0,0,0,.4);
    color: #fff;
    width: 60px;
    height: 120px;
    line-height: 115px;
    font-size: 45px;
    top:22px;
    text-align: center;
  }
  .swiper-button-prev{left:0;}
  .swiper-button-next{right:0;}
  .bottom-swiper{
    position: relative;
  }
  .part-box{overflow: hidden}
  .left-content{
    width: 880px;
    float: left;
    overflow: hidden;
  }
</style>
