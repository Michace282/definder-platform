<template>
  <div class="login-page">
    <div class="login-page__container">
      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from '~/components/pages/auth/login/LoginForm'

export default {
  name: 'LoginPage',

  components: {
    LoginForm,
  },

  layout: 'Login',
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/auth/login/index';
</style>
