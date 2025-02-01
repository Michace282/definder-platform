<template>
  <div class="project-form">
    <!--стейки-->
    <div>Contract {{ stakingAddress }}</div>
    <div v-if="stakes.length > 0">
      <SectionTitle header-tag="h3" class="project-form__title">
        Staking
      </SectionTitle>

      <div>
        <div
          v-for="(stake, index) in stakes"
          :key="index"
          class="project-card__container"
          style="margin-bottom: 10px"
        >
          <div>
            <small style="font-size: 10px">{{
              convertSecondsToDate(stake.startTime)
            }}</small>
          </div>
          <div>Staked: {{ showAmount(stake.amount) }}</div>
          <div>
            Award: +{{ showAmount(stake.award) }}
            <!--{{ showAmountUSD(stake.awardUSD) }}-->
          </div>
          <div v-if="stake.award > 0">
            Total: {{ showAmount(stake.award + stake.amount) }}
          </div>
          <div style="flex-shrink: 0">
            <BaseButton
              color="blue"
              style="width: min-content"
              @click="unStake(stake.id)"
            >
              UnStake
            </BaseButton>
          </div>
          <!--
            <div>
              volMul: {{ stake.volMul }} PeriodMul: {{ stake.periodMul }}
            </div>
            <div>
              Platform profit: {{ showAmountUSD(stake.platformProfit) }}
            </div>-->
        </div>
      </div>
    </div>

    <!-- прогресс-->
    <div v-if="contractProgress">Please, wait...</div>
    <!--форма инвестирования -->

    <div v-if="!contractProgress" style="margin-top: 40px">
      <div class="project-form__container">
        <SectionTitle header-tag="h3" class="project-form__title">
          New Stake
        </SectionTitle>
      </div>
      <BaseInput v-model="amount" />
      <div class="container periods">
        <div class="column">
          <a @click="selectPeriod(1)" :class="{ active: selectedPeriod === 1 }"
            >1 Year</a
          >
        </div>
        <div class="column">
          <a @click="selectPeriod(2)" :class="{ active: selectedPeriod === 2 }"
            >2 Year</a
          >
        </div>
        <div class="column">
          <a @click="selectPeriod(3)" :class="{ active: selectedPeriod === 3 }"
            >3 Year</a
          >
        </div>
      </div>
      <BaseButton color="blue" size="lg" @click="goStake"> Stake </BaseButton>
    </div>

    <!-- admin -->
    <div v-if="isOwner" style="margin-top: 40px">
      <SectionTitle header-tag="h3" class="project-form__title">
        Admin
      </SectionTitle>
      <BaseInput v-model="nowDate" placeholder="nowDate" />
      <BaseButton color="blue" size="lg" @click="setNowDate">
        Set Date
      </BaseButton>
    </div>
  </div>
</template>

<script>
import blockchain from '~/plugins/blockchain'
import { tokenABI } from '~/pkg/configs/tokenContract'
import { stakingABI } from '~/pkg/configs/stakingContract'

import SectionTitle from '~/components/general/SectionTitle'
import BaseInput from '~/components/base/BaseInput'
import BaseButton from '~/components/base/BaseButton'

// import contractAbi from '~/contracts/abi/projects.json'

