<template>
  <div id="app" class="mobile-vue-app">
    <div class="hidden-router-links">
      <router-link to="/login">Login</router-link>
      <router-link to="/main">Main</router-link>
    </div>
    <router-view></router-view>
    <mobile-vue-simple-dialog/>
  </div>
</template>

<script>
  import LoginPage from './pages/LoginPage.vue';
  import MainPage from './pages/MainPage.vue';
  import MobileVueSimpleDialog from './components/MobileVueSimpleDialog.vue';

  export default {
    data: function () {
      return {
      };
    },
    components: {
      LoginPage,
      MainPage,
      MobileVueSimpleDialog,
    },
    methods: {
    }
  }
</script>

<style lang="less">
  @import "less/common-mobile";

  .mobile-vue-app {
    height: 100%;
  }
</style>

<style src="../public/font/material-icons/material-icons.css"/>