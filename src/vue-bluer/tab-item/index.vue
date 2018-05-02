<template>
  <div class="bl-navbar-item"
    @click="!disabled && $parent.$emit('input', id)"
    :class="{ 'is-selected': $parent.value == id }">
    <slot></slot>
  </div>
</template>

<script>
export default {

  name: 'TabItem',

  props: {
    id: String,
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
