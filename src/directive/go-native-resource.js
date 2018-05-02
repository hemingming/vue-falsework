export default {
  bind: function(el, binding) {
    el.addEventListener('click', function() {
      window.CTJSBridge.LoadMethod('BLAdvertResource', 'BLAdvertResourceController', binding.value)
      window.sa.track('clickResource', {
        resourceId: String(binding.value.resourceId),
        resourceType: '1', // TODO暂时写死1
        deployId: String(binding.value.deployId)
      });
    }, false)
  }
}
