<template>
  <div class="picker" :class="{ 'picker-3d': rotateEffect }">
    <div class="picker-toolbar" v-if="showToolbar"><slot></slot></div>
    <div class="picker-items flex-c">
      <picker-slot
        v-for="slot in slots"
        :valueKey="valueKey"
        :values="slot.values || []"
        :visible-item-count="visibleItemCount"
        :value="values[slot.valueIndex]"
        @input="slotValueChange($event, slot.valueIndex)"
        :rotate-effect="rotateEffect"
        :divider="slot.divider"
        :content="slot.content"
        :itemHeight="itemHeight">
      </picker-slot>
      <div class="picker-center-highlight" :style="{ height: itemHeight + 'px', marginTop: -itemHeight / 2 + 'px' }"></div>
    </div>
  </div>
</template>

<style lang="scss">
  @import "src/sass/tobe/function";
  .picker {
    overflow: hidden;
  }

  .picker-toolbar {
    min-height: rem(48*2);
  }

  .picker-items {
    padding: 0;
    text-align: right;
    font-size: rem(24*2);
    position: relative;
  }

  .picker-center-highlight {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    width: 100%;
    top: 50%;
    // margin-top: -18px;
    pointer-events: none
  }

  .picker-center-highlight:before,
  .picker-center-highlight:after {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: #eaeaea;
    display: block;
    z-index: 15;
    transform: scaleY(0.5);
  }

  .picker-center-highlight:before {
    left: 0;
    top: 0;
    bottom: auto;
    right: auto;
  }

  .picker-center-highlight:after {
    left: 0;
    bottom: 0;
    right: auto;
    top: auto;
  }
</style>

<script type="text/babel">
  export default {
    name: 'Picker',

    props: {
      slots: {
        type: Array,
        default: () => {
          return []
        }
      },
      showToolbar: {
        type: Boolean,
        default: false
      },
      visibleItemCount: {
        type: Number,
        default: 5
      },
      valueKey: String,
      rotateEffect: {
        type: Boolean,
        default: false
      },
      itemHeight: {
        type: Number,
        default: parseInt(lib.flexible.rem2px(1.28))
      }
    },

    methods: {
      slotValueChange(value, slotIndex) {
        this.$emit('change', this, value.index, slotIndex);
      },

      getSlot(slotIndex) {
        let slots = this.slots || [];
        let count = 0;
        let target;
        let children = this.$children.filter(child => child.$options.name === 'picker-slot');

        slots.forEach(function(slot, index) {
          if (!slot.divider) {
            if (slotIndex === count) {
              target = children[index];
            }
            count++;
          }
        });

        return target;
      },
      getSlotValue(index) {
        let slot = this.getSlot(index);
        if (slot) {
          return slot.value;
        }
        return null;
      },
      setSlotValue(index, value) {
        let slot = this.getSlot(index);
        if (slot) {
          slot.currentValue = value;
        }
      },
      getSlotValues(index) {
        let slot = this.getSlot(index);
        if (slot) {
          return slot.mutatingValues;
        }
        return null;
      },
      setSlotValues(index, values) {
        let slot = this.getSlot(index);
        if (slot) {
          slot.mutatingValues = values;
        }
      },
      getValues() {
        return this.values;
      },
      setValues(values) {
        let slotCount = this.slotCount;
        values = values || [];
        if (slotCount !== values.length) {
          throw new Error('values length is not equal slot count.');
        }
        values.forEach((value, index) => {
          this.setSlotValue(index, value);
        });
      }
    },

    computed: {
      values() {
        let values = [];
        let valueIndexCount = 0;
        this.slots.forEach(slot => {
          if (!slot.divider) {
            slot.valueIndex = valueIndexCount++;
            values[slot.valueIndex] = (slot.values || [])[slot.defaultIndex || 0];
          }
        });

        return values;
      },
      slotCount() {
        let slots = this.slots || [];
        let result = 0;
        slots.forEach(function(slot) {
          if (!slot.divider) result++;
        });
        return result;
      }
    },

    components: {
      PickerSlot: require('./picker-slot.vue')
    },

    mounted() {
      this.$nextTick(() => {
        this.$emit('finish')
      });
    }
  };
</script>
