<template>
  <div ref="container" class="mobility">
    <div class="mobility__container">
      <div
        class="mobility__info bounceInLeft"
        :class="isVisible ? 'animation' : 'animatable'"
      >
        <SectionTitle header-tag="h3" class="mobility__title">
          {{ $t('MAIN_PAGE.MOBILITY_TITLE') }}
        </SectionTitle>

        <div
          class="mobility__text"
          :class="{
            'mobility__text--expanded': !showMore,
          }"
        >
          <p class="mobility__text-paragraph">
            {{ $t('MAIN_PAGE.MOBILITY_TEXT_PARAGRAPH_FIRST') }}
          </p>
        </div>

        <div v-if="isMobile" class="small-medium__button-container">
          <button v-if="showMore" class="show-more-btn" @click="toggleShowMore">
            Show More
          </button>
        </div>
      </div>

      <div
        class="mobility__img bounceInRight"
        :class="isVisible ? 'animation' : 'animatable'"
      >
        <div class="mobility__img-container">
          <div class="mobility__img-wrapper">
            <img
              src="/images/sources/giphy.webp"
              alt="Mobility GIF"
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
  name: 'Mobility',

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
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768
    },
    toggleShowMore() {
      this.showMore = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/index/mobility/mobility';
@import '~assets/scss/base/base-animation';
</style>
