import TouchRipple from './TouchRipple.vue';

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    disableRipple: {
      type: Boolean,
      default: false,
    }
  },

  computed: {

  },

  methods: {
    handleClick(e) {
      this.$emit('click');
    },

    createButtonChildren(createElement) {
      let children = [];
      children = children.concat(this.$slots.default);
      if (!this.disableRipple && !this.disabled) {
        const ripple = createElement(TouchRipple);
        children.push(ripple);
      }
      return children;
    }
  },

  render(createElement) {
    const tagName = 'button';
    return createElement(
      tagName,
      {
        domProps: {
          disabled: this.disabled,
        },
        class: {
          disable: this.disabled
        },
        style: {
          'outline': 'none',
          'position': 'relative',
        },
        on: {
          click: this.handleClick,
        }
      },
      this.createButtonChildren(createElement))
  }
}