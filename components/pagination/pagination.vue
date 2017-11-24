<template>
  <div class="pager">
    <button class="btn btn-pager" :disabled="pageData.page == 1" @click="prePage">上一页</button>
    <span v-if="pageData.pageNo !== 1" class="page-index" :class="1 == pageData.page ? 'active':''" @click="goPage(1)">1</span>
    <span v-if="preClipped" class="page-index">...</span>
    <span v-for="index in pages" class="page-index" :class="index == pageData.page ? 'active':''" @click="goPage(index)">{{index}}</span>
    <span v-if="backClipped" class="page-index">...</span>
    <span class="page-index" :class="pageData.pageNo == pageData.page ? 'active':''" @click="goPage(pageData.pageNo)">{{pageData.pageNo}}</span>
    <button class="btn btn-pager" :disabled="pageData.page == pageData.pageNo" @click="nextPage">下一页</button>
  </div>
</template>

<script type="text/ecmascript-6">
  //  import $ from 'jquery'
  export default {
    props: {
      pageData: {}
    },
    data: function () {
      return {
        // 用于判断省略号是否显示
        backClipped: true,
        preClipped: false
      }
    },
    methods: {
      prePage (event) {
        // 上一页
        this.goPage(this.pageData.page - 1)
      },
      nextPage (event) {
        // 下一页
        this.goPage(this.pageData.page + 1)
      },
      goPage (index) {
        // 跳转到相应页面
        if (index !== this.pageData.page) {
          this.pageData.page = index
          this.$emit('goPage', this.pageData)
        }
      }
    },
    computed: {
      // 使用计算属性来得到每次应该显示的页码
      pages: function () {
        let ret = []
        if (this.pageData.page > 3) {
          // 当前页码大于三时，显示当前页码的前2个
          ret.push(this.pageData.page - 2)
          ret.push(this.pageData.page - 1)
          if (this.pageData.page > 4) {
            // 当前页与第一页差距4以上时显示省略号
            this.preClipped = true
          }
        } else {
          this.preClipped = false
          for (let i = 2; i < this.pageData.page; i++) {
            ret.push(i)
          }
        }
        if (this.pageData.page !== this.pageData.pageNo && this.pageData.page !== 1) {
          ret.push(this.pageData.page)
        }
        if (this.pageData.page < (this.pageData.pageNo - 2)) {
          // 显示当前页码的后2个
          ret.push(this.pageData.page + 1)
          ret.push(this.pageData.page + 2)
          if (this.pageData.page <= (this.pageData.pageNo - 3)) {
            // 当前页与最后一页差距3以上时显示省略号
            this.backClipped = true
          }
        } else {
          this.backClipped = false
          for (let i = (this.pageData.page + 1); i < this.pageData.pageNo; i++) {
            ret.push(i)
          }
        }
        // 返回整个页码组
        return ret
      }
    }
  }
</script>

<style scoped>
  .pager {
    text-align: center;
    margin-top: 10px;
  }
  .btn-pager {
    margin-left: 10px;
    padding: 0px;
    width: 60px;
    height: 30px;
    text-align: center;
    background-color: #ffffff;
    color: #666;
    border: 1px solid #e3e3e3;
    border-radius: 0px;;
  }
  .btn-pager:hover {
    background-color: #f2f2f2;
  }
  .page-index {
    display: inline-block;
    margin-left: 10px;
    width: 35px;
    height: 32px;
    line-height: 30px;
    background-color: #ffffff;
    cursor: pointer;
    color: #666;
    border: 1px solid #efefef;
  }
  .page-index:hover{
    color: #26cb9b;
  }
  .active {
    color: #ffffff !important;
    background-color: #00b489;
  }
</style>
