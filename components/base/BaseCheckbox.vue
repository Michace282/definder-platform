<template>
  <div
    :class="{
      checkbox_checked: model,
      checkbox_error: error,
      checkbox_disabled: disabled,
    }"
    class="checkbox"
    @click="toggle"
  >
    <div class="checkbox__container">
      <div class="checkbox__check">
        <div class="checkbox__check-icon">
          <svg><use href="#icon-check" /></svg>
        </div>
      </div>

      <div class="checkbox__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCheckbox',

  props: {
    value: {
      required: true,
      type: Boolean,
    },

    error: {
      type: String,
      default: null,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },

  methods: {
    toggle() {
      this.model = !this.model
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/base/base-checkbox';
</style>
