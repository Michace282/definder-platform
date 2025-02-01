<template>
  <div class="forgot-password-page">
    <div class="forgot-password-page__container">
      <ForgotPasswordConfirmForm :uid="uid" :token="token" />
    </div>
  </div>
</template>

<script>
import ForgotPasswordConfirmForm from '~/components/pages/auth/forgot-password-confirm/ForgotPasswordConfirmForm'

export default {
  name: 'ForgotPasswordConfirmationPage',

  headerTheme: 'light',

  components: {
    ForgotPasswordConfirmForm,
  },

  layout: 'Wrapper',

  async middleware({ localePath, route, redirect }) {
    if (route.query.uid && route.query.token) {
      return
    }

    await redirect(localePath({ name: 'index' }))
  },

  computed: {
    uid() {
      return String(this.$route.query.uid)
    },

    token() {
      return String(this.$route.query.token)
    },

    linkToMainPage() {
      return this.localePath({ name: 'index' })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/auth/forgot-password-confirm/index';
</style>
