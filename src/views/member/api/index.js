import Vue from 'vue'

export default {
  queryTheme: params => {
    return Vue.http.post(Vue.$baseUrl + '/customizedCart/queryTheme.htm', params);
  }
}
