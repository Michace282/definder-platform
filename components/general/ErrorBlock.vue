<template>
  <div class="error-block">
    <div class="error-block__container">
      <div class="error-block__background-anvil green">
        <svg><use href="#icon-anvil" /></svg>
      </div>
      <div class="error-block__background-anvil blue">
        <svg><use href="#icon-anvil" /></svg>
      </div>
      <div class="error-block__background-circle blue">
        <div class="error-block__background-circle-img"></div>
      </div>

      <div class="error-block__content">
        <div
          v-if="error.statusCode === 404"
          class="div error-block__page-not-found"
        >
          <div class="error-block__icon-wrapper">
            4
            <div class="error-block__icon">
              <img src="/images/sources/icon-sad.png" />
            </div>
            4
          </div>

          <div class="error-block__text">
            {{ $t('GENERAL.PAGE_NOT_FOUND') }}
          </div>
        </div>

        <div v-else class="div error-block__any-errors">
          <div class="error-block__icon-wrapper">
            {{ error.statusCode }}
          </div>

          <div class="error-block__text">
            {{ error.message }}
          </div>
        </div>
      </div>

      <NuxtLink to="/" class="error-block__btn">
        <BaseButton type="filled" color="blue" size="lg">
          <div class="login-btn__text">
            {{ $t('GENERAL.GO_BACK_TO_MAIN_PAGE') }}
          </div>
        </BaseButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import BaseButton from '~/components/base/BaseButton'

export default {
  name: 'ErrorBlock',

  components: {
    BaseButton,
  },

  props: {
    error: {
      type: [Object, String, Number, Array],
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/general/error-block';
</style>
