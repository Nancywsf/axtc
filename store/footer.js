export const state = () => ({
  footerNav: {},
  friendLink: {},
  companyInfo: {}
})

export const mutations = {
  SET_FOOTERNAV: function (state, res) {
    state.footerNav = res.data
  },
  SET_FRIENDLINK: function (state, res) {
    state.friendLink = res.data
  },
  SET_COMPANYINFO: function (state, res) {
    state.companyInfo = res.data
  }
}
