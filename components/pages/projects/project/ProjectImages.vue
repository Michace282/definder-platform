<template>
  <div class="project-images">
    <div class="project-images__container">
      <BaseSwiper
        :items="projectImages"
        :swiper-option="sliderOptions"
        class="images-preview__slider"
        navigation
        pagination
      >
        <template #default="{ item }">
          <div class="project-image" @click="openImagesModal(item.orderId)">
            <div class="project-image__img">
              <img :src="item.image" />
            </div>
          </div>
        </template>
      </BaseSwiper>

      <slot name="status"></slot>
    </div>
  </div>
</template>

<script>
import BaseSwiper from '~/components/base/BaseSwiper'

export default {
  name: 'ProjectImages',

  components: {
    BaseSwiper,
  },

  props: {
    projectImages: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    sliderOptions() {
      return {
        slidesPerView: 1,
        autoplay: { delay: 4500, disableOnInteraction: false },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
      }
    },
  },

  mounted() {},

  methods: {
    openImagesModal(orderId) {
      this.$modal.open({
        component: 'ImagesPreview',
        options: {
          projectImages: this.projectImages,
          orderId,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/projects/project/project-images';
</style>
