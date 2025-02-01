<template>
  <NuxtLink
    :to="to"
    :target="target"
    class="base-link"
    :class="{
      [`base-link_${color}`]: true,
    }"
  >
    <slot />
  </NuxtLink>
</template>

<script>
export default {
  name: 'BaseLink',

  props: {
    to: {
      required: true,
      type: String,
    },

    target: {
      type: String,
      default: null,
    },

    color: {
      type: String,
      default: 'blue',
      validator(value) {
        return ['black', 'white', 'blue', 'grey'].includes(value)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/base/base-link';
</style>
