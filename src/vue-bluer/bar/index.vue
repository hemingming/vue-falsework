<template>
  <div class="bar-box" :class="{ 'pos-rela': relative }">
    <header class="bar bar-header flex-space" :class="[ barStyle || 'bar-light' ]">
      <div class="bar-left">
        <slot name="left-button"></slot>
      </div>
      <h1 class="title flex-c-m">
        <slot name="title"></slot>
      </h1>
      <div class="bar-right">
        <slot name="right-button"></slot>
        <template v-if="nav">
          <div class="j-nav" :class="{'show-nav': isShow}" @click="isShow = !isShow">
            <div class="button iconfont more-v"></div>
            <div class="button iconfont error"></div>
          </div>
          <div :class="{'show-navcontent': isShow}" class="j-navcontent">
            <ul class="ul-nav flex-m">
              <li><a :href="$H5BASE_URL + '/page/view_Index.html?pageNumber=1&pageSize=5'"><i class="iconfont ihome"></i><p>首页</p></a></li>
              <li><a :href="$H5BASE_URL + '/page/searchlist.html'"><i class="iconfont isearch"></i><p>搜索</p></a></li>
              <li><a :href="$H5BASE_URL + '/product/SearchCategorylist.html'"><i class="iconfont class"></i><p>分类</p></a></li>
              <li><a :href="$H5BASE_URL + '/sale/shoppingcart/view_shopping_cart.html'"><i class="iconfont shop-car"></i><p>购物车</p></a></li>
              <li><a :href="$H5BASE_URL + '/member/view_memberIndex.html'"><i class="iconfont iuser"></i><p>我的i百联</p></a></li>
            </ul>
          </div>
        </template>
      </div>
    </header>
  </div>
</template>

<style lang="scss">
  @import "src/sass/tobe/function";
  .bar-box {
    padding-top: rem(88);
    &.pos-rela {
      padding-top: 0;
      .bar {
        position: relative;
      }
    }
  }

  .bar {
    @include user-select(none);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 100;

    width: 100%;
    height: rem(88);

    background-color: #ffffff;
    background-size: 0;
    &.pos-rela {
      position: relative;
    }
    @include hair(bottom, #dddddd); // bar light类型 后续继续添加
    &.bar-light {
      @include bar-style($bar-light-bg, $bar-light-border, $bar-light-text);
    }
    &.bar-white {
      @include bar-style(#ffffff, #dddddd, #444444);
    }
    &.bar-dark {
      @include bar-style($dark, $dark, $white);
      .button {
        color: #fff;
      }
    }
    &.bar-dark-linear {
      background-image: linear-gradient(0deg, #263238 1%, #0F1012 100%);
      background-size: contain;
      .button,
      .title {
        color: #fff;
      }
    } // Title inside of a bar is centered
    .title {
      position: absolute;
      top: 0;
      left: 10%;
      right: 10%;
      height: 100%;
      color: #000000;

      max-width: 80%;
      overflow: hidden;

      text-align: center; // Go into ellipsis if too small
      text-overflow: ellipsis;
      white-space: nowrap;

      font-size: rem(36);
      font-weight: 400;
    }

    .title a {
      color: inherit;
    }

    .button {
      padding: 0 rem(20);
      min-width: initial;
      font-size: rem(38);
      border: 0;
      background-color: transparent;
      color: #000000;
      &.small-button {
        font-size: rem(28);
      }
      &:active {
        opacity: .6;
      }
      &.padding {
        padding: 0 rem(10);
      }
    }
  }

  .bar-header {
    .bar-left,
    .bar-right {
      font-size: 0;
      z-index: 2;
    }
    .bar-right {
      .button {
        font-size: rem(28);
      }
      .j-nav {
        width: rem(80);
        height: 100%;
        div.button {
          @include transition(all .5s ease);
          position: absolute;
          right: 0;
          top: 0;
          font-size: rem(40);
        }
        div.error {
          visibility: hidden;
          opacity: 0;
          color: #fe5b4a !important;
          font-size: rem(35);
        }
        &.show-nav {
          .more-v {
            visibility: hidden;
            opacity: 0;
          }
          .error {
            visibility: inherit;
            opacity: 1;
          }
        }
      }
      .j-navcontent {
        position: absolute;
        width: 100%;
        top: rem(88);
        left: 0;
        right: 0;
        height: 0;
        visibility: hidden;
        @include transition(all .2s linear);
        border-bottom: rem(4) solid #fe8477;
        &:before {
          content: '';
          position: absolute;
          top: -5px;
          right: .3rem;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 6px 6px 6px;
          border-color: transparent transparent rgba(0, 0, 0, .8) transparent;
        }
        &.show-navcontent {
          height: rem(120);
          visibility: inherit;
        }
        .ul-nav {
          padding: rem(18) 0;
          overflow: hidden;
          height: 100%;
          background-color: rgba(0, 0, 0, .8);
          color: #ffffff; // padding-top: rem(6);
          li {
            @include flex(1);
            @include align-self(center);
            width: 0;
            text-align: center;
            a {
              color: #ffffff;
              display: block;
            }
            p {
              font-size: rem(24);
            }
            i {
              font-size: rem(40);
              line-height: 1;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .bar-left,
    .bar-right,
    .button {
      @include display(flex);
      @include align-items(center);
      height: 100%;
    }
    .bar-left,
    .bar-right {
      >.button+.button {
        padding-left: 0;
      }
    }
  }
</style>

<script lang="babel">

  export default {
    name: 'Bar',
    props: {
      barStyle: {
        type: String
      },
      relative: {
        type: Boolean,
        default: false
      },
      nav: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false
      }
    },
    mounted() {
      this.$emit('finish')
    }
  };
</script>
