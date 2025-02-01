<template>
  <div class="referrals-info">
    <div class="referrals-info__container">
      <div class="links">
        <SectionTitle header-tag="h4" class="links__title">
          {{ $t('PROFILE.TAB_PERSONAL_INFO_MY_REFERRALS_LINKS') }}
        </SectionTitle>

        <div class="referrals-caution">
          <svg class="referrals-caution__icon">
            <use href="#icon-info" />
          </svg>

          <div class="referrals-caution__text">
            {{ $t('PROFILE.TAB_PERSONAL_INFO_REFERRALS_CAUTION') }}
          </div>
        </div>

        <div class="links__link">
          <BaseHoverText
            v-clipboard:copy="link"
            v-clipboard:success="onCopySuccess"
            v-clipboard:error="onCopyError"
            class="links__link-hover"
          >
            <div class="links__link-hover-text">
              {{ link }}
            </div>
          </BaseHoverText>

          <div
            v-clipboard:copy="link"
            v-clipboard:success="onCopySuccess"
            v-clipboard:error="onCopyError"
            class="links__link-copy"
          >
            <svg class="links__link-icon"><use href="#icon-copy" /></svg>
          </div>
        </div>
      </div>

      <div class="referrals">
        <div class="referrals__text">
          {{ $t('PROFILE.TAB_PERSONAL_INFO_REFERRALS') }}: {{ referrals }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from '~/components/general/SectionTitle'
import BaseHoverText from '~/components/base/BaseHoverText'

export default {
  name: 'ReferralsInfo',

  components: {
    SectionTitle,
    BaseHoverText,
  },

  props: {
    link: {
      type: String,
      default: null,
    },

    referrals: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    onCopySuccess() {
      this.$toast.success(this.$t('TOAST.COPY_SUCCESS'))
    },

    onCopyError() {
      this.$toast.error(this.$t('TOAST.COPY_ERROR'))
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/profile/info/referrals-info';
</style>
