<template>
  <div class="contac-section">
    <div class="contac-section__container">
      <SectionTitle header-tag="h3" class="contac-section__title">
        {{ $t('CONTACT_US.TITLE') }}
      </SectionTitle>

      <div class="contac-section__text">
        {{ $t('CONTACT_US.DESCRIPTION') }}
      </div>

      <a
        target="_blank"
        href="https://definder.global/lend/#contact"
        class="contac-section__btn"
      >
        {{ $t('CONTACT_US.BUTTON_CONTACT_US') }}
      </a>
    </div>
  </div>
</template>

<script>
import SectionTitle from '~/components/general/SectionTitle'

export default {
  name: 'ContacSection',

  components: {
    SectionTitle,
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/index/contac-section/contac-section';
</style>
