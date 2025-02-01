<template>
  <div
    ref="container"
    :class="{
      opened: localOpened,
      mini,
      dropdown_static: staticPosition,
      'dropdown_full-width': fullWidth,
      'dropdown_max-width-by-container': maxWidthByContainer,
      dropdown_dark: dark,
      dropdown_right: right,
      dropdown_xs_left: xsLeft,
      'dropdown_arrow-to-end': arrowToEnd,
    }"
    class="dropdown"
    tabindex="-1"
    @focusout="onFocusout"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @pointerup="onPointerUp"
  >
    <div class="dropdown__activator">
      <slot />

      <svg v-if="!noArrow" class="dropdown__arrow">
        <use href="#icon-arrow-down" />
      </svg>
    </div>

    <div v-if="!noOptions" ref="options" class="dropdown__options">
      <slot name="options">
        <div
          v-for="option in options"
          :key="getOptionKey(option)"
          class="dropdown__option"
          :class="{ dropdown__option_links: links }"
          @click="selectOption(option)"
        >
          <slot v-if="links" if v-bind="{ option: option }" name="option" />

          <div v-else class="dropdown__option-inner">
            <slot v-bind="{ option: option }" name="option">
              <div class="dropdown__option_default">
                {{ getOptionLabel(option) }}
              </div>
            </slot>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseDropdown',

  props: {
    value: {
      type: [Number, String, Object, Array],
      default: null,
    },

    options: {
      type: Array,
      default: () => [],
    },

    opened: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      default: null,
    },

    reduce: {
      type: Function,
      default: (item) => item,
    },

    getOptionLabel: {
      type: Function,
      default: (item, label) => {
        if (label) {
          return item[label]
        }

        return item
      },
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

    mini: {
      type: Boolean,
      default: false,
    },

    links: {
      type: Boolean,
      default: false,
    },

    staticPosition: {
      type: Boolean,
      default: false,
    },

    fullWidth: {
      type: Boolean,
      default: false,
    },

    maxWidthByContainer: {
      type: Boolean,
      default: false,
    },

    arrowToEnd: {
      type: Boolean,
      default: false,
    },

    dark: {
      type: Boolean,
      default: false,
    },

    right: {
      type: Boolean,
      default: false,
    },

    xsLeft: {
      type: Boolean,
      default: false,
    },

    noArrow: {
      type: Boolean,
      default: false,
    },

    noOptions: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      localOpened: false,

      closeCallback: null,
    }
  },

  computed: {
    optionsNode() {
      return this.$refs.options
    },

    openedData: {
      get() {
        return this.opened
      },
      set(value) {
        this.$emit('update:opened', value)
      },
    },
  },

  watch: {
    openedData: {
      handler(value) {
        if (this.localOpened !== value) {
          this.localOpened = value
        }
      },
      immediate: true,
    },

    localOpened(value) {
      if (value !== this.openedData) {
        this.openedData = value
      }

      if (this.localOpened) {
        this.subscribeToPointerup()
        return
      }

      this.unsubscribeFromPointerup()
      this.blurContainer()
    },
  },

  mounted() {},

  beforeDestroy() {
    this.unsubscribeFromPointerup()
  },

  methods: {
    selectOption(option) {
      const value = this.reduce(option)
      this.$emit('input', value)
      this.closeMenu()
    },

    openMenu() {
      this.localOpened = true
      this.$emit('open')
    },

    closeMenu() {
      this.localOpened = false
      this.$emit('close')
    },

    onMouseEnter() {
      this.openMenu()
    },

    onMouseLeave() {
      this.closeMenu()
    },

    onFocusout(event) {
      // const isPathValid = this.checkEventPath(event.target)
      // if (isPathValid !== true) {
      //   return
      // }
      //
      // this.closeMenu()
    },

    onPointerUp(event) {
      event.stopPropagation()

      const isPathValid = this.checkEventPath(event.target)
      if (isPathValid !== true) {
        return
      }

      this.toggleMenu()
    },

    toggleMenu() {
      if (this.localOpened) {
        this.closeMenu()
        return
      }

      this.openMenu()
    },

    blurContainer() {
      this.$refs.container.blur()
    },

    checkEventPath(initialNode) {
      let node = initialNode
      while (node !== null) {
        const target = node.parentElement
        if (node === target) {
          break
        }

        node = target

        if (target === this.optionsNode) {
          return false
        }
      }

      return true
    },

    subscribeToPointerup() {
      this.closeCallback = (event) => this.onPointerUp(event)
      window.addEventListener('pointerup', this.closeCallback)
    },

    unsubscribeFromPointerup() {
      window.removeEventListener('pointerup', this.closeCallback)
    },
  },
}
</script>

<style lang="scss">
.dropdown__option:last-child .lang-switcher__option-inner {
  border: none !important;
}
</style>

<style lang="scss" scoped>
@import '~assets/scss/base/base-dropdown';
</style>
