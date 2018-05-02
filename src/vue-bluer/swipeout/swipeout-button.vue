<template>
  <button class="vux-swipeout-button"
  :class="{'vux-swipeout-button-primary': type === 'primary', 'vux-swipeout-button-warn': type === 'warn', 'vux-swipeout-button-default': type === 'default'}" :style="{width: `${width}px`, backgroundColor: backgroundColor}" @click="onButtonClick" type="button">
    <slot>{{text}}</slot>
  </button>
</template>

<script>
export default {
  name: 'SwipeoutButton',
  props: {
    text: String,
    backgroundColor: String,
    type: String,
    width: {
      type: Number
    }
  },
  methods: {
    onButtonClick () {
      if (this.$parent.$options._componentTag === 'bl-swipeout-item') {
        this.$parent.onItemClick(this.text)
      }
    }
  }
}
</script>
