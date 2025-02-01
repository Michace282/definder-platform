<template>
  <div class="second-stage">
    <SectionTitle header-tag="h3" class="second-stage__title">
      {{ $t('AUTH.REGISTRATION_CREATE_PASSWORD') }}
    </SectionTitle>

    <ValidationObserver
      ref="observer"
      class="second-stage__content"
      tag="form"
      @submit.prevent="setNextStage"
    >
      <ValidationProvider
        v-slot="{ errors }"
        class="second-stage__input"
        tag="div"
        vid="password"
        rules="required|password|min:8|max:20"
        :name="$t('AUTH.PASSWORD').toLowerCase()"
      >
        <BaseInput
          v-model="passwordData"
          :label="$t('AUTH.PASSWORD')"
          :disabled="loading"
          type="password"
          class="second-stage__input-component"
          :error="errors[0]"
        />
      </ValidationProvider>

      <ValidationProvider
        v-slot="{ errors }"
        class="second-stage__input"
        tag="div"
        rules="required|confirmed:password|password|min:8|max:20"
        :name="$t('AUTH.REPEAT_PASSWORD').toLowerCase()"
      >
        <BaseInput
          v-model="repeatPasswordData"
          :label="$t('AUTH.REPEAT_PASSWORD')"
          :disabled="loading"
          type="password"
          class="second-stage__input-component"
          :error="errors[0]"
        />
      </ValidationProvider>

      <div class="second-stage__continue">
        <BaseButton
          :loading="loading"
          class="continue-btn"
          component="button"
          form-type="submit"
          type="filled"
          color="blue"
          size="lg"
        >
          <div class="continue-btn__text">
            {{ $t('AUTH.REGISTRATION_CONTINUE') }}
          </div>
        </BaseButton>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import SectionTitle from '~/components/general/SectionTitle'
import BaseInput from '~/components/base/BaseInput'
import BaseButton from '~/components/base/BaseButton'

export default {
  name: 'SecondRegistrationStage',

  components: {
    SectionTitle,
    BaseInput,
    BaseButton,
    ValidationObserver,
    ValidationProvider,
  },

  props: {
    password: {
      type: String,
      default: '',
    },

    repeatPassword: {
      type: String,
      default: '',
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    passwordData: {
      get() {
        return this.password
      },
      set(value) {
        this.$emit('update:password', value)
      },
    },

    repeatPasswordData: {
      get() {
        return this.repeatPassword
      },
      set(value) {
        this.$emit('update:repeat-password', value)
      },
    },
  },

  methods: {
    async setNextStage() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }

      this.$emit('set-next-stage')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/auth/registration/second-registration-stage';
</style>
