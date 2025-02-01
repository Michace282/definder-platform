<template>
  <header :class="{ [`header_theme-${theme}`]: true }" class="header">
    <BaseModal
      v-if="invalidNetwork"
      :modal-id="1000"
      background="white"
      size="lg"
      :no-bottom-padding="false"
    >
      <!-- Контент модального окна -->
      <template #default style="color: black">
        <center>
          <img src="/images/sources/wrong_network.png" />
          <p class="modal_h">Wrong network!</p>

          <p style="color: black">
            Please make sure you have selected the correct network for your
            investment. The Binance Smart Chain (BSC) should be selected to
            proceed successfully
          </p>
        </center>
      </template>
    </BaseModal>
    <div class="header__content">
      <BaseLogo :color="logoColor" class="header__logo" />

      <!--
      <a class="header__pancake-link" target="_blank" :href="pancakeLink">
        <img src="/images/sources/pancakeswap.png" />
      </a>
      -->

      <div class="header__mobile-delimiter"></div>

      <div class="menu">
        <div class="menu__container">
          <NuxtLink :to="'/dao'" class="menu__item">
            <BaseHoverText :color="logoColor" @click="onLinkClick('/dao')">
              <span> DAO </span>
            </BaseHoverText>
          </NuxtLink>
          <NuxtLink :to="'/marketplace'" class="menu__item">
            <BaseHoverText
              :color="logoColor"
              @click="onLinkClick('/marketplace')"
            >
              <span> {{ 'Marketplace' }} </span>
            </BaseHoverText>
          </NuxtLink>

          <!--<NuxtLink :to="linkToStaking" class="menu__item">
            <BaseHoverText
              :color="logoColor"
              @click="onLinkClick(linkToStaking)"
            >
              <span> {{ $t('HEADER.STAKING') }} </span>
            </BaseHoverText> </NuxtLink
          >-->

          <a :href="linkToHowItWorks" target="_blank">
            <BaseHoverText
              :color="logoColor"
              @click="onLinkClick(linkToHowItWorks)"
            >
              <span> {{ $t('HEADER.HOW_IT_WORKS') }} </span>
            </BaseHoverText></a
          >

          <NuxtLink :to="linkToLendingPool" class="menu__item">
            <BaseHoverText
              :color="logoColor"
              @click="onLinkClick('/lading-pool')"
            >
              <span> {{ 'Lending Pool' }} </span>
            </BaseHoverText>
          </NuxtLink>
        </div>
      </div>

      <div class="controls">
        <!--
        <div class="header__exchange">
          <a class="header__exchange-link" target="_blank" :href="pancakeLink">
            {{ $t('HEADER.BUY_DNT') }}
            <div class="header__exchange-link-img">
              <img src="/images/sources/pancakeswap.png" />
            </div>
          </a>

          <div class="header__exchange-text">
            {{ exchangeRate }}
          </div>
        </div>
        -->

        <div class="controls__walletconnect">
          <!--<BaseDropdown
            :opened.sync="isWalletConnectDropdownOpened"
            class="walletconnect"
            right
            no-arrow
            >-->
          <div class="walletconnect__main-btn">
            <MetaMaskLink v-if="isIphone && !isMetaMaskBrowser" />
            <a
              v-if="
                (isIphone && isMetaMaskBrowser && !$auth.loggedIn) ||
                (!isIphone && !$auth.loggedIn)
              "
              :href="linkToLogin"
            >
              <img
                src="/images/sources/metamask.png"
                alt="MetaMask"
                class="metamask_logo"
              />
            </a>
            <a
              v-if="!isIphone && !isMetaMaskBrowser && $auth.loggedIn"
              href="https://metamask.io/download/"
            >
              <img
                src="/images/sources/metamask.png"
                alt="MetaMask"
                class="metamask_logo"
            /></a>
            <a
              v-if="
                (isIphone && isMetaMaskBrowser && $auth.loggedIn) ||
                (!isIphone && isMetaMaskBrowser && $auth.loggedIn)
              "
              @click="getAccount"
            >
              <img
                src="/images/sources/metamask.png"
                alt="MetaMask"
                class="metamask_logo"
            /></a>
          </div>

          <!--
            <template #options>
              <div class="walletconnect__options">
                123 {{ isIphone }} {{ isMetaMaskBrowser }}
                <div v-if="isIphone && !isMetaMaskBrowser">
                  ddd
                  <MetaMaskLink />
                </div>

                <BaseButton
                  v-if="isMetaMaskBrowser && !isMetamaskConnected"
                  class="walletconnect__btn"
                  color="blue"
                  @click="connectWalletConnect"
                >
                  {{ $t('HEADER.CONNECT') }}
                </BaseButton>
                <div v-if="isMetamaskConnected">
                  {{ activeAccount }}
                </div>
              </div>
            </template>
          </BaseDropdown>
          -->
        </div>

        <!--        <div class="controls__metamask">-->
        <!--          <BaseDropdown-->
        <!--            :opened.sync="isMetamaskDropdownOpened"-->
        <!--            class="metamask"-->
        <!--            right-->
        <!--            no-arrow-->
        <!--            :no-options="isMetamaskConnected"-->
        <!--          >-->
        <!--            <div class="metamask__main-btn">-->
        <!--              <img src="/images/sources/metamask.png" />-->

        <!--              <div v-if="isMetamaskConnected" class="metamask__connected">-->
        <!--                <svg><use href="#icon-check" /></svg>-->
        <!--              </div>-->
        <!--            </div>-->

        <!--            <template #options>-->
        <!--              <div class="metamask__options">-->
        <!--                <div v-if="isMetamaskInstalled">-->
        <!--                  &lt;!&ndash;                  <span class="metamask__info-text">&ndash;&gt;-->
        <!--                  &lt;!&ndash;                    Connect MetaMask wallet&ndash;&gt;-->
        <!--                  &lt;!&ndash;                  </span>&ndash;&gt;-->

        <!--                  <BaseButton-->
        <!--                    class="metamask__btn"-->
        <!--                    color="blue"-->
        <!--                    @click="getAccount"-->
        <!--                  >-->
        <!--                    {{ $t('HEADER.CONNECT') }}-->
        <!--                  </BaseButton>-->
        <!--                </div>-->

        <!--                &lt;!&ndash;                <div v-else-if="isMetamaskValidated">&ndash;&gt;-->
        <!--                &lt;!&ndash;                  <span class="metamask__info-text">&ndash;&gt;-->
        <!--                &lt;!&ndash;                    MetaMask successfully added to your wallets&ndash;&gt;-->
        <!--                &lt;!&ndash;                  </span>&ndash;&gt;-->

        <!--                &lt;!&ndash;                  <BaseButton&ndash;&gt;-->
        <!--                &lt;!&ndash;                    class="metamask__btn"&ndash;&gt;-->
        <!--                &lt;!&ndash;                    color="blue"&ndash;&gt;-->
        <!--                &lt;!&ndash;                    :to="linkToPersonalInfo"&ndash;&gt;-->
        <!--                &lt;!&ndash;                  >&ndash;&gt;-->
        <!--                &lt;!&ndash;                    Check in profile&ndash;&gt;-->
        <!--                &lt;!&ndash;                  </BaseButton>&ndash;&gt;-->
        <!--                &lt;!&ndash;                </div>&ndash;&gt;-->

        <!--                <a v-else target="_blank" href="https://metamask.io/download/">-->
        <!--                  &lt;!&ndash;                  <span class="metamask__info-text">&ndash;&gt;-->
        <!--                  &lt;!&ndash;                    Install MetaMask plugin on your device&ndash;&gt;-->
        <!--                  &lt;!&ndash;                  </span>&ndash;&gt;-->

        <!--                  <BaseButton class="metamask__btn" color="blue">-->
        <!--                    {{ $t('HEADER.INSTALL_METAMASK') }}-->
        <!--                  </BaseButton>-->
        <!--                </a>-->
        <!--              </div>-->
        <!--            </template>-->
        <!--          </BaseDropdown>-->
        <!--        </div>-->

        <!--
        <a
          class="metamask__main-btn metamask__main-btn_mobile"
          target="_blank"
          href="https://metamask.app.link/dapp"
        >
          <img src="/images/sources/metamask.png" />
        </a>
        -->
        <div v-if="$auth.loggedIn" class="auth">
          <BaseDropdown
            :opened.sync="isProfileDropdownOpened"
            class="user-menu"
            right
            mini
          >
            <span class="user-menu__label">
              <svg class="lang-switcher__label-icon">
                <use href="#icon-user" />
              </svg>
              <!--              <span class="user-menu__label-main-text"> {{ userName }} </span>-->
            </span>

            <template #options>
              <div class="user-menu__options">
                <div class="user-menu__label-user">
                  <svg class="user-menu__label-user-icon">
                    <use href="#icon-user" />
                  </svg>
                  <div class="user-menu__label-user-text">
                    {{ userName }}
                  </div>
                </div>

                <!--                <div class="user-menu__fund-btn" @click="closeProfileDropdown">-->
                <!--                  <FundProjectBtn :color="fundBtnColor" />-->
                <!--                </div>-->
                <div class="user-menu__item" @click="closeProfileDropdown">
                  <NuxtLink
                    :to="linkToPersonalInfo"
                    class="user-menu__item-content"
                  >
                    <span class="user-menu__label">
                      <svg class="user-menu__label-icon">
                        <use href="#icon-profile" />
                      </svg>

                      <span class="user-menu__label-text">
                        {{ $t('HEADER.PERSONAL_INFO') }}
                      </span>
                    </span>
                  </NuxtLink>
                </div>
                <div class="user-menu__item" @click="closeProfileDropdown">
                  <NuxtLink :to="linkToVoting" class="user-menu__item-content">
                    <span class="user-menu__label">
                      <svg class="user-menu__label-icon">
                        <use href="#icon-profile" />
                      </svg>

                      <span class="user-menu__label-text">
                        {{ $t('HEADER.VOTING') }}
                      </span>
                    </span>
                  </NuxtLink>
                </div>
                <div
                  v-if="isProjectOwner"
                  class="user-menu__item"
                  @click="closeProfileDropdown"
                >
                  <NuxtLink
                    :to="'/project-owner/dashboard'"
                    class="user-menu__item-content"
                  >
                    <span class="user-menu__label">
                      <svg class="user-menu__label-icon">
                        <use href="#icon-profile" />
                      </svg>

                      <span class="user-menu__label-text">
                        Payments & withdrawal
                      </span>
                    </span>
                  </NuxtLink>
                </div>

                <div class="user-menu__item" @click="closeProfileDropdown">
                  <NuxtLink
                    :to="linkToMarketplace"
                    class="user-menu__item-content"
                  >
                    <span class="user-menu__label">
                      <svg class="user-menu__label-icon">
                        <use href="#icon-profile" />
                      </svg>

                      <span class="user-menu__label-text">
                        {{ $t('HEADER.INVESTING') }}
                      </span>
                    </span>
                  </NuxtLink>
                </div>
                <div class="user-menu__item" @click="logout">
                  <span class="user-menu__label">
                    <svg class="user-menu__label-icon">
                      <use href="#icon-logout" />
                    </svg>

                    <span class="user-menu__label-text">
                      {{ $t('GENERAL.LOGOUT') }}
                    </span>
                  </span>
                </div>
              </div>
            </template>
          </BaseDropdown>
        </div>

        <div v-else class="auth">
          <BaseButton
            type="no-border"
            :color="loginBtnColor"
            class="auth__login"
            :to="linkToLogin"
          >
            {{ $t('GENERAL.LOGIN') }}
          </BaseButton>

          <!--          <BaseButton-->
          <!--            class="auth__registration"-->
          <!--            :color="registrationBtnColor"-->
          <!--            :to="linkToRegistration"-->
          <!--            :active="isOnRegistrationPage"-->
          <!--            :disabled="isOnRegistrationPage"-->
          <!--          >-->
          <!--            {{ $t('GENERAL.REGISTRATION') }}-->
          <!--          </BaseButton>-->
        </div>
        <!--lang siwtch-->
        <!--
        <div class="controls__lang">
          <BaseDropdown
            :options="$i18n.locales"
            :get-option-key="(item) => item.code"
            class="lang-switcher"
            mini
            links
          >
            <span class="lang-switcher__label">
              <svg class="lang-switcher__label-icon">
                <use href="#icon-globe" />
              </svg>

              <span class="lang-switcher__label-text">
                {{ $i18n.localeProperties.code }}
              </span>
            </span>

            <template #option="{ option }">
              <a
                :href="switchLocalePath(option.code)"
                class="lang-switcher__option"
              >
                <div class="lang-switcher__option-inner">
                  {{ option.text }}
                </div>
              </a>
            </template>
          </BaseDropdown>
        </div>-->
      </div>

      <div class="mobile-menu">
        <MobileMenu
          :is-project-owner="isProjectOwner"
          :theme="theme"
          :link-to-fund-project-page="linkToDao"
          :link-to-projects="linkToProjects"
          :link-to-staking="linkToStaking"
          :link-to-how-it-works="linkToHowItWorks"
          :link-to-login="linkToLogin"
          :link-to-registration="linkToRegistration"
          :link-to-personal-info="linkToPersonalInfo"
          :user-name="userName"
          :logout-callback="logout"
          @linkClick="onLinkClick"
          @showMobileMenu="toggleMobileMenu"
        />
      </div>
    </div>

    <transition name="fade">
      <div v-if="showMobileMenu" class="header__blur"></div>
    </transition>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import blockchain from '~/plugins/blockchain'
