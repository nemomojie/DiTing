<template>
    <div id="app">
        <h1>Hello {{name}}!</h1>
        <MobileVueTextInput :value.sync="name"
                            :label="username"
                            @mobile-vue-text-input-input="updateName"/>
        <router-link to="/A">A</router-link>
        <router-link to="/B">B</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    import MobileVueTextInput from './components/MobileVueTextInput.vue'

    export default {
        data: function() {
            return {
                name: 'nobody',
                username: 'Username',
            };
        },
        components: {
            MobileVueTextInput
        },
        methods: {
            updateName: function(event) {
                console.log('input');
            }
        }
    }
</script>

<style>
</style>