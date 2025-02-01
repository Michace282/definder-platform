<template>
  <div class="main-section">
    <div class="main-section__background"></div>
    <div class="main-section__container">
      <div class="main-section__background-anvil green">
        <svg><use href="#icon-anvil" /></svg>
      </div>
      <div class="main-section__background-anvil blue">
        <svg><use href="#icon-anvil" /></svg>
      </div>

      <div class="main-section__content">
        <div class="main-section__info">
          <h1 class="main-section__title">
            {{ $t('MAIN_PAGE.MAIN_SECTION_NAME') }}
          </h1>

          <div class="main-section__description">
            {{ $t('MAIN_PAGE.MAIN_SECTION_DESCRIPTION') }}
          </div>

          <!--          <div class="main-section__fund">-->
          <!--            <FundProjectBtn />-->
          <!--          </div>-->

          <div class="main-section__button">
            <a :href="'/marketplace'" target="_blank">
              <BaseButton class="main-section__button-component" color="black">
                <div class="main-section__button-inside">Get Started</div>
              </BaseButton>
            </a>
            <a
              v-if="!$auth.loggedIn"
              :href="'/auth/registration'"
              target="_blank"
            >
              <BaseButton
                class="main-section__button-component"
                color="black"
                style="width: 138px"
              >
                <div class="main-section__button-inside button-center-text">
                  Sign up
                </div>
              </BaseButton>
            </a>

            <!--
            <a :href="youtubeLink" target="_blank">
              <BaseButton class="main-section__button-component" color="black">
                <div class="main-section__button-inside">
                  <img src="/images/sources/youtube.png" />
                  {{ $t('HOW_IT_WORKS.TITLE') }}
                </div>
              </BaseButton>
            </a>

            <a :href="googlePlayLink" target="_blank">
              <div class="main-section__google-play">
                <img src="/images/sources/google-play.svg" />
              </div>
            </a>

            <a :href="googlePlayLink" target="_blank">
              <div class="main-section__google-play">
                <img src="/images/sources/app-store.svg" />
              </div>
            </a>-->
          </div>
        </div>

        <div ref="container" class="main-banner main-section__main-banner">
          <div class="main-banner__container">
            <img
              src="/images/sources/main-section-banner.png"
              alt="main banner"
              class="main-banner__double-image bounceInLeft"
              :class="isVisible ? 'animation' : 'animatable'"
            />
            <img
              src="/images/sources/main-section-banner-top.png"
              alt="main banner"
              class="main-banner__top-image bounceInLeft"
              :class="isVisible ? 'animation' : 'animatable'"
            />
            <img
              src="/images/sources/main-section-banner-bottom.png"
              alt="main banner"
              class="main-banner__bottom-image bounceInRight"
              :class="isVisible ? 'animation' : 'animatable'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import FundProjectBtn from '~/components/general/FundProjectBtn'
import BaseButton from '~/components/base/BaseButton'
import intersectionObserverMixin from '~/mixins/intersectionObserverMixin'

export default {
  name: 'MainSection',

  components: {
    // FundProjectBtn,
    BaseButton,
  },

  mixins: [intersectionObserverMixin],
  data() {
    return {
      youtubeLink: 'https://youtu.be/ufWXOqR5yG8',
      googlePlayLink:
        'https://play.google.com/store/apps/details?id=global.definder.dfplatform',
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/index/main-section';
@import '~assets/scss/base/base-animation';
</style>
