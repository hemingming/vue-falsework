<template>
  <div class="bl-cell flex-m">
    <div class="bl-cell-title" v-if="title">{{ title }}</div>
    <div class="bl-cell-input flex-item" :class="{ 'arrow-right': showArrowRight }">
      <slot name="cell-main"></slot>
    </div>
  </div>
</template>

<script>
export default {

  name: 'Cell',

  props: {
    title: String,
    showArrowRight: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss">
  @import "src/sass/tobe/function";
  .bl-cell{
    background-color: #fff;
    margin: 0 rem(20);
    font-size: rem(28);
    border-bottom: 1px solid #ddd;
    min-height: rem(88);
    position: relative;
    .bl-cell-title{
      margin-right: rem(20);
    }
    .bl-cell-input input{
      width: 100%;
      min-height: rem(88);
    }
    .bl-cell-input{
      &.arrow-right{
        background: url("./arrow.png") no-repeat right center;
        background-size: rem(12) auto;
        padding-right: rem(24);
        min-height: rem(88);
      }
    }
  }
</style>
