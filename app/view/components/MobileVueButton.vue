<template>
  <div class="mobile-vue-button">
    <button class="mobile-vue-button-btn btn btn-primary btn-block btn-lg" @click="onClick">
      <span class="mobile-vue-button-icon"/>
      <span class="mobile-vue-button-label">{{ label }}</span>
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
      },
      icon: {
        type: String,
      }
    },
    methods: {
      onClick: function(event) {
        console.log('click btn');
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../less/component-base";

  .mobile-vue-button {
    &-btn {
      .hide-text-overflow();

      &:active {
        color: @text-normal;
        background: #e6e8ea;
      }
    }
  }
</style>