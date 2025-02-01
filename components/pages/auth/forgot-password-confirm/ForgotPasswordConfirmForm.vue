<template>
  <div class="forgot-password-confirm-form">
    <div class="forgot-password-confirm-form__container">
      <div class="forgot-password-confirm-form__logo">
        <BaseLogo
          class="forgot-password-confirm-form__logo-component"
          color="black"
        />
      </div>

      <SectionTitle header-tag="h4" class="forgot-password-confirm-form__title">
        {{ $t('AUTH.FORGOT_PASSWORD_CONFIRM_TITLE') }}
      </SectionTitle>

      <div class="forgot-password-confirm-form__subtitle">
        {{ $t('AUTH.FORGOT_PASSWORD_CONFIRM_SUBTITLE') }}
      </div>

      <ValidationObserver
        ref="observer"
        class="forgot-password-confirm-form__content"
        tag="form"
        @submit.prevent="resetPassword"
      >
        <ValidationProvider
          v-slot="{ errors }"
          class="forgot-password-confirm-form__password"
          tag="div"
          vid="password"
          rules="required|password|min:8|max:20"
          :name="$t('AUTH.PASSWORD').toLowerCase()"
        >
          <BaseInput
            v-model="password"
            :disabled="loading"
            :label="$t('AUTH.PASSWORD')"
            class="forgot-password-confirm-form__password-input"
            type="password"
            :error="errors[0]"
          />
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          class="forgot-password-confirm-form__repeat-password"
          tag="div"
          rules="required|confirmed:password|password|min:8|max:20"
          :name="$t('AUTH.REPEAT_PASSWORD').toLowerCase()"
        >
          <BaseInput
            v-model="repeatPassword"
            :disabled="loading"
            :label="$t('AUTH.REPEAT_PASSWORD')"
            class="forgot-password-confirm-form__repeat-password-input"
            type="password"
            :error="errors[0]"
          />
        </ValidationProvider>

        <div class="forgot-password-confirm-form__reset">
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
              {{ $t('AUTH.FORGOT_PASSWORD_CONFIRM_SUBMIT') }}
            </div>
          </BaseButton>
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
import SectionTitle from '~/components/general/SectionTitle'

export default {
  name: 'ForgotPasswordForm',

  components: {
    SectionTitle,
    BaseLogo,
    BaseInput,
    BaseButton,
    ValidationObserver,
    ValidationProvider,
  },

  props: {
    uid: {
      required: true,
      type: String,
    },

    token: {
      required: true,
      type: String,
    },
  },

  data() {
    return {
      loading: false,

      password: '',
      repeatPassword: '',
    }
  },

  computed: {
    linkToLogin() {
      return this.localePath({ name: 'auth-login' })
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
        const data = {
          newPassword1: this.password,
          newPassword2: this.repeatPassword,
          uid: this.uid,
          token: this.token,
        }

        await this.$api.auth.resetPasswordConfirm(data)

        const message = this.$t(
          'AUTH.FORGOT_PASSWORD_CONFIRM_SUCCESS_PASSWORD_CHANGED_TOAST'
        )
        this.$toast.success(message.toString())

        await this.$router.replace(this.linkToLogin)
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/auth/forgot-password-confirm/forgot-password-confirm-form';
</style>
