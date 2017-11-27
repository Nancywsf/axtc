const axios = require('axios')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '同城壹家',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'pc' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    /*
     ** 不管页面中使用axios等插件多少次，只打包一次
     */
    vendor: ['axios', 'vue-awesome-swiper', 'vue-layer', 'vue-notifications', 'mini-toastr', 'vue-waterfall']
  },
  plugins: [
    // {'src': '~/plugins/Global.js', ssr: true}
    {'src': '~/plugins/vue-awesome-swiper.js', ssr: false},
    {'src': '~/plugins/vue-layer.js', ssr: false},
    {'src': '~/plugins/vue-notifications.js', ssr: false},
    {'src': '~/plugins/vue-waterfall.js', ssr: false}
  ],
  css: [
    '~/static/css/font-awesome.min.css',
    '~/static/css/base.css'
  ],
  /*配置跨域*/
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
    ['/zxpc', { target: 'http://zx.axfc.cn' }]
  ],
  generate: {
    routes: function () {
      function getZxCompany () {
        return axios.get('http://zx.axfc.cn/zxpc/company/getZxCompanyList?page=0&pagesize=5')
      }
      function getJcCompany () {
        return axios.get('http://zx.axfc.cn/zxpc/company/getJcCompany?page=0&page_size=5')
      }
      return axios.all([
        getZxCompany(),
        getJcCompany()
      ])
        .then((res) => {
          let array0 = res[0].data.data.map((com) => {
            return '/zxCompanyInfo/' + com.id + '/case'
          })
          let array1 = res[1].data.data.map((com) => {
            return '/jcCompanyInfo/' + com.id + '/product'
          })
          return array0.concat(array1)
        })
    }
  }
}
