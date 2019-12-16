<template>
  <div id="app">
    <b-navbar type="dark" variant="info" toggleable="lg">
      <b-navbar-brand to="/">
        アイマス声優シコチェックリスト
      </b-navbar-brand>
      <b-navbar-toggle target="main-navigation" />
      <b-navbar-nav>
        <b-nav-item to="/about">About</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <router-view class="view" />
  </div>
</template>

<script>
  import Vue from 'vue'
  export default Vue.component('App', {})
</script>
