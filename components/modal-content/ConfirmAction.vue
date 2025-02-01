<template>
  <div class="confirm-action">
    <div
      :class="{ [`confirm-action__container_size-${size}`]: true }"
      class="confirm-action__container"
    >
      <SectionTitle header-tag="h3" class="confirm-action__title">
        {{ validTitle }}
      </SectionTitle>

      <div v-if="text" class="confirm-action__description">
        {{ text }}
      </div>

      <div class="confirm-action__controls">
        <BaseButton
          v-if="!noCancel"
          color="white"
          size="lg"
          class="confirm-action__controls-btn"
          @click="cancel"
        >
          {{ validCancelText }}
        </BaseButton>

        <BaseButton
          v-if="!noConfirm"
          type="filled"
          color="blue"
          size="lg"
          class="confirm-action__controls-btn"
          @click="confirm"
        >
          {{ validConfirmText }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import SectionTitle from '~/components/general/SectionTitle'
import BaseButton from '~/components/base/BaseButton'

export default {
  name: 'ConfirmAction',

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

    size: {
      type: String,
      default: 'xs',
      validator(value) {
        return ['xs', 'full'].includes(value)
      },
    },

    text: {
      type: String,
      default: null,
    },

    confirmText: {
      type: String,
      default: null,
    },

    confirmCallback: {
      type: Function,
      default: null,
    },

    cancelText: {
      type: String,
      default: null,
    },

    cancelCallback: {
      type: Function,
      default: null,
    },

    noCancel: {
      type: Boolean,
      default: false,
    },

    noConfirm: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    validTitle() {
      return this.title ? this.title : this.$t('GENERAL.CONFIRM_ACTION')
    },

    validConfirmText() {
      return this.confirmText ? this.confirmText : this.$t('GENERAL.CONFIRM')
    },

    validCancelText() {
      return this.cancelText ? this.cancelText : this.$t('GENERAL.CANCEL')
    },
  },

  methods: {
    async confirm() {
      try {
        if (this.confirmCallback) {
          this.confirmCallback()
        }

        await this.close()
      } catch {}
    },

    async cancel() {
      try {
        if (this.cancelCallback) {
          this.cancelCallback()
        }

        await this.close()
      } catch {}
    },

    close() {
      this.$modal.close(this.modalId)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/modal-content/confirm-actions';
</style>
