export default {
  bind: function(el, binding) {
    let args = {
      pageId: 'similar',
      params: JSON.stringify({
        goodsSid: binding.value.goodsId,
        goodsName: binding.value.goodsMsg,
        salePrice: binding.value.goodsPrice,
        imgUrlString: binding.value.goodsImgPath,
        isGiftGoods: binding.modifiers.isGiftGoods || false
      })
    }
    el.addEventListener('click', function(e) {
      console.log(JSON.stringify(args))
      e.stopPropagation();
      if (!el.getAttribute('disabled')) {
        window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', args)
      }
    }, false)
  }
}
