<template>
  <div :class="{ slider_overflow: hideOverflow }" class="slider">
    <div class="slider__content">
      <div class="slider__swiper-container" :class="{ pagination: pagination }">
        <Swiper
          ref="mySwiper"
          :cleanup-styles-on-destroy="false"
          :options="swiperOption"
          :thumbs="thumbs"
          class="slider__swiper"
          @slide-change="onSlideChange"
          @transition-start="onTransitionStart"
          @transition-end="onTransitionEnd"
        >
          <SwiperSlide
            v-for="(item, index) in items"
            :key="index"
            class="slider__slide"
            :class="{
              'slide-animation': currentIndex === index,
              'slide-prev-animation': previousIndex === index,
            }"
          >
            <slot :item="item" />
          </SwiperSlide>

          <template v-if="pagination">
            <div slot="pagination" class="swiper-pagination"></div>
          </template>
        </Swiper>

        <!--Navigation-->
        <template v-if="navigation">
          <div
            class="slider__arrow slider__arrow_prev swiper-button-prev"
            :class="{
              slider__arrow_disabled: isBeginning,
              'slider__arrow_out-left': arrowsOut,
            }"
            @click.stop="prev"
          >
            <svg><use href="#icon-arrow-left" /></svg>
          </div>
          <div
            class="slider__arrow slider__arrow_next swiper-button-next"
            :class="{
              slider__arrow_disabled: isEnd,
              'slider__arrow_out-right': arrowsOut,
            }"
            @click.stop="next"
          >
            <svg><use href="#icon-arrow-right" /></svg>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Swiper as SwiperClass,
  Pagination,
  Thumbs,
  Autoplay,
} from 'swiper/js/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'

SwiperClass.use([Pagination, Thumbs, Autoplay])

const { Swiper, SwiperSlide } = getAwesomeSwiper(SwiperClass)

export default {
  name: 'BaseSwiper',

  components: {
    Swiper,
    SwiperSlide,
  },

  props: {
    value: {
      type: [Number, String],
      default: 0,
    },

    swiperOption: {
      type: Object,
      default: () => ({}),
    },

    items: {
      type: Array,
      default: () => [],
    },

    hideOverflow: {
      type: Boolean,
      default: false,
    },

    watchSlidesProgress: {
      type: Boolean,
      default: false,
    },

    thumbs: {
      type: Object,
      default: null,
    },

    pagination: {
      type: Boolean,
      default: false,
    },

    navigation: {
      type: Boolean,
      default: false,
    },

    arrowsOut: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentIndex: 0,
      previousIndex: null,
      isBeginning: false,
      isEnd: false,
    }
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper && this.$refs.mySwiper.$swiper
    },
  },

  watch: {
    value() {
      this.changeSlide(this.value)
    },

    currentIndex() {
      this.updateArrows()
    },
  },

  mounted() {
    this.onSlideChange()
    this.updateArrows()
  },

  methods: {
    changeSlide(index) {
      this.swiper.slideTo(index)
    },

    onSlideChange() {
      this.previousIndex = this.currentIndex
      const index = this.swiper.realIndex
      this.currentIndex = index
      this.$emit('input', index)
    },

    onTransitionStart() {
      this.previousIndex = this.currentIndex
    },

    onTransitionEnd() {
      this.previousIndex = null
    },

    updateArrows() {
      this.isBeginning = this.swiper.isBeginning
      this.isEnd = this.swiper.isEnd
    },

    prev() {
      this.swiper.slidePrev()
    },

    next() {
      this.swiper.slideNext()
    },
  },
}
</script>

<style lang="scss">
@import 'swiper/css/swiper.css';
@import '~assets/scss/base/base-swiper-global';
</style>

<style lang="scss" scoped>
@import '~assets/scss/base/base-swiper';
</style>
