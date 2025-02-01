<template>
  <div class="tabs">
    <div class="tabs__container">
      <div
        v-for="item in items"
        :key="getOptionKey(item)"
        class="tabs__item"
        :class="{ tabs__item_active: compare(value, item) }"
        @click="selectOption(item)"
      >
        <div class="tabs__item-content">
          <slot name="option" :item="item" />
        </div>

        <div class="tabs__item-underline" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTabs',

  props: {
    value: {
      type: [Object, String, Number, Array],
      default: null,
    },

    items: {
      type: Array,
      default: () => [],
    },

    reduce: {
      type: Function,
      default: (item) => item,
    },

    getOptionKey: {
      type: Function,
      default: (item) => {
        if (item instanceof Object) {
          return item.id
        }

        return JSON.stringify(item)
      },
    },

    compare: {
      type: Function,
      default: (left, right) => {
        return left === right
      },
    },

    noEmpty: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    selectOption(option) {
      if (this.noEmpty !== true && this.value === option) {
        this.$emit('input', null)
        return
      }

      this.$emit('input', option)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/base/base-tabs';
</style>