export default {
  name: 'StakingForm',
  components: {
    SectionTitle,
    BaseInput,
    BaseButton,
  },
  mixins: [blockchain],
  data() {
    return {
      selectedPeriod: 1,
      stakingAddress: '',
      isOwner: false,
      contractProgress: false,
      contractBalance: 0,
      isLoading: false,
      amount: '1',
      nowDate: '',
      txAmount: 0,
      txAt: this.convertSecondsToDate(this.currentUnixTimestamp()),
      isMetamaskInstalled: false,
      isMetamaskConnected: false,
      stakes: [],
    }
  },
  mounted() {
    this.txAt = this.convertSecondsToDate(this.currentUnixTimestamp())
  },

  methods: {
    selectPeriod(period) {
      this.selectedPeriod = period
    },
    // инициализация март-контрактов для работы
    async initContract() {
      console.log('staking.initContract()')
      // контракты дебит/кредит
      // контракт токена в котором производятся инвестиции
      try {
        this.stakingAddress = process.env.STAKING_CONTRACT
        this.staking = new this.web3.eth.Contract(
          stakingABI,
          process.env.STAKING_CONTRACT
        )
        // читаем информсвцию о токене из контракта
        this.stakingTokenAddress = await this.staking.methods
          .stakingToken()
          .call()
        console.log('STAKING_TOKEN:', this.stakingTokenAddress)
        this.token = new this.web3.eth.Contract(
          tokenABI,
          this.stakingTokenAddress
        )

        this.decimals = await this.token.methods.decimals().call()
        this.stakingOwner = await this.staking.methods.owner().call()
        console.log('staking.Owner:', this.stakingOwner)
      } catch (error) {
        console.error('Invalid contract or network', error)
        this.$toast.error(`Invalid contract or network: ${error.message}`)
      }
    },
    async unStake(id) {
      try {
        await this.staking.methods
          .withdrawStake(id)
          .send({ from: this.activeAccount })
        await this.readBlockchainData()
      } catch (error) {
        console.error('unStake failed', error)
        this.$toast.error(`unStake failed: ${error.message}`)
      }
    },
    async fetchStakes() {
      console.log('fetchStakes()')
      try {
        const count = await this.staking.methods
          .getCountStakes()
          .call({ from: this.activeAccount })
        const stakesPromises = []
        console.log(this.activeAccount, 'getCountStakes=', count)
        console.log(
          await this.staking.methods
            .getCountUserStakes(this.activeAccount)
            .call()
        )
        let stake
        let stakeAward
        let stakeAwardUSD
        for (let i = 0; i < count; i++) {
          console.log('getStake', i)
          stake = await this.staking.methods
            .getStake(i)
            .call({ from: this.activeAccount })
          console.log('stake:', stake)
          if (stake.active) {
            stakeAward = await this.staking.methods
              .calculateStakeRewardToken(i)
              .call({ from: this.activeAccount })
            stakeAwardUSD = await this.staking.methods
              .calculateStakeReward(i)
              .call({ from: this.activeAccount })
            console.log('award:', stakeAward)
            stakesPromises.push({
              id: i,
              startTime: stake.startTime,
              amount: stake.amount / 1,
              award: stakeAward / 1,
              awardUSD: stakeAwardUSD,
            })
          }
        }

        this.stakes = await Promise.all(stakesPromises)
      } catch (error) {
        console.error('Ошибка при получении stakes:', error)
      }
    },
    // посмотреть данные из блокчейна
    async readBlockchainData() {
      console.log('staking.readBlockchainData()')
      if (!this.isMetamaskConnected) {
        console.log('No Metamask connected')
        await this.checkMetamaskInstalled()
      }
      if (this.isMetamaskConnected) {
        try {
          this.fetchStakes()
          if (
            this.stakingOwner.toLowerCase() === this.activeAccount.toLowerCase()
          ) {
            console.log('Is OWNER!')
            this.isOwner = true
          } else {
            console.log('NO OWNER!')
            this.isOwner = false
          }
          // получить дату из контракта
          this.nowDate = this.convertSecondsToDate(
            await this.staking.methods.getNow().call()
          )
        } catch (error) {
          console.error('Invalid contract', error)
          this.$toast.error(`Invalid contract: ${error.message}`)
        }
      }
    },
    // установит текущую дату
    async setNowDate() {
      console.log('sec=', this.convertToUnixSeconds(this.nowDate))
      console.log(await this.staking.methods.owner().call())
      await this.staking.methods
        .setNow(this.convertToUnixSeconds(this.nowDate))
        .send({
          from: this.activeAccount,
          gasPrice: await this.gasPrice(),
        })
      //      this.nowDate = '13'
      this.readBlockchainData()
    },
    // инвестирование
    async goStake() {
      this.contractProgress = true
      console.log('stake()')
      if (!this.isMetamaskConnected) {
        console.log('No Metamask connected')
        await this.checkMetamaskInstalled()
      }
      if (this.isMetamaskConnected) {
        // Вызов функции смарт-контракта
        // Замените 'depositFunction' на название функции вашего контракта и добавьте необходимые параметры        console.log('getAccounts()')
        try {
          const value = this.amount * Math.pow(10, this.decimals)
          console.log(`value=${value}`)

          // смотрим сколтко естьтокенов на балансе

          this.tokenBalanceValue = await this.token.methods
            .balanceOf(this.activeAccount)
            .call()
          console.log(`this.tokenBalanceValue=${this.tokenBalanceValue}`)
          console.log(`value=${value}`)

          if (value > this.tokenBalanceValue) {
            this.$toast.error(`Deposit failed: not enough on balance`)
            this.contractProgress = false
            return
          }

          // Разрешаем смарт-контракту получить токены в количестве value с кошелька инвестора
          console.log('approve ', value)
          await this.token.methods
            .approve(process.env.STAKING_CONTRACT, value)
            .send({
              from: this.activeAccount,
              gasPrice: await this.gasPrice(),
            })

          this.$toast.success('Approve successful')
          console.log('Stake ', value)
          // Переводим токены с кошелька инвестора в смарт-контракт
          await this.staking.methods.stake(value).send({
            from: this.activeAccount,
            gasPrice: await this.gasPrice(),
          })
          // обновляем на странице кол-во инвестированного
          this.readBlockchainData()
          // уведомление
          this.$toast.success('Stake successful ')
        } catch (error) {
          console.error('Stake failed', error)
          this.$toast.error(`Stake failed: ${error.message}`)
        }
      }
      this.contractProgress = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/pages/projects/project/project-transaction';
</style>

<style lang="scss" scoped>
@import '~assets/scss/cards/project-card';

.periods {
  padding-top: 20px;
  padding-bottom: 20px;
}
.periods .column:nth-child(1) {
  padding-right: 10px;
}
.periods .column:nth-child(2) {
  padding-right: 10px;
  padding-left: 10px;
}
.periods .column:nth-child(3) {
  padding-left: 10px;
}
.periods a {
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border: 1px solid #0000ff;
  display: flex;
  width: 100%;
  height: 46px;
}
.periods a.active {
  background-color: #0000ff;
  color: white;
}
.container {
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
}
.column {
  flex: 1;
}
</style>
<style>
.button__content {
  flex-direction: revert !important;
  justify-content: center;
  align-items: center;
}
</style>
