<template>
  <bl-popup v-model="visible" position="bottom" class="bl-address">
    <bl-picker
      :slots="addressSlots"
      @change="onAddressChange"
      @finish="pickerLoaded"
      :visible-item-count="visibleItemCount"
      :valueKey="valueKey"
      class="bl-address-picker"
      ref="picker"
      show-toolbar>
      <div class="toolbar-head">
        <span class="bl-address-action bl-address-cancel" @click="visible = false">{{ cancelText }}</span>
        <span class="bl-address-action bl-address-confirm" @click="addressConfirm">{{ confirmText }}</span>
      </div>
      <div class="toolbar-text hairline" v-if="toolbarSubText">{{ toolbarSubText }}</div>
    </bl-picker>
  </bl-popup>
</template>

<script>
import address from 'src/lib/json/allCityAreas.json'
export default {

  name: 'addressPicker',

  props: {
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    toolbarSubText: {
      type: String,
      default: ''
    },
    visibleItemCount: {
      type: Number,
      default: 5
    },
    value: null
  },

  data() {
    return {
      visible: false,
      addressSlots: [{
        values: address,
        defaultIndex: 0
      }, {
        values: [],
        defaultIndex: 0
      }, {
        values: [],
        defaultIndex: 0
      }],
      currentValue: null,
      valueKey: 'nm'
    };
  },
  created() {
    this.changeSlots()
  },
  methods: {
    changeSlots(slotIndex = 0, indexVal = 0, callback) {
      if (slotIndex == 0) {
        this.addressSlots[1].values = this.addressSlots[0].values[indexVal].cl
        this.addressSlots[2].values = this.addressSlots[1].values[0].dl
      } else if (slotIndex == 1) {
        this.addressSlots[2].values = this.addressSlots[1].values[indexVal].dl
      }
      callback && callback()
    },
    addressConfirm() {
      this.visible = false;
      this.$emit('addressConfirm', this.currentValue);
    },
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    onAddressChange(picker, indexVal, slotIndex) {
      this.addressSlots[slotIndex || 0]['defaultIndex'] = indexVal
      this.changeSlots(slotIndex || 0, indexVal || 0)
      this.currentValue = picker.getValues()
    },
    pickerLoaded() {
      this.currentValue = this.value
      if (this.currentValue) {
        if (typeof this.currentValue[0] === undefined && !this.currentValue[0].id) return
        const setSlotValue = this.$refs.picker.setSlotValue
        for (let i = 0; i < this.addressSlots[0].values.length; i++) {
          if (this.addressSlots[0].values[i].id === this.value[0].id) {
            console.log('省号:', i)
            setSlotValue(0, this.addressSlots[0].values[i])
            this.changeSlots(0, i, () => {
              if (this.valueKey) {
                let addressValues = this.addressSlots
                for (let i = 0; i < addressValues[1].values.length; i++) {
                  if (addressValues[1].values[i].id === this.value[1].id) {
                    console.log('市号:', i)
                    setSlotValue(1, addressValues[1].values[i])
                    for (let j = 0; j < addressValues[1].values[i].dl.length; j++) {
                      if (addressValues[1].values[i].dl[j].id === this.value[2].id) {
                        console.log('区号:', j)
                        setSlotValue(2, addressValues[1].values[i].dl[j])
                        return
                      }
                    }
                  }
                }
              }
            })
          }
        }
      } else {
        this.currentValue = this.$refs.picker.values
      }
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    }
  }
};
</script>

<style lang="scss">
  @import "src/sass/tobe/function";
  .bl-address {
      width: 100%;
      .toolbar-head{
        overflow: hidden;
        height: rem(50*2);
        border-bottom: solid rem(6*2) #EFEFF4;
      }
      .toolbar-text{
        height: rem(50*2);
        line-height: rem(50*2);
        text-align: center;
        font-size: rem(18*2);
        color: #222222;
        border-bottom: 1px solid #E9E9E9;
      }
  }
  .bl-address .picker-slot-wrapper, .bl-address .picker-item {
      -webkit-backface-visibility: hidden;
              backface-visibility: hidden;
  }
  .bl-address-action {
      display: inline-block;
      text-align: center;
      line-height: rem(88);
      font-size: rem(16*2);
      color: #222222;
      padding: 0 rem(15*2);
  }
  .bl-address-cancel {
      float: left;
  }
  .bl-address-confirm {
      float: right;
  }
</style>
