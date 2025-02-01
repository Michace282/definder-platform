<template>
  <div ref="container" class="small-medium-enterprises">
    <div class="small-medium-enterprises__container">
      <div
        class="small-medium-enterprises__info bounceInRight"
        :class="isVisible ? 'animation' : 'animatable'"
      >
        <SectionTitle header-tag="h3" class="small-medium-enterprises__title">
          {{ $t('MAIN_PAGE.SMALL_MEDIUM_ENTERPRISES_TITLE') }}
        </SectionTitle>

        <div
          class="small-medium-enterprises__text"
          :class="{
            'small-medium-enterprises__text--expanded': !showMore,
          }"
        >
          <p class="small-medium-enterprises__text-paragraph">
            {{ $t('MAIN_PAGE.SMALL_MEDIUM_ENTERPRISES_PARAGRAPH_FIRST') }}
          </p>
        </div>
        <div v-if="isMobile" class="small-medium__button-container">
          <button v-if="showMore" class="show-more-btn" @click="toggleShowMore">
            Show More
          </button>
        </div>
      </div>

      <div
        class="small-medium-enterprises__img bounceInLeft"
        :class="isVisible ? 'animation' : 'animatable'"
      >
        <div class="small-medium-enterprises__img-container">
          <NuxtLink
            :to="{ path: '/marketplace', query: { category: 'retail' } }"
            class="small-medium-enterprises__img-wrapper"
          >
            <img
              src="/images/sources/building.gif"
              alt="Enterprise GIF"
              class="img-gif"
            />
            <img
              src="/images/sources/transparent-border.png"
              alt="small-medium-enterprises-banner"
              class="img-static"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from '~/components/general/SectionTitle'
import intersectionObserverMixin from '~/mixins/intersectionObserverMixin'

export default {
  name: 'SmallMediumEnterprises',
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
@import '~assets/scss/pages/index/small-medium-enterprises/small-medium-enterprises';
@import '~assets/scss/base/base-animation';
</style>
