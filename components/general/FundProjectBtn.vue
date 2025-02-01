<template>
  <div v-click-block="checkClick" class="fund-project">
    <BaseButton
      :color="color"
      class="fund-project__btn"
      :style="`font-weight: ${weight}`"
      :to="linkToFundProjectPage"
      @click="onClick"
    >
      {{ labelText }}
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from '~/components/base/BaseButton'

export default {
  name: 'FundProjectBtn',

  components: {
    BaseButton,
  },

  props: {
    color: {
      type: String,
      default: 'black',
      validator(value) {
        return ['black', 'white', 'blue'].includes(value)
      },
    },

    label: {
      type: String,
      default: null,
    },

    weight: {
      type: String,
      default: '500',
    },
  },

  computed: {
    labelText() {
      if (this.label) {
        return this.label
      }

      return this.$t('MAIN_PAGE.MAIN_SECTION_FUND_BUTTON')
    },

    linkToFundProjectPage() {
      return this.localePath({
        name: 'projects-fund',
      })
    },
  },

  methods: {
    checkClick(event) {
      if (!this.$auth.loggedIn) {
        event.stopPropagation()
        event.preventDefault()
        this.$router.push(this.localePath({ name: 'auth-login' }))
      }
    },

    onClick(event) {
      this.$emit('click', event)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/general/fund-project-btn';
</style>
