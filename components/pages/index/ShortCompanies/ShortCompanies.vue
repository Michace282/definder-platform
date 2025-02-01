<template>
  <div class="short-companies">
    <div
      class="short-companies__container"
      :class="{ invert: invert, black: black }"
    >
      <BaseSwiper
        :items="companies"
        :swiper-option="sliderOptions"
        class="short-companies__slider"
      >
        <template #default="{ item }">
          <a target="_blank" :href="item.link" class="company">
            <div class="company__container">
              <div class="company__image">
                <img :src="item.image" />
              </div>
            </div>
          </a>
        </template>
      </BaseSwiper>
    </div>
  </div>
</template>

<script>
import BaseSwiper from '~/components/base/BaseSwiper'

export default {
  name: 'ShortCompanies',

  components: {
    BaseSwiper,
  },

  props: {
    companies: {
      type: Array,
      default: () => [],
    },

    invert: {
      type: Boolean,
      default: false,
    },

    black: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    sliderOptions() {
      return {
        slidesPerView: 1.5,
        breakpoints: {
          375: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 3.5,
          },
          1366: {
            slidesPerView: 4.5,
          },
        },
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/index/short-companies/short-companies';
</style>
