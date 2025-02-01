<template>
  <div :class="{ 'account-info_disabled': disabled }" class="account-info">
    <div class="account-info__container">
      <SectionTitle header-tag="h4" class="account-info__title">
        {{ $t('PROFILE.TAB_PERSONAL_INFO_ACCOUNT_INFO') }}
      </SectionTitle>

      <div class="account-info__content">
        <div class="account-info__inputs">
          <ValidationProvider
            v-slot="{ errors }"
            class="account-info__first-name"
            tag="div"
            rules="required|min:3"
            :name="$t('PROFILE.TAB_PERSONAL_INFO_FIRST_NAME').toLowerCase()"
          >
            <BaseInput
              v-model="firstNameData"
              :label="$t('PROFILE.TAB_PERSONAL_INFO_FIRST_NAME')"
              :disabled="disabled"
              class="account-info__first-name-component"
              :error="errors[0]"
            />
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            class="account-info__last-name"
            tag="div"
            rules="min:3"
            :name="$t('PROFILE.TAB_PERSONAL_INFO_LAST_NAME').toLowerCase()"
          >
            <BaseInput
              v-model="lastNameData"
              :label="$t('PROFILE.TAB_PERSONAL_INFO_LAST_NAME')"
              :disabled="disabled"
              class="account-info__first-last-component"
              :error="errors[0]"
            />
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            class="account-info__email"
            tag="div"
            rules="required|email"
            :name="$t('PROFILE.TAB_PERSONAL_INFO_EMAIL').toLowerCase()"
          >
            <BaseInput
              v-model="emailData"
              :label="$t('PROFILE.TAB_PERSONAL_INFO_EMAIL')"
              disabled
              class="account-info__email-component"
              :error="errors[0]"
            />
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            class="account-info__phone"
            tag="div"
            vid="phone"
            rules="telephone"
            :name="$t('PROFILE.TAB_PERSONAL_INFO_PHONE').toLowerCase()"
          >
            <BaseTelInput
              v-model.trim="phoneData"
              :label="$t('PROFILE.TAB_PERSONAL_INFO_PHONE')"
              :disabled="disabled"
              class="ccount-info__phone-component"
              :error="errors[0]"
              @inputObject="onPhoneChange"
            />
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            class="account-info__telegram"
            tag="div"
            rules="telegram"
            :name="$t('PROFILE.TAB_PERSONAL_INFO_TELEGRAM').toLowerCase()"
          >
            <BaseInput
              v-model="telegramData"
              :label="$t('PROFILE.TAB_PERSONAL_INFO_TELEGRAM')"
              :disabled="disabled"
              class="account-info__telegram-component"
              :error="errors[0]"
            />
          </ValidationProvider>
        </div>

        <ValidationProvider
          v-slot="{ errors }"
          class="account-avatar account-info__avatar"
          tag="div"
          rules=""
          :name="$t('PROFILE.PHOTO')"
        >
          <BaseFileInput
            v-model="avatarFileData"
            accept="image/*"
            class="account-avatar__container"
            :class="{ error: errors[0] }"
            :error="errors[0]"
            @input="loadAvatar"
          >
            <div class="account-avatar__content">
              <div class="account-avatar__picture">
                <div v-if="avatarPreviewSource" class="account-avatar__preview">
                  <img :src="avatarPreviewSource" alt="avatar" />
                </div>

                <svg v-else class="account-avatar__picture-icon">
                  <use href="#icon-user" />
                </svg>
              </div>

              <div class="account-avatar__controls">
                <template v-if="!avatarPreviewSource">
                  <div class="account-avatar__upload account-avatar__btn">
                    <BaseHoverText class="account-avatar__upload-btn">
                      {{ $t('PROFILE.TAB_PERSONAL_INFO_UPLOAD_PHOTO') }}

                      <template #left-icon>
                        <svg class="account-avatar__btn-icon">
                          <use href="#icon-upload" />
                        </svg>
                      </template>
                    </BaseHoverText>
                  </div>
                </template>

                <template v-else>
                  <div class="account-avatar__change account-avatar__btn">
                    <BaseHoverText class="account-avatar__change-btn">
                      {{ $t('PROFILE.TAB_PERSONAL_INFO_CHANGE_PHOTO') }}

                      <template #left-icon>
                        <svg class="account-avatar__btn-icon">
                          <use href="#icon-upload" />
                        </svg>
                      </template>
                    </BaseHoverText>
                  </div>

                  <div class="account-avatar__upload account-avatar__btn">
                    <BaseHoverText
                      color="danger"
                      class="account-avatar__upload-btn"
                      @click="deleteAvatar"
                    >
                      {{ $t('PROFILE.TAB_PERSONAL_INFO_DELETE_PHOTO') }}

                      <template #left-icon>
                        <svg class="account-avatar__btn-icon">
                          <use href="#icon-trash" />
                        </svg>
                      </template>
                    </BaseHoverText>
                  </div>
                </template>
              </div>
            </div>
          </BaseFileInput>
        </ValidationProvider>

        <div class="account-controls account-info__controls">
          <div class="account-controls__container">
            <BaseHoverText
              class="account-controls__item account-controls__item_change-password"
              @click="openPasswordChangingModal"
            >
              {{ $t('PROFILE.TAB_PERSONAL_INFO_CHANGE_PASSWORD') }}

              <template #left-icon>
                <svg class="account-avatar__btn-icon">
                  <use href="#icon-password" />
                </svg>
              </template>
            </BaseHoverText>

            <BaseSwitch
              v-model="receiveNotificationsData"
              :disabled="disabled"
              class="account-controls__item account-controls__item_notifications"
            >
              {{ $t('PROFILE.TAB_PERSONAL_INFO_RECEIVE_NOTIFICATIONS') }}
            </BaseSwitch>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import SectionTitle from '~/components/general/SectionTitle'
