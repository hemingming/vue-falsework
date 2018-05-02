<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank">
          Core Docs
        </a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank">
          Forum
        </a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank">
          Community Chat
        </a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank">
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a href="http://vuejs-templates.github.io/webpack/" target="_blank">
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a href="http://router.vuejs.org/" target="_blank">
          vue-router
        </a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/" target="_blank">
          vuex
        </a>
      </li>
      <li>
        <a href="http://vue-loader.vuejs.org/" target="_blank">
          vue-loader
        </a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">
          awesome-vue
        </a>
      </li>
    </ul>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <img :src="item.mediaUrl">
        <p @click="handle(index, item.deployName)">{{ item.deployName }}</p>
      </li>
    </ul>
  </div>
</template>


<script>
import api from './api'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list: []
    }
  },
  created() {
    this.$toast({
      message: '提示'
    })
    api.queryAdDeploy({
      otherresource: {
        resourceId: 500
      }
    })
    .then(res => {
      console.log(res.body)
      let resData = JSON.parse(res.body.obj)
      console.log(resData)
      this.list = resData.obj.otherResource[0].advList
    })
  },
  methods: {
    handle(index, deployName) {
      this.list[index].deployName = deployName.split('').reverse().join('')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
