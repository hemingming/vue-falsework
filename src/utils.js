/**
 * 浏览器的localStorage
 * @type {[Function]}
 */
const dbGet = (name) => {
  let value = localStorage.getItem(name)
  if (/^\{.*\}$/.test(value)) {
    value = JSON.parse(value)
  }
  return value
}

const dbSet = (name, value) => {
  if (typeof value === typeof {}) {
    value = JSON.stringify(value)
  }
  return localStorage.setItem(name, value)
}

const dbRemove = (name) => {
  return localStorage.removeItem(name)
}

/**
 * 浏览器的sessionStorage
 * @type {[Function]}
 */
const ssdbGet = (name) => {
  let value = sessionStorage.getItem(name)
  if (/^\{.*\}$/.test(value)) {
    value = JSON.parse(value)
  }
  return value
}

const ssdbSet = (name, value) => {
  if (typeof value === typeof {}) {
    value = JSON.stringify(value)
  }
  return sessionStorage.setItem(name, value)
}

const ssdbRemove = (name) => {
  return sessionStorage.removeItem(name)
}

/**
 * 浏览器的cookie操作
 * @param  {[key]}    [传key]
 * @return {[value]}  [获取key的值]
 */
const getCookie = (key) => {
  let arr = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
  let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
  if ((arr = document.cookie.match(reg))) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
}
const setCookie = (key, value, days) => {
  // 设置cookie过期事件,默认是30天
  var expire = new Date();
  days = days || 30;
  expire.setTime(expire.getTime() + (+days) * 24 * 60 * 60 * 1000);
  // 薛天玲 设置cookie 放入子域名下 让微信H5也能取到
  document.cookie = key + "=" + encodeURIComponent(value) + ";expires=" + expire.toGMTString() + ";domain=" + "bl.com";
};
const deleteCookie = (key) => {
  var expire = new Date();
  expire.setTime(expire.getTime() - 1);
  var cval = getCookie(key);
  if (cval != null) {
    // 把toGMTString改成了toUTCString，两者等价。但是ECMAScript推荐使用toUTCString方法。toGMTString的存在仅仅是
    // 为了向下兼容
    document.cookie = key + "=" + cval + ";expires=" + expire.toUTCString();
  }
}

/**
 * 日期格式化
 * @param  {[type]} format  yyyy-MM-dd hh:mm:ss
 * @return {[type]}        [description]
 */

const dateFormat = (format, time) => {
  let dt = new Date();
  if (time) {
    if (typeof time !== 'number') {
      time = time.toString().replace(/-/g, '/')
    }
    dt = new Date(time);
  }
  var date = {
    "M+": dt.getMonth() + 1,
    "d+": dt.getDate(),
    "h+": dt.getHours(),
    "m+": dt.getMinutes(),
    "s+": dt.getSeconds(),
    "q+": Math.floor((dt.getMonth() + 3) / 3),
    "S+": dt.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length))
    }
  }
  return format
}

/**
 * 判断是否登录
 * @chenpeng
 * @DateTime 2017-04-20T12:51:10+0800
 * @return   {[obj]}    [Promise]
 */
const isLogin = (login = true, backUrl = location.href) => {
  return new Promise((resolve, reject) => {
    window.CTJSBridge.LoadMethod('NativeEnv', 'fetchLoginInfo', {}, {
      success: res => {
        let resData = JSON.parse(res)
        if (resData.member_id && resData.member_token) {
          let urlToken = GetQueryString('token')
          if (urlToken && urlToken != resData.member_token) {
            return window.$login(backUrl.replace(/(?![?&])(token)=\w+/gi, ''))
          }
          localStorage.setItem('userInfo', res)
          console.log('已经登录')
          resolve(resData)
        } else {
          localStorage.removeItem('userInfo')
          console.log('没有登录')
          if (!login) {
            reject();
          }
          login && window.CTJSBridge.LoadMethod('BLLogin', 'PresentLoginViewController', {
            backUrl: encodeURIComponent(backUrl.replace(/(?![?&])(token)=\w+/gi, ''))
          }, {
            success: data => {
              let resData = JSON.parse(data)
              localStorage.setItem('userInfo', data)
              resolve(resData)
            },
            fail: () => {
              reject()
            }
          })
        }
      },
      fail: () => { reject() },
      progress: () => {}
    })
  })
}

