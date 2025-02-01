<template>
  <div ref="container" class="liquidity-pool">
    <div class="liquidity-pool__container">
      <div
        class="liquidity-pool__info bounceInLeft"
        :class="isVisible ? 'animation' : 'animatable'"
      >
        <SectionTitle header-tag="h3" class="liquidity-pool__title">
          {{ $t('MAIN_PAGE.LIQUIDITY_POOL_TITLE') }}
        </SectionTitle>

        <div
          class="liquidity-pool__text"
          :class="{
            'liquidity-pool__text--expanded': !showMore,
          }"
        >
          <p class="liquidity-pool__text-paragraph">
            {{ $t('MAIN_PAGE.LIQUIDITY_POOL_TEXT_PARAGRAPH_FIRST') }}
          </p>
          <p class="liquidity-pool__text-paragraph">
            {{ $t('MAIN_PAGE.LIQUIDITY_POOL_TEXT_PARAGRAPH_SECOND') }}
          </p>
        </div>
        <div v-if="isMobile" class="liquidity-pool__button-container">
          <button v-if="showMore" class="show-more-btn" @click="toggleShowMore">
            Show More
          </button>
        </div>
      </div>

      <div
        class="liquidity-pool__img bounceInRight"
        :class="isVisible ? 'animation' : 'animatable'"
      >
        <div class="liquidity-pool__img-container">
          <div class="liquidity-pool__img-wrapper">
            <img
              src="/images/sources/Architecture.gif"
              alt="Liquidity GIF"
              class="img-gif"
            />
            <img
              src="/images/sources/transparent-border.png"
              alt="small-medium-enterprises-banner"
              class="img-static"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from '~/components/general/SectionTitle'
import intersectionObserverMixin from '~/mixins/intersectionObserverMixin'

export default {
  name: 'LiquidityPool',

  components: {
    SectionTitle,
  },
  mixins: [intersectionObserverMixin],
  data() {
    return {
      showMore: true,
      isMobile: false,
    }
  },

  mounted() {
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize)
  },

  methods: {
    toggleShowMore() {
      this.showMore = false
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/index/liquidity-pool/liquidity-pool';
@import '~assets/scss/base/base-animation';
</style>
