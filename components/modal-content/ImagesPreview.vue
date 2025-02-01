<template>
  <div class="images-preview" @click="close">
    <div class="images-preview__container">
      <div class="images-preview__container">
        <BaseSwiper
          :items="projectImages"
          :swiper-option="sliderOptions"
          class="project-images__slider"
          navigation
          arrows-out
        >
          <template #default="{ item }">
            <div class="project-image">
              <div class="project-image__img">
                <img :src="item.image" @click.stop />
              </div>
            </div>
          </template>
        </BaseSwiper>

        <slot name="status"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSwiper from '~/components/base/BaseSwiper'

export default {
  name: 'ImagesPreview',

  components: {
    BaseSwiper,
  },

  props: {
    orderId: {
      type: [Number, String],
      default: 0,
    },

    projectImages: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      //
    }
  },

  computed: {
    sliderOptions() {
      return {
        initialSlide: this.orderId,
        slidesPerView: 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
    },
  },

  beforeDestroy() {},

  methods: {
    close() {
      this.$modal.close(this.modalId)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/modal-content/images-preview';
</style>
