let u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

let H5BASE_URL = ''
let H5PAYMENTURL = ''
let H5PAYFORAPP = ''
let H5VUEBASEURL = ''

const SERVICE_BASE_URL = '/h5_gateway'
const PLATFORM = isiOS ? 'iOS' : isAndroid ? 'Android' : ''
const BLAPP_URL = 'https://mh5.bl.com/static/appDownLoad.html?type=1&bl_ad=7201_-_345496_-_1'
const ISH5 = (u.toLowerCase().match(/iBailian/i) !== 'ibailian')

switch (location.host) {
  case 'mh5.st.bl.com': // 测试环境
  case 'localhost:8080': // 本地环境
    H5BASE_URL = 'https://m.st.bl.com/h5-web';
    H5PAYMENTURL = 'http://zf.st.bl.com/payment/payForTaoli.html';
    H5PAYFORAPP = 'http://zf.st.bl.com/payment/payForApp.html'
    H5VUEBASEURL = 'https://mh5.st.bl.com/h5.html#'
    break;
  case 'mh5.ut.bl.com': // pre环境
    H5BASE_URL = 'https://m.ut.bl.com/h5-web';
    H5PAYMENTURL = 'https://payment.ut.bl.com/payment/payForTaoli.html';
    H5PAYFORAPP = 'https://payment.ut.bl.com/payment/payForApp.html'
    H5VUEBASEURL = 'https://mh5.ut.bl.com/h5.html#'
    break;
  default:
    H5BASE_URL = 'https://m.bl.com/h5-web'; // 生产环境
    H5PAYMENTURL = 'https://payment.bl.com/payment/payForTaoli.html';
    H5PAYFORAPP = 'https://payment.bl.com/payment/payForApp.html'
    H5VUEBASEURL = 'https://mh5.bl.com/h5.html#'
}

export default {
  H5BASE_URL, // 微信h5的基础url
  SERVICE_BASE_URL, // 接口base地址
  PLATFORM, // 平台
  BLAPP_URL, // app下载页面
  ISH5, // 是APP环境还是H5环境
  H5PAYMENTURL, // 微信h5收银台url
  H5PAYFORAPP, // 微信h5普通收银台
  H5VUEBASEURL, // Vueh5地址
}
