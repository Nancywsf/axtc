import axios from 'axios'

let HOST = 'http://localhost:3000'
let sid = ''
if (process.browser) {
  sid = sessionStorage.getItem('sid')
}

export const state = () => ({
  counter: 0,
  HOST: HOST
})
// export const mutations = {
//   increment (state) {
//     state.counter++
//   }
// }
require('whatwg-fetch')

export const actions = {
  nuxtServerInit (store, {commit, req}) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
    store.dispatch('getFooterNav')
    store.dispatch('getFriendLink')
    store.dispatch('getFooterCompanyInfo')
    store.dispatch('getUserData', {sid: sid})
  },
  getFooterNav ({ commit }) {
    return axios.get(HOST + '/zxpc/Footer/getDaohangLink')
      .then((res) => {
        const success = !!res.status && res.data && Object.is(res.data.code, 1)
        if (success) commit('footer/SET_FOOTERNAV', res.data)
      })
  },
  getFriendLink ({ commit }) {
    return axios.get(HOST + '/zxpc/Footer/getYouqingLink')
      .then((res) => {
        const success = !!res.status && res.data && Object.is(res.data.code, 1)
        if (success) commit('footer/SET_FRIENDLINK', res.data)
      })
  },
  getFooterCompanyInfo ({ commit }) {
    return axios.get(HOST + '/zxpc/Footer/getfooterInfo')
      .then((res) => {
        const success = !!res.status && res.data && Object.is(res.data.code, 1)
        if (success) commit('footer/SET_COMPANYINFO', res.data)
      })
  },
  getUserData ({ commit }, params) {
    return axios.post(HOST + '/zxpc/my/info', params)
      .then((res) => {
        const success = !!res.status && res.data && Object.is(res.data.code, 1)
        if (success) {
          commit('login/SET_USER', res.data)
        }
        if (!success) {
          commit('login/CLEAR_USER', res.data)
          sessionStorage.setItem('isLogin', false)
          sessionStorage.setItem('mobile', '')
          sessionStorage.setItem('nickname', '')
          sessionStorage.setItem('head_img', '')
          sessionStorage.setItem('order_count', '')
          sessionStorage.setItem('yy_countame', '')
          sessionStorage.setItem('integral', '')
          this.userInfo.isLogin = false
        }
      })
  },
  yyShop ({ commit }, params) {
    return axios.post(HOST + '/zxpc/FreeDesign/index', params, {emulateJSON: true}).then((res) => {
      const success = !!res.status && res.data && Object.is(res.data.code, 1)
      return success
    })
  }
}
