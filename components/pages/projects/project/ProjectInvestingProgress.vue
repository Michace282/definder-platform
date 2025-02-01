<template>
  <div
    class="project-transaction__round-info2 round-info"
    :class="{
      [`round-info_background-${color}`]: true,
      'round-info_remove-margin': isRemoveMargin,
      'round-info_remove-padding': isRemovePadding,
    }"
  >
    <div v-if="roundName" class="round-info__round-name">
      <!-- {{ roundName }} -->
    </div>
    <div class="container">
      <div class="column" style="flex: 2">
        <div class="round-info__raised-of">Target Raise</div>
        <div class="round-info__raised-goal">
          {{ showAmountisMobyle(projectData.contractAmountMinTarget) }}
        </div>
      </div>
      <div class="column">
        <div class="round-info__raised-of">APY</div>
        <div class="round-info__caption-data">
          {{ projectData.roiPercent }}%
        </div>
      </div>
      <div class="column">
        <div class="round-info__raised-of">Period</div>
        <div class="round-info__caption-data">
          {{
            getDatesPeiod(
              projectData.financingDateStart,
              projectData.financingDateEnd
            )[0]
          }}
          <span style="font-size: 10px">
            {{
              getDatesPeiod(
                projectData.financingDateStart,
                projectData.financingDateEnd
              )[1]
            }}
          </span>
        </div>
      </div>
      <div class="column payments-column">
        <div class="round-info__raised-of">Payments</div>
        <div class="round-info__caption-data">
          {{ showPeriod(projectData.contractReturnIntervalDays) }}
        </div>
      </div>
    </div>

    <div class="container">
      <div class="round-info__caption column">
        Start: {{ formattedDate(projectData.financingDateStart) }}
        <div class="round-info__payments-mob-row">
          <div class="round-info__payments-mob-row__raised-of">Payments:</div>
          <div class="round-info__payments-mob-row__caption-data">
            {{ showPeriod(projectData.contractReturnIntervalDays) }}
          </div>
        </div>
      </div>
      <div class="round-info__caption column" style="text-align: right">
        End: {{ formattedDate(projectData.financingDateEnd) }}
        <div style="color: black">
          <span style="font-weight: 900; font-size: 11px"
            >{{ countDays(projectData.financingDateStart) }} days</span
          >
          to go
        </div>
      </div>
    </div>

    <div class="round-info__progress2">
      <div class="container" style="margin-bottom: 20px">
        <div class="column" style="flex: 2">
          <div class="round-info__raised-of">
            <span class="desk">Invested amount</span>
            <span class="mob">Investment</span>
          </div>
          <div class="round-info__raised-goal">
            {{ showAmount(raisedAmount) }}
          </div>
        </div>
        <div class="column">
          <div class="round-info__raised-of">Funded</div>
          <div class="round-info__caption-data">{{ progress.toFixed(0) }}%</div>
        </div>
        <div class="column">
          <div class="round-info__raised-of">Investors</div>
          <div class="round-info__caption-data">
            {{ projectData.contractCountUsers }}
          </div>
        </div>
      </div>
      <BaseProgress :value="progress" class="round-info__progress-bar" />

      <div v-if="!crowdFinish && !contractWait" class="investment-container">
        <div class="investment-container__input">
          <div class="investment-container__input-wrapper">
            <BaseInput
              v-if="!waitApprove && !waitConfirm"
              v-model="investAmount"
              class="investment-container__input-field"
              placeholder="Enter amount"
              @keyup="changeInvestAmount"
            />
            <span v-if="investAmount" class="investment-container__input-label">
              USDT
            </span>
          </div>
          <div v-if="waitApprove" class="follow-instruction-inform">
            <div class="follow-instruction-inform__main">
              <div>Wait a moment</div>
              <img
                class="follow-instruction-inform__loader"
                src="/images/sources/loader.png"
                alt="loader"
              />
            </div>
            <div class="follow-instruction-inform__additional">
              *Follow the instructions on your wallet
            </div>
          </div>
          <div v-if="waitConfirm" class="follow-instruction-inform">
            <div class="follow-instruction-inform__main">
              Transaction ready to confirm
              <img
                class="follow-instruction-inform__confirm-icon"
                src="/images/sources/confirm-icon.png"
                alt="loader"
              />
            </div>
            <div class="follow-instruction-inform__additional">
              *Please confirm the transaction on your selected wallet
            </div>
          </div>
        </div>
        <div class="investment-container__buttons">
          <BaseButton
            v-if="
              !$auth.loggedIn && isMetamaskInstalled && !isMetamaskConnected
            "
            class="buy-dnt__main-btn btn-auth btn-invest"
            color="gray"
            @click="login"
          >
            Login
          </BaseButton>
          <BaseButton
            v-if="$auth.loggedIn && !isMetamaskInstalled"
            class="buy-dnt__main-btn btn-invest btn-update-metamask"
            color="blue"
            @click="openMetaMaskDappLink"
            @active="false"
          >
            Invest
          </BaseButton>
          <BaseButton
            v-if="!$auth.loggedIn && isMetamaskInstalled && isMetamaskConnected"
            class="buy-dnt__main-btn btn-invest btn-update-metamask"
            color="blue"
            @click="login"
            @active="false"
          >
            Invest
          </BaseButton>
          <BaseButton
            v-if="$auth.loggedIn && isMetamaskInstalled && isMetamaskConnected"
            class="buy-dnt__main-btn btn-invest btn-update-metamask"
            color="blue"
            @click="invest1"
            @active="false"
          >
            Invest
          </BaseButton>
          <BaseButton
            v-if="$auth.loggedIn && !isMetamaskConnected"
            class="buy-dnt__main-btn btn-invest btn-update-metamask"
            color="blue"
            @click="invest1"
            @active="false"
          >
            Invest
          </BaseButton>
        </div>
      </div>
      <!-- no funds amount-->
      <div v-if="nofunds" class="no-funds-error">
        <svg class="icon-attention"><use href="#icon-attention" /></svg>
        Insufficient funds in the wallet connected, please make sure that you
        have connected a right wallet. The total available amount is shown in
        the field above.
      </div>
      <div
        v-if="crowdFinish"
        style="
          color: orange;
          padding: 20px;
          font-weight: 900;
          font-size: 16px;
          text-align: center;
        "
      >
        Investmet complete
      </div>
      <div
        v-if="investedAmount > 0"
        style="margin-top: 20px; font-size: 20px; text-align: right"
      >
        You invested:
        <span style="color: #0000ff">{{ showAmountUSD(investedAmount) }}</span>
      </div>

      <div v-if="contractWait">Please wait...</div>
    </div>

    <BaseToggle title="Investor calculator" style="margin-top: 20px">
      <template #icon>
        <svg><use href="#icon-calculator" /></svg>
      </template>

      <div class="investment-container__input-wrapper">
        <BaseInput
          v-model="calcValue"
          style="margin-top: 10px; margin-bottom: 10px"
          @keyup="changeCalcAmount"
        />
        <span
          v-if="calcValue || calcValue === 0"
          class="investment-container__input-label"
        >
          USDT
        </span>
      </div>
      <table class="calc" cellpadding="0" cellspacing="0" style="width: 100%">
        <tr>
          <td>Yearly Rate</td>
          <td class="right-align">{{ projectData.roiPercent }}%</td>
        </tr>
        <tr>
          <td>Number of payments</td>
          <td class="right-align">{{ countPayments() }}</td>
        </tr>
        <tr>
          <td>Monthly Rate</td>
          <td class="right-align">{{ monthlyRate().toFixed(2) }}%</td>
        </tr>
        <tr class="border0">
          <td>Monthly amount</td>
          <td class="right-align">
            <transition name="slide-right">
              <span v-if="monthlyAmountVisible" key="monthly"
                >{{ monthlyAmount().toFixed(2) }} USDT</span
              >
            </transition>
          </td>
        </tr>
        <tr class="border">
          <td style="font-size: 18px">Return on Investment</td>
          <td class="right-align" style="color: #82c200; font-size: 20px">
            {{ allPeriodRate() }}%
          </td>
        </tr>
        <tr class="border">
          <td style="font-size: 20px">User Profit</td>
          <td class="right-align" style="font-size: 20px; color: #bababa">
            <transition name="slide-right">
              <span
                v-if="userProfitVisible"
                key="profit"
                style="color: #0000ff; font-size: 28px"
              >
                {{ allAmount().toFixed(2) }}
              </span>
            </transition>
            USDT
          </td>
        </tr>
      </table>

      <div
        class="wallet__caution"
        style="margin-top: 20px; margin-bottom: 20px"
      >
        <svg class="wallet__caution-icon">
          <use href="#icon-info" />
        </svg>

        <div class="wallet__caution-text">
          The calculation is based on the total maturity of the loan. Monthly
          payments are multiplied by the number of payments. Inflation is not
          included in the calculation.
        </div>
      </div>
      <div v-if="!crowdFinish && !contractWait">
        <BaseButton
          v-if="$auth.loggedIn && isMetamaskInstalled && !isMetamaskConnected"
          class="buy-dnt__main-btn btn-update-metamask"
          color="blue"
          @click="updateMetamaskAccount"
        >
          Confirm
        </BaseButton>
        <BaseButton
          v-if="!$auth.loggedIn"
          class="buy-dnt__main-btn btn-auth"
          color="blue"
          @click="login"
        >
          Confirm
        </BaseButton>
        <BaseButton
          v-if="$auth.loggedIn && isMetamaskConnected"
          class="buy-dnt__main-btn"
          color="blue"
          @click="invest2"
        >
          Confirm
        </BaseButton>
      </div>
      <div v-if="contractWait">Please wait...</div>
    </BaseToggle>
  </div>
