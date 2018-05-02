export default {
  bind: function(el, binding) {
    el.addEventListener('click', function(e) {
      let args = {
        goodsid: binding.value.goodsId,
        goodsName: binding.value.goodsMsg,
        goodsPrice: binding.value.goodsPrice,
        goodsImageUrl: binding.value.goodsImgPath,
        isGiftGoods: binding.modifiers.isGiftGoods || false
      }
      console.log("DATA1", JSON.parse(JSON.stringify(binding.value)))
      console.log("DATA2", JSON.parse(JSON.stringify(args)))
      e.stopPropagation();
      if (!el.getAttribute('disabled')) {
        window.CTJSBridge.LoadMethod('BLGoodsDetail', 'BLGoodsDetailViewController', args)
      }
    }, false)
  }
}
