<style lang="scss" src="./css/basketChoice.scss" scoped></style>
<template>
    <div class="basket">
       <bl-bar @finish="finish">
          <div class="button" slot="left-button" v-back><div class="iconfont arrow-back"></div></div>
          <div slot="title" class="globalbuy-logo"><img src="./css/i/basket-page1.png"></div>
       </bl-bar>
       <div class="tabBox" v-show="hasmap">
           <div class="tabheight">
              <div  class="floor-container">
                  <ul class="">
                     <li class="" v-for="(item, index) in titles" :key="index"><a :href="'#'+item.id" title="">{{item.title}}</a></li>
                  </ul>
              </div>
          </div>
       </div>
      <div class="selling-basket" v-show="hasmap">
          <div class="title-mine-basket">
              <div>
                 － <i></i> 热卖篮筐－
              </div>
          </div>
          <div class="selling-bgimg02" v-for="(item , index) in hotebasket" :key="index">
            <a href=""><img :src="item.appDetailPic"></a>
          </div>
      </div>
       <div class="selling-basket" v-for="(item , index) in basket" :key="index" v-show="hasmap">
          <i :id="item[0].id" class="emptydot"></i>
          <div class="title-mine-basket">
              <div >
                 － {{item[0].name}} －
              </div>
          </div>
          <div class="selling-bgimg02" v-for="(item2 , index) in item" :key="index">
            <a href="#"><img v-lazy="item2.appDetailPic" ></a>
          </div>
      </div>
    </div>

</template>

<script>
import api from './api';
export default {
  name: 'BasketChoice',
  data () {
    return {
      titles: "",
      basket: [],
      hotebasket: {},
      hasmap: false
    }
  },
  created() {
    api.queryTheme({
      sysid: '6',
      channelid: '2'
    }).then(res => {
      console.log(JSON.parse(res.body.obj))
      if (res.body.resCode == "00100000") {
        this.titles = JSON.parse(res.body.obj).list
      }
      api.queryCartList({
        "sysid": "06",
        "version": "2.0",
        "channelid": "2",
        "memberid": "",
        "id": "",
        "basketId": ""
      }).then(res => {
        this.hotebasket = res.body.obj.hotSale
        let tempArr = []
        for (let i = 0; i < this.titles.length; i++) {
            let tempid = this.titles[i].id
            let tempData = res.body.obj[tempid]
            if (tempData) {
              tempData[0].name = this.titles[i].title
              tempData[0].id = this.titles[i].id
              tempArr.push(tempData)
            }
        }
        this.basket = tempArr
      })
    })
  },
  methods: {
    finish() {
      this.hasmap = true
    }
  }
}
</script>
