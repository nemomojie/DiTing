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
  import Hello from './components/Hello.vue';
  import MobileVueSimpleDialog from './components/MobileVueSimpleDialog.vue';

  export default {
    data: function () {
      return {
      };
    },
    components: {
      LoginPage,
      Hello,
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