<template>
  <div class="footer" v-if="meta.hideFooter">
    <div class="footer-content">
      <div class="tag"><a v-for="item in footerNav" :href="'/we/aboutUs?fpid=' + item.id" target="_blank">{{item.name}}</a></div>
      <div class="company-info">
        <ul class="fl">
          <li>客服专线：{{companyInfo.kefu}}</li>
          <li>（工作时间：{{companyInfo.worktime}}）</li>
          <li>传真：{{companyInfo.chuanzhen}}</li>
          <li>地址：{{companyInfo.address}}</li>
        </ul>
        <div class="code-box fr">
          <img src="~/static/img/code.jpg" alt="爱心乐居公众号">
          <p>关注爱心乐居公众号</p>
        </div>
      </div>
      <div class="friend-link">
        友情链接：
        <a v-for="item in friendLink" :href="item.link" target="_blank">{{item.name}}</a>
      </div>
    </div>
    <p class="cumb">{{companyInfo.banquan}}  {{companyInfo.beian}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapMutations } from 'vuex'

  export default {
    props: {meta: {}},
    computed: {
      todos () { return this.$store.state.todos.list },
      footerNav () { return this.$store.state.footer.footerNav },
      friendLink () { return this.$store.state.footer.friendLink },
      companyInfo () { return this.$store.state.footer.companyInfo }
    },
    methods: {
      addTodo (e) {
        this.$store.commit('todos/add', e.target.value)
        e.target.value = ''
      },
      ...mapMutations({
        toggle: 'todos/toggle'
      })
    }
  }
</script>

<style scoped>

</style>
