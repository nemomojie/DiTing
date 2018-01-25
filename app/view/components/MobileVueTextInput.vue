<template>
  <div class="mobile-vue-text-input" v-bind:class="[{ 'has-label': hasLabel, 'focus': focusing}, hintType]">
    <div class="mobile-vue-text-input-container">
      <div class="mobile-vue-text-input-label" v-if="label" v-bind:class="{'float': floating}">{{label}}</div>
      <div class="mobile-vue-text-input-input">
        <input :type="inputType" class="mobile-vue-text-input-input-input"
               v-model="inputValue"
               @input="onInput" @focus="onFocus" @blur="onBlur" @change="onChange"
               :placeholder="placeholderValue"/>
      </div>
      <div class="mobile-vue-text-input-hint"> {{hintMessage}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
      useFloatLabel: {
        type: Boolean,
        default: false,
      },
      // should not use with float label at same time
      placeholder: {
        type: String,
        default: '',
      },
      inputType: {
        type: String,
        default: 'text',
      },
      hintMessage: {
        type: String,
        default: '',
      },
      hintType: {
        type: String,
        default: 'none'
      }
    },
    methods: {
      onInput: function (event) {
        this.$emit('input', event.target.value);
      },
      onFocus: function (event) {
        this.focusing = true;
      },
      onBlur: function (event) {
        this.focusing = false;
      },
      onChange: function (event) {
        this.$emit('change', event.target.value);
      }
    },
    data: function () {
      return {
        inputValue: this.value,
        hasLabel: this.label.length > 0,
        focusing: false,
        placeholderValue: this.useFloatLabel ? '' : this.placeholder,
      };
    },
    computed: {
      floating: function () {
        return this.useFloatLabel && !this.focusing && this.inputValue.length === 0;
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../less/component-base';

  .mobile-vue-text-input {
    position: relative;
    min-height: 48px;

    &.has-label {
      min-height: 72px;
    }

    &-container {
      padding-top: 16px;
    }

    &.has-label &-container {
      padding-top: 24px;
    }

    &.focus & {
      &-label {
        color: @mobile-focus-primary-color;
      }
      &-input-input {
        border-bottom-color: @mobile-focus-primary-color;
      }
    }

    &-label {
      color: @text-light;
      position: absolute;
      top: 8px;
      font-size: 1.6rem;
      .transition(all .45s cubic-bezier(.23, 1, .32, 1));
      z-index: 1;
      cursor: text;
      .transform(translateZ(0) scale(.75));
      .transform-origin(left top);
      .user-select(none);
      pointer-events: none;
      .backface-visibility(hidden);
      &.float {
        .transform(translate3d(0, 28px, 0) scale(1));
        color: fade(#000, 38%) !important;
      }
    }

    &-input {
      &-input {
        .appearance(none);
        outline: none;
        border: none;
        background: none;
        border-radius: 0 0 0 0;
        box-shadow: none;
        display: block;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 32px;
        color: fade(#000, 87%);
        position: relative;
        border-bottom: 1px solid @border-gray-color-50;
        font-size: 1.6rem;
      }
    }

    &-hint {
      font-size: 1.2rem;
    }

    &.none & {
      &-hint {
        color: @text-light;
      }
    }

    &.error & {
      &-label {
        color: @text-danger;
      }
      &-input-input {
        border-bottom-color: @text-danger;
      }
      &-hint {
        color: @text-danger;
      }
    }

    &.warn & {
      &-label {
        color: @text-warning;
      }
      &-input-input {
        border-bottom-color: @text-warning;
      }
      &-hint {
        color: @text-warning;
      }
    }
  }
</style>