</template>

<script>
// import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import blockchain from '~/plugins/blockchain'

import { USDTContractABI } from '~/pkg/configs/usdtContract'
import { projectABI } from '~/pkg/configs/projectContract'

import BaseProgress from '~/components/base/BaseProgress'
import BaseButton from '~/components/base/BaseButton'
import BaseInput from '~/components/base/BaseInput'
import BaseToggle from '~/components/base/BaseToggle'

export default {
  name: 'ProjectVotingProgress',
  components: {
    BaseProgress,
    BaseInput,
    BaseButton,
    BaseToggle,
  },

  mixins: [blockchain],

  props: {
    projectData: {
      type: Object,
      default: () => ({}),
    },
    countVotes: {
      type: Number,
      default: 0,
    },

    countPoints: {
      type: Number,
      default: 0,
    },

    roundData: {
      type: Object,
      default: () => ({}),
    },

    goal: {
      type: Number,
      default: null,
    },

    roundName: {
      type: String,
      default: null,
    },

    dateStart: {
      type: [String, Date],
      default: null,
    },

    dateEnd: {
      type: [String, Date],
      default: null,
    },

    color: {
      type: String,
      default: null,
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
  },
  data() {
    return {
      nofunds: false,
      waitApprove: false,
      waitConfirm: false,
      calc: {
        rate: 0,
        numberOfPayments: 0,
        monthlyRate: 0,
        monthlyAmount: 0,
        returnOnInvestment: 0,
        profit: 0,
      },
      calcValue: 0,
      // isMetamaskConnected: false,
      raisedAmount: 0,
      investedAmount: 0,
      investAmount2: 0,
      crowdFinish: false,

      contractData: {
        amountRaised: 0,
        amountRaisedFormatted: '',
        endFundingTime: 0,
        amountMaxTarget: 0,
        getNow: 0,
        returnStartTime: 0,
        returnEndTime: 0,
      },
      monthlyAmountVisible: true,
      userProfitVisible: true,
    }
  },

  computed: {
    isRemovePadding() {
      return (
        (this.isReservationStatus && !this.$auth.loggedIn) ||
        this.isCompletedStatus
      )
    },
    isRemoveMargin() {
      return (
        (this.isFinancingStatus && !this.$auth.loggedIn) || !this.isConfirmed
      )
    },

    fundedPercent() {
      return Math.ceil((this.roundData.sum * 100) / this.goal)
    },

    totalDays() {
      const total = this.calcDaysDiff(this.dateStart, this.dateEnd)
      return total
    },

    daysGone() {
      const checkedDate =
        new Date(this.dateEnd).getTime() - new Date().getTime() > 0

      const currentDay = checkedDate ? new Date() : this.dateEnd
      const daysGone = this.calcDaysDiff(this.dateStart, currentDay)
      return daysGone
    },

    daysToGO() {
      return this.totalDays - this.daysGone > 0
        ? this.totalDays - this.daysGone
        : 0
    },

    progress() {
      // if (new Date(this.dateStart).getDate() - new Date().getDate() === 0) {
      //   return 0
      // }

      //  return this.totalDays - this.daysGone > 0
      //  ? (this.daysGone * 100) / this.totalDays
      //  : 100
      return (
        (this.raisedAmount * 100) / this.projectData.contractAmountMinTarget
      )
    },

    formattedDateStart() {
      return this.$date.formatToShort(this.dateStart)
    },

    formattedDateEnd() {
      return this.$date.formatToShort(this.dateEnd)
    },
  },

  mounted() {
    if (
      this.$auth.user &&
      this.$auth.user.metamaskWallet &&
      this.$auth.user.metamaskWallet.name
    ) {
      // this.isMetamaskConnected = true
    }
    this.raisedAmount = this.projectData.contractRaised
    if (this.raisedAmount >= this.projectData.contractAmountMinTarget) {
      this.crowdFinish = true
    }
    window.addEventListener('resize', this.updateIsMobile)
    this.updateIsMobile()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateIsMobile)
  },
  methods: {
    changeCalcAmount() {
      this.triggerAnimation()
      this.investAmount = this.calcValue
    },
    changeInvestAmount() {
      this.triggerAnimation()
      this.calcValue = this.investAmount
    },
    toggle() {
      this.isOpen = !this.isOpen
    },
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
      if (!this.$auth.loggedIn) {
        event.stopPropagation()
        event.preventDefault()
        await this.$router.push(
          this.localePath({
            name: 'auth-login',
            query: { redirect: this.$route.fullPath },
          })
        )
      }
    },
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
          this.raisedAmount =
            this.contractData.amountRaised / 10 ** this.decimals
          console.log('this.raisedAmount from bc', this.raisedAmount)
          if (
            (this.contractData.amountRaised / 1 > 0 &&
              this.contractData.amountRaised / 1 >=
                this.contractData.amountMaxTarget / 1) ||
            this.contractData.getNow / 1 > this.contractData.endFundingTime / 1
          ) {
            this.crowdFinish = true
          }
        }
      } catch (error) {
        console.error('readBlockchain error:', error)
      }
    },

    // инвестирование
    async invest1() {
      if (isNaN(this.investAmount) || this.investAmount === '') {
        this.$toast.error('Input amount')

        return
      }
      await this.invest(this.investAmount)
    },

    openMetaMaskDappLink() {
      const currentUrl = window.location.href
      const link = `https://metamask.app.link/dapp/${encodeURIComponent(
        currentUrl
      )}`
      window.open(link, '_blank')
    },

    async invest2() {
      if (isNaN(this.investAmount2) || this.investAmount2 === '') {
        this.$toast.error('Input amount')

        return
      }
      await this.invest(this.investAmount2)
    },
    async invest(investAmount) {
      // this.contractWait = true
      console.log('Contact:', this.projectData.contractAddress)
      try {
        const value = this.web3.utils
          .toBN(investAmount)
          .mul(
            this.web3.utils.toBN(10).pow(this.web3.utils.toBN(this.decimals))
          )
        // check amount
        const balance = await this.token.methods
          .balanceOf(this.activeAccount)
          .call()
        console.log('balance/valie', balance / 1, value / 1)
        if (BigInt(balance) < BigInt(value)) {
          this.nofunds = true
          // this.contractWait = false
          this.investAmount = Math.trunc(balance / 10 ** this.decimals)

          this.calcValue = this.investAmount
          return
        } else {
          this.nofunds = false
        }
        console.log('approve ', value)
        this.waitApprove = true
        try {
          await this.token.methods
            .approve(this.projectData.contractAddress, value)
            .send({
              from: this.activeAccount,
              gasPrice: await this.gasPrice(),
            })

          this.$toast.success('Approve successful')
          console.log('Invest ', value)
          this.waitApprove = false
          this.waitConfirm = true
          this.investAmount = ''
          this.calcValue = ''
          // Переводим токены с кошелька инвестора в смарт-контракт
          await this.projectContract.methods.addFunds(value.toString()).send({
            from: this.activeAccount,
            gasPrice: await this.gasPrice(),
          })
          // уведомление
          // this.$toast.success('Invest successful ')
          this.createSuccessInvestmentPopup()
          this.waitApprove = false
          this.waitConfirm = false
          // обновляем данные из контракта
          console.log('updateFromContract ', this.projectData.id)
          await this.$api.projects.updateFromContract(this.projectData.id)
        } catch (e) {
          console.log(e)
          this.$toast.error('Invest error')
        } // обновляем на странице кол-во инвестированного
        await this.readBlockchainData()
        // await window.location.reload()
      } catch (error) {
        console.error('Invest failed', error)
        console.log(`Invest failed: ${error.message}`)
        console.log(error.receipt.rawLogs)
        this.$toast.error(`Invest failed`)
      }
      // this.contractWait = false
      this.waitConfirm = false
      this.waitApprove = false
    },

    formattedDate(date) {
      return this.$date.formatToShort(date)
    },
    monthlyAmount() {
      const calcValue = this.calcValue ? this.calcValue : '0'
      return (
        (this.monthlyRate() *
          parseFloat(calcValue.toString().replace(',', '.'))) /
        100
      )
    },
    allAmount() {
      const calcValue = this.calcValue ? this.calcValue : '0'
      return (
        (this.allPeriodRate() *
          parseFloat(calcValue.toString().replace(',', '.'))) /
        100
      )
    },
    monthlyRate() {
      let start = dayjs(this.projectData.financingDateStart)
      let end = dayjs(this.projectData.financingDateEnd)
      if (end.isBefore(start)) {
        ;[start, end] = [end, start]
      }
      console.log(start, end)
      const days = end.diff(start, 'day')
      console.log('years:', days / 30 / 12)
      return this.projectData.roiPercent / 12
    },
    countPayments() {
      return (
        this.projectData.contractReturnTermDays /
        this.projectData.contractReturnIntervalDays
      )
    },
    showPeriod(countTays) {
      if (this.projectData.contractReturnIntervalDays === 30) {
        return 'Monthly'
      } else {
        return 'every ' + this.projectData.contractReturnIntervalDays + ' days'
      }
    },
    countDays(endDate) {
      const now = dayjs()
      const end = dayjs(endDate)

      return end.diff(now, 'day')
    },
    allPeriodRate() {
      let start = dayjs(this.projectData.financingDateStart)
      let end = dayjs(this.projectData.financingDateEnd)
      if (end.isBefore(start)) {
        ;[start, end] = [end, start]
      }
      console.log(start, end)
      const days = end.diff(start, 'day')
      console.log('years:', days / 30 / 12)
      return ((days / 30 / 12) * this.projectData.roiPercent).toFixed(1)
    },
    getDatesPeiod(startDate, endDate) {
      let start = dayjs(startDate)
      let end = dayjs(endDate)
      if (end.isBefore(start)) {
        ;[start, end] = [end, start]
      }
      console.log(start, end)
      const res = end.diff(start, 'month')
      if (res === 1) {
        return [res, 'Month']
      } else {
        return [res, 'Months']
      }
    },
    showAmount(value) {
      console.log(value)
      console.log(this.decimals)
      return (
        '$' +
        new Intl.NumberFormat('ru-RU')
          .format(value)
          .toString()
          .replace(/,00$/, '')
      )
    },
    showAmountisMobyle(value) {
      console.log(
        `Screen width: ${window.innerWidth}, isMobile: ${this.isMobile}`
      )
      if (this.isMobile) {
        return '$' + Math.round(value / 1000) + 'k'
      } else {
        return '$' + new Intl.NumberFormat('ru-RU').format(value).toString()
      }
    },
    updateIsMobile() {
      this.isMobile = window.innerWidth <= 500
      console.log(`isMobile updated: ${this.isMobile}`)
    },
    calcDaysDiff(start, end) {
      const dateStart = new Date(start)
      const dateEnd = new Date(end)
      const timeDiff = Math.abs(dateEnd.getTime() - dateStart.getTime())
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
      return diffDays
    },

    formattedNum(num) {
      return this.$numFormatter.formatToThousand(num) || 0
    },

    triggerAnimation() {
      this.monthlyAmountVisible = false
      this.userProfitVisible = false

      setTimeout(() => {
        this.monthlyAmountVisible = true
        this.userProfitVisible = true
      }, 100)
    },

    createSuccessInvestmentPopup() {
      this.$modal.open({
        component: 'SuccessInvestmentPopup',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.round-info__raised-of .mob {
  display: none; /* По умолчанию скрыть для десктопа */
}
@media (max-width: 768px) {
  /* Стили для мобильных устройств */
  .round-info__raised-of .mob {
    display: inline; /* Показать для мобильных */
  }
  .round-info__raised-of .desk {
    display: none; /* Скрыть для мобильных */
  }
  .round-info__progress2 {
    flex-direction: column;
  }
}
.round-info__progress2 {
  background-color: rgba(183, 233, 59, 0.3);
  margin-left: -25px !important;
  margin-right: -25px !important;
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 25px;
  @media (max-width: 768px) {
    margin-left: -20px !important;
    margin-right: -20px !important;
  }
}
.container {
  padding-top: 20px;
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
}
.investment-container {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  align-items: center;

  @media (min-width: 769px) {
    flex-direction: row;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }

  &__input {
    flex: 3;
    width: 100%;

    .investment-container__input-field {
      height: 44.5px;
      width: 100%;
    }
  }

  &__buttons {
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 10px;

    @media (max-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      gap: 0;
    }

    .buy-dnt__main-btn {
      width: 100%;
      margin-top: 10px;
      margin-left: 0;
      @media (min-width: 769px) {
        width: auto;
        margin-top: 0;
      }
    }
  }

  &__input-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;
    .field-wrapper {
      width: 100%;
    }
  }

  &__input-label {
    position: absolute;
    right: 10px;
    color: #857f7f;
    font-weight: 400;
    pointer-events: none;
    font-size: 14px;
  }
}

.investment-complete {
  color: orange;
  padding: 20px;
  font-weight: 900;
  font-size: 16px;
  text-align: center;
}

.investment-summary {
  margin-top: 20px;
  font-size: 20px;
  text-align: right;

  &__amount {
    color: #0000ff;
  }
}

.contract-wait {
  font-size: 16px;
  text-align: center;
  padding-top: 20px;
}

.payments-column {
  @media (max-width: 768px) {
    display: none;
  }
}

.round-info__payments-mob-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media (min-width: 769px) {
    display: none;
  }
  &__raised-of {
    font-weight: 900;
    font-size: 12px;
    &.mob {
      display: none;
    }
  }
  &__caption-data {
    font-size: 12px;
    margin-left: 3px;
  }
}

.btn-invest {
  width: 100% !important;
  height: 44.5px;
  margin-left: 20px;
  background-color: #0000ff;
  color: white !important;

  &.button_disabled {
    background-color: #cccccc;
    border-color: #cccccc !important;
    &::before {
      display: none;
    }
  }

  &.button_gray {
    background-color: #8e8e8e;
    border: solid 1px #6b6b6b;
    &::before {
      background-color: #7e4d4d;
    }
  }

  &.button_default {
    &::before {
      background-color: #7148f8;
    }
  }
}

.column {
  flex: 1;
}

a.toggle-link {
  color: #0000ff;
  cursor: pointer;
}
.calc {
  .right-align {
    text-align: right;
    padding-right: 10px;
  }
}
tr.border0 td {
  padding-bottom: 10px;
  padding-top: 0px;
  border-bottom: 1px solid black;
}

tr.border td {
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px solid black;
}
.toggle-link svg {
  height: 16px;
  width: 16px;
}
.caret {
  float: right;
}
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 1.3s ease;
}

.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.no-funds-error {
  position: relative;
  background-color: #81818130;
  color: #dc4d4d;
  border-radius: 6px;
  padding: 10px 10px 10px 28px;
  margin: 18px 0;
  font-size: 12px;
}

.icon-attention {
  position: absolute;
  fill: #dc4d4d;
  width: 10px;
  height: 10px;
  margin-top: 2px;
  margin-left: -15px;
}

.follow-instruction-inform {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__main {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    line-height: 16.41px;
    text-align: left;
  }

  &__additional {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.1;
    text-align: left;
    color: #a5a5a5;
  }

  &__loader {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    animation: spin 2s linear infinite;
  }

  &__confirm-icon {
    margin-left: 8px;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    opacity: 1;
    transform: rotate(360deg);
  }
}

@import '~assets/scss/pages/projects/project/project-transaction';
</style>
