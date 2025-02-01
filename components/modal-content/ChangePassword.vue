<template>
  <div class="change-password">
    <ValidationObserver
      ref="observer"
      class="change-password__container"
      tag="form"
      @submit.prevent="openChangeConfirmation"
    >
      <SectionTitle header-tag="h3" class="change-password__title">
        {{ $t('PROFILE.CHANGE_PASSWORD_TITLE') }}
      </SectionTitle>

      <ValidationProvider
        v-slot="{ errors }"
        class="change-password__input"
        tag="div"
        rules="required"
        :name="$t('PROFILE.CHANGE_PASSWORD_OLD_PASSWORD').toLowerCase()"
      >
        <BaseInput
          v-model="oldPassword"
          :label="$t('PROFILE.CHANGE_PASSWORD_OLD_PASSWORD')"
          type="password"
          class="change-password__input-component"
          :error="errors[0]"
        />
      </ValidationProvider>

      <ValidationProvider
        v-slot="{ errors }"
        class="change-password__input"
        tag="div"
        vid="password"
        rules="required|password|min:8|max:20"
        :name="$t('PROFILE.CHANGE_PASSWORD_NEW_PASSWORD').toLowerCase()"
      >
        <BaseInput
          v-model="newPassword"
          :label="$t('PROFILE.CHANGE_PASSWORD_NEW_PASSWORD')"
          type="password"
          class="change-password__input-component"
          :error="errors[0]"
        />
      </ValidationProvider>

      <ValidationProvider
        v-slot="{ errors }"
        class="change-password__input"
        tag="div"
        rules="required|confirmed:password|password|min:8|max:20"
        :name="$t('PROFILE.CHANGE_PASSWORD_REPEAT_NEW_PASSWORD').toLowerCase()"
      >
        <BaseInput
          v-model="repeatNewPassword"
          :label="$t('PROFILE.CHANGE_PASSWORD_REPEAT_NEW_PASSWORD')"
          type="password"
          class="change-password__input-component"
          :error="errors[0]"
        />
      </ValidationProvider>

      <div class="change-password__save">
        <BaseButton
          type="filled"
          component="button"
          form-type="submit"
          color="blue"
          size="lg"
          class="change-password__save-btn"
        >
          {{ $t('PROFILE.CHANGE_PASSWORD_SAVE') }}
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
  name: 'ChangePassword',

  components: {
    SectionTitle,
    BaseInput,
    BaseButton,
    ValidationObserver,
    ValidationProvider,
  },

  props: {
    modalId: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: '',

      loading: false,
    }
  },

  methods: {
    async openChangeConfirmation() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }

      const title = this.$t(
        'PROFILE.TAB_PERSONAL_INFO_CHANGE_PASSWORD_CONFIRM_TITLE'
      )
      const text = this.$t(
        'PROFILE.TAB_PERSONAL_INFO_CHANGE_PASSWORD_CONFIRM_TEXT'
      )
      const confirmText = this.$t(
        'PROFILE.TAB_PERSONAL_INFO_CHANGE_PASSWORD_CONFIRM_BUTTON'
      )

      this.$modal.open({
        component: 'ConfirmAction',
        options: {
          title,
          text,
          confirmText,
          confirmCallback: () => this.changePassword(),
        },
      })
    },

    async changePassword() {
      this.loading = true

      const data = {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        repeatNewPassword: this.repeatNewPassword,
      }

      try {
        await this.$api.profile.changePassword(data)

        const info = this.$t(
          'PROFILE.TAB_PERSONAL_INFO_CHANGE_PASSWORD_SUCCESS'
        )
        this.$toast.success(info.toString())

        this.close()
      } catch {
      } finally {
        this.loading = false
      }
    },

    close() {
      this.$modal.close(this.modalId)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/modal-content/change-password';
</style>