import BaseLogo from '~/components/base/BaseLogo'
import BaseModal from '~/components/base/BaseModal'
import BaseDropdown from '~/components/base/BaseDropdown'
import BaseButton from '~/components/base/BaseButton'
import MobileMenu from '~/components/general/MobileMenu'
// import FundProjectBtn from '~/components/general/FundProjectBtn'
import BaseHoverText from '~/components/base/BaseHoverText'
import MetaMaskLink from '~/components/general/MetaMaskLink'
// import { isIP } from 'net'

export default {
  name: 'TheHeader',

  components: {
    BaseLogo,
    BaseDropdown,
    BaseButton,
    MobileMenu,
    BaseModal,
    // FundProjectBtn,
    BaseHoverText,
    MetaMaskLink,
    // BaseSelect,
  },

  mixins: [blockchain],

  props: {
    theme: {
      type: String,
      default: 'black',
    },
  },

  data() {
    return {
      isProjectOwner: false,
      showMobileMenu: false,
      isProfileDropdownOpened: false,

      currencies: [],
      // isSelectOpen: false,
      isMetamaskDropdownOpened: false,
      // metamaskProvider:
      //   'https://ropsten.infura.io/v3/6c5744c5fe674fcfba0fa7c9c7bc1495',
      // isMetamaskValidated: false,
      isMetamaskInstalled: false,
      isMetamaskConnected: false,
      metamaskAccount: '',
      metamaskCurrency: '',

      isWalletConnectDropdownOpened: false,

      connector: null,
      secondConnector: null,

      pancakeLink:
        'https://pancakeswap.finance/swap?inputCurrency=0x2456493e757fdeedf569781f053998a72adfad03&chainId=56&outputCurrency=0x55d398326f99059fF775485246999027B3197955',
    }
  },

  computed: {
    ...mapGetters('base', ['EXCHANGE_RATE']),
    /*
    isIphone() {
      return /iPhone/.test(navigator.userAgent)
    },
    */
    isIphone() {
      const mobileRegex =
        /Mobile|Android|iP(hone|od|ad)|IEMobile|BlackBerry|Opera Mini/i
      return mobileRegex.test(navigator.userAgent)
    },
    isMetaMaskBrowser() {
      // Проверка, что браузер MetaMask установлен
      return (
        typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask
      )
    },

    exchangeRate() {
      if (!this.EXCHANGE_RATE) {
        return null
      }

      const localCoin = this.EXCHANGE_RATE.localCoin
      const exchangeRate = this.EXCHANGE_RATE.exchangeRate
      const exchangeCoin = this.EXCHANGE_RATE.exchangeCoin

      const rate = `1 ${localCoin} = ${exchangeRate} ${exchangeCoin}`

      return rate
    },

    linkToProjects() {
      return this.localePath({
        name: 'index',
        hash: '/marketplace',
      })
    },

    linkToMarketplace() {
      return this.localePath({
        name: 'marketplace',
      })
    },

    linkToVoting() {
      return this.localePath({
        name: 'dao',
      })
    },

    linkToStaking() {
      return this.localePath({
        name: 'index',
        hash: 'staking',
      })
    },

    linkToHowItWorks() {
      return 'https://docs.definder.global/df-platform-white-paper/need-help/faq'
    },

    linkToLendingPool() {
      return this.localePath({
        name: 'index',
        hash: 'lending-pool',
      })
    },

    linkToLogin() {
      return this.localePath({
        name: 'auth-login',
      })
    },

    linkToRegistration() {
      return this.localePath({
        name: 'auth-registration',
      })
    },

    linkToPersonalInfo() {
      return this.localePath({
        name: 'profile-info',
      })
    },

    linkToDao() {
      return this.localePath({
        name: 'dao',
      })
    },

    logoColor() {
      if (this.theme === 'light') {
        return 'black'
      }

      return 'white'
    },

    loginBtnColor() {
      if (this.theme === 'light') {
        return 'white'
      }

      return 'black'
    },

    registrationBtnColor() {
      if (this.theme === 'light') {
        return 'blue'
      }

      return 'black'
    },

    fundBtnColor() {
      if (this.theme === 'light') {
        return 'blue'
      }

      return 'white'
    },

    isOnRegistrationPage() {
      try {
        const [route] = this.$route.name.split('__')
        return route === 'auth-registration'
      } catch {
        return false
      }
    },

    userName() {
      return this.$auth.user ? this.$auth.user.firstName : null
    },

    isMobileMetamask() {
      return process.client && window.innerWidth < 1200
    },
  },

  watch: {
    $route: {
      deep: true,
      handler(next, prev) {
        if (next.path !== prev.path) {
          if (!this.isMobileMetamask) {
            // this.checkMetamaskConnected()
          }
        }
      },
    },
  },

  mounted() {
    if (!this.isMobileMetamask) {
      // this.checkMetamaskInstalled()
    }

    this.readBlockchainData()
  },

  methods: {
    async readBlockchainData() {
      if (this.$auth.user && this.activeAccount !== '') {
        const res = await this.$api.projects.multisigProjects(
          this.activeAccount
        )
        // console.log(res)
        if (res.length > 0) {
          this.isProjectOwner = true
        }
        // читаем проекты
      }
    },
    async connectWalletConnect() {
      if (!this.$auth.loggedIn) {
        const path = this.localePath({ name: 'auth-login' })
        return await this.$router.push(path)
      }

      try {
        // await this.$walletconnect.connect()
        await this.getAccount()
      } catch (e) {
        console.error(e)
      }
    },
    //
    // async makeConnectionAndTransaction() {
    //   try {
    //     await this.$walletconnect.connect()
    //
    //     await new Promise((resolve) => setTimeout(resolve, 500))
    //
    //     const transaction = await this.$walletconnect.sendTransaction({
    //       wallet: 'dnt',
    //       toAddress: '0x6bF7a492282Af792CA85EeB2dc72f3d5B687a5e9',
    //       txValue: 0.01,
    //     })
    //
    //     console.log(transaction)
    //   } catch (e) {
    //     console.error(e)
    //   }
    // },
    //
    async disconnectWalletConnect() {
      try {
        await this.$walletconnect.disconnect()

        this.isWalletConnectDropdownOpened = false
      } catch (e) {
        console.error(e)
      }
    },

    toggleMobileMenu(val) {
      this.showMobileMenu = val
    },

    onLinkClick(link) {
      const [, hash] = link.split('#')
      if (this.$route.fullPath.endsWith(`#${hash}`) !== true) {
        return
      }

      if (!document) {
        return
      }

      const el = document.getElementById(hash)
      if (!el) {
        return
      }

      el.scrollIntoView()
    },

    async logout() {
      try {
        await this.$auth.logout()
      } catch (e) {
      } finally {
        this.closeProfileDropdown()
      }
    },

    closeProfileDropdown() {
      this.isProfileDropdownOpened = false
    },

    /*
    checkMetamaskInstalled() {
      if (typeof window.ethereum === 'undefined') {
        return false
      }

      this.isMetamaskInstalled = true

      this.checkMetamaskConnected()
    },

    async checkMetamaskConnected() {
      if (
        this.$auth.user &&
        this.$auth.user.metamaskWallet &&
        this.$auth.user.metamaskWallet.name
      ) {
        let accounts
        try {
          accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
        } catch (e) {
          this.$toast.error(this.$t('TOAST.METAMASK_AUTH_ERROR'))

          return
        }

        if (accounts[0] === this.$auth.user.metamaskWallet.name) {
          this.isMetamaskConnected = true
        } else this.isMetamaskConnected = false
      }
    },
    */

    async getAccount(event) {
      if (!this.$auth.loggedIn) {
        event.stopPropagation()
        event.preventDefault()
        await this.$router.push(this.localePath({ name: 'auth-login' }))
        return
      }

      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })

        this.metamaskAccount = accounts[0]
      } catch (e) {
        this.$toast.error(this.$t('TOAST.METAMASK_AUTH_ERROR'))

        return
      }

      try {
        const name = this.metamaskAccount
        await this.$api.wallets.addOrUpdateUserMetamaskWallet({ name })
      } catch (e) {
        return
      }

      try {
        // await this.checkMetamaskConnected()
      } catch (e) {}

      await window.location.reload()

      // const signData = {
      //   name: this.metamaskAccount,
      //   currency: this.metamaskCurrency,
      // }
      //
      // console.log(signData)
      //
      // let metamaskCoinWallet
      // try {
      //   metamaskCoinWallet =
      //     await this.$api.wallets.addOrUpdateUserMetamaskWallet(signData)
      // } catch (e) {}
      //
      // let sign
      // try {
      //   sign = await this.$web3.eth.accounts.sign(
      //     metamaskCoinWallet.nonce,
      //     this.$web3.utils.sha3(metamaskCoinWallet.name)
      //   )
      // } catch (e) {
      //   console.error(e, 'error: sign')
      // }
      //
      // console.log(sign.signature, 'signature')
      //
      // const validateData = {
      //   name: this.metamaskAccount,
      //   signature: sign.signature,
      // }
      //
      // let metamaskValidate
      // try {
      //   metamaskValidate = await this.$api.wallets.validateUserMetamaskWallet(
      //     validateData
      //   )
      //   this.isMetamaskConnected = true
      //   this.isMetamaskValidated = false
      // } catch (e) {}
      //
      // console.log(metamaskValidate)
      //
      // // this.$auth.setUser(userData)
    },
  },
}
</script>

