<template>
  <bl-popup v-model="visible" position="bottom" class="bl-select-picker">
    <bl-picker
      :slots="selectSlots"
      @change="onSelectChange"
      @finish="pickerLoaded"
      :visible-item-count="visibleItemCount"
      :valueKey="valueKey"
      ref="picker"
      show-toolbar>
      <div class="toolbar-head">
        <span class="bl-address-action bl-address-cancel" @click="visible = false">{{ cancelText }}</span>
        <span class="bl-address-action bl-address-confirm" @click="selectConfirm">{{ confirmText }}</span>
      </div>
      <div class="toolbar-text hairline" v-if="toolbarSubText">{{ toolbarSubText }}</div>
    </bl-picker>
  </bl-popup>
</template>

<script>
export default {

  name: 'selectPicker',

  data () {
    return {
      visible: false,
      currentValue: null,
      slots: null
    };
  },
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
    value: null,
    selectSlots: Array,
    valueKey: String
  },
  created() {
    this.slots = this.selectSlots
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    selectConfirm() {
      this.visible = false;
      this.$emit('selectConfirm', this.currentValue);
    },
    pickerLoaded() {
      this.currentValue = this.value
      if (this.currentValue) {
        if (typeof this.currentValue[0] === undefined && !this.currentValue[0].id) return
        const setSlotValue = this.$refs.picker.setSlotValue
        for (let i = 0; i < this.slots.length; i++) {
          for (let j = 0; j < this.slots[i].values.length; j++) {
            if (this.slots[i].values[j]['id'] === this.value[i]['id']) {
              console.log('slot:', i)
              setSlotValue(i, this.slots[i].values[j])
            }
          }
        }
      } else {
        this.currentValue = this.$refs.picker.values
      }
    },
    onSelectChange(picker, indexVal, slotIndex) {
      this.slots[slotIndex || 0]['defaultIndex'] = indexVal
      this.currentValue = picker.getValues()
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
  .bl-select-picker {
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
