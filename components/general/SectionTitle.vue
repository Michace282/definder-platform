<template>
  <div class="section-title">
    <component :is="headerTag" class="section-title__container">
      <slot></slot>

      <div v-if="$scopedSlots['append']" class="section-title__append">
        <slot name="append"></slot>
      </div>
    </component>
  </div>
</template>

<script>
export default {
  name: 'SectionTitle',

  props: {
    headerTag: {
      type: String,
      default: 'h2',
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/general/section-title';
</style>
