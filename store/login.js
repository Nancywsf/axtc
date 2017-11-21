export const state = () => ({
  userData: null,
  sid: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.userData = user.data
    sessionStorage.setItem('isLogin', true)
    sessionStorage.setItem('mobile', user.data.mobile)
    sessionStorage.setItem('nickname', user.data.nickname)
    sessionStorage.setItem('head_img', user.data.head_img)
    sessionStorage.setItem('order_count', user.data.order_count)
    sessionStorage.setItem('yy_countame', user.data.yy_countame)
    sessionStorage.setItem('integral', user.data.integral)
  },
  SET_SID: function (state, res) {
    state.sid = res.data
  },
  CLEAR_USER: function (state) {
    state.userData = null
    sessionStorage.setItem('isLogin', false)
  }
}
