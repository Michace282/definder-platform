<template>
  <div
    :class="{
      switch_checked: model,
      switch_error: error,
      switch_disabled: disabled,
    }"
    class="switch"
    @click="toggle"
  >
    <div class="switch__container">
      <div v-if="$scopedSlots['left']" class="switch__content-left">
        <slot name="left" />
      </div>

      <div class="switch__check">
        <div class="switch__check-point" />
      </div>

      <div v-if="$scopedSlots['default']" class="switch__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSwitch',

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
@import '~assets/scss/base/base-switch';
</style>
