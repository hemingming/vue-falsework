<template>
  <div
  class="flex-c-m"
  :class="[ type, size, {'disabled': disabled, 'bl-button': !inline, 'bl-button-inline': inline} ]"
  @click="handleClick"
  :disabled="disabled">
    <span :class="icon" v-if="icon || $slots.icon">
      <slot name="icon"></slot>
    </span>
    <slot></slot>
  </div>
</template>

<style lang="scss">
  @import "src/sass/tobe/function";
  $btnBaseClass:           bl-button !default; //按钮的基本class
  $inlineBtnClass:         bl-button-inline !default; //行内按钮的基本class
  $outlineBtnClass:        bl-button-outline !default; //outline按钮基本class
  $btnMulti:               () !default; // block按钮 1.class 名称 2.按钮背景颜色 3.边框颜色, 4.文字颜色
  $inlineBtnMulti:         () !default; // block按钮 1.class 名称 2.按钮背景颜色 3.边框颜色, 4.文字颜色
  $btnMulti:
                   (primary #F13149 transparent #fff)
                   (blueBtn #ccc transparent #fff);

  $inlineBtnMulti:
                   (primary #F13149 transparent #fff)
                   (outlineMain #ffffff #e31a41 #e31a41); // 我的评价页面用的btn

  %btn-basic{
    padding: 0 rem(10);
    margin: 0 auto;
    font-size: rem(34);
    text-align: center;
    height: rem(88);
    width: 100%;
    border: 1px solid #c5c5c5;
    border-radius: rem(6);
    white-space: nowrap;
    &.middle{
      height: rem(68);
      font-size: rem(28);
    }
    &.small{
      height: rem(60);
      font-size: rem(24);
    }
    .preloader{
      width: rem(30);
      height: rem(30);
      margin-right: rem(16);
    }
  }

  // inline
  %btn-inline{
    display: inline-block;
    padding: 0 rem(20);
    text-align: center;
    line-height: rem(88);
    font-size: rem(36);
    border: 1px solid #c5c5c5;
    border-radius: rem(6);
    white-space: nowrap;
    &.middle{
      line-height: rem(68);
      font-size: rem(28);
    }
    &.small{
      line-height: rem(60);
      font-size: rem(24);
      padding: 0 rem(10);
    }
  }

  div.#{$inlineBtnClass} {
    @extend %btn-inline;
    &.disabled{
      color: #999999 !important;
      background-color: #dddddd !important;
      border-color: #aaaaaa !important;
    }
  }
  div.#{$btnBaseClass} {
    @extend %btn-basic;
    &.disabled{
      color: #999999 !important;
      background-color: #dddddd !important;
      border-color: #aaaaaa !important;
    }
  }


  // block btn multi
  @mixin btn-multi($btnMultis: $btnMulti) {
    @each $btn in $btnMultis {
      $class:      nth($btn,1);
      $bgColor:    nth($btn,2);
      $bdColor:    nth($btn,3);
      $textColor:  nth($btn,4);
      .#{$btnBaseClass}.#{"" + $class}{
        color: $textColor;
        background-color: $bgColor;
        border-color: $bdColor;
      }
    }
  }

  // inline multi
  @mixin multiInlineBtn($multiInlineBtns: $inlineBtnMulti) {
    @each $multiInlineBtn in $multiInlineBtns {
      $class:      nth($multiInlineBtn,1);
      $bgColor:    nth($multiInlineBtn,2);
      $bdColor:    nth($multiInlineBtn,3);
      $textColor:  nth($multiInlineBtn,4);
      .#{$inlineBtnClass}.#{"" + $class} {
        color: $textColor;
        background-color: $bgColor;
        border-color: $bdColor;
      }
    }
  }

  @include btn-multi($btnMulti);
  @include multiInlineBtn($inlineBtnMulti);

</style>

<script>
export default {

  name: 'Button',

  data () {
    return {

    };
  },
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    size: String,
    disabled: Boolean,
    inline: Boolean,
    icon: String
  },
  methods: {
    handleClick(evt) {
      if (!this.disabled) {
        this.$emit('click', evt)
      }
    }
  }
};
</script>
