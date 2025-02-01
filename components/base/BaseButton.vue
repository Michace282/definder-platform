<template>
  <component
    v-bind="$attrs"
    :is="wrapperComponent"
    :to="to"
    :target="target"
    :type="formType"
    :class="{
      [`button_${type}`]: true,
      [`button_${color}`]: true,
      [`button_size-${size}`]: true,
      button_disabled: disabled,
      button_loading: loading,
      button_active: active,
    }"
    class="button"
    @click.capture="onClick"
    v-on="$listeners"
  >
    <div class="button__content">
      <span class="button__label">{{ label }}</span>
      <slot />
    </div>
  </component>
</template>

<script>
export default {
  name: 'BaseButton',

  props: {
    component: {
      type: [String, Object],
      default: 'div',
    },

    formType: {
      type: String,
      default: null,
    },

    label: {
      type: String,
      default: '',
    },

    type: {
      type: String,
      default: 'border',
      validator(value) {
        return ['border', 'no-border', 'filled'].includes(value)
      },
    },

    size: {
      type: String,
      default: 'md',
      validator(value) {
        return ['md', 'lg'].includes(value)
      },
    },

    color: {
      type: String,
      default: 'black',
      validator(value) {
        return ['black', 'white', 'blue', 'gray'].includes(value)
      },
    },

    active: {
      type: Boolean,
      default: false,
    },

    to: {
      type: [String, Object],
      default: null,
    },

    target: {
      type: String,
      default: null,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    wrapperComponent() {
      if (this.component === 'div' && this.to) {
        return 'NuxtLink'
      }

      return this.component
    },

    isDeactivated() {
      return this.disabled || this.loading
    },
  },

  mounted() {},

  methods: {
    onClick(event) {
      if (this.isDeactivated) {
        event.stopPropagation()
        event.preventDefault()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/base/base-button';
</style>
