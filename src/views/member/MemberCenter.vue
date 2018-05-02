<style lang="scss" src="./css/membercenter.scss" scoped></style>
<style type="text/css">
  body {
    background-color: #f7f7f7;
}

</style>
<template>
    <div>
        <div class="member-head">
            <div class="head-logo">
              <div class="logo-box"><img src="./css/i/set.png"></div>
              <div class="logo-box"><img src="./css/i/message.png">
                <div class="has-message"><img src="./css/i/has.png"></div>
              </div>
            </div>
            <div class="head-main">
                <div class="main-pic"><img src="http://placeholder.qiniudn.com/130x130"></div>
                <div class="unlogin" v-if="!logined">登录/注册</div>
                <div class="logined" v-if="logined">
                    <div>
                        <div class="member-tel">139****0000</div>
                        <div class="member-level">普通会员
                          <div class="level-logo"><img src="./css/i/level.png"></div>
                          <div class="level-logo"><img src="./css/i/level.png"></div>
                        </div>
                    </div>
                    <div class="core">
                      <div>
                        <div class="core-detail">成长值44884</div>
                        <div class="core-gift">差25116可领福利</div>
                      </div>
                      <div class="trigle"></div>
                    </div>
                </div>
            </div>
            <div class="level-process">
              <div class="level-name">金卡</div>
              <div class="process-line">
                <div class="real-line"></div>
                <div class="gift-logo"><img src="./css/i/gift-logo.png"></div>
              </div>
              <div class="level-name right-name">钻石</div>
            </div>
        </div>
        <div class="bannerPic">
          <a ><img src="http://placeholder.qiniudn.com/750x230"></a>
        </div>
        <div class="normal-box">
          <div class="box-item member-right">
            <div class="right-pic">
              <img src="http://placeholder.qiniudn.com/46x46">
            </div>
            <div>我的收藏</div>
            <div class="right-info">您还没有收藏</div>
          </div>
          <div class="box-item member-right">
            <div class="right-pic">
              <img src="http://placeholder.qiniudn.com/46x46">
            </div>
            <div>我的福利</div>
            <div class="right-info"><span>100元</span>生日礼</div>
          </div>
          <div class="box-item member-right">
            <div class="right-pic">
              <img src="http://placeholder.qiniudn.com/46x46">
            </div>
            <div>邀请有礼</div>
            <div class="right-info">你<span>50元</span>券</div>
          </div>
        </div>
        <div class="normal-box">
          <div class="box-item member-wallet">
            <div class="wallet-text">
              44999
            </div>
            <div>积分</div>
            <div class="wallet-info">有积分将到期</div>
          </div>
          <div class="box-item member-wallet">
            <div class="wallet-text">
              29
            </div>
            <div>优惠券</div>
            <div class="wallet-info"><span>4</span>张将到期</div>
          </div>
          <div class="box-item member-wallet">
            <div class="wallet-text">
              9999.0
            </div>
            <div>电子卡</div>
          </div>
          <div class="box-item member-wallet">
            <div class="wallet-pic">
              <img src="http://placeholder.qiniudn.com/42x42">
            </div>
            <div>会员支付</div>
          </div>
          <div class="box-item member-wallet">
            <div class="trigle-line"></div>
            <div class="wallet-pic">
              <img src="http://placeholder.qiniudn.com/42x42">
            </div>
            <div>我的钱包</div>
          </div>
        </div>
          <div class="normal-box order">
              <div class="box-item member-wallet">
                <div class="wallet-pic">
                  <div class="order-num">1</div>
                  <img src="http://placeholder.qiniudn.com/42x42">
                </div>
                <div>待付款</div>
              </div>
              <div class="box-item member-wallet">
                <div class="wallet-pic">
                  <div class="order-num">12</div>
                  <img src="http://placeholder.qiniudn.com/42x42">
                </div>
                <div>待收货</div>
              </div>
              <div class="box-item member-wallet">
                <div class="wallet-pic">
                  <div class="order-num">99+</div>
                  <img src="http://placeholder.qiniudn.com/42x42">
                </div>
                <div>待评价</div>
              </div>
              <div class="box-item member-wallet">
                <div class="wallet-pic">
                  <img src="http://placeholder.qiniudn.com/42x42">
                </div>
                <div>售后</div>
              </div>
              <div class="box-item member-wallet">
                <div class="trigle-line"></div>
                <div class="wallet-pic">
                  <img src="http://placeholder.qiniudn.com/42x42">
                </div>
                <div>我的订单</div>
              </div>
          </div>
          <div class="normal-list">
            <ul>
                <li>
                    <div class="right-item">
                      <div class="logo-box"></div>门店会员活动
                    </div>
                    <div class="left-item">
                      <div class="info-text">花影、永安悦生活VIP花艺沙…</div>
                      <div class="trigle"></div>
                    </div>
                </li>
            </ul>
          </div>
          <div class="wouldLike">
              <div class="likeTitle ">
                <img src="./css/i/like.png" style="">
              </div>
              <div class="likeList">
                  <ul>
                      <li>
                        <div class="likePic ">
                          <a><img src="http://placeholder.qiniudn.com/345x345" style=""></a>
                        </div>
                        <div class="likeName">
                          TAMACHAN 植物精华防晒霜 30毫升 SPF50+ 温水可卸TAMACHAN 植物精华防晒霜 30毫升 SPF50+ 温水可卸
                        </div>
                        <div class="likePrice">
                          <span>￥</span>126
                        </div>
                        <div class="watchLike">
                          看相似
                        </div>
                      </li>
                  </ul>
              </div>
          </div>
    </div>

</template>

<script>
export default {
  name: 'BasketChoice',
  data () {
    return {
      logined: true
    }
  },

  created() {

  },
  methods: {
  }
}
</script>
