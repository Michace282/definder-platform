<template>
  <div class="contac-section">
    <div class="contac-section__container">
      <SectionTitle header-tag="h3" class="contac-section__title">
        {{ $t('DEFINDER_OFFER.TITLE') }}
      </SectionTitle>

      <div class="contac-section__text">
        {{ $t('DEFINDER_OFFER.DESCRIPTION') }}
      </div>

      <a
        v-if="!$auth.loggedIn"
        href="/auth/registration"
        class="contac-section__btn"
      >
        {{ $t('DEFINDER_OFFER.BUTTON_JOIN_US') }}
      </a>
      <a v-else href="/auth/registration" class="contac-section__btn">
        Learn More
      </a>
    </div>
  </div>
</template>

<script>
import SectionTitle from '~/components/general/SectionTitle'

export default {
  name: 'DefinderOffer',

  components: {
    SectionTitle,
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/index/contac-section/contac-section';
</style>
