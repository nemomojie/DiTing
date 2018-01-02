<template>
    <div class="mobile-vue-text-input">
        <div class="mobile-vue-text-input-label">{{label}}</div>
        <div class="mobile-vue-text-input-input">
            <input type="text" class="mobile-vue-text-input-input-input"
            v-model="inputValue" @input="onInput"/>
            <div class="mobile-vue-text-input-input-hint"/>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                default: '',
            },
            label: {
                type: String,
                default: 'Label',
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

<style scoped lang="less">
    .mobile-vue-text-input {
        &-label {
            font-size: 1.2rem;
        }
    }
</style>