<template>
  <div class="page-nav">
    <div class="j-nav" :class="{'show-nav': isShow}" @click="toggleShow">
        <div class="button iconfont more-v"></div>
        <div class="button iconfont error"></div>
    </div>
    <div :class="{'show-navcontent': isShow}" class="j-navcontent">
        <ul class="ul-nav">
            <li><a href="javascript:;"><i class="iconfont ihome"></i><p>首页</p></a></li>
            <li><a href="javascript:;"><i class="iconfont isearch"></i><p>搜索</p></a></li>
            <li><a href="javascript:;"><i class="iconfont class"></i><p>分类</p></a></li>
            <li><a href="javascript:;"><i class="iconfont shop-car"></i><p>购物车</p></a></li>
            <li><a href="javascript:;"><i class="iconfont iuser"></i><p>我的i百联</p></a></li>
        </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Jnav',
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      toggleShow() {
        this.isShow = !this.isShow
      }
    }
  }
</script>

<style lang="scss">
  @import "../tobe/function";
  .j-nav{
      width: rem(80);
      div.button{
          @include transition(all .5s ease);
          position: absolute;
          right: 0;
          top: 0;
          font-size: rem(40);
      }
      div.error{
          visibility: hidden;
          opacity: 0;
          color: #fe5b4a !important;
          font-size: rem(35);
      }
      &.show-nav{
          .more-v{
              visibility: hidden;
              opacity: 0;
          }
          .error{
              visibility: inherit;
              opacity: 1;
          }
      }
  }
  .j-navcontent{
      position: absolute;
      width: 100%;
      top: rem(88);
      left: 0;
      right: 0;
      height: 0;
      visibility: hidden;
      @include transition(all .2s linear);
      border-bottom: rem(4) solid #fe8477;
      &:before{
          content: '';
          position: absolute;
          top: -5px;
          right: .3rem;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 6px 6px 6px;
          border-color: transparent transparent rgba(0,0,0, .8) transparent;
      }
      &.show-navcontent{
          height: rem(120);
          visibility: inherit;
      }
      .ul-nav{
          @include display(flex);
          @include justify-content(center);
          padding: rem(18) 0;
          overflow: hidden;
          height: 100%;
          background-color: rgba(0,0,0,.8);
          color: #ffffff;
          // padding-top: rem(6);
          li{
              @include flex(1);
              @include align-self(center);
              width: 0;
              text-align: center;
              a{
                  color: #ffffff;
                  display: block;
              }
              p{
                  font-size: rem(24);
              }
              i{
                  font-size: rem(40);
                  line-height: 1;
                  vertical-align: middle;
              }
          }
      }
  }

</style>
