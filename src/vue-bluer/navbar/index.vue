<template>
  <div class="bl-nav">
    <slot></slot>
  </div>
</template>

<script>
export default {

  name: 'Navbar',

  props: ['value']
};
</script>
