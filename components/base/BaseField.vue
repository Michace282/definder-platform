<template>
  <label
    :class="{ invalid, 'base-field_disabled': disabled }"
    class="base-field"
  >
    <span
      v-if="label"
      :class="{
        active: labelActive,
        flex: tooltip,
        [`base-field__placeholder_${placeholderPosition}`]: true,
      }"
      class="base-field__placeholder"
    >
      {{ label }}

      <VPopover
        v-if="tooltip"
        :triggers="['hover', 'focus']"
        placement="top"
        class="base-field__tooltip attention-icon"
      >
        <div class="attention-icon__container">
          <svg><use href="#icon-attention" /></svg>
        </div>

        <template #popover>
          {{ tooltip }}
        </template>
      </VPopover>
    </span>

    <span class="base-field__container">
      <slot />
    </span>

    <span class="base-field__error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  name: 'BaseField',

  props: {
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: null,
    },

    labelActive: {
      type: Boolean,
      default: false,
    },

    placeholderPosition: {
      type: String,
      default: 'static',
    },

    tooltip: {
      type: String,
      default: null,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    error: {
      type: String,
      default: null,
    },
  },

  computed: {
    invalid() {
      return !!this.error
    },
  },

  watch: {
    invalid(val) {
      this.$emit('errorTrigger', val)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/base/base-base-field';
</style>
