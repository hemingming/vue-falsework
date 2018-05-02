<template>
  <div class="ant-transparent" :class="className" v-if="visible">
    <div class="ant-toast" :class="position" :style="{ 'padding': iconClass === '' ? '10px' : '15px 30px' }">
      <i class="ant-icon" :class="iconClass" v-if="iconClass !== ''"></i>
      <span class="ant-toast-text">{{ message }}</span>
    </div>
  </div>
</template>

<style lang="scss">
  @import "src/sass/tobe/function";
  /* toast */
  .ant-transparent.white-bg{
    background-color: #fff;
  }
  .ant-toast {
    position: fixed;
    z-index: 100;
    max-width: 80%;
    z-index: 10004;
    border-radius: rem(10);
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    .ant-icon{
      display: block;
      font-size: rem(56*2);
      text-align: center;
      margin: 0 auto rem(10*2);
    }
    .ant-toast-text{
      font-size: rem(14*2);
      display: block;
      text-align: center;
      line-height: 1.2;
    }
    &.top{
      top: rem(50*2);
      left: 50%;
      transform: translate(-50%, 0);
    }
    &.middle{
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &.bottom{
      bottom: rem(50*2);
      left: 50%;
      transform: translate(-50%, 0);
    }
    &.bottomTop{
      bottom: rem(50*3);
      left: 50%;
      transform: translate(-50%, 0);
    }
    &.middleTop{
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>

<script>
export default {

  name: 'Toast',

  data () {
    return {
      visible: false
    };
  },
  props: {
    message: String,
    iconClass: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'middle'
    },
    className: {
      type: String
    }
  }
};
</script>
