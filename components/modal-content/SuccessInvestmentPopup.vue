<template>
  <div class="success-investment-popup">
    <div class="success-investment-popup__container">
      <img src="/images/sources/Illustration_Done.png" alt="success-icon" />

      <SectionTitle header-tag="h3" class="success-investment-popup__title">
        {{ $t('POPUP.SUCCESS') }}
      </SectionTitle>

      <div class="success-investment-popup__description">
        {{ $t('POPUP.SUCCESS_DESCRIPTION') }}
      </div>
      <div class="success-investment-popup__description">
        {{ $t('POPUP.SUCCESS_DESCRIPTION_SECOND') }}
      </div>
      <div class="success-investment-popup__controls">
        <BaseButton
          color="blue"
          type="filled"
          size="lg"
          class="success-investment-popup__controls-btn"
          @click="close"
        >
          {{ $t('POPUP.SUCCESS_DISCOVER_MORE') }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import confetti from 'canvas-confetti'
import SectionTitle from '~/components/general/SectionTitle'
import BaseButton from '~/components/base/BaseButton'

export default {
  name: 'SuccessInvestmentPopup',

  components: {
    SectionTitle,
    BaseButton,
  },

  props: {
    modalId: {
      type: Number,
      default: null,
    },

    title: {
      type: String,
      default: null,
    },

    informText: {
      type: String,
      default: null,
    },

    closeText: {
      type: String,
      default: null,
    },
  },

  computed: {
    validTitle() {
      return this.title ? this.title : this.$t('GENERAL.THANKS')
    },

    validInformText() {
      return this.informText
        ? this.informText
        : this.$t('PROJECT_INFO.INFORM_TEXT')
    },

    validCloseText() {
      return this.closeText ? this.confirmText : this.$t('GENERAL.CLOSE')
    },
  },

  mounted() {
    this.launchConfetti()
  },

  methods: {
    launchConfetti() {
      const end = Date.now() + 3 * 1000

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          colors: ['#0057e6', '#8eed00'],
          origin: { x: 0 },
        })
        confetti({
          particleCount: 2,
          angle: 120,
          colors: ['#0057e6', '#8eed00'],
          spread: 55,
          origin: { x: 1 },
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()
    },

    close() {
      this.$modal.close(this.modalId)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/modal-content/success-investment-popup';
</style>
