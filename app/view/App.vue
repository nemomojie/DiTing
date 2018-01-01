<template>
    <div id="app">
        <h1>Hello {{name}}!</h1>
        <MobileVueTextInput :value.sync="name" @mobile-vue-text-input-input="updateName"/>
    </div>
</template>

<script>
    import MobileVueTextInput from './components/MobileVueTextInput.vue'

    export default {
        data: function() {
            return {
                name: 'nobody'
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