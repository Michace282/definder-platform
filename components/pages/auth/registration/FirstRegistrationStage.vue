<template>
  <div class="first-stage">
    <SectionTitle header-tag="h3" class="first-stage__title">
      {{ $t('AUTH.REGISTRATION_TITLE') }}
    </SectionTitle>

    <ValidationObserver
      ref="observer"
      class="first-stage__content"
      tag="form"
      @submit.prevent="setNextStage"
    >
      <ValidationProvider
        v-slot="{ errors }"
        class="first-stage__input"
        tag="div"
        rules="required|min:3"
        :name="$t('AUTH.FIRST_NAME').toLowerCase()"
      >
        <BaseInput
          v-model.trim="nameData"
          :disabled="loading"
          :label="$t('AUTH.FIRST_NAME')"
          class="first-stage__input-component"
          :error="errors[0]"
        />
      </ValidationProvider>

      <ValidationProvider
        v-slot="{ errors }"
        class="first-stage__input"
        tag="div"
        rules="required|email"
        :name="$t('AUTH.EMAIL').toLowerCase()"
      >
        <BaseInput
          v-model.trim="emailData"
          :disabled="loading"
          :label="$t('AUTH.EMAIL')"
          class="first-stage__input-component"
          :error="errors[0]"
        />
      </ValidationProvider>

      <!--      <ValidationProvider-->
      <!--        v-slot="{ errors }"-->
      <!--        class="first-stage__input"-->
      <!--        tag="div"-->
      <!--        vid="phone"-->
      <!--        rules="required|telephone"-->
      <!--        :name="$t('AUTH.PHONE').toLowerCase()"-->
      <!--      >-->
      <!--        <BaseTelInput-->
      <!--          v-model.trim="phoneData"-->
      <!--          :disabled="loading"-->
      <!--          :label="$t('AUTH.PHONE')"-->
      <!--          class="first-stage__input-component"-->
      <!--          :error="errors[0]"-->
      <!--          @inputObject="onPhoneChange"-->
      <!--        />-->
      <!--      </ValidationProvider>-->

      <ValidationProvider
        v-slot="{ errors }"
        class="first-stage__input"
        tag="div"
        rules="telegram||min:3"
        :name="$t('AUTH.TELEGRAM').toLowerCase()"
      >
        <BaseInput
          v-model.trim="telegramData"
          :disabled="loading"
          :label="$t('AUTH.TELEGRAM')"
          class="first-stage__input-component"
          :error="errors[0]"
        />
      </ValidationProvider>

      <ValidationProvider
        v-slot="{ errors }"
        class="first-stage__input"
        tag="div"
        :rules="{ required: { allowFalse: false } }"
        :name="
          $t('AUTH.REGISTRATION_POLICIES_TERMS_AND_CONDITIONS').toLowerCase()
        "
      >
        <BaseCheckbox
          v-model="acceptPoliciesData"
          :disabled="loading"
          class="first-stage__policies"
          :error="errors[0]"
        >
          {{ $t('AUTH.REGISTRATION_POLICIES_START') }}

          <span @click.stop>
            <BaseLink :to="goToTerms" target="_blank">
              {{ $t('AUTH.REGISTRATION_POLICIES_TERMS_AND_CONDITIONS') }}
            </BaseLink>
          </span>

          {{ $t('AUTH.REGISTRATION_POLICIES_DELIMITER') }}

          <span @click.stop>
            <BaseLink :to="goToPrivacy" target="_blank">
              {{ $t('AUTH.REGISTRATION_POLICIES_PRIVACY_POLICY') }}
            </BaseLink>
          </span>
        </BaseCheckbox>
      </ValidationProvider>

      <BaseCheckbox
        v-model="acceptSubscriptionData"
        :disabled="loading"
        class="first-stage__subscription"
      >
        {{ $t('AUTH.REGISTRATION_SUBSCRIPTION_INFO') }}
      </BaseCheckbox>

      <div class="first-stage__get-started">
        <BaseButton
          :loading="loading"
          class="get-started-btn"
          component="button"
          form-type="submit"
          type="filled"
          color="blue"
          size="lg"
        >
          <div class="get-started-btn__text">
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
import BaseCheckbox from '~/components/base/BaseCheckbox'
import BaseLink from '~/components/base/BaseLink'
// import BaseTelInput from '~/components/base/BaseTelInput'

export default {
  name: 'FirstRegistrationStage',

  components: {
    SectionTitle,
    BaseInput,
    BaseButton,
    BaseCheckbox,
    BaseLink,
    ValidationObserver,
    ValidationProvider,
    // BaseTelInput,
  },

  props: {
    name: {
      type: String,
      default: '',
    },

    email: {
      type: String,
      default: '',
    },

    telegram: {
      type: String,
      default: '',
    },

    // phone: {
    //   type: String,
    //   default: '',
    // },

    acceptPolicies: {
      type: Boolean,
      default: false,
    },

    acceptSubscription: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isPhoneValid: undefined,
    }
  },

  computed: {
    nameData: {
      get() {
        return this.name
      },
      set(value) {
        this.$emit('update:name', value)
      },
    },

    emailData: {
      get() {
        return this.email
      },
      set(value) {
        this.$emit('update:email', value)
      },
    },

    telegramData: {
      get() {
        return this.telegram
      },
      set(value) {
        this.$emit('update:telegram', value)
      },
    },

    // phoneData: {
    //   get() {
    //     return this.phone
    //   },
    //   set(value) {
    //     this.$emit('update:phone', value)
    //   },
    // },

    acceptPoliciesData: {
      get() {
        return this.acceptPolicies
      },
      set(value) {
        this.$emit('update:acceptPolicies', value)
      },
    },

    acceptSubscriptionData: {
      get() {
        return this.acceptSubscription
      },
      set(value) {
        this.$emit('update:acceptSubscription', value)
      },
    },

    goToTerms() {
      return '/docs/definder_terms_with_the_project_owners.pdf'
    },

    goToPrivacy() {
      return '/docs/privacy_policy.pdf'
    },
  },

  methods: {
    async setNextStage() {
      const isValid = await this.$refs.observer.validate()

      // let isPhoneValid = true
      // if (this.isPhoneValid !== true) {
      //   isPhoneValid = false
      //
      //   await this.$refs.observer.setErrors({
      //     ...this.$refs.observer.errors,
      //     phone: [this.$t('VALIDATION.INVALID_PHONE')],
      //   })
      // }
      //
      // if (!isValid || !isPhoneValid) {
      //   return
      // }

      if (!isValid) {
        return
      }

      this.$emit('set-next-stage')
    },

    // onPhoneChange(phoneObject) {
    //   this.isPhoneValid = phoneObject.valid
    //   this.$emit('requestPhone', phoneObject.number)
    // },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/auth/registration/first-registration-stage';
</style>
