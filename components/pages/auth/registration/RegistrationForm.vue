<template>
  <div class="registration-form">
    <div ref="container" class="registration-form__container">
      <div class="registration-progress">
        <div class="registration-progress__title">
          {{
            $t('AUTH.REGISTRATION_PROGRESS', {
              current: currentStage,
              total: totalStages,
            })
          }}
        </div>

        <BaseProgress
          :value="registrationProgress"
          class="registration-progress__line"
        />
      </div>

      <transition
        :name="
          prevStage === currentStage - 1 ? 'steps-fade' : 'steps-fade-reverse'
        "
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <!--          :phone.sync="phone"-->
        <!--        @requestPhone="getRequestPhone"-->
        <FirstRegistrationStage
          v-if="currentStage === 1"
          :name.sync="name"
          :email.sync="email"
          :telegram.sync="telegram"
          :accept-policies.sync="acceptPolicies"
          :accept-subscription.sync="acceptSubscription"
          class="registration-form__stage"
          @set-next-stage="changeStage(2)"
        />

        <SecondRegistrationStage
          v-else-if="currentStage === 2"
          :password.sync="password"
          :repeat-password.sync="repeatPassword"
          :loading="loadingRegistration"
          class="registration-form__stage"
          @set-next-stage="register"
        />

        <ThirdRegistrationStage
          v-else-if="currentStage === 3"
          :email="email"
          class="registration-form__stage"
          @set-next-stage="finishRegistration"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import FirstRegistrationStage from '~/components/pages/auth/registration/FirstRegistrationStage'
import SecondRegistrationStage from '~/components/pages/auth/registration/SecondRegistrationStage'
import ThirdRegistrationStage from '~/components/pages/auth/registration/ThirdRegistrationStage'
import BaseProgress from '~/components/base/BaseProgress'

export default {
  name: 'RegistrationForm',

  components: {
    FirstRegistrationStage,
    SecondRegistrationStage,
    ThirdRegistrationStage,
    BaseProgress,
  },

  data() {
    return {
      prevStage: 0,
      currentStage: 1,
      totalStages: 3,

      name: '',
      email: '',
      // phone: '',
      // requestPhone: '',
      telegram: '',
      acceptPolicies: false,
      acceptSubscription: false,

      password: '',
      repeatPassword: '',

      prevHeight: '',

      loadingRegistration: false,
    }
  },

  computed: {
    registrationProgress() {
      return (100 / this.totalStages) * this.currentStage
    },

    linkToLogin() {
      return this.localePath({ name: 'auth-login' })
    },

    referrer() {
      return this.$route.query.referral
    },
  },

  watch: {
    currentStage(next, prev) {
      this.prevStage = prev
    },
  },

  methods: {
    async register() {
      const data = {
        firstName: this.name,
        lastName: this.name,
        email: this.email,
        // phone: this.requestPhone,
        telegram: this.telegram,
        password: this.password,
        confirmPassword: this.repeatPassword,
        receiveNotifications: this.acceptSubscription,
        referrer: this.referrer,
      }

      this.loadingRegistration = true

      try {
        await this.$api.registration.register(data)

        this.changeStage(3)

        const toastText = this.$t('AUTH.REGISTRATION_SUCCESS_TOAST')
        this.$toast.success(toastText.toString())
      } catch (e) {
        const responseData = e.response.data
        this.handleRegistrationError(responseData)
      } finally {
        this.loadingRegistration = false
      }
    },

    handleRegistrationError(data) {
      const validationErrors = data.validationErrors
      if (!validationErrors) {
        return
      }

      if (Object.keys(validationErrors).length === 0) {
        return
      }

      for (const key of Object.keys(validationErrors)) {
        if (key !== 'password' && key !== 'confirmPassword') {
          this.backToFirstStage()
          break
        }
      }
    },

    backToFirstStage() {
      this.changeStage(1)
      this.password = ''
      this.repeatPassword = ''
    },

    async finishRegistration() {
      await this.$router.push(this.linkToLogin)
    },

    changeStage(stage) {
      document.activeElement.blur()

      // wait keyboard closing
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })

        this.currentStage = stage
      }, 40)
    },

    beforeEnter() {
      this.prevHeight = this.$refs.container.clientHeight
    },

    enter() {
      const height = this.$refs.container.clientHeight
      this.$refs.container.style.height = `${this.prevHeight}px`

      setTimeout(() => (this.$refs.container.style.height = `${height}px`), 2)
    },

    afterEnter() {
      this.$refs.container.style.height = null
    },

    // getRequestPhone(phone) {
    //   this.requestPhone = phone
    // },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/auth/registration/registration-form';
</style>
