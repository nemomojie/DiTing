<template>
  <div class="mobile-vue-login-page mobile-vue-page">
    <div class="mobile-vue-login-page-bg">
      <img class="mobile-vue-login-page-bg-img img-responsive" src="/public/images/bg.jpeg"/>
    </div>
    <div class="mobile-vue-login-page-logo"/>
    <div class="mobile-vue-login-page-form input-form">
      <div class="mobile-vue-login-page-form-avatar">
        <img class="mobile-vue-login-page-form-avatar-img img-circle" src="/public/images/default-avatar.jpeg"/>
        <div class="mobile-vue-login-page-form-avatar-name"/>
      </div>
      <div class="mobile-vue-login-page-form-username mobile-vue-login-page-form-input">
        <mobile-vue-text-input label="Username" :use-float-label="true" v-model="username"
                               :hint-message="usernameHint" :hint-type="usernameHintType"/>
      </div>
      <div class="mobile-vue-login-page-form-password mobile-vue-login-page-form-input">
        <mobile-vue-text-input label="Password" :use-float-label="true" input-type="password" v-model="password"
                               :hint-message="passwordHint" :hint-type="passwordHintType" @change="onPasswordChange"/>
      </div>
      <div class="mobile-vue-login-page-form-login">
        <mobile-vue-raised-button label="Login" @click="login"
                                  :full-width="true"/>
      </div>
    </div>
  </div>
</template>

<script>
  import MobileVueRaisedButton from '../components/MobileVueRaisedButton.vue';
  import MobileVueTextInput from '../components/MobileVueTextInput.vue';

  export default {
    data: function() {
      return {
        username: '',
        password: '',
        usernameHint: '',
        passwordHint: '',
        usernameHintType: 'none',
        passwordHintType: 'none',
      };
    },
    components: {
      MobileVueRaisedButton,
      MobileVueTextInput,
    },
    methods: {
      login() {
        this.$ajax.post('/login', {username: this.username, password: this.password})
          .then(res => {
            if (res.status === 200) {
              this.$store.commit('login');
              this.$router.replace('/main');
            } else {
              this.showLoginError('Username or password is wrong');
            }
          })
          .catch(err => {
            this.showLoginError('Username or password is wrong');
          })
      },
      showLoginError(message) {
        const opts = {
          content: message,
          canDismiss: true,
        };
        // this.$alert(opts);
        this.passwordHint = message;
        this.passwordHintType = 'error';
      },
      onPasswordChange(event) {
        this.passwordHint = '';
        this.passwordHintType = 'none';
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
      &-img {
        max-width: 100%;
        height: auto;
        display: block;
      }
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
      background-color: @bg-color-white;
      //opacity: 0.85;
      &-avatar {
        height: 88px;
        margin: 0 auto;
        &-img {
          height: 88px;
          width: 88px;
          border: 2px solid #fff;
          border-radius: 50%;
        }
      }

      &-login {
        margin-top: 16px;
      }
    }
  }
</style>