<template>
  <base-button class="mobile-vue-raised-button"
               v-bind:class="[type, {'full-width': fullWidth}]"
               :disabled="disabled" @click="handleClick">
    <span class="mobile-vue-raised-button-label">{{ label }}</span>
  </base-button>
</template>

<script>
  import BaseButton from './base/baseButton';

  export default {
    props: {
      label: String,
      disabled: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'primary',
      },
      fullWidth: {
        type: Boolean,
        default: false,
      }
    },

    methods: {
      handleClick(e) {
        this.$emit('click');
      }

    },

    components: {
      BaseButton
    },
  }
</script>

<style scoped lang="less">
  @import "../less/component-base";

  .mobile-vue-raised-button {
    height: 36px;
    min-width: 88px;
    border-radius: @border-radius-small;
    border: none;
    .box-shadow(0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647));
    font-size: 1.4rem;

    &.full-width {
      width: 100%;
    }

    &.primary {
      color: @text-white;
      background-color: @mobile-focus-primary-color;
    }

    &.disable {
      color: fade(#000, 28);
      background-color: fade(#000, 12);
    }
  }

</style>