<template>
  <div class="project-transaction__wallet wallet">
    <div v-if="isReservationStatus && !repeatDonation">
      <template v-if="!transactionAccepted">
        <div v-if="currentStage !== 4" class="wallet__step-indicator">
          {{
            $t('PROJECT_INFO.STEP_INDICATOR', {
              current: currentStage,
              total: totalStages - 1,
            })
          }}
        </div>

        <div class="wallet-steps">
          <div ref="container" class="wallet-steps__container">
            <transition
              :name="
                prevStage <= currentStage - 1
                  ? 'steps-fade'
                  : 'steps-fade-reverse'
              "
              @before-enter="beforeEnter"
              @enter="enter"
              @after-enter="afterEnter"
            >
              <div
                v-if="currentStage === 1"
                key="1"
                class="wallet-steps__pay pay"
              >
                <div
                  v-if="transactionRejected"
                  class="pay__text pay__text_error"
                >
                  {{ $t('PROJECT_INFO.TRANSACTION_REJECTED') }}
                  <!--                  <br />-->
                  <!--                  {{ $t('PROJECT_INFO.TRY_AGAIN') }}-->
                </div>
                <div class="pay__text">
                  {{ $t('PROJECT_INFO.BECOME_A_PART_OF_COMMUNITY') }}
                </div>
                <div class="pay__text">
                  {{ $t('PROJECT_INFO.GET_ACCESS') }}
                </div>

                <BaseButton color="blue" size="lg" @click="changeStage(2)">
                  {{ $t('PROJECT_INFO.DONATE_DNT') }}
                </BaseButton>
              </div>

              <div
                v-else-if="currentStage === 2"
                key="2"
                class="wallet-steps__pay pay"
              >
                <div class="pay__text">
                  {{ $t('PROJECT_INFO.DONT_HAVE_DNT') }}
                </div>
                <a target="_blank" :href="pancakeLink">
                  <BaseButton size="lg" color="blue">
                    {{ $t('PROJECT_INFO.DEX_PANCAKE') }}
                  </BaseButton>
                </a>
                <BaseButton
                  class="pay__btn"
                  color="blue"
                  size="lg"
                  @click="changeStage(3)"
                >
                  {{ $t('PROJECT_INFO.ALREADY_HAVE_DNT') }}
                </BaseButton>

                <div class="pay__label">
                  {{ $t('PROJECT_INFO.CONTRACT_ADDRESS') }}
                  <a
                    class="pay__link"
                    target="_blank"
                    :href="`https://bscscan.com/token/${dntSmartContract}`"
                  >
                    {{ $t('PROJECT_INFO.SMART_CHAIN') }}
                  </a>
                </div>
                <BaseInput
                  v-model="dntSmartContract"
                  class="wallet__input-component"
                  popover-content
                  disabled
                  copy
                />
              </div>

              <ValidationObserver
                v-else-if="currentStage === 3"
                key="3"
                ref="observer"
                class="wallet-steps__pay pay"
                tag="form"
              >
                <div class="pay__wrapper">
                  {{ $t('PROJECT_INFO.AMOUNT_DESC') }}

                  <div class="pay__transaction">
                    <div class="pay__container">
                      <ValidationProvider
                        ref="amountProvider"
                        v-slot="{ errors }"
                        class="pay__amount"
                        tag="div"
                        rules="required"
                        :name="$t('PROJECT_INFO.AMOUNT').toLowerCase()"
                      >
                        <BaseInput
                          v-model="amount"
                          :label="$t('PROJECT_INFO.ENTER_AMOUNT')"
                          :error="errors[0]"
                          :disabled="isLoading"
                          currency-mask
                          class="pay__amount-component"
                        />
                      </ValidationProvider>

                      <div class="pay__description">
                        <!--                    pay__desktop-->
                        {{ $t('PROJECT_INFO.DNT_BSC') }}
                      </div>

                      <!--                  <BaseInput-->
                      <!--                    v-model="walletNumber"-->
                      <!--                    class="pay__mobile"-->
                      <!--                    popover-content-->
                      <!--                    disabled-->
                      <!--                    copy-->
                      <!--                  />-->

                      <!--                  <ValidationProvider-->
                      <!--                    v-slot="{ errors }"-->
                      <!--                    ref="linkProvider"-->
                      <!--                    class="pay__link"-->
                      <!--                    tag="div"-->
                      <!--                    rules="required|transaction-link"-->
                      <!--                    :name="$t('PROJECT_INFO.SEND_REQUEST').toLowerCase()"-->
                      <!--                  >-->
                      <!--                    <BaseInput-->
                      <!--                      v-model="link"-->
                      <!--                      :label="$t('PROJECT_INFO.SEND_REQUEST')"-->
                      <!--                      class="pay__link-component"-->
                      <!--                      :tooltip="requestTooltip"-->
                      <!--                      :error="errors[0]"-->
                      <!--                      @errorTrigger="errorTrigger"-->
                      <!--                    />-->
                      <!--                  </ValidationProvider>-->

                      <!--                  <BaseButton-->
                      <!--                    color="blue"-->
                      <!--                    type="filled"-->
                      <!--                    size="lg"-->
                      <!--                    class="pay__link-btn"-->
                      <!--                    @click="onVotingSubmit(true)"-->
                      <!--                  >-->
                      <!--                    {{ $t('PROJECT_INFO.SUBMIT') }}-->
                      <!--                  </BaseButton>-->
                    </div>

                    <a
                      v-if="!isMetamaskInstalled"
                      :key="isMetamaskInstalled"
                      target="_blank"
                      href="https://metamask.io/download/"
                    >
                      <BaseButton
                        class="pay__btn pay__btn_icon pay__btn_desktop"
                        color="blue"
                        component="div"
                        form-type="submit"
                        size="lg"
                        @click="checkMetamaskInstalled(true, $event)"
                      >
                        <div class="pay__btn-content">
                          <img src="/images/sources/metamask.png" />

                          {{ $t('PROJECT_INFO.INSTALL_METAMASK') }}
                        </div>
                      </BaseButton>
                    </a>

                    <BaseButton
                      v-else
                      :key="isMetamaskConnected"
                      :disabled="isLoading"
                      class="pay__btn pay__btn_icon pay__btn_desktop"
                      color="blue"
                      component="button"
                      form-type="submit"
                      size="lg"
                      @click.prevent="checkMetamaskInstalled(true)"
                    >
                      <div class="pay__btn-content">
                        <img src="/images/sources/metamask.png" />
                        <span v-if="!isMetamaskConnected">
                          {{ $t('PROJECT_INFO.CONNECT_METAMASK') }}
                        </span>
                        <span v-else>
                          {{ $t('PROJECT_INFO.PAY_WITH_METAMASK') }}
                        </span>
                      </div>
                    </BaseButton>

                    <BaseButton
                      class="pay__btn pay__btn_icon"
                      color="blue"
                      size="lg"
                      :disabled="isLoading"
                      @click="triggerWalletConnect"
                    >
                      <div class="pay__btn-content">
                        <img src="/images/sources/wallet-connect.png" />
                        <span>{{ $t('PROJECT_INFO.USE_WALLET_CONNECT') }}</span>
                      </div>
                    </BaseButton>

                    <transition name="loader">
                      <BaseLoader
                        v-if="isLoading"
                        size="40px"
                        class="pay__loader"
                      />
                    </transition>
                  </div>

                  <div class="pay__label">
                    {{ $t('PROJECT_INFO.CONTRACT_ADDRESS') }}
                    <a
                      class="pay__link"
                      target="_blank"
                      :href="`https://bscscan.com/token/${dntSmartContract}`"
                    >
                      {{ $t('PROJECT_INFO.SMART_CHAIN') }}
                    </a>
                  </div>
                  <BaseInput
                    v-model="dntSmartContract"
                    class="wallet__input-component"
                    popover-content
                    disabled
                    copy
                  />
                </div>
              </ValidationObserver>

              <div
                v-else-if="currentStage === 4"
                key="4"
                class="wallet__congratulation"
              >
                <div class="wallet__congratulation-title">
                  {{ $t('PROJECT_INFO.CONGRATULATIONS') }}
                </div>
                <div
                  class="wallet__congratulation-text"
                  v-html="$t('PROJECT_INFO.CONGRATULATIONS_TEXT')"
                >
                  <!--{{ $t('PROJECT_INFO.CONGRATULATIONS_TEXT') }}-->
                </div>
              </div>
            </transition>
          </div>
        </div>
      </template>
      <template v-else-if="transactionAccepted">
        <div class="wallet__transaction-accepted">
          <a
            v-if="project.canSeeTelegramGroup"
            target="_blank"
            class="wallet__transaction-accepted-link-btn"
            :href="project.telegramGroup"
          >
            <BaseButton size="lg" color="blue">
              {{ $t('PROJECT.TELEGRAM_GROUP') }}
            </BaseButton>
          </a>

          <div class="wallet__transaction-accepted-title">
            {{ $t('PROJECT_INFO.VOTE') }}!
          </div>
          <div class="wallet__transaction-accepted-text">
            {{ $t('PROJECT_INFO.VOTE_TEXT') }}
          </div>
          <ValidationObserver
            ref="observer"
            class="wallet__transaction-accepted-vote vote"
            tag="form"
          >
            <ValidationProvider
              ref="voteProvider"
              v-slot="{ errors }"
              class="vote__input"
              tag="div"
              rules="required"
              :name="$t('PROJECT_INFO.AMOUNT').toLowerCase()"
            >
              <BaseInput
                v-model="futureAmount"
                currency-mask
                :label="$t('PROJECT_INFO.AMOUNT')"
                class="vote__input-component"
                :tooltip="$t('PROJECT_INFO.AMOUNT_TOOLTIP')"
                :error="errors[0]"
              />
            </ValidationProvider>

            <BaseButton
              class="vote__btn"
              color="blue"
              component="button"
              form-type="submit"
              size="lg"
              @click.prevent="sendAmount"
            >
              {{ $t('PROJECT_INFO.VOTE_BTN') }}
            </BaseButton>
          </ValidationObserver>
        </div>
      </template>
    </div>

    <template v-else>
      <div class="wallet__input">
        <div
          v-if="walletTitle"
          class="wallet__input-text"
          :class="{ 'remove-margin': !isConfirmed }"
        >
          {{ walletTitle }}
        </div>

        <BaseInput
          v-model="walletNumber"
          class="wallet__input-component"
          popover-content
          disabled
          copy
        />
      </div>

      <div v-if="walletCautionText" class="wallet__caution">
        <svg class="wallet__caution-icon">
          <use href="#icon-info" />
        </svg>

        <div class="wallet__caution-text">
          {{ walletCautionText }}
        </div>
      </div>

      <client-only>
        <ValidationObserver
          ref="observer"
          class="wallet__request"
          :class="{
            compressed: isFinancingStatus,
            'metamask-layout': isMetamaskConnected || isMobileMetamask,
          }"
          tag="form"
          @submit.prevent="onSubmit"
        >
          <div class="wallet__request-fields">
            <ValidationProvider
              v-slot="{ errors }"
              class="wallet__input wallet__request-link"
              tag="div"
              rules="required|transaction-link"
              :name="$t('PROJECT_INFO.SEND_REQUEST').toLowerCase()"
            >
              <BaseInput
                v-model="link"
                :label="$t('PROJECT_INFO.SEND_REQUEST')"
                class="wallet__input-component"
                :tooltip="requestTooltip"
                :error="errors[0]"
                @errorTrigger="errorTrigger"
              />
            </ValidationProvider>

            <ValidationProvider
              v-if="
                isReservationStatus || isMetamaskConnected || isMobileMetamask
              "
              ref="metaMaskProvider"
              v-slot="{ errors }"
              class="wallet__input wallet__request-amount"
              tag="div"
              rules="required"
              :name="$t('PROJECT_INFO.AMOUNT').toLowerCase()"
            >
              <BaseInput
                v-model="amount"
                currency-mask
                :label="$t('PROJECT_INFO.AMOUNT')"
                class="wallet__input-component"
                :tooltip="$t('PROJECT_INFO.AMOUNT_TOOLTIP')"
                :error="errors[0]"
              />

              <div
                v-if="isMetamaskConnected"
                class="wallet__metamask metamask-pay metamask-pay__icon_desktop"
              >
                <div
                  class="metamask-pay__icon"
                  @click.prevent="sendTransaction"
                >
                  <img src="/images/sources/metamask.png" />
                </div>
              </div>

              <!--              <a-->
              <!--                class="metamask-pay__icon metamask-pay__icon_mobile"-->
              <!--                target="_blank"-->
              <!--                href="https://metamask.app.link/dapp"-->
              <!--              >-->
              <!--                <img src="/images/sources/metamask.png" />-->
              <!--              </a>-->
            </ValidationProvider>
          </div>

          <div class="wallet__request-btn">
            <BaseButton
              color="blue"
              type="filled"
              size="lg"
              class="wallet__btn"
              component="button"
              form-type="submit"
            >
              {{ $t('PROJECT_INFO.SUBMIT') }}
            </BaseButton>
          </div>
        </ValidationObserver>
      </client-only>
    </template>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
