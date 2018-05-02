import Vue from 'vue'
import toast from './toast'

const ToastConstructor = Vue.extend(toast)
ToastConstructor.prototype.close = function() {
  this.visible = false;
  if (this.$el.parentNode) {
    this.$el.parentNode.removeChild(this.$el)
  }
  this.closed = true;
};

let Toast = (options = {}) => {
  let duration = options.duration || 2000;

  let instance = new ToastConstructor({
    el: document.createElement('div')
  })
  clearTimeout(instance.timer);

  instance.message = typeof options === 'string' ? options : options.message;
  instance.position = options.position || 'middle';
  instance.iconClass = options.iconClass || '';
  document.body.appendChild(instance.$el)

  Vue.nextTick(() => {
    instance.visible = true
    if (duration !== 'loading') {
      instance.timer = setTimeout(function() {
        if (instance.closed) return;
        instance.close();
      }, duration)
    } else {
      instance.className = options.className
    }
  })

  return instance
}

export default Toast;