/**
 * native加入购物车
 * @chenpeng
 * @DateTime 2017-04-27T12:51:49+0800
 * @param    {[string, number]}        goodId [商品id]
 * @param    {[Object]}                item [商品信息]
 */
// const addCard = (goodId, item = {}) => {
//   isLogin().then((data) => {
//     window.CTJSBridge && window.CTJSBridge.LoadAPI('BLCartAddCartAPIManager', {
//       memberId: data.member_id,
//       member_token: data.member_token,
//       orderSourceCode: "1",
//       shoppingCartType: "1",
//       goodsList: [{
//         goodsId: goodId,
//         goodsNumber: "1",
//         type: "10",
//       }]
//     }, {
//       success: data => {
//         let resData = JSON.parse(data)
//         Vue.$toast({
//           position: 'bottom',
//           message: resData.resultMsg
//         });
//         // TODO:wenlong
//         console.log(resData);
//         if (resData.resultCode == '200' || resData.resultCode == '00100000') {
//           if (item.callback) {
//             item.callback(resData.resultInfo.totalGoodsNumber);
//           }
//         }
//         // sensor analytics - addCart
//         try {
//           console.log((new Date()).toLocaleString() + '加入购物车 埋点')
//           sa.track('addCart', {
//             productId: item.goodsId,
//             productName: item.productName,
//             productType: item.goodsType,
//             productBrand: item.brandSid,
//             originalPriceR: Number(item.marketPrice),
//             salePrice: Number(item.goodsPrice),
//             productCount: Number(item.goodsNum)
//           });
//         } catch (err) {
//           console.log("sa error => " + err);
//         }
//       },
//       fail: () => {},
//       progress: () => {}
//     })
//   }, () => {})
// }

/**
 * 数组对象排序,默认升序
 * @chenpeng
 * @DateTime 2017-04-27T12:47:07+0800
 * @param    {[array]}               arrs [需要排序的数组]
 * @param    {[all]}                 prop [数组属性]
 * @return   {[array]}               [排序后的数组]
 */
const orderBy = (arrs, prop, sort = 1) => {
  return arrs.sort(function(obj1, obj2) {
    let val1 = obj1[prop];
    let val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
      if (!sort) {
        [val1, val2] = [val2, val1]
      }
    }
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  })
}

/**
 * 生成时间戳
 * @chenpeng
 * @DateTime 2017-05-18T10:02:36+0800
 * @return   {[String]}                 [时间戳]
 */
const getTimeFormatToday = () => {
  let today = new Date();

  let year = today.getFullYear() + '';
  let month = (today.getMonth() + 1) + '';
  month = (month.length === 1) ? '0' + month : month;
  let day = today.getDate() + '';
  day = (day.length === 1) ? '0' + day : day;
  let hour = today.getHours() + '';
  hour = (hour.length === 1) ? '0' + hour : hour;
  let min = today.getMinutes() + '';
  min = (min.length === 1) ? '0' + min : min;
  let sec = today.getSeconds() + '';
  sec = (sec.length === 1) ? '0' + sec : sec;

  return year + month + day + hour + min + sec;
}

/**
 * 解决滑动上面的浮层下面的内容滚动
 * @chenpeng
 * @DateTime 2017-08-06T12:05:23+0800
 * @return   {[type]}                 [description]
 */
const fixedBody = () => {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  document.body.style.cssText += 'position:fixed;width:100%;height:100%;top:-' + scrollTop + 'px;';
}

const looseBody = () => {
  var body = document.body;
  body.style.position = '';
  body.style.width = '';
  body.style.height = '';
  var top = body.style.top;
  document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
  body.style.top = '';
}

/**
 * 日期倒计时最多到天数
 * @神马
 * @DateTime 2017-9-22T12:05:23+0800
 * @param endTime 活动到期时间   2017-10-10 22:22:22
 * @param intervalId 定时器id
 * @return   {[object]}                 [description]
 */
const timerCountDown = (endTime, intervalId) => {
  let target_date = new Date(endTime).getTime() // set target date
  let current_date = new Date().getTime() // get fixed current date
  let difference = target_date - current_date;
  if (difference < 0) {
    // stop timer
    if (intervalId) {
      clearInterval(intervalId);
    }
    return {
      days: -1,
      hours: -1,
      minutes: -1,
      seconds: -1
    };
  }
  let _second = 1000,
    _minute = _second * 60,
    _hour = _minute * 60,
    _day = _hour * 24;
  let days = Math.floor(difference / _day),
    hours = Math.floor((difference % _day) / _hour),
    minutes = Math.floor((difference % _hour) / _minute),
    seconds = Math.floor((difference % _minute) / _second);
  // fix dates so that it will show two digets
  days = (String(days).length >= 2) ? days : days;
  hours = (String(hours).length >= 2) ? hours : '0' + hours;
  minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
  seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}
