<template>
  <div class="inform-popup">
    <div class="inform-popup__container">
      <div v-if="topIcon" class="inform-popup__icon">
        <svg><use :href="topIcon" /></svg>
      </div>

      <SectionTitle header-tag="h3" class="inform-popup__title">
        {{ validTitle }}
      </SectionTitle>

      <div class="inform-popup__description">
        {{ validInformText }}
      </div>

      <div class="inform-popup__controls">
        <BaseButton
          color="blue"
          type="filled"
          size="lg"
          class="inform-popup__controls-btn"
          @click="close"
        >
          {{ validCloseText }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from '~/components/general/SectionTitle'
import BaseButton from '~/components/base/BaseButton'

export default {
  name: 'InformPopup',

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

    topIcon: {
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
      // TODO default translations
      return this.title ? this.title : this.$t('GENERAL.THANKS')
    },

    validInformText() {
      // TODO default translations
      return this.informText
        ? this.informText
        : this.$t('PROJECT_INFO.INFORM_TEXT')
    },

    validCloseText() {
      return this.closeText ? this.confirmText : this.$t('GENERAL.CLOSE')
    },
  },

  methods: {
    close() {
      this.$modal.close(this.modalId)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/modal-content/inform-popup';
</style>
