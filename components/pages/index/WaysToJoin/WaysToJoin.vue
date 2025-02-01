<template>
  <div class="ways-to-join">
    <div class="ways-to-join__container">
      <SectionTitle header-tag="h3" class="ways-to-join__title">
        {{ $t('MAIN_PAGE.WAYS_TO_JOIN_TITLE') }}
      </SectionTitle>

      <!--      <div class="ways-to-join__description">-->
      <!--        {{ $t('MAIN_PAGE.WAYS_TO_JOIN_DESCRIPTION') }}-->
      <!--      </div>-->

      <div class="ways-to-join__list">
        <div
          v-for="way in waysToJoin"
          :key="way.key"
          class="way-item ways-to-join__list-item"
        >
          <div class="way-item__background-anvil green">
            <svg><use href="#icon-anvil" /></svg>
          </div>
          <div class="way-item__background-anvil blue">
            <svg><use href="#icon-anvil" /></svg>
          </div>

          <div class="way-item__container">
            <div class="way-item__title">
              {{ $t(way.title) }}
            </div>

            <div class="way-item__options">
              <div
                v-for="option in way.options"
                :key="option.id"
                class="way-item__option"
              >
                <div class="way-item__option-icon">
                  <svg><use href="#icon-check" /></svg>
                </div>

                <div class="way-item__option-text">
                  {{ $t(option.text) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from '~/components/general/SectionTitle'

export default {
  name: 'WaysToJoin',

  components: {
    SectionTitle,
  },

  props: {
    waysToJoin: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/index/ways-to-join/ways-to-join';
</style>