/**
 * 计算2个日期之间相差多少天 多少小时
 * @神马
 * @DateTime 2017-9-22T12:05:23+0800
 * @param beginTime 活动到期时间   2017-10-10 22:22:22
 * @return   {[object]}                 [description]
 */
const diffTime = (beginTime, endTime) => {
  beginTime = beginTime.replace(/-/g, "/")
  let target_date = new Date(beginTime).getTime() // set target date
  let current_date = null;
  if (endTime) {
    endTime = endTime.replace(/-/g, "/")
    current_date = new Date(endTime).getTime() // get fixed current date
  } else {
    current_date = new Date().getTime()
  }
  let difference = Math.abs(target_date - current_date);
  let _second = 1000,
    _minute = _second * 60,
    _hour = _minute * 60,
    _day = _hour * 24;
  let days = Math.floor(difference / _day),
    hours = Math.floor((difference % _day) / _hour),
    minutes = Math.floor((difference % _hour) / _minute),
    seconds = Math.floor((difference % _minute) / _second);
  // fix dates so that it will show two digets
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}
/**
 * 根据订单类型码获取商户号
 * @chenpeng
 * @DateTime 2017-09-27T18:08:51+0800
 * @param    {[type]}                 orderTypeCode [订单类型码]
 * @return   {[type]}                               [商户号]
 */
const getMerId = orderTypeCode => {
  switch (orderTypeCode) {
    case '26':
    case '27':
      // 全球购
      return '000090150504235'
    case '37':
    case '41':
      // 37:百联实体卡 41:电子卡
      return '000090150504237'
    case '42':
      // 预售订单
      return '000090150504241'
    case '39':
      // 数字卡订单
      return '000090150504243'
    default:
      // TODO 普通订单
      return '000090150504231'
  }
}

// 验证手机号
const valPhone = (phone) => {
  if (phone == "") {
    return false;
  } else if (!/^1[34578]\d{9}$/.test(phone)) {
    return false;
  }
  return true;
}

/*
 *  @auth 神马
 *  flag 为对应的 intervalId
 *  避免多个jsBridgeReady的时候出现死循环
 */
// const jsBridgeReady = (flag, isWeb = false, calback) => {
//   if (window.CTJSBridge || isWeb) {
//     return calback()
//   } else {
//     window[flag] = setInterval(function() {
//       if (window.CTJSBridge || isWeb) {
//         clearInterval(window[flag]);
//         return calback()
//       }
//     }, 50);
//   }
// }

/**
 * 陈鹏
 * 获取url里 ? 的字段
 * @chenpeng
 * @param    {[String]}                 name [key]
 * @return   {[type]}                      [value]
 */
const GetQueryString = name => {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  // let r = location.search.substr(1).match(reg);
  if (location.href.split('?')[1]) {
    let r = location.href.split('?')[1].match(reg);
    if (r != null) return decodeURIComponent(r[2]);
  }
  return null;
}

/*
 *  薛天玲
 *  个人中心 更新用户信息
 */
// const updateLoginInfo = () => {
//   window.CTJSBridge.LoadMethod('BLUserInfo', 'updateLoginInfo', {
//       pageId: 'AndroidComponent',
//       componentName: 'LoginComponent',
//       actionName: 'actionUpdateUserInfo'
//   })
//   console.log('更新用户信息')
// }

/**
 * url 去除token
 * chenpeng
 */

const urlRemoveToken = (url = location.href) => {
  return String(url).replace(/(?![?&])(token)=\w+/gi, '')
}

export default {
  dbGet,
  dbSet,
  dbRemove,
  ssdbGet,
  ssdbSet,
  ssdbRemove,
  getCookie,
  setCookie,
  deleteCookie,
  dateFormat,
  isLogin,
  // addCard,
  orderBy,
  valPhone,
  getTimeFormatToday,
  fixedBody,
  looseBody,
  timerCountDown,
  diffTime,
  getMerId,
  // jsBridgeReady,
  GetQueryString,
  // updateLoginInfo,
  urlRemoveToken
}
