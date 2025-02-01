<template>
  <component
    :is="component"
    :class="[`base-hover_color-${color}`]"
    class="base-hover"
    v-on="$listeners"
  >
    <component
      :is="component"
      v-if="$scopedSlots['left-icon']"
      class="base-hover__left-icon"
    >
      <slot name="left-icon" />
    </component>

    <component :is="component" class="base-hover__text">
      <slot />
    </component>
  </component>
</template>

<script>
export default {
  name: 'BaseHoverText',

  props: {
    color: {
      type: String,
      default: 'primary',
      validator(val) {
        return [
          'primary',
          'black',
          'white',
          'danger',
          'no-hover-black',
          'no-hover-white',
        ].includes(val)
      },
    },

    component: {
      type: String,
      default: 'span',
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/base/base-hover-text';
</style>
