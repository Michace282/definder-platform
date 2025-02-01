<template>
  <div class="project-transaction">
    <div class="project-transaction__container">
      <div class="project-transaction__top-info top-info">
        <div v-if="status" class="top-info__item top-info__status">
          <span class="project-transaction__bold-text">
            {{ $t('PROJECT_INFO.STATUS') }}:
          </span>
          <span class="top-info__status-margin">{{ statusText }} </span>
        </div>

        <div v-if="isFinancingStatus" class="top-info__item top-info__round">
          <div class="top-info__round-divider"></div>

          <span class="project-transaction__bold-text">
            {{ projectData.currentRound.nameFrontend }}
          </span>
        </div>

        <div
          v-if="$auth.loggedIn && isFinancingStatus"
          class="top-info__item top-info__calculator"
          @click="openCalculator"
        >
          <BaseHoverText>
            <span> {{ $t('PROJECT_INFO.INVESTOR_CALCULATOR') }} </span>

            <template #left-icon>
              <div class="top-info__calculator-icon">
                <svg><use href="#icon-calculator" /></svg>
              </div>
            </template>
          </BaseHoverText>
        </div>
      </div>

      <div class="project-transaction__divider"></div>
      <ProjectVotingProgressUp
        :project-data="projectData"
        :round-data="projectData.reservationData"
        :goal="projectData.goal"
        :date-start="projectData.reservationDateStart"
        :date-end="projectData.reservationDateEnd"
        :is-reservation-status="isReservationStatus"
        :is-financing-status="isFinancingStatus"
        :is-completed-status="isCompletedStatus"
      />
      <ProjectVotingProgressDown
        :project-data="projectData"
        :round-data="projectData.reservationData"
        :goal="projectData.goal"
        :date-start="projectData.reservationDateStart"
        :date-end="projectData.reservationDateEnd"
        :is-reservation-status="isReservationStatus"
        :is-financing-status="isFinancingStatus"
        :is-completed-status="isCompletedStatus"
      />

      <div v-if="!voted">
        <a
          v-if="$auth.loggedIn && !isMetamaskInstalled"
          target="_blank"
          href="https://metamask.io/download/"
        >
          <BaseButton class="buy-dnt__main-btn" color="blue">
            Install Metamask & VOTE
          </BaseButton>
        </a>

        <BaseButton
          v-if="!$auth.loggedIn"
          class="buy-dnt__main-btn"
          color="blue"
          @click="login"
        >
          Auth & VOTE
        </BaseButton>

        <BaseButton
          v-if="$auth.loggedIn && isMetamaskInstalled && !showVoteBtn"
          class="buy-dnt__main-btn"
          color="blue"
          @click="updateMetamaskAccount"
        >
          Connect Wallet & VOTE
        </BaseButton>
      </div>

      <div v-if="showVoteBtn" class="project-transaction__vote">
        <div v-if="voted">You voted!</div>
        <div>
          <span class="project-transaction__vote__title">
            What’s your vote on this project?
          </span>
          <div
            v-if="true || (!voted && !$auth.loggedIn && isMetamaskInstalled)"
            style="
              display: flex;
              justify-content: space-between;
              margin-top: 5px;
            "
          >
            <BaseButton class="buy-dnt__main-btn" color="blue" @click="vote">
              In favor
            </BaseButton>
            <BaseButton
              class="buy-dnt__main-btn"
              color="white"
              @click="vote(-1)"
            >
              Against
            </BaseButton>
          </div>
        </div>
        <div class="project-transaction__vote__wallet">
          <div class="project-transaction__vote__wallet__wallet">
            <span>Wallet:</span>
            <span>{{ voteWallet }}</span>
          </div>
          <div class="project-transaction__vote__wallet__vote">
            <span>Vote power:</span>
            {{ votePower }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import blockchain from '~/plugins/blockchain'
import { stakingABI } from '~/pkg/configs/stakingContract'
import { tokenABI } from '~/pkg/configs/tokenContract'

import { USDTContractABI } from '~/pkg/configs/usdtContract'

import BaseHoverText from '~/components/base/BaseHoverText'
// import ProjectVotingProgress from '~/components/pages/projects/project/ProjectVotingProgress'
import ProjectVotingProgressUp from '~/components/pages/projects/project/ProjectVotingProgressUp'
import ProjectVotingProgressDown from '~/components/pages/projects/project/ProjectVotingProgressDown'
import BaseButton from '~/components/base/BaseButton'

export default {
  name: 'ProjectVoting',

  components: {
    BaseHoverText,
    // ProjectVotingProgress,
    ProjectVotingProgressUp,
    ProjectVotingProgressDown,
    BaseButton,
  },
  mixins: [blockchain],
  props: {
    walletData: {
      type: Object,
      default: () => ({}),
    },
    projectData: {
      votePower: 1000,
      type: Object,
      default: () => ({}),
      isMetamaskInstalled: false,
      isMetamaskConnected: false,
    },

    status: {
      type: String,
      default: null,
    },

    statusText: {
      type: String,
      default: null,
    },

    currencies: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      loggedIn: this.$auth.loggedIn,
      voted: this.projectData.voted,
      voteWallet: '',
      votePower: 0,
      activeAccount: '',
      contractBalance: 0,
      isConfirmed: true,
      acceptTermsModel: false,
      selectedTabId: {},
      refreshAccordion: [],
      showVoteBtn: false,
    }
  },

  computed: {
    isReservationStatus() {
      return this.status.toLocaleLowerCase() === 'reservation'
    },
    isFinancingStatus() {
      return this.status.toLocaleLowerCase() === 'financing'
    },
    isCompletedStatus() {
      return this.status.toLocaleLowerCase() === 'completed'
    },

    tabs() {
      const coinWallets = this.financingWallets.filter((item) => item.isActive)

      return coinWallets.map((item, index) => {
        let title
        if (item.id === 'dnt') {
          title = this.$t('PROJECT_INFO.DNT_WALLET')
        } else if (item.id === 'donation') {
          title = this.$t('PROJECT_INFO.DONATION_WALLET')
        } else {
          title = `${this.$t('PROJECT_INFO.BUSD_WALLET')} ${item.currency}`
        }

        return {
          id: item.id,
          title,
        }
      })
    },
  },

  mounted() {
    console.log('mounted')

    // Добавляем обработчик события для подключения к MetaMask
    // window.ethereum.on('connect', this.handleMetamaskConnect)

    this.checkMetamaskInstalled()
    console.log('eee')
    if (
      this.$auth.user &&
      this.$auth.user.metamaskWallet &&
      this.$auth.user.metamaskWallet.name
    ) {
      console.log('metamaskWallet:', this.$auth.user.metamaskWallet.name)
      this.showVoteBtn = true
      this.voteWallet = this.$auth.user.metamaskWallet.name
    }
    console.log('showVoteBtn:', this.showVoteBtn)
  },

  methods: {
    // привязать к пользователю метамаск
    async updateMetamaskAccount(event) {
      await this.checkMetamaskInstalled()
      if (this.isMetamaskConnected) {
        try {
          const name = this.activeAccount
          await this.$api.wallets.addOrUpdateUserMetamaskWallet({ name })
        } catch (e) {
          console.error(e)
          return false
        }
        await window.location.reload()
      }
    },
    async login(event) {
      console.log('login()')
      if (!this.$auth.loggedIn) {
        event.stopPropagation()
        event.preventDefault()
        await this.$router.push(this.localePath({ name: 'auth-login' }))
      }
    },
    async getMetamaskAccount(event) {
      this.login(event)

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
        await this.checkMetamaskConnected()
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

    async connectWallet() {
      if (!this.$auth.loggedIn) {
        const path = this.localePath({ name: 'auth-login' })
        return await this.$router.push(path)
      }

      try {
        await this.$walletconnect.connect()
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

    async initContract() {
      try {
        console.log('debitCredit.initContract()')
        this.staking = new this.web3.eth.Contract(
          stakingABI,
          process.env.STAKING_CONTRACT
        )

        this.usdt = new this.web3.eth.Contract(
          USDTContractABI,
          process.env.USDT_TOKEN
        )
        this.contractAddress = process.env.STAKING_CONTRACT
        console.log('stakingAddress: ', process.env.STAKING_CONTRACT)
        this.owner = await this.staking.methods.owner().call()
        console.log('owner:', this.owner)
        this.tokenAddress = await this.staking.methods.stakingToken().call()
        console.log('stakingToken:', this.tokenAddress)

        this.token = new this.web3.eth.Contract(tokenABI, this.tokenAddress)

        this.decimals = await this.token.methods.decimals().call()
        console.log('decimals')
        this.usdtDecimals = await this.usdt.methods.decimals().call()
      } catch (error) {
        console.error('debitCredit.initContract error:', error)
        this.$toast.error('initContract error')
      }
    },
    async setVotePower(power = false) {
      if (typeof power !== 'boolean') {
        this.votePower = power
      }

      // Смотрим сколько поинвестировали:
      this.stakedTotal = await this.staking.methods
        .getUserStakedTotal(this.voteWallet)
        .call()
      console.log('stakedTotal:', this.stakedTotal)
      // курс токена
      this.tokenPrice = await this.staking.methods.getTokenPrice().call()
      console.log('tokenPrice:', this.tokenPrice)
      this.votePower =
        1000n +
        (BigInt(this.stakedTotal) * BigInt(this.tokenPrice)) /
          BigInt(Math.pow(10, this.usdtDecimals))
    },
    // посмотреть данные из блокчейна
    async readBlockchainData() {
      try {
        console.log('vote.readBlockchainData()')
        if (!this.isMetamaskConnected) {
          console.log('No Metamask connected')
          await this.checkMetamaskInstalled()
        }
        console.log('isMetamaskConnected: ', this.isMetamaskConnected)
        if (this.isMetamaskConnected) {
          await this.setVotePower(1000n)
        }
      } catch (error) {
        console.error('readBlockchain error:', error)
      }
    },

    // обновление данныхи из блокчейна
    async updateFromContract(n = 0) {
      try {
        // голосуем
        if (n === -1) {
          await this.$api.projects.vote({
            id: this.projectData.id,
            down: true,
          })
        } else {
          await this.$api.projects.vote({
            id: this.projectData.id,
          })
        }
        this.voted = true

        // await window.location.reload()
      } catch {}
    },

    // голосование
    async vote(n = 0) {
      try {
        // голосуем
        if (n === -1) {
          await this.$api.projects.vote({
            id: this.projectData.id,
            down: true,
          })
        } else {
          await this.$api.projects.vote({
            id: this.projectData.id,
          })
        }
        this.voted = true

        // await window.location.reload()
      } catch {}
    },

    async isTermsConfirmed() {
      if (!this.$auth.loggedIn || !this.isFinancingStatus) {
        return
      }

      try {
        const confirmation = await this.$api.projects.isConfirmedTerms({
          id: this.projectData.id,
        })

        this.isConfirmed = confirmation.isConfirmed
      } catch {}
    },

    openCalculator() {
      const currencies = this.currencies

      this.$modal.open({
        component: 'ProjectCalculator',
        options: {
          projectData: this.projectData,
          currencies,
        },
      })
    },

    async confirmTerms() {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }

      try {
        await this.$api.projects.confirmTerms({
          id: this.projectData.id,
        })

        this.isConfirmed = true

        this.$toast.success(this.$t('TOAST.CONFIRM_TERMS_SUCCESS'))
      } catch (e) {
        console.error(e)
        this.$toast.error(this.$t('TOAST.CONFIRM_TERMS_ERROR'))
      }
    },

    errorTrigger(val, id) {
      this.refreshAccordion.push({
        id,
        invalid: val,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/projects/project/project-voting';
</style>
