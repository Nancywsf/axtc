<template>
  <div class="user-content">
    <ul class="content-tab">
      <li class="on" name="_zx" @click="clickTab" data-isuserd="false"><a>未使用</a></li>
      <li name="_jc" @click="clickTab" data-isuserd="true"><a>已使用</a></li>
    </ul>
    <nuxt-child :type="type" :isUsed="isUsed" />
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        isUsed: 'false',
        type: this.$route.params.type
      }
    },
    created () {
    },
    methods: {
      clickTab: function (event) {
        let o = event.currentTarget
        if (o.className.indexOf('on') >= 0) { return false }
        let sibings = o.parentNode.childNodes
        for (let i = 0; i < sibings.length; i++) {
          sibings[i].className = ''
        }
        o.className += ' on'
        this.isUsed = o.getAttribute('data-isuserd')
      }
    },
    components: {
    },
    watch: {
      '$route': function () {
        this.type = this.$route.params.type
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

