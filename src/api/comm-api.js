/* creat by zp */

/**
 * 请求集中在这个文件中
 */
import Vue from 'vue'

export default {
  // 会员信息查询接口
  queryBaseInfo: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/baseinfo/jn/queryBaseInfo.htm', params)
  },
  // 根据memberToken获取memberid
  getSingleMemberIdByMemberToken: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/jn/getSingleMemberIdByMemberToken.htm', params)
  },
  // 查询资源位
  queryAdDeploy: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/site/queryAdDeploy.htm', params);
  },
  // 领取优惠券 神马
  getCoupon: params => {
    return Vue.http.post(Vue.$SERVICE_BASE_URL + '/coupon/getCoupon.htm', params);
  }
}
