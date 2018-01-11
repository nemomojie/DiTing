<template>
  <div class="touch-ripple-wrapper" @touchstart="start" @touchend="end" @touchcancel="end" ref="wrapper">
    <circle-ripple v-for="(ripple, index) in ripples" :key="index" v-bind="ripple"/>
  </div>
</template>

<script>
  import CircleRipple from './CircleRipple.vue';

  export default {
    data: function() {
      return {
        ripples: []
      };
    },

    methods: {
      start(e) {
        const newRipple = {
          mergedStyle: this.getRippleStyle(e)
        };
        this.ripples.push(newRipple);
      },
      end(e) {
        if (this.ripples.length === 0) {
          return ;
        }
        this.ripples.splice(0, 1);
      },

      getRippleStyle(event) {
        const touchPoint = event.touches[0];
        const el = this.$refs.wrapper;
        const boundRect = el.getBoundingClientRect();
        const x = touchPoint.clientX - boundRect.left;
        const y = touchPoint.clientY - boundRect.top;

        const leftTopDis = this.calDis(x, y, 0, 0);
        const leftBotDis = this.calDis(x, y, 0, boundRect.height);
        const rightTopDis = this.calDis(x, y, boundRect.width, 0);
        const rightBotDis = this.calDis(x, y, boundRect.width, boundRect.height);

        const r = Math.max(leftBotDis, rightBotDis, leftTopDis, rightTopDis);
        const d = r * 2;

        const px = x - r;
        const py = y - r;

        return {
          height: d + 'px',
          width: d + 'px',
          left: px + 'px',
          top: py + 'px'
        };
      },

      calDis(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      }
    },

    components: {
      CircleRipple
    }
  }
</script>

<style scoped lang="less">
  @import "../../less/component-base";

  .touch-ripple {
    &-wrapper {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      overflow: hidden;
    }
  }
</style>