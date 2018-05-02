import Vue from 'vue'
export default {
  bind: function(el, binding) {
    el.addEventListener('click', function() {
      if (!el.getAttribute('disabled')) {
        Vue.$webLink({
          url: binding.value,
          params: {
            url: binding.value
          }
        })
      }
    }, false)
  }
}
