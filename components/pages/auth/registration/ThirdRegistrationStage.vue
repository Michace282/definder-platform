<template>
  <div class="third-stage">
    <SectionTitle header-tag="h3" class="third-stage__title">
      {{ $t('AUTH.REGISTRATION_THIRD_STAGE_TITLE') }}
    </SectionTitle>

    <SectionTitle header-tag="h6" class="third-stage__subtitle">
      {{ $t('AUTH.REGISTRATION_THIRD_STAGE_INFO_FIRST') }}
    </SectionTitle>

    <div class="third-stage__content">
      <div class="third-stage__info">
        {{ $t('AUTH.REGISTRATION_THIRD_STAGE_INFO_SECOND') }}
      </div>

      <div class="third-stage__continue">
        <BaseButton
          class="continue-btn"
          type="filled"
          color="blue"
          size="lg"
          @click="setNextStage"
        >
          <div class="continue-btn__text">
            {{ $t('AUTH.REGISTRATION_CONTINUE') }}
          </div>
        </BaseButton>
      </div>

      <div class="third-stage__separator" />

      <div class="third-stage__resend-info">
        {{ $t('AUTH.REGISTRATION_THIRD_STAGE_RESEND_INFO') }}
      </div>

      <div class="third-stage__resend">
        <BaseHoverText
          v-if="canResendEmailVerification"
          class="third-stage__resend-trigger"
          @click="resendEmailVerification"
        >
          {{ $t('AUTH.REGISTRATION_THIRD_STAGE_RESEND_LINK') }}
        </BaseHoverText>

        <BaseHoverText v-else class="third-stage__resend-hint">
          {{ $tc('AUTH.REGISTRATION_THIRD_STAGE_RESEND_DELAY', delayToResend) }}
        </BaseHoverText>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from '~/components/general/SectionTitle'
import BaseButton from '~/components/base/BaseButton'
import BaseHoverText from '~/components/base/BaseHoverText'

const baseDelayInSeconds = 60

export default {
  name: 'ThirdRegistrationStage',

  components: {
    SectionTitle,
    BaseButton,
    BaseHoverText,
  },

  props: {
    email: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      delayToResend: baseDelayInSeconds,
      resendDelayInterval: null,
    }
  },

  computed: {
    canResendEmailVerification() {
      return this.delayToResend === 0
    },
  },

  mounted() {
    this.startResendDelayTimer()
  },

  beforeDestroy() {
    this.stopResendDelayTimer()
  },

  methods: {
    setNextStage() {
      this.$emit('set-next-stage')
    },

    startResendDelayTimer() {
      this.delayToResend = baseDelayInSeconds

      this.resendDelayInterval = setInterval(
        () => this.handleResendDelayTick(),
        1000
      )
    },

    handleResendDelayTick() {
      this.delayToResend--
      if (this.canResendEmailVerification) {
        this.stopResendDelayTimer()
      }
    },

    stopResendDelayTimer() {
      clearInterval(this.resendDelayInterval)
    },

    async resendEmailVerification() {
      try {
        const data = { email: this.email }
        await this.$api.registration.resendVerificationEmail(data)

        this.startResendDelayTimer()

        const info = this.$t('AUTH.REGISTRATION_THIRD_STAGE_RESEND_SENT')
        this.$toast.success(info.toString())
      } catch {}
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/auth/registration/third-registration-stage';
</style>
