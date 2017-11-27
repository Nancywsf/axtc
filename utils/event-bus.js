/*
 *
 * 一些无法适用于 store 的数据状态
 *
 */

import Vue from 'vue'
import axios from 'axios'

let miniToastr
if (process.browser) {
  miniToastr = require('mini-toastr')
}

const ERR = 0

export default new Vue({
  data () {
    return {}
  },
  methods: {
    validator (event) {
      var o = event.currentTarget
      var pattern = new RegExp(o.getAttribute('data-pattern'))
      if (pattern.test(o.value)) {
        return true
      } else {
        return false
      }
    },
    yyShop (data) {
      axios.post('/zxpc/FreeDesign/index', data, {emulateJSON: true}).then((res) => {
        res = res.data
        if (res.code === ERR) {
          this.showMsg({message: res.msg, type: 'error'})
          return false
        }
        if (res.code === 1) {
          this.showMsg({message: '预约成功', type: 'info'})
          return false
        }
      })
    }
  },
  mounted () {
    miniToastr.init()
  },
  notifications: {
    showMsg: {
      title: '',
      message: 'Hello from nuxt.js',
      type: 'info'
    }
  }
})
