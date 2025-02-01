<template>
  <div ref="container" class="scroll-loader">
    <BaseLoader
      v-show="!isTopOver && !disabled"
      ref="topLoader"
      :size="loaderSize"
      class="scroll-loader__top"
    />

    <slot />

    <BaseLoader
      v-show="!isBottomOver && !disabled"
      ref="bottomLoader"
      :size="loaderSize"
      class="scroll-loader__bottom"
    />
  </div>
</template>

<script>
import BaseLoader from '~/components/base/BaseLoader'

export default {
  name: 'BaseScrollLoader',

  components: {
    BaseLoader,
  },

  props: {
    isTopOver: {
      type: Boolean,
      default: true,
    },

    isBottomOver: {
      type: Boolean,
      default: true,
    },

    loaderSize: {
      type: Number,
      default: 30,
    },

    offset: {
      type: Number,
      default: 0,
    },

    topOffset: {
      type: Number,
      default: null,
    },

    bottomOffset: {
      type: Number,
      default: null,
    },

    threshold: {
      type: Number,
      default: 1.0,
    },

    isSelfContainer: {
      type: Boolean,
      default: false,
    },

    rootElement: {
      default: null,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    text: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      topObserver: null,
      bottomObserver: null,
    }
  },

  watch: {
    rootElement() {
      this.init()
    },
    disabled(value) {
      if (!value) {
        this.init()
      }
    },
    isTopOver() {
      this.initTopObserver()
    },
    isBottomOver() {
      this.initBottomObserver()
    },
  },

  mounted() {
    this.init()
  },

  beforeDestroy() {
    if (this.topObserver) {
      this.topObserver.disconnect()
    }

    if (this.bottomObserver) {
      this.bottomObserver.disconnect()
    }
  },

  methods: {
    init() {
      this.initTopObserver()
      this.initBottomObserver()
    },

    initTopObserver() {
      if (this.isTopOver) {
        return
      }

      if (this.topObserver) {
        this.topObserver.disconnect()
      }
      const offset = this.topOffset !== null ? this.topOffset : this.offset

      const options = {
        root: this.rootElement,
        rootMargin: `${offset}px`,
        threshold: this.threshold,
      }

      const callback = (entries) => {
        entries.forEach((item) => this.loadTopContent(item))
      }

      this.topObserver = new IntersectionObserver(callback, options)
      this.toggleTopObserve(true)
    },

    initBottomObserver() {
      if (this.isBottomOver) {
        return
      }

      if (this.bottomObserver) {
        this.bottomObserver.disconnect()
      }

      const offset =
        this.bottomOffset !== null ? this.bottomOffset : this.offset

      const rootElement = this.isSelfContainer
        ? this.$refs.container
        : this.rootElement

      const options = {
        root: rootElement,
        rootMargin: `${offset}px`,
        threshold: this.threshold,
      }

      const callback = (entries, observer) => {
        entries.forEach((item) => this.loadBottomContent(item))
      }

      this.bottomObserver = new IntersectionObserver(callback, options)
      this.toggleBottomObserve(true)
    },

    toggleTopObserve(isObserve) {
      const el = this.$refs.topLoader?.$el

      if (!el) {
        return
      }

      if (isObserve) {
        this.topObserver.observe(el)
      } else {
        this.topObserver.unobserve(el)
      }
    },

    toggleBottomObserve(isObserve) {
      const el = this.$refs.bottomLoader?.$el

      if (!el) {
        return
      }

      if (isObserve) {
        this.bottomObserver.observe(el)
      } else {
        this.bottomObserver.unobserve(el)
      }
    },

    loadTopContent(item) {
      if (!item.isIntersecting) {
        return
      }

      this.toggleTopObserve(false)

      let scrollTop
      let initial

      const scrollElement = this.rootElement || window.document.scrollingElement

      const preCallback = () => {
        scrollTop = scrollElement.scrollTop
        initial = scrollElement.scrollHeight
      }

      const afterCallback = () => {
        this.$nextTick(() => {
          const next = scrollElement.scrollHeight
          scrollElement.scroll(0, next - initial + scrollTop)

          this.toggleTopObserve(true)
        })
      }

      this.$emit('load-top', preCallback, afterCallback)
    },

    loadBottomContent(item) {
      if (!item.isIntersecting) {
        return
      }

      this.toggleBottomObserve(false)

      const afterCallback = () => {
        this.$nextTick(() => {
          this.toggleBottomObserve(true)
        })
      }

      this.$emit('load-bottom', null, afterCallback)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/variables/media-breakpoints';

.scroll-loader {
  &__top {
    margin-bottom: 58px;

    @include media-breakpoint-down(lg) {
      margin-bottom: 30px;
    }
  }

  &__bottom {
    margin-top: 58px;

    @include media-breakpoint-down(lg) {
      margin-top: 30px;
    }
  }
}
</style>
