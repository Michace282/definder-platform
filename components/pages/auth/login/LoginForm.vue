<template>
  <div class="login-form">
    <div class="login-form__container">
      <div class="login-form__logo">
        <BaseLogo class="login-form__logo-component" color="black" />
      </div>

      <div class="login-form__welcome">
        {{ $t('AUTH.LOGIN_TITLE') }}
      </div>

      <ValidationObserver
        ref="observer"
        class="login-form__content"
        tag="form"
        @submit.prevent="login"
      >
        <ValidationProvider
          v-slot="{ errors }"
          tag="div"
          class="login-form__email"
          rules="required|email"
          :name="$t('AUTH.EMAIL').toLowerCase()"
        >
          <BaseInput
            v-model.trim="email"
            :label="$t('AUTH.EMAIL')"
            :disabled="loading"
            class="login-form__email-input"
            :error="errors[0]"
          />
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          tag="div"
          class="login-form__password"
          rules="required"
          :name="$t('AUTH.PASSWORD').toLowerCase()"
        >
          <BaseInput
            v-model="password"
            :label="$t('AUTH.PASSWORD')"
            :disabled="loading"
            class="login-form__password-input"
            type="password"
            :error="errors[0]"
          />
        </ValidationProvider>

        <div class="login-form__forgot">
          <BaseLink :to="linkToForgotPassword" class="login-form__forgot-link">
            {{ $t('AUTH.LOGIN_FORGOT_PASSWORD') }}
          </BaseLink>
        </div>

        <div class="login-form__login">
          <BaseButton
            :loading="loading"
            class="login-btn"
            component="button"
            form-type="submit"
            type="filled"
            color="blue"
            size="lg"
          >
            <div class="login-btn__text">{{ $t('AUTH.LOG_IN') }}</div>
          </BaseButton>
        </div>

        <div class="login-form__separator" />

        <div class="login-form__create-link">
          {{ $t('AUTH.LOGIN_DONT_HAVE_ACCOUNT') }}
          <BaseLink :to="linkToRegistration">
            {{ $t('AUTH.LOGIN_CREATE_ACCOUNT') }}
          </BaseLink>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import BaseLogo from '~/components/base/BaseLogo'
import BaseInput from '~/components/base/BaseInput'
import BaseButton from '~/components/base/BaseButton'
import BaseLink from '~/components/base/BaseLink'

export default {
  name: 'LoginForm',

  components: {
    BaseLogo,
    BaseInput,
    BaseButton,
    BaseLink,
    ValidationObserver,
    ValidationProvider,
  },

  data() {
    return {
      email: '',
      password: '',

      loading: false,
    }
  },

  computed: {
    linkToForgotPassword() {
      return this.localePath({
        name: 'auth-forgot-password',
      })
    },

    linkToRegistration() {
      return this.localePath({
        name: 'auth-registration',
      })
    },

    linkToMainPage() {
      return this.localePath({
        name: 'index',
      })
    },

    linkToProfile() {
      return this.localePath({
        name: 'profile-info',
      })
    },

    accountActivated() {
      return this.$route.query.accountActivated
    },

    afterLoginRedirect() {
      const path = this.$route.query.redirect
      if (!path) {
        return this.linkToProfile
      }

      return this.localePath(path.toString())
    },
  },

  mounted() {
    this.handleAccountActivation()
  },

  methods: {
    async login() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }

      this.loading = true

      try {
        const body = { email: this.email, password: this.password }
        await this.$auth.loginWith('local', body)

        await this.$router.push(this.afterLoginRedirect)
      } catch (e) {
      } finally {
        this.loading = false
      }
    },

    handleAccountActivation() {
      if (!this.accountActivated) {
        return
      }

      const firstPart = this.$t(
        'AUTH.REGISTRATION_SUCCESS_ACTIVATION_TOAST_FIRST'
      )
      const secondPart = this.$t(
        'AUTH.REGISTRATION_SUCCESS_ACTIVATION_TOAST_SECOND'
      )
      const text = `${firstPart}<br>${secondPart}`
      this.$toast.success(text.toString())
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/auth/login/login-form';
</style>
