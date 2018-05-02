import Vue from 'vue'

export default {
  queryTheme: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/customizedCart/queryTheme.htm', params);
  },
  queryCartList: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/promotion/queryCartList.htm', params);
  },
  featuredBasketGoods: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/goodSearch/featuredBasketGoods.htm', params);
  },
  queryBasketCart: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/ncart/queryBasketCart.htm', params);
  },
  calc: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/calculate/calc.htm', params);
  }
}
