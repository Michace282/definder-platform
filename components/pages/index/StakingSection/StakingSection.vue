<template>
  <div class="staking-section">
    <div class="staking-section__title">
      <SectionTitle header-tag="h3" class="investment-projects__title">
        {{ $t('MAIN_PAGE.STAKING_SECTION_TITLE') }}
      </SectionTitle>
    </div>
    <div class="staking-section__container-wrapper">
      <div class="staking-section__container">
        <div class="staking-section__content staking-content">
          <div class="staking-content__container">
            <SectionTitle header-tag="h3" class="staking-content__title">
              {{ $t('MAIN_PAGE.STAKING_SECTION_TITLE_LP') }}
            </SectionTitle>

            <div class="staking-content__subtitle">
              {{ $t('MAIN_PAGE.STAKING_SECTION_SUBTITLE_LP') }}
            </div>

            <div class="staking-content__text">
              {{ $t('MAIN_PAGE.STAKING_SECTION_TEXT_LP') }}

              <a
                class="staking-content__link"
                href="https://definder.global/news/winter-win-staking-all-you-need-to-know/"
                target="_blank"
              >
                {{ $t('MAIN_PAGE.STAKING_SECTION_DETAILED') }}
              </a>
            </div>
          </div>

          <a
            target="_blank"
            href="https://pancakeswap.finance/add/0x2456493e757fDeedF569781F053998A72adfad03/0x55d398326f99059fF775485246999027B3197955"
            class="staking-content__btn"
          >
            <BaseButton class="staking-content__btn-component">
              {{ $t('MAIN_PAGE.STAKING_SECTION_BUTTON_LP') }}
            </BaseButton>
          </a>
        </div>

        <div class="staking-section__content staking-content">
          <div class="staking-content__container">
            <SectionTitle header-tag="h3" class="staking-content__title">
              {{ $t('MAIN_PAGE.STAKING_SECTION_TITLE_SAFE') }}
            </SectionTitle>

            <div class="staking-content__subtitle">
              {{ $t('MAIN_PAGE.STAKING_SECTION_SUBTITLE_SAFE') }}
            </div>

            <div class="staking-content__text">
              {{ $t('MAIN_PAGE.STAKING_SECTION_TEXT_SAFE') }}

              <a
                class="staking-content__link"
                href="https://definder.global/news/winter-win-staking-all-you-need-to-know/"
                target="_blank"
              >
                {{ $t('MAIN_PAGE.STAKING_SECTION_DETAILED') }}
              </a>
            </div>
          </div>

          <a
            target="_blank"
            href="https://pancakeswap.finance/info/token/0x2456493e757fDeedF569781F053998A72adfad03"
            class="staking-content__btn"
          >
            <BaseButton class="staking-content__btn-component">
              {{ $t('MAIN_PAGE.STAKING_SECTION_BUTTON_SAFE') }}
            </BaseButton>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '~/components/base/BaseButton'
import SectionTitle from '~/components/general/SectionTitle'

export default {
  name: 'StakingSection',

  components: {
    BaseButton,
    SectionTitle,
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/index/staking-section/staking-section';
</style>
