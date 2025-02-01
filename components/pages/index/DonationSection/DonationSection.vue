<template>
  <div class="donation-section">
    <!--    <div class="donation-section__gif">-->
    <!--      <img src="~assets/gifs/liquid.gif" class="donation-section__gif-img" />-->
    <!--    </div>-->
    <!--    <div class="donation-section__gif left">-->
    <!--      <img src="~assets/gifs/liquid.gif" class="donation-section__gif-img" />-->
    <!--    </div>-->

    <div class="donation-section__container">
      <SectionTitle header-tag="h3" class="donation-section__title">
        {{ $t('MAIN_PAGE.DONATION_SECTION_TITLE') }}
      </SectionTitle>

      <div class="donation-section__text">
        {{ $t('MAIN_PAGE.DONATION_SECTION_TEXT') }}
      </div>

      <a
        target="_blank"
        href="https://definder.global/charity/"
        class="donation-section__btn"
      >
        <BaseButton class="donation-section__btn-component">
          {{ $t('MAIN_PAGE.DONATION_SECTION_BUTTON') }}
        </BaseButton>
      </a>
    </div>
  </div>
</template>

<script>
import BaseButton from '~/components/base/BaseButton'
import SectionTitle from '~/components/general/SectionTitle'

export default {
  name: 'DonationSection',

  components: {
    BaseButton,
    SectionTitle,
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/index/donation-section/donation-section';
</style>
