<template>
  <div class="forgot-password-form">
    <div class="forgot-password-form__container">
      <SectionTitle header-tag="h4" class="forgot-password-form__title">
        {{ $t('AUTH.FORGOT_PASSWORD_TITLE') }}
      </SectionTitle>

      <div class="forgot-password-form__subtitle">
        {{ $t('AUTH.FORGOT_PASSWORD_SUBTITLE') }}
      </div>

      <ValidationObserver
        ref="observer"
        class="forgot-password-form__content"
        tag="form"
        @submit.prevent="resetPassword"
      >
        <ValidationProvider
          v-slot="{ errors }"
          class="forgot-password-form__email"
          tag="div"
          vid="password"
          rules="required|email"
          :name="$t('AUTH.EMAIL').toLowerCase()"
        >
          <BaseInput
            v-model="email"
            :disabled="loading"
            :label="$t('AUTH.EMAIL')"
            class="forgot-password-form__email-input"
            :error="errors[0]"
          />
        </ValidationProvider>

        <div class="forgot-password-form__reset">
          <BaseButton
            :loading="loading"
            class="reset-btn"
            component="button"
            form-type="submit"
            type="filled"
            color="blue"
            size="lg"
          >
            <div class="reset-btn__text">
              {{ $t('AUTH.FORGOT_PASSWORD_SUBMIT') }}
            </div>
          </BaseButton>
        </div>

        <div class="forgot-password-form__separator" />

        <div class="forgot-password-form__back-login">
          {{ $t('AUTH.FORGOT_PASSWORD_GO_BACK_TO') }}
          <BaseLink :to="linkToLogin">
            {{ $t('AUTH.FORGOT_PASSWORD_GO_BACK_TO_LOGIN_PAGE') }}
          </BaseLink>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import BaseInput from '~/components/base/BaseInput'
import BaseButton from '~/components/base/BaseButton'
import BaseLink from '~/components/base/BaseLink'
import SectionTitle from '~/components/general/SectionTitle'

export default {
  name: 'ForgotPasswordForm',

  components: {
    SectionTitle,
    BaseInput,
    BaseButton,
    BaseLink,
    ValidationObserver,
    ValidationProvider,
  },

  data() {
    return {
      loading: false,

      email: '',
    }
  },

  computed: {
    linkToLogin() {
      return this.localePath({
        name: 'auth-login',
      })
    },

    linkToMainPage() {
      return this.localePath({
        name: 'index',
      })
    },
  },

  methods: {
    async resetPassword() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }

      this.loading = true

      try {
        const data = { email: this.email }
        await this.$api.auth.resetPassword(data)

        const message = this.$t(
          'AUTH.FORGOT_PASSWORD_SUCCESS_MESSAGE_SENT_TOAST'
        )
        this.$toast.success(message.toString())

        await this.redirectToLogin()
      } catch (e) {
      } finally {
        this.loading = false
      }
    },

    async redirectToLogin() {
      await this.$router.push(
        this.localePath({
          name: 'auth-login',
        })
      )
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/auth/forgot-password/forgot-password-form';
</style>
