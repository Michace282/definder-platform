<template>
  <div class="registration-page">
    <div class="registration-page__container">
      <RegistrationForm />
    </div>
  </div>
</template>

<script>
import RegistrationForm from '~/components/pages/auth/registration/RegistrationForm'

export default {
  name: 'RegistrationPage',

  headerTheme: 'light',

  components: {
    RegistrationForm,
  },

  layout: 'Wrapper',
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/auth/registration/index';
</style>
