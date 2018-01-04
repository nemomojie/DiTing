<template>
  <div id="app" class="mobile-vue-app">
    <div class="hidden-router-links">
      <router-link to="/login">Login</router-link>
      <router-link to="/main">Main</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
      };
    },
    components: {
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