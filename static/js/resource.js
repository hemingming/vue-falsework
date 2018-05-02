// 资源位跳转判断
function toResourceUrl(data, channelId) {
  var jumpId = data.jumpId;
  var jumpType = data.jumpType;
  //跳转连接
  var obj ={
    path: "",
    self: false,  // vue页面
    inH5: true  // 是否在微信h5内部跳 还是外链
  }
  switch (jumpType) {
    /* chenpeng 0824整理 */
    case "2": // 搜索列表(新增 类型: H5)
    case "9": // 不同的状态不同的跳转 页面目录或者展示目录(新增 类型:H5)
      if (jumpId !== null) {
        obj.path = "/search/productList.html?categoryId=9999" + jumpId
      }
      break;
    case "3" : // 商品详情  类型: H5
      obj.path = "/product/scanBuy.html?productid=" + jumpId
      break;
    case "4" : // 营销活动(新增 类型: H5)
      obj.path = "/marketing/viewActivityDetail.html?activityId=" + jumpId
      break;
    case "5" : // 跳转链接 类型: 通用外链
      obj.path = data.jumpUrl
      obj.inH5 = false;
      break;
    case "6" : // 定制篮筐 类型: H5
      obj.path = "/basket/viewSearchBasket.html?basketId=" + jumpId
      break;
    case "7" : // 关键字跳搜索列表 类型: H5
      if (data.jumpUrl) {
        obj.path = "/search/productList.html?keyWord=" + data.jumpUrl
      }
      break;
    case "10" : // 精品闪购卖场 类型: Vue
      obj.path = "/flashsaleproductspage/" + jumpId + '/1'
      obj.self = true;
      break;
    case "29" : // 超值团跳转 类型: H5
      if (data.jumpCode == '5') {
        obj.path = "/snapUp/viewSnapUpIndex.html?lableId=2"
      } else if (data.jumpCode == '3' || data.jumpCode == '4') {
        obj.path = "/snapUp/viewSnapUpIndex.html?lableId=1"
      } else if (data.jumpCode == '6') {
        obj.path = "/snapUp/viewSnapUpIndex.html?lableId=6&&activityids=" + jumpId.replace(/[^0-9]/ig, "");
      }
      break;
    /* 以下APP跳转 */
    case "11" : // 秒杀
      obj.path = "http://killcoupon.st.bl.com/seckill-web/seckillCoupon/getSeckillCouponListView.html"
      obj.inH5 = false;
      break;
    case "13" :  // APP跳转链接闪购
      obj.path = "/flashSales"
      obj.self = true;
      break;
    case "14" : // 交互跳转
      obj.path = data.jumpUrl
      obj.inH5 = false;
      break;
    case "28" : // 文章
      obj.path = "/find/getChapterDetailFromFindChannel.html?chapterId="+jumpId
      obj.inH5 = true;
      break;
    case "30" : // 快到家
      obj.path = "/returnhome/fastHome.html"
      break;
    case "36" : // 电器城  vue 有
      obj.path = "/circuitCity/gocircuitCity.html?h5flag=1"
      obj.inH5 = true;
      break;
    case "37" : // 量版购
      break;
    case "38" : // 拼团商城
      obj.path = "/together/goSpellGroup.html"
      break;
    case "39" : // 逛逛  逛百联
      obj.path = "/stroll/goStrollBailian.html"
      break;
    case "40" : // 生活缴费
      obj.path = "/recharge"
      obj.self = ture;
      break;
    case "42" : // 领券中心
      obj.path = "/marketing/view_coupon_list.html"
      break;
    case "43" : // 百联财礼
      obj.path = "/bailianGift/viewActivityFilterList.html"
      break;
    case "44" : // 全球购
      obj.path = "/global/goglobal.html"
      break;
    case "56" : // 会员俱乐部 停车 借伞 机场贵宾室
      obj.path = "/member/viewMyBlClub.html"
      break;
    case "59" : // 礼品卡 vue 有
      obj.path = "/giftCardHome"
      obj.self = ture;
      break;
    default : // 默认微信首页
      // obj.path = "/page/view_Index.html"
      obj.path = ""
      obj.inH5 = true;
      break;
  }
  return obj;
}

