<template>
  <transition name="fade">
    <div v-show="display" class="mobile-vue-simple-dialog" @click="clickBg">
      <div class="mobile-vue-simple-dialog-modal" @click.stop>
        <div class="mobile-vue-simple-dialog-modal-header" v-show="title">
          <div class="mobile-vue-simple-dialog-modal-header-title">{{ title }}</div>
        </div>
        <div class="mobile-vue-simple-dialog-modal-body" v-show="content">
          <div class="mobile-vue-simple-dialog-modal-body-content">{{ content }}</div>
        </div>
        <div class="mobile-vue-simple-dialog-modal-footer">
          <mobile-vue-flat-button :label="cancelText" @click="cancel" v-show="showCancel"/>
          <mobile-vue-flat-button :label="confirmText" @click="confirm"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  import Hub from '../utils/eventhub';
  import MobileVueFlatButton from './MobileVueFlatButton.vue';

  export default {
    created() {
      Hub.$on('alert', options => {
        const defaults = {
          display: true,
          title: null,
          content: null,
          showConfirm: true,
          confirmText: 'OK',
          onConfirm: null,
          showCancel: false,
          cancelText: 'Cancel',
          onCancel: null,
          canDismiss: false,
          onDismiss: null,
        };

        options = Object.assign(defaults, options);

        this.updateValue(options);
      })
    },

    data: function() {
      return {
        display: false,
        title: null,
        content: null,
        showConfirm: true,
        confirmText: 'OK',
        onConfirm: null,
        showCancel: false,
        cancelText: 'Cancel',
        onCancel: null,
        canDismiss: false,
        onDismiss: null,
      };
    },

    methods: {
      updateValue: function(value) {
        Object.keys(value).forEach((key) => this[key] = value[key]);
      },

      clickBg: function(e) {
        if (!this.canDismiss) {
          return ;
        }
        this.hide();
        if (this.onDismiss) {
          this.onDismiss();
        }
      },

      confirm: function() {
        if (this.onConfirm) {
          this.onConfirm();
        }
        this.hide();
      },

      cancel: function() {
        if (this.onCancel) {
          this.onCancel();
        }
        this.hide();
      },

      hide: function() {
        this.display = false;
      }
    },

    components: {
      MobileVueFlatButton
    }
  }
</script>

<style scoped lang="less">
  @import '../less/component-base';

  .mobile-vue-simple-dialog {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: @bg-color-modal-backdrop;
    z-index: @zindex-mobile-modal;
    top: 0;
    left: 0;
    .display(flex);
    &-modal {
      width: 80%;
      background-color: @modal-body-bg-color;
      margin: auto;
      &-header {
        padding: 0 24px;
        font-size: @font-size-title;
      }
      &-body {
        padding: 20px 24px 24px 24px;
        font-size: @font-size-body;
        color: fade(#000, 60);
      }
      &-footer {
        height: 52px;
        padding: 8px;
        .display(flex);
        .justify-content(flex-end);
        & .mobile-vue-flat-button:first-child {
          margin-right: 8px;
        }
      }
    }
  }
</style>