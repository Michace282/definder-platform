<template>
  <DefaultLayout>
    <div class="layout">
      <div class="layout__container">
        <TheHeader :theme="headerTheme" class="layout__header" />

        <slot>
          <Nuxt class="layout__content" />
        </slot>

        <TheFooter class="layout__footer" />
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '~/layouts/Default.vue'
import TheHeader from '~/components/general/TheHeader'
import TheFooter from '~/components/general/TheFooter'

export default {
  name: 'WrapperLayout',

  components: {
    DefaultLayout,
    TheHeader,
    TheFooter,
  },

  props: {
    theme: {
      type: String,
      default: null,
    },
  },

  data() {
    return {}
  },

  computed: {
    headerTheme() {
      if (this.theme) {
        return this.theme
      }
      return this.$route?.matched[0]?.components?.default?.options?.headerTheme
    },
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/layouts/wrapper';
</style>
