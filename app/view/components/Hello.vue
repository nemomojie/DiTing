<template>
    <span>Hello {{username}}</span>
</template>

<script>
    export default {
      computed: {
        username() {
          return this.$store.state.userInfo.username;
        }
      },
    }
</script>