<style lang="scss" src="./css/basketdetail.scss" scoped></style>
<style type="text/css">
  body {
    background-color: #f7f7f7;
}

</style>
<template>
    <div>
       <bl-bar nav >
          <div class="button" slot="left-button" v-back><div class="iconfont arrow-back"></div></div>
          <div slot="title" >{{title}}</div>
       </bl-bar>
       <div class="basket-menu" :class="{'all-menu': all}">
          <ul>
              <li :class="{select: selected==index}" v-for="(item, index) in menus" :key="index" @click="choosemenu(item, index)"><div>{{item.groupName}}</div></li>
          </ul>
          <div class="iconfont arrow-back arrow-down" @click="showall"></div>
       </div>
       <div class="basket-list-top">
          <div class="line"></div>
          <div >{{groupName}}</div>
          <div class="line"></div>
        </div>
        <div class="basket-list">
            <ul>
                <li v-for="(item, index) in goodsList" :key="index">
                    <div class="list-image">
                      <img :src="item.goodsImgPath">
                      <div class="sell-none" v-show="item.goodNum <= 0"></div>
                    </div>
                    <div class="list-detail">
                      <div class="name" >
                        {{item.goodsMsg}}
                      </div>
                      <div class="detail">{{item.proSellPoint}}</div>
                      <div class="money-buy">
                        <div class="money-container">
                            <div class="money">
                              ￥<span>{{item.marketPrice}}</span>
                            </div>
                            <div class="limit"></div>
                        </div>
                        <div class="bagoods-editprice">
                            <button class="editprice-btn basminus" @click="minusPrice(index, item)"></button>
                            <input  pushproductnum="pushProductNum" class="basinput" type="text"  :value="item.goodsNumber" readonly>
                            <button class="editprice-btn basplus" @click="addPrice(index, item)"></button>
                        </div>
                      </div>
                    </div>
                </li>
            </ul>
        </div>
        <div  class="pbasket" style="">
          <div class="pbasket-price">
            <div class="price-box">
              <div class="price-total">小计:￥{{totalPrice | initPrice}}</div>
              <div class="price-reduc"><span class="go-join">快去选购商品参加篮筐活动吧</span></div>
            </div>
          </div>
          <div class="pbasket-group-btn" v-show="discount">
            <a href="javascript:;" class="pbasket-btn">再买{{minGoodsNum}}件下单</a>
          </div>
        </div>
    </div>

</template>

