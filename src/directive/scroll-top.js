import Vue from 'vue'
import ScrollTo from 'scroll'

export default {
  bind: function(el, binding) {
    let ducDiv = document.createElement('div')
    let winHeight = document.documentElement.clientHeight
    let oEl = binding.modifiers.window ? document.documentElement : el
    let fnToggleShow = () => {
      let thisScrollTop = oEl.scrollTop
      if (thisScrollTop > winHeight - 50) {
        ducDiv.style.display = 'block'
      } else {
        ducDiv.style.display = 'none'
      }
    }
    ducDiv.className = 'gotop'
    ducDiv.style.display = 'none'
    if (!binding.modifiers.window) {
      Vue.nextTick(() => {
        el.parentNode && el.parentNode.appendChild(ducDiv)
      });
    } else {
      el.appendChild(ducDiv)
    }
    ducDiv.addEventListener('click', function() {
      ScrollTo.top(oEl, 0)
    })
    if (binding.modifiers.window) {
      window.addEventListener('scroll', fnToggleShow, false)
    } else {
      oEl.addEventListener('scroll', fnToggleShow, false)
    }
  }
}
