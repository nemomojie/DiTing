<template>
  <div class="mobile-vue-list-item">
    <div class="mobile-vue-list-item-content" v-bind:class="{ divider: showDivider}">
      <slot name="content"/>
    </div>
    <div class="mobile-vue-list-item-right">

    </div>
    <touch-ripple/>
  </div>
</template>

<script>
  import TouchRipple from './base/TouchRipple.vue';

  export default {
    props: {
      showDivider: {
        type: Boolean,
        default: true,
      },
    },

    components: {
      TouchRipple,
    },
    methods: {
      onClick: function(e) {
        console.log('click item');
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../less/component-base";

  .mobile-vue-list-item {
    width: 100%;
    padding: 0 16px;
    position: relative;
    &-content {
      &.divider {
        .hairline(bottom, @mobile-divider-color);
      }
    }
    & &-single-line-content {
      line-height: 48px;
    }
  }
</style>