<template>
    <input
        type="text"
        class="mobile-vue-text-input"
        v-model="inputValue"
        @input="onInput"/>
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                default: '',
            }
        },
        methods: {
            onInput: function (event) {
                this.$emit('update:value', this.inputValue);
                this.$emit('mobile-vue-text-input-input', event.target.value);
            },
        },
        data: function() {
            return {
                inputValue: this.value
            };
        }
    }
</script>

<style>
    .mobile-vue-text-input {
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        padding: 0 15px 0 30px;
        border: 1px solid #e3e3e3;
        color: #2c3e50;
        outline: none;
        border-radius: 15px;
        margin-right: 10px;
        transition: border-color 0.2s ease;
        background-size: 20px;
        vertical-align: middle !important;
    }
</style>