<script>
import api from './api';
import utils from 'src/utils'
export default {
  name: 'BasketChoice',
  data () {
    return {
      id: "8046",
      basketId: "10311",
      title: "",
      selected: 0,
      all: false,
      menus: "",
      groupName: "",
      goodsList: [],
      totalPrice: 0.00,
      basketcar: [],
      minGoodsNum: 0,
      minPrice: 0,
      minGoodsType: 0,
      deduPrice: 0,
      discount: 0
    }
  },

  created() {
      // 先查询本地有没有篮筐记录
      let stroage = JSON.parse(utils.dbGet(this.basketId))
      if (stroage) {
        for (let i = 0; i < stroage.length; i++) {
          this.basketcar.push(stroage[i])
        }
      }
      let userInfo = utils.dbGet("userInfo") // 获取用户信息查下购物车有木有东西
      if (userInfo) {
          let time = utils.getTimeFormatToday()
          api.queryBasketCart({
             "channelid": "1",
             "channelId": "1",
             "version": "2.0",
             "clientIp": "127.0.0.1",
             "member_token": userInfo.member_token,
             "orderSourceCode": "1",
             "shoppingCartType": "1",
             "type": "6",
             "memberId": userInfo.member_id,
             "rule": this.basketId,
             "clientRequestTime": time,
             "sysid": "1103",
             "memberToken": userInfo.member_token
          }).then(res => {
             let carArray = JSON.parse(res.body.obj).resultInfo.goodsList // 数据转换
             let tempArr = []
             for (let i = 0; i < carArray.length; i++) {
                let temp = {}
                temp.goodsName = carArray[i].goodsName
                temp.goodsPrice = carArray[i].salePrice
                temp.oldprice = carArray[i].originalPrice
                temp.basketLimit = carArray[i].basketLimitGoodsNum
                temp.brandSid = carArray[i].brandSid
                temp.comSid = carArray[i].comSid
                temp.categoryId = carArray[i].categoryBackIds
                temp.goodsType = carArray[i].goodsType
                temp.supplierId = carArray[i].supplierId
                temp.goodsId = carArray[i].goodsId
                temp.goodsNumber = carArray[i].goodsNumber
                for (let i = 0; i < this.basketcar.length; i++) { // 比较购物车和缓存
                    if (temp.goodsId === this.basketcar[i].goodsId) {
                      temp.goodsNumber = temp.goodsNumber > this.basketcar[i].goodsNumber ? temp.goodsNumber : this.basketcar[i].goodsNumber
                    }
                }
                tempArr.push(temp)
             }
             this.basketcar = tempArr
             utils.dbSet(this.basketId, this.basketcar) // 重新设置缓存
             api.calc({
                  "billInfo": [ {
                    "goodsInfo": [
                      {
                        "ori_price": "0",
                        "goodsType": "1",
                        "brandSid": "208645",
                        "supplySid": "-1",
                        "goodsDetSid": "167708",
                        "buid": "2000",
                        "categoryid": "16573",
                        "listPrice": "179.70",
                        "shopid": "-1",
                        "type": "6",
                        "orderLineNbr": "16770810461",
                        "salePrice": "59.9",
                        "curr_price": "59.9",
                        "rule": "10461",
                        "saleNum": 3
                      },
                      {
                        "ori_price": "0",
                        "goodsType": "1",
                        "brandSid": "207816",
                        "supplySid": "2229",
                        "goodsDetSid": "74029",
                        "buid": "2000",
                        "categoryid": "16573",
                        "listPrice": "21.80",
                        "shopid": "-1",
                        "type": "6",
                        "orderLineNbr": "7402910461",
                        "salePrice": "21.8",
                        "curr_price": "21.8",
                        "rule": "10461",
                        "saleNum": 1
                      }, {
                        "ori_price": "0",
                        "goodsType": "1",
                        "brandSid": "204558",
                        "supplySid": "2229",
                        "goodsDetSid": "73736",
                        "buid": "2000",
                        "categoryid": "16573",
                        "listPrice": "0.02",
                        "shopid": "-1",
                        "type": "6",
                        "orderLineNbr": "7373610461",
                        "salePrice": "0.02",
                        "curr_price": "0.02",
                        "rule": "10461",
                        "saleNum": 1
                      }
                    ]
                  } ],
                  "clientRequestTime": "20180323141613",
                  "sysid": "1",
                  "channelid": "2",
                  "rule": "10461",
                  "type": "6"
                }).then(res => {

             })
          })
      }
      api.queryCartList({ // 查询目录列表
        "sysid": "06",
        "version": "2.0",
        "channelid": "2",
        "memberid": "",
        "id": "",
        "basketId": this.basketId
      }).then(res => {
        let temp = res.body.obj
        console.log(temp)
        let i = 0
        for (let item in temp) {
          if (i == 0) {
            let obj = temp[item][0]
            this.title = obj.basketName
            this.menus = obj.groupList
            this.groupName = obj.groupList[0].groupName
            this.discount = obj.discount
            this.minPrice = obj.minPrice
            this.minGoodsNum = obj.minGoodsNum
            this.minGoodsType = obj.minGoodsType
            this.deduPrice = obj.dedutionPrice
            i++
          } else {
            break;
          }
        }
      })
      api.featuredBasketGoods({ // 查出列表
        "clientRequestTime": "",
        "requestData": "{'searchInfo':{'sorCol':'','sorTye':'','pageModel':{'pageNo':1,'pageSize':10}},'channelSid':'2','basketId':" + this.basketId + ",'basketGroupId':" + this.id + "}",
        "systemNo": "06"
      }).then(res => {
        if (!res.body.obj) this.$toast(res.body.msg)
        let resData = JSON.parse(res.body.obj)
        let tempArr = resData.resultInfo.pageModel.rows
        tempArr.map(item => { // 给列表放入商品购买数量参数
          return (item["goodsNumber"] = 0)
        })
        this.computeNum(tempArr, this.basketcar)
        this.goodsList.push.apply(this.goodsList, tempArr)
      })
  },
  methods: {
    showall() {
      this.all = !this.all
    },
    choosemenu(item, index) {
      this.groupName = item.groupName
      this.selected = index
    },
    addPrice(index, item) {
      item.goodsNumber++
      this.computeSimple(this.basketcar, item)
      this.totalPrice = parseFloat(this.totalPrice) + parseFloat(item.marketPrice)
    },
    minusPrice(index, item) {
      if (item.goodsNumber > 0) {
        item.goodsNumber--
        this.computeSimple(this.basketcar, item)
        this.totalPrice = parseFloat(this.totalPrice) - parseFloat(item.marketPrice)
      }
    },
    computeNum(Array1, Array2) { // 比较数据将Array2里的goodsNumber同步给Array1，callback是为了回调
      for (let i = Array1.length - 1; i >= 0; i--) {
        for (let j = Array2.length - 1; j >= 0; j--) {
          if (Array2[j].goodsId === Array1[i].goodsId) {
             Array1[i].goodsNumber = Array2[j].goodsNumber
          }
        }
      }
    },
    computeSimple(Array, item) {
      if (Array.length > 0) {
        for (let i = Array.length - 1; i >= 0; i--) {
          if (item.goodsId === Array[i].goodsId) {
             Array[i].goodsNumber = item.goodsNumber
             if (Array[i].goodsNumber == 0) {
                Array.splice(i, 1)
             }
          } else {
            this.changeData(Array, item)
          }
        }
      } else {
        this.changeData(Array, item)
      }
    },
    changeData(Array, item) {
      var temp = {}
      temp.goodsName = item.goodsMsg
      temp.goodsPrice = item.marketPrice
      temp.oldprice = item.goodsPrice
      temp.basketLimit = item.basketLimitGoodsNum
      temp.brandSid = item.brandSid
      temp.comSid = item.comSid
      temp.categoryId = item.categoryid
      temp.goodsType = item.goodsType
      temp.supplierId = item.supplierSid
      temp.goodsId = item.goodsId
      temp.goodsNumber = item.goodsNumber
      Array.push(temp)
    }
  },
  filters: {
    initPrice: function (value) {
      if (!value) return '0.00'
      return value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    }
  }

}
</script>
