<template>
  <div
    ref="mainModalBody"
    v-scroll-lock="true"
    :class="{
      [`base-modal_size-${size}`]: true,
      [`base-modal_no-bottom-padding`]: noBottomPadding,
    }"
    class="base-modal"
    @click.stop="close"
    @pointerdown="onPointerdown($event, false)"
  >
    <div
      :class="{ [`base-modal__container_background-${background}`]: true }"
      class="base-modal__container"
      @click.stop="closeGallery"
    >
      <div
        class="base-modal__close"
        :class="{ [`base-modal__close_background-${background}`]: true }"
        @click="close(true)"
      >
        <svg class="base-modal__close-icon">
          <use href="#icon-close" />
        </svg>
      </div>

      <div
        class="base-modal__content"
        @pointerdown="onPointerdown($event, true)"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',

  props: {
    modalId: {
      type: Number,
      default: null,
    },

    size: {
      type: String,
      default: 'full',
      validator(value) {
        return ['full', 'lg', 'md', 'sm'].includes(value)
      },
    },

    background: {
      type: String,
      default: 'white',
      validator(value) {
        return ['white', 'transparent'].includes(value)
      },
    },

    noBottomPadding: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      contentClick: false,
    }
  },

  methods: {
    close(hard = false) {
      if (hard !== true && this.contentClick === true) {
        this.contentClick = false
        return true
      }
      this.$refs.mainModalBody.style.display = 'none'
      document.getElementsByTagName('body')[0].removeAttribute('style')
      this.$modal.close(this.modalId)
    },

    closeGallery() {
      if (this.size === 'full') this.close()
    },

    onPointerdown(event, isContent) {
      this.contentClick = isContent || this.contentClick
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/base/base-modal';

.base-modal__close svg * {
  fill: #000 !important;
}
</style>
