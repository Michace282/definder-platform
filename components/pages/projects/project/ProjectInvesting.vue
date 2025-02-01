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
          <!-- <div class="top-info__round-divider"></div>

          <span class="project-transaction__bold-text">
            {{ projectData.currentRound.nameFrontend }} 
          </span>-->
        </div>
        <!--
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
        </div> -->
      </div>

      <div class="project-transaction__divider"></div>

      <ProjectInvestingProgress
        :contract-data="contractData"
        :project-data="projectData"
        :round-data="projectData.reservationData"
        :goal="projectData.goal"
        :date-start="projectData.reservationDateStart"
        :date-end="projectData.reservationDateEnd"
        :is-reservation-status="isReservationStatus"
        :is-financing-status="isFinancingStatus"
        :is-completed-status="isCompletedStatus"
      />
    </div>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js'
import blockchain from '~/plugins/blockchain'

import { USDTContractABI } from '~/pkg/configs/usdtContract'
import { projectABI } from '~/pkg/configs/projectContract'

// import BaseHoverText from '~/components/base/BaseHoverText'
import ProjectInvestingProgress from '~/components/pages/projects/project/ProjectInvestingProgress'

export default {
  name: 'ProjectInvesting',

  components: {
    // BaseHoverText,
    ProjectInvestingProgress,
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
      contractWait: false,
      userBalance: 0,
      contractBalance: 0,
      withdrawTo: '',
      isMultisig: false,
      nowValue: 0,
      txs: [],
      payments: [],
      crowdFinish: false,
      isOwner: false,
      contractData: {
        amountRaised: 0,
        amountRaisedFormatted: '',
        endFundingTime: 0,
        amountMaxTarget: 0,
        getNow: 0,
        returnStartTime: 0,
        returnEndTime: 0,
      },
      amountMaxTarget: 0,
      amountRaised: 0,
      investAmount: 100,
      investedAmount: 0,
      testMode: true,
      loggedIn: this.$auth.loggedIn,
      voteWallet: '',
      votePower: 0,
      activeAccount: '',
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
    async makeReturnForAllUsers(value) {
      try {
        value = new BigNumber(value)
        console.log('approve', value)
        console.log('approve', value.toFixed())
        await this.token.methods
          .approve(this.projectData.contractAddress, value.toFixed())
          .send({ from: this.activeAccount })
        await this.projectContract.methods
          .makeReturnForAllUsers()
          .send({ from: this.activeAccount })
        await this.fetchPayments()
      } catch (e) {
        console.log(e.message)
        console.log(e)
        this.$toast.error('Error')
      }
    },
    async setNow() {
      await this.projectContract.methods
        .setNow(this.convertToUnixSeconds(this.nowValue))
        .send({ from: this.activeAccount })
      await this.readBlockchainData()
    },
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
    async approveWithdraw(id) {
      this.contractWait = true
      try {
        await this.projectContract.methods
          .approvePaymentToOwner(id)
          .send({ from: this.activeAccount })
        this.$toast.success('Approve withdraw success')
        await this.readBlockchainData()
      } catch (e) {
        console.log(e)
        this.$toast.error('Approve withdraw error')
      }
      this.contractWait = false
    },
    // вывод на адрес владельца
    async initWithdraw() {
      this.contractWait = true
      try {
        await this.projectContract.methods
          .initPaymentToOwner(this.withdrawTo)
          .send({ from: this.activeAccount })
        this.$toast.success('Init withdraw success')
        await this.fetchTransactions()
      } catch (e) {
        console.log(e)
        this.$toast.error('Init withdraw error')
      }
      this.contractWait = false
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
      if (!this.projectData.contractAddress) {
        console.error('Project contract not deployed')
        return false
      }
      try {
        console.log('investing.initContract()')
        this.projectContract = new this.web3.eth.Contract(
          projectABI,
          this.projectData.contractAddress
        )

        this.contractAddress = this.projectData.contractAddress
        console.log('contractAddress: ', this.contractAddress)
        this.owner = await this.projectContract.methods.owner().call()
        console.log('owner:', this.owner)
        this.tokenAddress = await this.projectContract.methods
          .InvestToken()
          .call()
        console.log('tokenAddress:', this.tokenAddress)
        if (
          this.tokenAddress !== '0x55d398326f99059ff775485246999027b3197955'
        ) {
          this.testMode = true
        }

        this.token = new this.web3.eth.Contract(
          USDTContractABI,
          this.tokenAddress
        )

        this.decimals = await this.token.methods.decimals().call()
        this.debitCreditTokenDecimals = this.decimals
        console.log('decimals:', this.decimals)
      } catch (error) {
        console.error('debitCredit.initContract error:', error)
        this.$toast.error('initContract error')
      }
    },
    async readOwnerData() {
      console.log('readOwnerData()')
      if (this.contractData.returnStartTime / 1 === 0) {
        // Получаем транзы
        this.fetchTransactions()
        return false
      } else {
        await this.fetchPayments()
      }
    },
    async fetchTransactions() {
      try {
        const count = await this.projectContract.methods
          .getCountTransactions()
          .call({ from: this.activeAccount })
        const itemsPromises = []
        console.log(this.activeAccount, 'countTxs:', count)
        let item
        for (let i = 0; i < count; i++) {
          item = await this.projectContract.methods
            .getTransaction(i)
            .call({ from: this.activeAccount })
          console.log('tx:', item)
          const _approved = await this.projectContract.methods
            .isApprovedTx(i, this.activeAccount)
            .call({ form: this.activeAccount })
          console.log('_approved:', _approved)
          itemsPromises.push({
            id: i,
            approved: _approved,
            time: item.created_at,
            recipient: item.recipient,
            amount: item.amount,
            executed: item.executed,
          })
        }
        this.txs = await Promise.all(itemsPromises)
        console.log('udpdated txs:', this.txs)
      } catch (error) {
        console.error('Ошибка при получении списка транзакций:', error)
      }
    },
    async fetchPayments() {
      try {
        const count = await this.projectContract.methods
          .getCountReturns()
          .call({ from: this.activeAccount })
        const itemsPromises = []
        console.log(this.activeAccount, 'countItems:', count)
        let item
        for (let i = 1; i <= count; i++) {
          item = await this.projectContract.methods
            .getReturnItem(i)
            .call({ from: this.activeAccount })
          console.log('item:', item)
          console.log(item.time)
          console.log(item.amount)
          console.log(item.completed)
          itemsPromises.push({
            id: i,
            time: parseInt(item.time),
            amount: item.amount / 1,
            completed: parseInt(item.completed),
          })
        }
        this.payments = await Promise.all(itemsPromises)
        console.log('udpdated payments:', this.payments)
      } catch (error) {
        console.error('Ошибка при получении списка записей:', error)
      }
    },

    // посмотреть данные из блокчейна
    async readBlockchainData() {
      try {
        console.log('invest.readBlockchainData()')
        if (!this.isMetamaskConnected) {
          console.log('No Metamask connected')
          await this.checkMetamaskInstalled()
        }
        console.log('isMetamaskConnected: ', this.isMetamaskConnected)
        if (this.isMetamaskConnected) {
          this.userBalance = await this.token.methods
            .balanceOf(this.activeAccount)
            .call({ from: this.activeAccount })
          this.contractBalance = await this.token.methods
            .balanceOf(this.contractAddress)
            .call({ from: this.activeAccount })
          console.log('contractBalance:', this.contractBalance)
          console.log(
            'address1:',
            await this.projectContract.methods.users(1).call()
          )
          console.log(
            'userBalances1:',
            await this.projectContract.methods
              .userBalances(this.activeAccount)
              .call()
          )

          this.investedAmount =
            (await this.projectContract.methods
              .userBalances(this.activeAccount)
              .call()) / 1
          if (this.owner.toLowerCase() === this.activeAccount.toLowerCase()) {
            this.isOwner = true
          }
          this.isMultisig = await this.projectContract.methods
            .addressIsMultisig(this.activeAccount)
            .call({ from: this.activeAccount })
          console.log('isMultisig:', this.isMultisig)
          for (const field of [
            'amountRaised',
            'endFundingTime',
            'amountMaxTarget',
            'getNow',
            'endFundingTime',
            'returnStartTime',
          ]) {
            this.contractData[field] = await this.projectContract.methods[
              field
            ]().call()
            console.log('contractData', field, this.contractData[field])
          }
          this.nowValue = this.convertSecondsToDate(
            this.contractData.getNow / 1
          )
          this.contractData.amountRaisedFormatted = this.showAmountUSD(
            this.contractData.amountRaised
          )
          for (const key in this.contractData) {
            console.log('contractData.', key + ': ' + this.contractData[key])
          }
          if (
            (this.contractData.amountRaised / 1 > 0 &&
              this.contractData.amountRaised / 1 >=
                this.contractData.amountMaxTarget / 1) ||
            this.contractData.getNow / 1 > this.contractData.endFundingTime / 1
          ) {
            this.crowdFinish = true
          }

          this.readOwnerData()
        }
      } catch (error) {
        console.error('readBlockchain error:', error)
      }
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
