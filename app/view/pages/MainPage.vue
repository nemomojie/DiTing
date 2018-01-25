<template>
  <div class="mobile-vue-main-page mobile-vue-page">
    <mobile-vue-list-item v-for="(item, index) in list" :key="index">
      <span slot="content" class="mobile-vue-list-item-single-line-content">{{item.title}}</span>
    </mobile-vue-list-item>
  </div>
</template>

<script>
  import MobileVueListItem from '../components/MobileVueListItem.vue';

  export default {
    data: function() {
      return {
        list: [
        {title: 'Hehe', content: 'This is hehe'},
        {title: 'Haha', content: 'This is haha'},
      ],
      };
    },
    components: {
      MobileVueListItem,
    },
  }
</script>

<style scoped lang="less">
  @import "../less/common-page";
</style>