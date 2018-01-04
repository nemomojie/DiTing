<template>
  <div class="mobile-vue-login-page mobile-vue-page">
    <div class="mobile-vue-login-page-bg"/>
    <div class="mobile-vue-login-page-logo"/>
    <div class="mobile-vue-login-page-form">
      <div class="mobile-vue-login-page-form-avatar">
        <img class="mobile-vue-login-page-form-avatar-img img-circle" src="/public/images/default-avatar.jpeg"/>
        <div class="mobile-vue-login-page-form-avatar-name"/>
      </div>
      <div class="mobile-vue-login-page-form-username mobile-vue-login-page-form-input">
        <input v-model="username" type="text" placeholder="Username"/>
      </div>
      <div class="mobile-vue-login-page-form-password mobile-vue-login-page-form-input">
        <input v-model="password" type="password" placeholder="Password"/>
      </div>
      <div class="mobile-vue-login-page-form-login">
        <mobile-vue-button label="Login"/>
      </div>
    </div>
  </div>
</template>

<script>
  import MobileVueButton from '../components/MobileVueButton.vue';
  export default {
    data: function() {
      return {
        username: '',
        password: '',
      };
    },
    components: {
      MobileVueButton
    }
  }
</script>

<style scoped lang="less">
  @import "../less/component-base";
  @import "../less/common-page";
  .mobile-vue-login-page {
    position: relative;
    &-bg {
      position: absolute;
      left: 0;
      top: 0;
      .background-image(url('/public/images/bg.jpeg'));
      .background-size(cover);
      .opacity(0.5);
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    &-logo {
      width: 100%;
      height: 25%;
    }
    &-form {
      width: 80%;
      .display(flex);
      .flex-direction(column);
      .justify-content(center);
      margin: 0 auto;
      &-avatar {
        height: @size-base * 11;
        margin: @size-base auto;
        &-img {
          height: @size-base * 11;
          width: @size-base * 11;
          border: 2px solid @border-color-white;
        }
      }
      &-input {
        font-size : @font-size-body;
        background-color: fade(@bg-color-white, 90);
        padding : 0 @size-base * 0.25 0 @size-base * 1.375;
        .border-radius(@border-radius-base);
        .background-clip(padding-box);
        margin-bottom : @size-base;
        .display(flex);
        line-height : @size-base * 4;
      }
      &-login .mobile-vue-button {
        .opacity(0.8);
      }
    }
  }
</style>