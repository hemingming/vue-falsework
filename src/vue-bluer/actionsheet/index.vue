<template>
  <transition name="actionsheet-float">
    <div class="actionsheet" v-show="currentValue" @touchmove.prevent>
      <ul class="actionsheet-list" :style="{ 'margin-bottom': cancelText ? '0.13rem' : '0' }">
        <li class="actionsheet-listitem" v-for="(item, index) in actions" :key="index" @click="itemClick(item)">{{ item.name }}</li>
      </ul>
      <a class="actionsheet-button" @click="currentValue = false" v-if="cancelText">{{ cancelText }}</a>
    </div>
  </transition>
</template>

<style lang="scss">
  @import "src/sass/tobe/function";
  .actionsheet {
    position: fixed;
    background: #e0e0e0;
    width: 100%;
    text-align: center;
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    backface-visibility: hidden;
    transition: transform .2s ease-out;

    .actionsheet-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .actionsheet-listitem {
      @include hair(bottom, #e0e0e0);
    }

    .actionsheet-listitem, .actionsheet-button {
      display: block;
      width: 100%;
      line-height: rem(90);
      font-size: rem(36);
      color: #333;
      background-color: #fff;
      &:active {
         background-color: #f0f0f0;
      }
    }
  }

  .actionsheet-float-enter,
  .actionsheet-float-leave-active {
    transform: translate3d(-50%, 100%, 0);
  }
</style>

<script type="text/babel">
  /* eslint-disable */
  import Popup from 'vue-popup';
  import BlPopup from '../popup'

  export default {
    name: 'Actionsheet',

    mixins: [Popup],

    props: {
      modal: {
        default: true
      },

      modalFade: {
        default: false
      },

      lockScroll: {
        default: false
      },

      closeOnClickModal: {
        default: true
      },

      cancelText: {
        type: String,
        default: '取消'
      },

      actions: {
        type: Array,
        default: () => []
      }
    },

    data() {
      return {
        currentValue: false
      };
    },

    watch: {
      currentValue(val) {
        this.$emit('input', val);
      },

      value(val) {
        this.currentValue = val;
      }
    },

    methods: {
      itemClick(item) {
        if (item.method && typeof item.method === 'function') {
          item.method(item);
        }
        this.currentValue = false;
      }
    },

    mounted() {
      if (this.value) {
        this.rendered = true;
        this.currentValue = true;
        this.open();
      }
    }
  };
</script>
