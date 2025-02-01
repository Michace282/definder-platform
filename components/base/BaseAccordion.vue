<template>
  <div class="accordion">
    <div class="accordion__menu ">
      <div
        v-for="item in tabs"
        :key="item.id"
        class="accordion__item"
        :class="{ active: activeId(item.id) }"
      >
        <div
          class="accordion__item-header"
          :class="{ multi: multiChoose }"
          @click.stop="toggleMenu(item.id)"
        >
          <div>{{ item.title }}</div>

          <svg
            class="accordion__item-caret"
            :class="{ reverse: activeId(item.id) }"
          >
            <use href="#icon-arrow-down" />
          </svg>
        </div>
        <div
          :ref="`accordionItem${item.id}`"
          class="accordion__item-content"
          :class="{ active: activeId(item.id) }"
        >
          <div class="accordion__item-text">
            <slot name="content" :content="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseAccordion',

  props: {
    value: {
      type: [Object, String, Number, Array],
      default: null,
    },

    tabs: {
      type: Array,
      default: () => [],
    },

    refresh: {
      type: [Number, String, Object, Array],
      default: null,
    },

    opened: {
      type: Boolean,
      default: false,
    },

    multiChoose: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      chosenItemId: 0,
      chosenItemIds: [],
    }
  },

  watch: {
    refresh(val) {
      if (val.length === 0) {
        return
      }

      for (const item of val) {
        if (this.chosenItemIds.includes(item.id)) {
          this.$nextTick(() => this.toggleMenu(item.id, item.invalid))
        }
      }

      this.$emit('update:refresh', [])
    },
  },

  mounted() {
    this.$nextTick(() => this.selectId())
  },

  methods: {
    selectId() {
      if (this.value && this.opened) {
        this.toggleMenu(this.value)
      }
    },

    activeId(id) {
      if (this.multiChoose && this.chosenItemIds.includes(id)) {
        return true
      } else return id === this.chosenItemId
    },

    toggleMenu(id, refresh = null) {
      if (this.tabs.length === 0) {
        return
      }

      const selectedName = `accordionItem${id}`

      if (refresh !== null) {
        const item = this.$refs[selectedName][0]
        const clenchedItem = this.$refs[selectedName][0].firstChild

        item.style.height = refresh
          ? `${item.scrollHeight}px`
          : `${clenchedItem.scrollHeight}px`
      } else if (this.chosenItemId === id || this.chosenItemIds.includes(id)) {
        this.chosenItemId = 0
        const item = this.$refs[selectedName][0]
        item.style.height = `0px`

        if (this.multiChoose) {
          const index = this.chosenItemIds.indexOf(id)
          this.chosenItemIds.splice(index, 1)
        }
      } else {
        this.chosenItemId = id
        if (this.multiChoose) {
          const item = this.$refs[selectedName][0]
          item.style.height = `${item.scrollHeight}px`

          this.chosenItemIds.push(id)
        } else
          for (const key in this.$refs) {
            if (key === selectedName) {
              const item = this.$refs[selectedName][0]
              item.style.height = `${item.scrollHeight}px`
            } else {
              const item = this.$refs[key][0]
              item.style.height = `0px`
            }
          }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/base/base-accordion';
</style>
