<template>
  <!-- 客户端渲染的入口节点 -->
  <div id="app">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
    </ul>
    <!-- 路由出口 -->
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      message: '拉钩教育'
    }
  },
  methods: {
    onClick () {
      console.log('hello world')
    }
  },
}
</script>
<style>
</style>