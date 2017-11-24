<template>
  <div class="introduction" v-if="com.content">
    <div class="content subtitle" v-html="com.content"></div>
  </div>
  <p class="no-result subtitle" v-else>抱歉，暂无公司介绍  ╮(╯▽╰)╭</p>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  export default {
    asyncData (context) {
      return axios.get(context.store.state.HOST + '/zxpc/company/getJcCompanyInfo?id=' + context.route.params.id).then((res) => {
        return {com: res.data.data}
      })
    }
  }
</script>

<style scoped>
  .introduction .content{
    font-size: 16px;
  }
</style>