// import { Contract } from 'web3-eth-contract'
import BaseInput from '~/components/base/BaseInput'
import BaseButton from '~/components/base/BaseButton'
import BaseLoader from '~/components/base/BaseLoader'
import { DNTContract, USDTContract } from '~/pkg/configs/metaMaskContracts'

export default {
  name: 'ProjectTransactionWallet',

  components: {
    BaseInput,
    BaseButton,
    BaseLoader,
    ValidationObserver,
    ValidationProvider,
  },

  props: {
    projectData: {
      type: Object,
      default: () => ({}),
    },

    projectId: {
      type: Number,
      default: null,
    },

    walletData: {
      type: Object,
      default: () => ({}),
    },

    noLabel: {
      type: Boolean,
      default: false,
    },

    isReservationStatus: {
      type: Boolean,
      default: false,
    },

    isFinancingStatus: {
      type: Boolean,
      default: false,
    },

    isCompletedStatus: {
      type: Boolean,
      default: false,
    },

    isConfirmed: {
      type: Boolean,
      default: false,
    },

    repeatDonation: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      default: null,
    },

    isDnt: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      prevStage: 0,
      currentStage: 1,
      totalStages: 4,
      transactionAccepted: false,
      transactionRejected: false,

      isMetamaskInstalled: false,
      isMetamaskConnected: false,
      dntSmartContract: '0x2456493e757fdeedf569781f053998a72adfad03',

      link: null,
      amount: null,
      futureAmount: null,

      metamaskProvider:
        'https://ropsten.infura.io/v3/6c5744c5fe674fcfba0fa7c9c7bc1495',

      isLoading: false,

      pancakeLink:
        'https://pancakeswap.finance/swap?inputCurrency=0x2456493e757fdeedf569781f053998a72adfad03&chainId=56&outputCurrency=0x55d398326f99059fF775485246999027B3197955',
    }
  },

  setup() {
    if (this.projectData.canSeeRejectedMessage) {
      this.transactionRejected = true
    } else if (
      this.projectData.hasAnyDonations &&
      this.projectData.hasApprovedDonations
    ) {
      this.transactionAccepted = true
    } else if (
      this.projectData.hasAnyDonations &&
      !this.projectData.hasApprovedDonations
    ) {
      this.currentStage = 4
    }
  },

  computed: {
    project() {
      return this.projectData || {}
    },

    // isMetamaskConnected() {
    //   return (
    //     this.$auth.user &&
    //     this.$auth.user.metamaskWallet &&
    //     this.$auth.user.metamaskWallet.name &&
    //     process.client &&
    //     typeof window.ethereum !== 'undefined'
    //   )
    // },

    isMobileMetamask() {
      return process.client && window.innerWidth < 1200
    },

    requestType() {
      if (this.isReservationStatus) {
        return 'reservation'
      } else if (this.isFinancingStatus) {
        const id = this.walletData.id
        if (id === 'donation') {
          return 'reservation'
        } else if (id === 'dnt') {
          return 'liquidity pool'
        }

        return 'investment'
      }

      return ''
    },

    walletTitle() {
      if (this.noLabel) {
        return ''
      }

      if (this.isReservationStatus) {
        return this.$t('PROJECT_INFO.DONATION_WALLET')
      }

      const id = this.walletData.id
      const currency = this.walletData.currency

      if (id === 'dnt') {
        return this.$t('PROJECT_INFO.DNT_WALLET')
      } else if (id === 'donation') {
        return this.$t('PROJECT_INFO.DONATION_WALLET')
      } else {
        return `${this.$t('PROJECT_INFO.BUSD_WALLET')} ${currency}`
      }
    },

    walletCautionText() {
      if (this.isReservationStatus) {
        return this.$t('PROJECT_INFO.RESERVATION_DNT_ATTENTION')
      }

      const id = this.walletData.id

      if (id === 'dnt') {
        return this.$t('PROJECT_INFO.DNT_ATTENTION')
      } else if (id === 'donation') {
        return this.$t('PROJECT_INFO.RESERVATION_DNT_ATTENTION')
      } else {
        return this.$t('PROJECT_INFO.BUSD_ATTENTION')
      }
    },

    walletNumber() {
      return this.walletData.name
    },

    requestTooltip() {
      if (this.type === 'project') {
        return this.$t('PROJECT_INFO.SEND_REQUEST_TOOLTIP_PROJECT_WALLET')
      } else if (this.type === 'platform') {
        return this.$t('PROJECT_INFO.SEND_REQUEST_TOOLTIP_PLATFORM_WALLET')
      }
      return this.$t('PROJECT_INFO.SEND_REQUEST_TOOLTIP')
    },
  },

  watch: {
    currentStage(next, prev) {
      this.prevStage = prev
    },
  },

  mounted() {
    if (!this.isMobileMetamask) {
      this.checkMetamaskInstalled()
    }
  },

  methods: {
    changeStage(stage) {
      document.activeElement.blur()

      // wait keyboard closing
      setTimeout(() => {
        // window.scrollTo({
        //   top: 0,
        //   behavior: 'smooth',
        // })

        this.currentStage = stage
      }, 40)
    },

    // async checkMetamaskConnected() {
    //   if (this.isMetamaskConnected) {
    //     try {
    //       await window.ethereum.request({
    //         method: 'eth_requestAccounts',
    //       })
    //     } catch (e) {
    //       this.$toast.error(this.$t('TOAST.METAMASK_AUTH_ERROR'))
    //     }
    //   }
    // },

    checkMetamaskInstalled(check = false, event = null) {
      if (typeof window.ethereum === 'undefined') {
        return
      } else {
        this.isMetamaskInstalled = true

        this.checkMetamaskConnected()
      }

      if (event) {
        if (!this.isMetamaskInstalled) {
          return
        }

        event.preventDefault()
      }

      if (this.isMetamaskInstalled && check) {
        this.checkMetamaskConnected(check)
      }
    },

    async checkMetamaskConnected(check = false) {
      if (this.isMetamaskConnected && check) {
        await this.sendTransaction(check)
      } else if (
        this.$auth.user &&
        this.$auth.user.metamaskWallet &&
        this.$auth.user.metamaskWallet.name
      ) {
        let accounts
        try {
          accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })

          this.$emit('errorTrigger')
        } catch (e) {
          if (check) {
            this.$toast.error(this.$t('TOAST.METAMASK_AUTH_ERROR'))
          }

          return
        }

        if (accounts[0] === this.$auth.user.metamaskWallet.name) {
          this.isMetamaskConnected = true
        } else {
          this.isMetamaskConnected = false

          if (check) {
            await this.connectMetamask()
          }
        }
      } else if (!this.isMetamaskConnected) {
        await this.connectMetamask()
      }
    },

    async connectMetamask() {
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

        this.isMetamaskConnected = true
      } catch (e) {
        return
      }

      try {
        await this.checkMetamaskConnected(true)
      } catch (e) {}

      await window.location.reload()
    },

    async sendTransaction() {
      // try {
      //   await this.checkMetamaskConnected()
      // } catch (e) {
      //   return
      // }

      let isValid
      if (this.isReservationStatus) {
        isValid = await this.$refs.amountProvider.validate()
      } else isValid = await this.$refs.metaMaskProvider.validate()
      if (!isValid.valid) {
        return
      }

      // const provider = new this.$web3.providers.HttpProvider(
      //   'https://ropsten.infura.io/v3/6c5744c5fe674fcfba0fa7c9c7bc1495'
      // )
      //
      // // provider = provider.providers.HttpProvider(this.metamaskProvider)
      // try {
      //   this.$web3.setProvider(provider)
      // } catch (e) {
      //   console.error(e, 'error: provider')
      // }

      let chainIdHex
      let tokenAddress
      // const tokenAddress = '0xB404c51BBC10dcBE948077F18a4B8E553D160084' // ropsten usdt
      // const toAddress = '0xa7E8E8fCF32960deF1d2f040E80cc1b02AAAd26d'
      const toAddress = this.walletNumber

      const fromAddress = this.$auth.user.metamaskWallet.name
      let ABI
      const value = this.$web3.utils.toHex(this.amount * 1000000) // usdt/bnb

      if (this.isDnt) {
        chainIdHex = this.$web3.utils.toHex(56)
        tokenAddress = '0x2456493e757fDeedF569781F053998A72adfad03' // bnb dnt
        ABI = DNTContract
      } else {
        chainIdHex = this.$web3.utils.toHex(1)
        tokenAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7' // eth usdt
        ABI = USDTContract
      }

      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: chainIdHex,
            },
          ],
        })
      } catch (e) {}

      const contract = new this.$web3.eth.Contract(ABI, tokenAddress)

      let createTxHash
      try {
        createTxHash = await contract.methods.transfer(toAddress, value)
      } catch (e) {}

      const transactionParameters = {
        to: tokenAddress,
        from: fromAddress,
        data: createTxHash.encodeABI(),
      }

      let txHash
      try {
        this.isLoading = true

        txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        })
      } catch (e) {
        if (e.code === 4100) {
          this.$toast.error(this.$t('TOAST.METAMASK_CONNECT_ERROR'))
        }
      } finally {
        this.isLoading = false
      }

      if (txHash) {
        // this.link = 'https://ropsten.etherscan.io/tx/' + txHash

        if (this.isDnt) this.link = 'https://bscscan.com/tx/' + txHash
        else this.link = 'https://etherscan.io/tx/' + txHash

        await this.onVotingSubmit()

        this.currentStage = 4
      }
    },

    async triggerWalletConnect() {
      const isValid = await this.$refs.amountProvider.validate()
      if (!isValid.valid) {
        return
      }

      this.isLoading = true

      try {
        await this.$walletconnect.connect()

        await new Promise((resolve) => setTimeout(resolve, 500))

        this.link = await this.$walletconnect.sendTransaction({
          wallet: 'dnt',
          toAddress: this.walletNumber,
          txValue: this.amount,
        })

        await this.onVotingSubmit()

        this.changeStage(4)
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoading = false
      }
    },

    async sendAmount() {
      const isValid = await this.$refs.voteProvider.validate()
      if (!isValid.valid) {
        return
      }

      try {
        const data = {
          project: this.projectId,
          amount: this.futureAmount,
        }

        await this.$api.transaction.setAmount(data)

        this.futureAmount = null

        this.$refs.voteProvider.reset()

        this.$toast.success(this.$t('TOAST.PROJECT_SEND_REQUEST_SUCCESS'))
      } catch (e) {}
    },

    async onVotingSubmit(mob = false) {
      if (mob) {
        const isValid = await this.$refs.linkProvider.validate()
        if (!isValid.valid) {
          return
        }
      }

      const data = {
        type: this.requestType,
        project: this.projectId,
        link: this.link,
      }

      try {
        await this.$api.transaction.create(data)

        // this.link = null
        //
        // this.$refs.amountProvider.reset()

        this.$toast.success(this.$t('TOAST.PROJECT_SEND_REQUEST_SUCCESS'))

        // const title = this.$t('PROJECT_INFO.CONGRATULATIONS')
        // const informText = this.$t('PROJECT_INFO.CONGRATULATIONS_TEXT')
        // const topIcon = '#icon-check-circle'
        //
        // this.$modal.open({
        //   component: 'InformPopup',
        //   options: {
        //     title,
        //     informText,
        //     topIcon,
        //   },
        // })

        if (mob) {
          this.currentStage = 4
        }
      } catch (e) {}
    },

    async onSubmit() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      const data = {
        type: this.requestType,
        project: this.projectId,
        link: this.link,
      }

      // const amountData = {
      //   project: this.projectId,
      //   amount: this.amount,
      // }

      try {
        await this.$api.transaction.create(data)

        // await this.$api.transaction.setAmount(amountData)

        this.link = null
        this.amount = null

        this.$refs.observer.reset()

        // this.$toast.success(this.$t('TOAST.PROJECT_SEND_REQUEST_SUCCESS'))

        const title = this.$t('GENERAL.THANKS')
        const informText = this.$t('PROJECT_INFO.INFORM_TEXT')
        const topIcon = '#icon-check-circle'

        this.$modal.open({
          component: 'InformPopup',
          options: {
            title,
            informText,
            topIcon,
          },
        })
      } catch (e) {}
    },

    errorTrigger(val) {
      this.$emit('errorTrigger', val)
    },

    beforeEnter() {
      this.prevHeight = this.$refs.container.clientHeight
      this.$refs.container.style.overflow = 'hidden'
    },

    enter() {
      const height = this.$refs.container.clientHeight
      this.$refs.container.style.height = `${this.prevHeight}px`

      setTimeout(() => (this.$refs.container.style.height = `${height}px`), 2)
    },

    afterEnter() {
      this.$refs.container.style.height = null
      this.$refs.container.style.overflow = null
    },
  },
}
</script>

<style lang="scss">
.text-blue {
  color: blue;
}
</style>

<style lang="scss" scoped>
@import '~assets/scss/pages/projects/project/project-transaction';
</style>
