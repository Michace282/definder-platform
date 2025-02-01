<template>
  <div class="full-companies">
    <div class="full-companies__container">
      <SectionTitle header-tag="h3" class="full-companies__title">
        {{ $t('MAIN_PAGE.OUR_PARTNERS_TITLE') }}
      </SectionTitle>

      <div v-if="selectedCompany" class="full-info">
        <div class="company-card">
          <div class="company-card__container">
            <div class="company-card__text">
              {{ $t(selectedCompany.text) }}
            </div>

            <a
              target="_blank"
              :href="selectedCompany.link"
              class="company-card__panel"
            >
              <div class="company-card__logo">
                <img
                  :src="selectedCompany.image"
                  alt="company-logo"
                  class="company-card__logo-img"
                />
              </div>

              <div class="company-card__link">
                <div class="company-card__link-text">
                  {{ $t('MAIN_PAGE.OUR_PARTNERS_VISIT_WEBSITE') }}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="short-info">
        <BaseSwiper
          ref="thumbSwiper"
          :items="companies"
          :swiper-option="shortInfoSwiperOptions"
          watch-slides-progress
          class="short-info__slider"
        >
          <template #default="{ item }">
            <div
              :class="{
                'company-logo_selected': selectedCompany === item,
              }"
              class="company-logo"
              @click="selectCompany(item)"
            >
              <div class="company-logo__container">
                <div class="company-logo__image">
                  <img :src="item.image" alt="company-logo" />
                </div>
              </div>
            </div>
          </template>
        </BaseSwiper>
      </div>

      <!--      <BaseSwiper-->
      <!--        :space-between="10"-->
      <!--        :navigation="true"-->
      <!--        :thumbs="{ swiper: thumbsSwiper }"-->
      <!--        class="mySwiper2"-->
      <!--      >-->
      <!--        <div v-if="selectedCompany" class="full-info">-->
      <!--          <div class="company-card">-->
      <!--            <div class="company-card__container">-->
      <!--              <div class="company-card__text">-->
      <!--                {{ $t(selectedCompany.text) }}-->
      <!--              </div>-->

      <!--              <a :href="selectedCompany.link" class="company-card__panel">-->
      <!--                <div class="company-card__logo">-->
      <!--                  <img-->
      <!--                    :src="selectedCompany.image"-->
      <!--                    alt="company-logo"-->
      <!--                    class="company-card__logo-img"-->
      <!--                  />-->
      <!--                </div>-->

      <!--                <div class="company-card__link">-->
      <!--                  <div class="company-card__link-text">-->
      <!--                    {{ $t('MAIN_PAGE.OUR_PARTNERS_VISIT_WEBSITE') }}-->
      <!--                  </div>-->
      <!--                </div>-->
      <!--              </a>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </BaseSwiper>-->

      <!--      <BaseSwiper-->
      <!--        :space-between="10"-->
      <!--        :slides-per-view="4"-->
      <!--        :watch-slides-progress="true"-->
      <!--        class="mySwiper"-->
      <!--        @swiper="setThumbsSwiper"-->
      <!--      >-->
      <!--        <template #default="{ item }">-->
      <!--          <div-->
      <!--            :class="{-->
      <!--              'company-logo_selected': selectedCompany === item,-->
      <!--            }"-->
      <!--            class="company-logo"-->
      <!--            @click="selectCompany(item)"-->
      <!--          >-->
      <!--            <div class="company-logo__container">-->
      <!--              <div class="company-logo__image">-->
      <!--                <img :src="item.image" alt="company-logo" />-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </template>-->
      <!--      </BaseSwiper>-->
    </div>
  </div>
</template>

<script>
import BaseSwiper from '~/components/base/BaseSwiper'
import SectionTitle from '~/components/general/SectionTitle'

export default {
  name: 'FullCompanies',

  components: {
    BaseSwiper,
    SectionTitle,
  },

  props: {
    companies: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      selectedCompany: this.companies.length > 0 ? this.companies[0] : null,
      thumbsSwiper: null,
    }
  },

  computed: {
    shortInfoSwiperOptions() {
      return {
        slidesPerView: 2,
        // pagination: {
        //   el: '.swiper-pagination',
        //   type: 'bullets',
        //   clickable: true,
        // },
        style: {
          // '--swiper-navigation-color': '#fff',
          // '--swiper-pagination-color': '#fff',
        },
        // spaceBetween: 10,
        // thumbs: { swiper: this.thumbsSwiper },
        breakpoints: {
          375: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1366: {
            slidesPerView: 6,
          },
        },
      }
    },
  },

  methods: {
    selectCompany(item) {
      this.selectedCompany = item
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/index/full-companies/full-companies';
</style>
