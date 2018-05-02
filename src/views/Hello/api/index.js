/* creat by chenpeng */

/**
 * 请求集中在这个文件中
 */
import Vue from 'vue'

export default {
  queryAdDeploy: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/site/queryAdDeploy.htm', params);
  }
}