var bridge = function() {};
var h5BaseUrl = 'https://m.bl.com/h5-web';
var h5VueBaseUrl = location.origin+"/h5.html#";
switch (location.host) {
  case 'mh5.st.bl.com':
    h5BaseUrl = 'https://m.st.bl.com/h5-web';
    break;
  case 'mh5.ut.bl.com':
    h5BaseUrl = 'https://m.ut.bl.com/h5-web';
    break;
  default:
    h5BaseUrl = 'https://m.bl.com/h5-web';
}
bridge.prototype.LoadMethod = function(targetName, actionName, data, callback) {
  switch (actionName) {
    // 埋点信息
    case 'fetchUserInfo':
      callback.success(JSON.stringify({
        platform: 'H5',
        mmc: '',
        memberId: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).member_id : ''
      }))
      break;
      // 获取APP用户登录信息
    case 'fetchLoginInfo':
     callback.success(localStorage.getItem('userInfo') || '{}')
      break;
      // 商品详情页
    case 'BLGoodsDetailViewController':
      location.href = h5BaseUrl + '/product/scanBuy.html?productid=' + data.goodsid
      break;
      // 搜索列表页
    case 'SearchList':
      location.href = h5BaseUrl + '/search/productList.html' + '?keyWord=' + data.searchkey
      break;
      // 神马 资源位跳转
    case 'BLAdvertResourceController':
      var resource = toResourceUrl(data,2);
      if (resource.path) {
        /* 添加整站传递 */
        if (data.resourceId && data.deployId) {
          if (resource.path.indexOf('?') !== -1) {
            resource.path += '&bl_ad=' + data.resourceId + '_-_' + data.deployId + '_-_' + (data.resourceType || '1')
          } else {
            resource.path += '?bl_ad=' + data.resourceId + '_-_' + data.deployId + '_-_' + (data.resourceType || '1')
          }
        }
        if (resource.self){ // 跳转到vue页面
          location.href = h5VueBaseUrl + resource.path;
        }else { // 跳转到微信h5
          if (resource.inH5){  // 微信H5内部跳转
            location.href = h5BaseUrl + resource.path;
          }else{ // 外链
            location.href = resource.path;
          }
        }
      }
      break;
      // 打开新的webview
    case 'loadWebView':
      location.href = data.pageUrl
      break;
      // 分类
    case 'BLCategoryViewController':
      location.href = h5BaseUrl + '/circuitCity/SearchCategorylist.html?parentSid=' + data.categoryId
      break;
      // 分享
    // case 'H5BLShareParams':
    //   var useragent = navigator.userAgent.toLowerCase();
    //   if (useragent.indexOf('micromessenger') >= 0) {
    //     if (data.shareTip) {
    //       var shareHtml = "<div class='overlay bl_weixin_share'></div> <img class='shareTip bl_weixin_share' src='"+data.shareTip+"'>"
    //     } else {
    //       var shareHtml = "<div class='overlay bl_weixin_share'></div> <img class='shareTip bl_weixin_share' src='static/img/shareTip.png'>"
    //     }
    //     $("body").append(shareHtml);
    //     if (data.showTip == false) {
    //       $(".shareTip").hide()
    //       $(".overlay").hide()
    //     }
    //     $("body").on("click",".bl_weixin_share", function() {
    //       var child = $(".bl_weixin_share")
    //       for(var i=0;i<child.length;i++) {
    //         document.querySelector("body").removeChild(child[i])
    //       }
    //     });
    //     var shareParams = {
    //       title: data.title,
    //       desc: data.content,
    //       link: data.url,
    //       imgUrl: data.icon
    //     }
    //     if (window.initShare) {
    //       window.initShare(shareParams)
    //     }
    //     // 调用微信的分享
    //   } else { // 飞微信浏览器
    //     window.$toast({message: "请在微信浏览器中打开!", position: "bottomTop"});
    //   }
    //   break;
      // 分享
    case 'jsShareAction':
    case 'H5BLShareParams':
      var useragent = navigator.userAgent.toLowerCase();
      if (useragent.indexOf('micromessenger') >= 0) {
        if (data.shareTip) {
          // 有礼 分享弹层
          var shareHtml = "<div class='overlay bl_weixin_share'></div> <img class='shareTip bl_weixin_share' src='static/img/shareTip.png'>"
        } else {
          var shareHtml = "<div class='overlay bl_weixin_share'></div> <img class='shareTip bl_weixin_share' src='static/img/share.png'>"
        }
        $("body").append(shareHtml);
        if (data.showTip == false) {
          $(".shareTip").hide()
          $(".overlay").hide()
        }
        $("body").on("click",".bl_weixin_share", function() {
          var child = $(".bl_weixin_share")
          for(var i=0;i<child.length;i++) {
            document.querySelector("body").removeChild(child[i])
          }
        });
        var shareParams = {
          title: data.title,
          desc: data.content,
          link: data.linkUrl || data.url,
          imgUrl: data.imageUrl || data.icon
        }
        if (window.initShare) {
          window.initShare(shareParams)
        }
        // 调用微信的分享
      } else { // 飞微信浏览器
        window.$toast({message: "请在微信浏览器中打开!", position: "bottomTop"});
      }
      break;
      /* 充值缴费相关 */
      // 充值缴费--缴费记录跳转
    case 'chargeAndPaymentViewController':
      location.href = '/h5.html#/' + data.url
      break;
      // 收银台跳转
    case 'cashierNavigationController':
      // TODO
      break;
      // 返回H5首页
    case 'pagemanagerNavigateToHome':
      location.href = h5BaseUrl + '/page/view_Index.html?pageNumber=1&pageSize=5'
      break;
      // H5历史返回
    case 'pagemanagerBack':
      history.go(-1)
      break;
      // 登录界面
    case 'PresentLoginViewController':
      window.$login(data.backUrl);
      break;
      // 打开默认webView
    case 'defaultWebViewController':
      window.open(data.url)
      break;
      // 跳转购物车页面
    case 'BLBLShoppingCartViewController':
      location.href = h5BaseUrl + '/sale/shoppingcart/view_shopping_cart.html'
      break;
    case 'OrderDetailViewController':
      location.href = h5BaseUrl + '/myOrder/orderDetails.html?orderNo=' + data.orderNo
    case 'BLBLShoppingCartViewController':
      if (data.pageId == 'shoppingcart2') {
        location.href = h5BaseUrl + '/sale/shoppingcart/view_shopping_cart.html'
      }
      break;
    case 'getDesDevice':
      callback.success(JSON.stringify({
        desDevice: String(new Date().getTime())
      }));
      break;
    default:
      // TODO default
  }
};

bridge.prototype.LoadAPI = function(apiName, data, callback) {
  // TODO
  switch (apiName) {
    // 添加购物车
    case 'BLDJAddCartAPIManager':

      break;
  }
};

bridge.prototype._setNativeTitle = function(title) {
  // body...
};

bridge.prototype.isH5 = true
bridge.prototype.platform = 'H5'
bridge.prototype.h5BaseUrl = h5BaseUrl
bridge.prototype.h5VueBaseUrl = h5VueBaseUrl

var CTJSBridge = new bridge();
