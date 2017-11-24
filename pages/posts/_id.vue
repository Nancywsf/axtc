<template>
  <div class="container">
    <!--<h1>{{ post.title }}</h1>-->
    <pre>{{ post.content }}</pre>
    <p><nuxt-link to="/posts">Back to the list</nuxt-link></p>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    asyncData ({ params }) {
      // We can use async/await ES6 feature
      return axios.get(`http://zx.axfc.cn/zxpc/company/getJcCompanyInfo?id=4`).then((res) => {
        return { post: res.data.data }
      })
    },
    head () {
      return {
        title: this.post.title
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 70%;
    margin: auto;
    text-align: center;
    padding-top: 100px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  ul li {
    border: 1px #ddd solid;
    padding: 20px;
    text-align: left;
  }
  ul li a {
    color: gray;
  }
  p {
    font-size: 20px;
  }
  a {
    color: #41B883;
  }
</style>
