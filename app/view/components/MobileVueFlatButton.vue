<template>
  <base-button class="mobile-vue-flat-button"
  :disabled="disabled" @click="handleClick">
    <span class="mobile-vue-flat-button-label">{{ label }}</span>
  </base-button>
</template>

<script>
  import BaseButton from './base/baseButton';

  export default {
    props: {
      label: String,
      disabled: {
        type: Boolean,
        default: false
      },
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
  @import '../less/component-base';

  .mobile-vue-flat-button {
    .display(inline-block);
    .hide-text-overflow();
    border-radius: @border-radius-small;
    height: @mobile-button-height;
    line-height: @mobile-button-line-height;
    min-width: @mobile-button-min-width;
    border: none;
    text-transform: uppercase;
    background: none;
    padding: 0;
    margin: 0;
    outline: 0;
    color: @brand-primary;

    &.disable {
      color: fade(@brand-color-black, 26);
    }
  }
</style>