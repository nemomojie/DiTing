<template>
  <div class="mobile-vue-login-page mobile-vue-page">
    <div class="mobile-vue-login-page-bg">
      <img class="mobile-vue-login-page-bg-img img-responsive" src="/public/images/bg.jpeg"/>
    </div>
    <div class="mobile-vue-login-page-logo"/>
    <div class="mobile-vue-login-page-form">
      <div class="mobile-vue-login-page-form-avatar">
        <img class="mobile-vue-login-page-form-avatar-img img-circle" src="/public/images/default-avatar.jpeg"/>
        <div class="mobile-vue-login-page-form-avatar-name"/>
      </div>
      <div class="mobile-vue-login-page-form-username mobile-vue-login-page-form-input">
        <input v-model="username" type="text" placeholder="Username" class="form-control input-lg"/>
      </div>
      <div class="mobile-vue-login-page-form-password mobile-vue-login-page-form-input">
        <input v-model="password" type="password" placeholder="Password" class="form-control input-lg"/>
      </div>
      <div class="mobile-vue-login-page-form-login">
        <mobile-vue-button label="Login" @click="login"/>
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
    },
    methods: {
      login() {
        this.$ajax.post('/login', {username: this.username, password: this.password})
          .then(res => {})
          .catch(err => {
            const opts = {
              content: err.response.data.message,
              canDismiss: true,
              onDismiss: this.onDis,
            };
            this.$alert(opts);
          })
      },

      onDis() {
        console.log(this);
      }
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
        height: 88px;
        margin: 0 auto;
        &-img {
          height: 88px;
          width: 88px;
          border: 2px solid #fff;
        }
      }

      &-input {
        margin-top: 4px;
      }

      &-login .mobile-vue-button {
        margin-top: 4px;
        .opacity(0.8);
      }
    }
  }
</style>