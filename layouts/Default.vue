<template>
  <div class="default-layout">
    <slot>
      <Nuxt />
    </slot>

    <client-only>
      <ModalsManager class="default-layout__modals-manager" />
    </client-only>

    <IconsManager class="default-layout__icons-manager" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ModalsManager from '~/components/general/ModalsManager'
import IconsManager from '~/components/general/IconsManager'

export default {
  name: 'DefaultLayout',

  components: {
    ModalsManager,
    IconsManager,
  },

  data() {
    return {
      loginReminderTimeout: null,
    }
  },

  computed: {
    ...mapGetters('auth', ['IS_PAGE_PUBLIC']),
    ...mapGetters('modal', ['OPENED_MODALS']),

    user() {
      return this.$auth.user
    },

    linkToLogin() {
      return this.localePath({
        name: 'auth-login',
      })
    },
  },

  watch: {
    async user(value) {
      await this.processPrivatePage()
      this.processLoginReminderFromUser()

      if (!value) {
        // await this.disableWalletConnect()
      }
    },

    OPENED_MODALS(next) {
      const reminder = next.find((item) => item.component === 'LoginReminder')
      if (reminder) {
        return
      }

      // this.enableLoginReminder()
    },
  },

  mounted() {
    // this.enableLoginReminder()
    // this.enableWalletConnect()
  },

  beforeDestroy() {
    clearTimeout(this.loginReminderTimeout)
  },

  methods: {
    async processPrivatePage() {
      if (!this.$auth.loggedIn && this.IS_PAGE_PUBLIC !== true) {
        await this.$router.push(this.linkToLogin)
      }
    },

    processLoginReminderFromUser() {
      if (this.$auth.loggedIn) {
        clearTimeout(this.loginReminderTimeout)
        this.loginReminderTimeout = null
        return
      }

      // this.enableLoginReminder()
    },

    enableLoginReminder() {
      if (this.$auth.loggedIn) {
        return
      }

      if (this.loginReminderTimeout !== null) {
        return
      }

      this.loginReminderTimeout = setTimeout(
        () => this.handleLoginRemind(),
        180 * 1000
      )
    },

    handleLoginRemind() {
      this.loginReminderTimeout = null

      const isAuthRoute = this.$route.name.includes('auth')
      if (isAuthRoute) {
        // this.enableLoginReminder()
        return
      }

      const reminder = this.OPENED_MODALS.find(
        (item) => item.component === 'LoginReminder'
      )
      if (reminder) {
        return
      }

      this.$modal.open({
        component: 'LoginReminder',
      })
    },

    enableWalletConnect() {
      this.$nextTick(async () => {
        // if (this.$walletconnect.isConnected)

        await this.$walletconnect.mount()
      })
    },

    async disableWalletConnect() {
      await this.$walletconnect.disconnect()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/layouts/default';
</style>
