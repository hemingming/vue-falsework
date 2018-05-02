<template>
  <div class="modal-mask" @touchmove.prevent v-if="showVisible">
    <div class="modal" :class="[className, effect]" :style="halfModal" ref="modal" @touchmove.prevent>
      <div class="modal-inner">
        <div class="modal-title" v-if="title !== ''">{{ title }}</div>
        <div class="modal-input" v-if="input"><!--<label>{{labelText}}</label>--><input type="text" v-model="inputValue" :placeholder="placeholder"></div>
        <div class="modal-text" v-else v-html="content"><slot name="inner"></slot></div>
      </div>
      <div class="modal-buttons flex">
        <div class="modal-button flex-c-m" v-for="(button, index) in buttons" :key="index" v-if="!input" v-text="button.text" @click="[button.onClick(), close()]"></div>
        <div class="modal-button flex-c-m" v-if="input" v-text="buttons[0].text" @click="[sure(), close()]"></div>
        <div class="modal-button flex-c-m" v-if="input" v-text="buttons[1].text" @click="close()"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import "src/sass/tobe/function";
  $color-text:        #666666 !default;
  $modalDuration:     500ms !default;
  $modalBgColor:      #F8F8F8 !default;
  $modalButonColor:   #222222 !default;
  $modalButonBg:      #F8F8F8 !default;
  $borderColor:       #dddddd !default;
  $modalButtonHeight: rem(88) !default;
  $border-radius:     rem(6) !default;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1
    }
  }
  @keyframes zoomIn {
    0% {
      opacity: 0;
      transform: scale3d(.4,.4,.4);
    }

    50% {
      opacity: 1;
      transform: scale3d(1.1, 1.1, 1.1);
    }

    100% {
      opacity: 1;
      transform: scale3d(1,1,1);
    }
  }
  .modal {
    width: rem(540);
    max-height: rem(1024);
    position: fixed;
    z-index: 11000;
    left: 50%;
    margin-left: rem(-270);
    margin-top: 0;
    overflow: hidden;
    top: 50%;
    text-align: center;
    border-radius: $border-radius;
    // opacity: 0;
    // @include transform(translate(0,-50%)!important);
    color: $color-text;
    // display: none;
    animation-duration: .5s;
    animation-fill-mode: both;
    &.fadeIn{
      animation-name: fadeIn;
    }
    &.modal-in{
      opacity: 1;
      @include transition-property(opacity);
      @include transition-duration($modalDuration);
      display: block;
    }
    &.zoomIn {
      animation-name: zoomIn;
    }
    &.modal-out {
      opacity: 0;
      z-index: 11000-1;
      @include transition-duration($modalDuration);
    }
  }
  // .modal-close{
  //     position: absolute;
  //     z-index: 3;
  //     right: rem(26);
  //     top: rem(26);
  //     background: transparent inline-image("base64/modal-close.png") no-repeat center center;
  //     background-size: contain;
  //     width: rem(30);
  //     height: rem(30);
  // }
  .modal-inner {
    padding: rem(30);
    @include hairline(bottom, $borderColor);
    border-radius: $border-radius $border-radius 0 0;
    position: relative;
    background: $modalBgColor;
  }
  .modal-input{
    margin-top: rem(20);
    input{
      font-size: rem(32);
      height: rem(70);
      line-height: rem(70);
      padding-left: rem(10);
      width: 90%;
      color:#666;
    }
  }
  .modal-title {
    font-weight: 500;
    font-size: rem(32);
    text-align: center;
    +.modal-text {
      margin: 0;
      padding-top: rem(10);
      font-size: rem(28);
      color: #666666;
      text-align: center;
    }
  }
  .modal-text {
    margin-top: rem(10);
    font-size: rem(32);
    color: #666666;
    margin: rem(30) 0;
    max-height: rem(488);
    overflow-y: auto;
  }
  .modal-buttons {
    height: rem(88);
    overflow: hidden;
  }
  .modal-button {
    width: 100%;
    padding: 0 rem(10);
    height: $modalButtonHeight;
    font-size: rem(34);
    text-align: center;
    color: $modalButonColor;
    background: $modalButonBg;
    position: relative;
    @include hairline(right, $borderColor);
    &:first-child:last-child, &:last-child {
      border-radius: 0 0 $border-radius $border-radius;
      background: #fd7072;
      color: #fff;
      @include hairline-remove(right);
    }
  }
  .modal-mask{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 1000;
  }
</style>

<script>

  export default {
    name: 'Modal',
    data () {
      return {
        halfHeight: '',
        showVisible: this.visible
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      visible: {
        type: Boolean,
        default: true
      },
      placeholder: {
        type: String,
        default: ''
      },
      inputValue: {
        type: String,
        default: '    '
      },
      labelText: {
        type: String,
        default: ''
      },
      input: {
        type: Boolean,
        default: false
      },
      content: {
        type: String
      },
      className: {
        type: String
      },
      effect: {
        type: String,
        default: 'zoomIn'
      },
      buttons: {
        type: Array,
        default: () => {
          return [
            { text: '确定', onClick: function () {} }
          ]
        }
      }
    },
    computed: {
      halfModal: function() {
        return {
          'marginTop': this.halfHeight
        }
      }
    },
    created() {
        console.log("buttons", this.buttons)
    },
    watch: {
      "visible" (val) {
        this.showVisible = val;
        console.log(val)
      }
    },
    methods: {
      close() {
        this.showVisible = false;
        // 向父组件传递
        this.$emit("click", false);
      },
      // 确定
      sure() {
        this.showVisible = false;
        // 向父组件传递
        this.$emit("click", [this.inputValue, false]);
      }
    },
    mounted() {
      if (this.$refs.modal) {
        this.halfHeight = -(this.$refs.modal.offsetHeight / 2) + 'px'
      }
    }
  }
</script>

