<template>
  <div class="login-reminder">
    <div class="login-reminder__container">
      <div class="login-reminder__title">
        {{ $t('AUTH.LOGIN_REMINDER_TITLE') }}
      </div>

      <div class="login-reminder__img">
        <img
          src="/images/sources/login-reminder.png"
          alt="login reminder image"
        />
      </div>

      <div class="login-reminder__text">
        {{ $t('AUTH.LOGIN_REMINDER_TEXT') }}
      </div>

      <div class="login-reminder__login-redirect">
        <BaseButton
          :to="linkToLogin"
          color="blue"
          type="filled"
          size="lg"
          class="login-reminder__login-redirect-btn"
        >
          <div @click="close">
            {{ $t('AUTH.LOGIN_REMINDER_LOGIN') }}
          </div>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '~/components/base/BaseButton'

export default {
  name: 'LoginReminder',

  components: {
    BaseButton,
  },

  props: {
    modalId: {
      type: [Number, String],
      default: null,
    },
  },

  computed: {
    linkToLogin() {
      return this.localePath({
        name: 'auth-login',
      })
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
@import '~assets/scss/modal-content/login-reminder';
</style>