<style lang="scss">
.walletconnect-qrcode__image {
  fill: white;
}
p.modal_h {
  font-size: 36px;
  font-weight: 400;
  line-height: 42.19px;
  text-align: center;
  color: black;
  margin-top: 20px;
  margin-bottom: 20px;
}
p.modal_p {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  color: black;
}
.link-presale {
  color: #000 !important;
  position: relative;
  padding: 10px 18px;
  border-radius: 8px;
  border: 2px solid #8a8a8a;
  box-sizing: border-box !important;
  transition: border-color 0.3s ease;
}
.link-presale,
.link-presale span {
  color: #fff !important;
}
.link-presale:before {
  background: linear-gradient(100deg, #b7e93b, #3bd7e6 52.6%, blue);
  border-radius: inherit;
  bottom: -1px;
  content: '';
  left: -1px;
  position: absolute;
  right: -1px;
  top: -1px;
  transition: all 0.3s ease;
  z-index: -1;
  opacity: 0;
}
.link-presale:hover {
  border-color: transparent;
}
.link-presale:hover:before {
  opacity: 1;
}
.link-presale:after {
  background: #0c0c0c;
  border-radius: inherit;
  bottom: 1px;
  content: '';
  left: 1px;
  position: absolute;
  right: 1px;
  top: 1px;
  z-index: -1;
}
.link-close-modal {
  display: block;
  position: absolute;
  color: #000;
  right: 20px;
  top: 20px;
}
.link-close-modal path {
  fill: #000 !important;
}
</style>

<style lang="scss" scoped>
@import '~assets/scss/general/the-header';
</style>
