<template>
  <div class="forgot-password-page">
    <div class="forgot-password-page__container">
      <ForgotPasswordForm />
    </div>
  </div>
</template>

<script>
import ForgotPasswordForm from '~/components/pages/auth/forgot-password/ForgotPasswordForm'

export default {
  name: 'ForgotPasswordPage',

  headerTheme: 'light',

  components: {
    ForgotPasswordForm,
  },

  layout: 'Wrapper',
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/auth/forgot-password/index';
</style>
