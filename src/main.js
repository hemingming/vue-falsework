// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import VueResource from 'vue-resource'

import App from './App'
import router from './router'
import bluer from './vue-bluer'
import directive from './directive'
import utils from 'src/utils'

import 'src/base'

import 'src/sass/comm.scss'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('src/assets/icon_banner_loading.png'),
  error: require('src/assets/icon_banner_loading.png'),
  attempt: 1 // default 1
})

Vue.use(infiniteScroll)
Vue.use(bluer)

// 指令 注册
Object.keys(directive).forEach((key) => {
  Vue.directive(`${key}`, directive[key])
})

Vue.use(VueResource)
Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.credentials = true;
Vue.http.interceptors.push((request, next) => {
  request.headers.set('chnflg', 'h5')
  request.headers.set('vueLink', window.location.href)
  next((response) => {
    // 优化如果token失效重新跳转到登录页面登录
    if (response.body.resCode &&
        response.body.resCode == "05111001" ||
        response.body.resCode == "05111002" ||
        response.body.resCode == "04111000") {
      location.replace(`${Vue.$H5VUEBASEURL}/login?backUrl=${utils.urlRemoveToken()}`)
    } else {
      return response
    }
  });
})

// FastClick 调用
FastClick.attach(document.body)

Vue.config.productionTip = true

const wxIf = (next, fullPath, meta) => {
  if (Vue.$isH5) {
    if (navigator.userAgent.toLowerCase().indexOf('micromessenger') >= 0) {
      let openId = utils.GetQueryString('openId')
      if (openId) {
        utils.setCookie('wxUserInfo', openId, 2 / 24)
        return next()
      }
      if (utils.getCookie('wxUserInfo')) {
        return next()
      } else {
        location.href = Vue.$H5BASEURL + '/wxUserInfo/getWxUserInfo.html?mh5returnUrl=' + encodeURIComponent(location.href)
      }
    } else {
      if (meta.wxTip) {
        Vue.$loading.close()
        return Vue.$toast('请在微信中打开')
      } else {
        return next()
      }
    }
  } else {
    return next()
  }
}

/* 打通微信H5于Vue登录信息 */
window.$login = backUrl => {
  try {
    Vue.$loading.close()
  } catch (err) {
    console.log(err)
  }
  let urlToken = utils.GetQueryString('token')
  /* token 判断 */
  if (urlToken) {
    // 如果url里有token 则获取用户信息并且存储用户信息
    Vue.http.post(Vue.$SERVICE_BASE_URL + '/baseinfo/jn/queryBaseInfo.htm', {member_token: urlToken}).then(res => {
      if (res.body.resCode == '05111001') { // token会话失效则清空用户信息并且跳转到登录界面
        localStorage.removeItem('userInfo')
        location.replace(`${Vue.$H5VUEBASEURL}/login?backUrl=${backUrl}`)
      } else {
        // 获取到用户信息存储起来并且刷新页面
        let resData = JSON.parse(res.body.obj)
        resData.member_token = urlToken
        resData.member_id = resData.memberId
        localStorage.setItem("userInfo", JSON.stringify(resData))
        location.replace(location.href.replace(/(?![?&])(token)=\w+/gi, ''))
      }
    })
  } else {
    // 如果url里没有token 则跳转到Vue登录
    location.replace(`${Vue.$H5VUEBASEURL}/login?backUrl=${backUrl}`)
  }
}

router.beforeEach(({ meta, path, fullPath, query }, from, next) => {
  let elem = $('.ant-transparent')[0]
  if (elem && elem.parentNode) {
    elem.parentNode.removeChild(elem);
  }
  if (!meta.notLoading) {
    Vue.$loading = Vue.prototype.$loading = Vue.$toast({
      iconClass: 'preloader white',
      duration: 'loading',
      className: 'loading-bg'
    })
  }
  // 过渡效果 end
  if (meta.title) {
    Vue.$title = Vue.prototype.$title = meta.title
    document.title = meta.title
  }
  // 过渡效果 start
  try {
    let _to = path
    let _from = from.path
    let h = utils.dbGet(_to)
    if (h && h.history || (_from && _from.indexOf(_to) === 0)) {
      document.body.className = 'transition-reverse'
      h.history = false
      // utils.dbSet(_to)
      utils.dbRemove(_to)
    } else {
      utils.dbSet(_from, {
        history: true
      })
      document.body.className = ''
    }
  } catch (e) {
    // swallo error
    console.log(e)
  }
  // 登录拦截
  if (meta.needLogin) {
    utils.isLogin().then(() => {
      if (meta.wxLogin) {
        wxIf(next, fullPath, meta)
      } else {
        next()
      }
    })
  } else if (meta.wxLogin) { // 微信拦截
    wxIf(next, fullPath, meta)
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
