<template>
  <div class="profile-info">
    <ValidationObserver
      ref="observer"
      class="profile-info__container"
      tag="form"
      @submit.prevent="confirmSaveAccount"
    >
      <AccountInfo
        :first-name.sync="firstName"
        :last-name.sync="lastName"
        :email.sync="email"
        :phone.sync="phone"
        :telegram.sync="telegram"
        :receive-notifications.sync="receiveNotifications"
        :avatar.sync="avatar"
        :avatar-file.sync="avatarFile"
        :disabled="isLoading"
        class="profile-info__account"
        @isPhoneValid="getPhoneValidity"
      />

      <div class="profile-info__divider" />

      <ReferralsInfo
        :link="referralLink"
        :referrals="referrals"
        class="profile-info__referrals"
      />

      <div class="profile-info__divider" />

      <WalletsInfo
        :metamask-wallet.sync="metamaskWallet"
        :trust-wallet.sync="trustWallet"
        :coin-wallets="coinWallets"
        :currencies="currencies"
        :disabled="isLoading"
        :disable-animations="disableAnimations"
        class="profile-info__wallets"
        @add-coin-wallet="addCoinWallet"
        @update-coin-wallet="updateCoinWallet"
        @delete-coin-wallet="deleteCoinWallet"
      />

      <div class="profile-info__save">
        <BaseButton
          :loading="isLoading"
          component="button"
          form-type="submit"
          type="filled"
          color="blue"
          class="profile-info__save-btn"
        >
          {{ $t('PROFILE.TAB_PERSONAL_INFO_SAVE_CHANGES') }}
        </BaseButton>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import AccountInfo from '~/components/pages/profile/info/AccountInfo'
import ReferralsInfo from '~/components/pages/profile/info/ReferralsInfo'
import WalletsInfo from '~/components/pages/profile/info/WalletsInfo'
import BaseButton from '~/components/base/BaseButton'

