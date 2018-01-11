<template>
  <transition name="ripple-zoom">
    <div class="circle-ripple" :style="mergedStyle"/>
  </transition>
</template>

<script>
  export default {
    props: {
      mergedStyle: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped lang="less">

  @import "../../less/component-base";

  .circle-ripple {
    position: absolute;
    background-color: fade(#000, 10);
    border-radius: @border-radius-circle;
  }

  .ripple-zoom-enter-active, .ripple-zoom-leave-active{
    transition: opacity 2s cubic-bezier(0.23, 1, 0.32, 1), transform .45s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .ripple-zoom-enter {
    transform: scale(0);
  }

  .ripple-zoom-leave-active{
    opacity: 0 !important;
  }
</style>