import BaseInput from '~/components/base/BaseInput'
import BaseFileInput from '~/components/base/BaseFileInput'
import BaseHoverText from '~/components/base/BaseHoverText'
import BaseSwitch from '~/components/base/BaseSwitch'
import BaseTelInput from '~/components/base/BaseTelInput'

export default {
  name: 'AccountInfo',

  components: {
    SectionTitle,
    BaseInput,
    BaseFileInput,
    BaseHoverText,
    BaseSwitch,
    ValidationProvider,
    BaseTelInput,
  },

  props: {
    firstName: {
      type: String,
      default: '',
    },

    lastName: {
      type: String,
      default: '',
    },

    email: {
      type: String,
      default: '',
    },

    phone: {
      type: String,
      default: '',
    },

    telegram: {
      type: String,
      default: '',
    },

    avatar: {
      type: String,
      default: null,
    },

    avatarFile: {
      default: null,
    },

    receiveNotifications: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {}
  },

  computed: {
    firstNameData: {
      get() {
        return this.firstName
      },
      set(value) {
        this.$emit('update:first-name', value)
      },
    },

    lastNameData: {
      get() {
        return this.lastName
      },
      set(value) {
        this.$emit('update:last-name', value)
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

    phoneData: {
      get() {
        return this.phone || ''
      },
      set(value) {
        this.$emit('update:phone', value)
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

    receiveNotificationsData: {
      get() {
        return this.receiveNotifications
      },
      set(value) {
        this.$emit('update:receive-notifications', value)
      },
    },

    avatarData: {
      get() {
        return this.avatar
      },
      set(value) {
        this.$emit('update:avatar', value)
      },
    },

    avatarFileData: {
      get() {
        return this.avatarFile
      },
      set(value) {
        this.$emit('update:avatar-file', value)
      },
    },

    avatarPreviewSource() {
      if (!this.avatarData && !this.avatarFileData) {
        return null
      }

      return this.avatarFileData
        ? URL.createObjectURL(this.avatarFileData)
        : this.avatarData
    },
  },

  methods: {
    loadAvatar() {
      this.avatarData = null
    },

    deleteAvatar(event) {
      event.preventDefault()
      event.stopPropagation()

      this.avatarData = null
      this.avatarFileData = null
    },

    openPasswordChangingModal() {
      this.$modal.open({
        component: 'ChangePassword',
      })
    },

    onPhoneChange(phoneObject) {
      if (phoneObject.valid === undefined) {
        return
      }

      this.$emit('isPhoneValid', phoneObject.valid)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/profile/info/account-info';
</style>