export default {
  name: 'ProfileInfoPage',

  components: {
    AccountInfo,
    ReferralsInfo,
    WalletsInfo,
    BaseButton,
    ValidationObserver,
  },

  async asyncData({ $auth, $api }) {
    let currencies = []
    try {
      currencies = await $api.wallets.getCurrencies()
    } catch (e) {
      console.error(e)
    }

    let coinWallets = []
    if ($auth.user.coinWallets) {
      coinWallets = $auth.user.coinWallets.map((item) => {
        return { ...item, isUpdate: false, isDelete: false, oldId: item.id }
      })
    }

    return {
      currencies,

      firstName: $auth.user.firstName,
      lastName: $auth.user.lastName,
      email: $auth.user.email,
      phone: $auth.user.phone,
      telegram: $auth.user.telegram,
      receiveNotifications: $auth.user.receiveNotifications,
      avatar: $auth.user.avatar,

      metamaskWallet: $auth.user.metamaskWallet
        ? $auth.user.metamaskWallet.name
        : null,
      trustWallet: $auth.user.trustWallet ? $auth.user.trustWallet.name : null,
      coinWallets,

      referralLink: $auth.user.referralLink,
      referrals: $auth.user.referrals,
    }
  },

  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      telegram: null,
      receiveNotifications: false,
      avatar: null,
      avatarFile: null,

      metamaskWallet: null,
      trustWallet: null,
      coinWallets: [],

      currencies: [],

      referralLink: null,
      referrals: 0,

      isPhoneValid: undefined,

      isLoading: false,
      disableAnimations: false,
    }
  },

  computed: {
    user() {
      return this.$auth.user
    },
  },

  watch: {
    user() {
      this.metamaskWallet = this.user.metamaskWallet
        ? this.user.metamaskWallet.name
        : null

      this.trustWallet = this.user.trustWallet
        ? this.user.trustWallet.name
        : null
    },
  },

  created() {
    this.fillEmptyCoinWalletsList()
  },

  methods: {
    fillEmptyCoinWalletsList() {
      if (this.coinWallets.length !== 0) {
        return
      }

      this.addCoinWallet()
    },

    addCoinWallet(name = '', currency = '', { id, oldId } = {}) {
      const biggerId = this.coinWallets.reduce(
        (prev, item) => (item.id > prev ? item.id : prev),
        0
      )

      const newItem = {
        id: id ?? (biggerId || 0) + 1,
        name,
        currency,
        isUpdate: false,
        isDelete: false,
        oldId: oldId ?? null,
      }

      this.coinWallets.push(newItem)
    },

    updateCoinWallet(item, key, value) {
      const updatedItem = {
        ...item,
        isUpdate: item.oldId !== null,
        [key]: value,
      }

      const index = this.coinWallets.findIndex(
        (item) => item.id === updatedItem.id
      )

      if (index === -1) {
        return
      }

      this.$set(this.coinWallets, index, updatedItem)
    },

    deleteCoinWallet(item) {
      const deletedItem = {
        ...item,
        isUpdate: false,
        isDelete: item.oldId !== null && item.oldId !== undefined,
      }

      const index = this.coinWallets.findIndex(
        (item) => item.id === deletedItem.id
      )

      if (index === -1) {
        return
      }

      const activeItem = this.coinWallets.find(
        (item) => item.isDelete !== true && item.id !== deletedItem.id
      )
      if (!activeItem) {
        if (deletedItem.isDelete !== true) {
          deletedItem.currency = ''
          deletedItem.name = ''
          this.$set(this.coinWallets, index, deletedItem)
        } else {
          const id = deletedItem.id++
          this.$set(this.coinWallets, index, deletedItem)
          this.addCoinWallet('', '', { id })
        }

        return
      }

      if (item.oldId === null || item.oldId === undefined) {
        this.coinWallets.splice(index, 1)
        return
      }

      this.$set(this.coinWallets, index, deletedItem)
    },

    async confirmSaveAccount() {
      const isValid = await this.$refs.observer.validate()

      let isPhoneValid = true
      if (this.isPhoneValid === false) {
        isPhoneValid = false

        await this.$refs.observer.setErrors({
          ...this.$refs.observer.errors,
          phone: [this.$t('VALIDATION.INVALID_PHONE')],
        })
      }

      if (!isValid || !isPhoneValid) {
        return
      }

      const title = this.$t(
        'PROFILE.TAB_PERSONAL_INFO_SAVE_CHANGES_CONFIRM_TITLE'
      )
      const confirmText = this.$t(
        'PROFILE.TAB_PERSONAL_INFO_SAVE_CHANGES_CONFIRM_BUTTON'
      )

      this.$modal.open({
        component: 'ConfirmAction',
        options: {
          title,
          confirmText,
          confirmCallback: () => this.saveAccount(),
        },
      })
    },

    async saveAccount() {
      this.isLoading = true
      // this.disableAnimations = true

      const coinWallets = this.coinWallets
        .filter(
          (item) =>
            (item.isUpdate ||
              item.isDelete ||
              item.oldId === undefined ||
              item.oldId === null) &&
            item.name
        )
        .map((item) => ({
          name: item.name,
          isUpdate: item.isUpdate,
          isDelete: item.isDelete,
          oldId: item.oldId || undefined,
        }))

      const data = {
        id: this.$auth.user.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.isPhoneValid === undefined ? '' : this.phone,
        telegram: this.telegram,
        avatar: this.avatar ? undefined : this.avatarFile,
        receiveNotifications: this.receiveNotifications,
        metamaskWallet: this.metamaskWallet,
        coinWallets,
      }

      try {
        await this.$api.profile.updateAccountById(data)

        await this.$auth.fetchUser()

        this.updateWalletsFromUser()

        const infoText = this.$t(
          'PROFILE.TAB_PERSONAL_INFO_SAVE_CHANGES_SUCCESS'
        )
        this.$toast.success(infoText.toString())
      } catch (e) {
      } finally {
        this.isLoading = false
      }
    },

    getPhoneValidity(isPhoneValid) {
      this.isPhoneValid = isPhoneValid
    },

    updateWalletsFromUser() {
      const wallets = this.$auth.user.coinWallets
      const oldWallets = this.coinWallets
      this.coinWallets = []
      for (const wallet of wallets) {
        let id = null
        const oldId = wallet.id
        const index = oldWallets.findIndex((item) => {
          return (
            item.name === wallet.name &&
            item.currency === wallet.currency &&
            item.isDelete !== true
          )
        })

        if (oldWallets !== -1) {
          id = oldWallets[index].id
          oldWallets.splice(index, 1)
        }

        this.addCoinWallet(wallet.name, wallet.currency, { id, oldId })
      }

      this.fillEmptyCoinWalletsList()
    },
  },
}
</script>

<style scoped lang="scss">
@import '~assets/scss/pages/profile/info/index';
</style>
