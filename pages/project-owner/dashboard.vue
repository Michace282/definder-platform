<template>
  <div style="padding-left: 40px; padding-right: 40px">
    <div class="panels">
      <div class="panel">
        <div class="title">Remaining Value</div>
        <div class="amount" style="color: #0000ff">
          {{ showAmountUSD(amountForReturnRemainAmount) }}
        </div>
      </div>
      <div class="panel">
        <div class="title">Upcoming payment this month</div>
        <div class="amount">{{ showAmountUSD(upcomingAmountTotal) }}</div>
      </div>
      <div class="panel">
        <div class="title">Total Raised</div>
        <div class="amount">{{ showAmountUSD(totalRaisedAmount) }}</div>
      </div>
      <div class="panel">
        <div class="title">Available withdraws</div>
        <div class="amount" style="color: #7ad179">
          <a href="/profile/projects-owner">{{
            showAmountUSD(withdtawTotalAmount)
          }}</a>
        </div>
      </div>
    </div>

    <div v-if="isMetamaskConnected">
      <div v-if="loading">Loading...</div>
      <div v-if="!loading">
        <div class="container pad">
          <div class="column" style="flex: 3">
            <div
              v-for="(project, index) in ownerProjects"
              :key="index"
              class="project"
            >
              <div class="panel schedule">
                <div class="title">
                  Repayment schedule {{ project.info.name }}
                </div>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <thead>
                    <tr>
                      <th>Number</th>
                      <th>Payment</th>
                      <th>Days</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="payment in project.payments" :key="payment.id">
                      <td>Payment {{ payment.id }}</td>
                      <td>{{ showAmountUSD(payment.amount) }}</td>
                      <td v-if="payment.completed / 1 > 0">
                        Paid
                        <span
                          style="font-size: 9px; color: silver; display: block"
                          >{{ convertSecondsToDate(payment.completed) }}</span
                        >
                      </td>
                      <td v-if="payment.completed / 1 == 0">
                        {{ daysToNow(payment.time, project.getNow) }}
                      </td>
                      <td>
                        <div
                          v-if="payment.completed / 1 > 0"
                          class="confirmed"
                          style="width: 30px; height: 30px"
                        ></div>
                        <BaseButton
                          v-if="
                            payment.completed == 0 &&
                            project.getNow &&
                            project.getNow > payment.time
                          "
                          color="blue"
                          style="width: min-content"
                          @click="
                            makeReturnForAllUsers(project, payment.amount / 1)
                          "
                        >
                          Pay
                        </BaseButton>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <BaseButton
                          v-if="project.getNow > project.returnFromTime"
                          style="max-width: 95px"
                          color="white"
                          @click="makeReturnForAllUsersAllAmount(project)"
                        >
                          Full Pay
                        </BaseButton>
                        <div
                          v-if="project.getNow < project.returnFromTime"
                          style="
                            text-align: center;
                            color: #454545;
                            font-size: 12px;
                          "
                        >
                          Full Pay<br />Available From:<br />
                          {{ convertSecondsToDate(project.returnFromTime) }}
                        </div>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--contract_time-->
              <div v-if="project.isOwner">
                <div class="container" style="max-width: 400px">
                  <div class="column" style="flex: 3">
                    <BaseInput v-model="project.getNowFormatted" />
                  </div>
                  <div class="column">
                    <BaseButton color="blue" @click="setNow(project)">
                      Set Now
                    </BaseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--/column schelude-->
          <div class="column" style="flex: 2">
            <div v-for="(project, index) in ownerProjects" :key="index">
              <ProjectCard2
                :project="project.info"
                :project-id="project.info.id"
                :title="project.info.name"
                :address="project.info.address"
                :image="project.info.projectImages.imageCompressed"
                :status="project.info.status"
                :equity-raise="project.info.goal"
                :roi="project.info.roiPercent"
              />
            </div>
          </div>
          <!--/col projects-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'

import blockchain from '~/plugins/blockchain'

import { USDTContractABI } from '~/pkg/configs/usdtContract'
import { projectABI } from '~/pkg/configs/projectContract'

import BaseButton from '~/components/base/BaseButton'
import BaseInput from '~/components/base/BaseInput'
import ProjectCard2 from '~/components/cards/ProjectCard2'

export default {
  name: 'ProjectsOwnerDashboard',

  components: { BaseInput, BaseButton, ProjectCard2 },
  mixins: [blockchain],

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      loading: true,
      withdrawTo: [],
      ownerProjects: [],
      withdtawTotalAmount: 0,
      amountForReturnRemainAmount: 0,
      totalRaisedAmount: 0,
      upcomingAmountTotal: 0,
    }
  },

  methods: {
    async makeReturnForAllUsersAllAmount(project) {
      console.log('makeReturnForAllUsersAllAmount')
      console.log(project)
      console.log(project.contract)
      let value = project.amountForReturn - project.amountReturned
      try {
        value = new BigNumber(value)
        console.log('approve', value)
        console.log('approve', value.toFixed())
        await project.token.methods
          .approve(project.contractAddress, value.toFixed())
          .send({ from: this.activeAccount })
        await project.contract.methods
          .makeReturnForAllUsersAllAmount()
          .send({ from: this.activeAccount })
        // project.payments = await this.readContractPayments(project)
        await this.readBlockchainData()
      } catch (e) {
        console.log(e.message)
        console.log(e)
        this.$toast.error('Error')
      }
    },
    async makeReturnForAllUsers(project, value) {
      console.log('makeReturnForAllUsers')
      console.log(project)
      console.log(project.contract)
      try {
        value = new BigNumber(value)
        console.log('approve', value)
        console.log('approve', value.toFixed())
        await project.token.methods
          .approve(project.contractAddress, value.toFixed())
          .send({ from: this.activeAccount })
        await project.contract.methods
          .makeReturnForAllUsers()
          .send({ from: this.activeAccount })
        // project.payments = await this.readContractPayments(project)
        await this.readBlockchainData()
      } catch (e) {
        console.log(e.message)
        console.log(e)
        this.$toast.error('Error')
      }
    },
    async setNow(project) {
      console.log('setNow()')
      console.log(project)
      console.log(project.getNowFormatted)
      await project.contract.methods
        .setNow(this.convertToUnixSeconds(project.getNowFormatted))
        .send({ from: this.activeAccount })
      await this.readBlockchainData()
    },
    daysToNow(timestamp, now) {
      // const now = dayjs()
      now = dayjs(now * 1000)
      const timestampDate = dayjs(timestamp * 1000)
      const days = timestampDate.diff(now, 'day')
      if (days < 0) {
        return 'Overdue'
      }
      if (days === 1) {
        return '1 Day'
      } else {
        return days + ' Days'
      }
    },
    showAmountUSD(value, decimals = 18) {
      return (
        '$' +
        new Intl.NumberFormat('ru-RU', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
          .format(value / Math.pow(10, decimals))
          .toString()
          .replace(/,00$/, '')
      )
    },
    // Прочитать расписание выплат из контракта
    async readContractPayments(project) {
      const projectContract = project.contract
      console.log('readContractPayments', projectContract)
      try {
        const count = await projectContract.methods
          .getCountReturns()
          .call({ from: this.activeAccount })
        const itemsPromises = []
        console.log(this.activeAccount, 'countItems:', count)
        let item
        let upcomingAmount = 0
        for (let i = 1; i <= count; i++) {
          console.log('getReturnItem', i)
          item = await projectContract.methods
            .getReturnItem(i)
            .call({ from: this.activeAccount })
          console.log('item:', item)
          console.log(item.time)
          console.log('amount:', item.amount)
          console.log(item.completed)
          if (item.completed / 1 !== 1) {
            upcomingAmount = item.amount / 1
          }
          itemsPromises.push({
            id: i,
            time: parseInt(item.time),
            amount: item.amount / 1,
            completed: parseInt(item.completed),
          })
        }
        if (upcomingAmount > 0) {
          this.upcomingAmountTotal += upcomingAmount
        } else {
          this.upcomingAmountTotal +=
            project.amountForReturn - project.amountReturned
        }
        return await Promise.all(itemsPromises)
      } catch (error) {
        console.error('Ошибка при получении списка записей:', error)
      }
    },

    // получить информацию по транзакции
    async getTxInfo(contract, txId) {
      const res = { wallets: {}, id: txId }
      res.tx = await contract.methods
        .getTransaction(txId)
        .call({ from: this.activeAccount })
      // смотрим кто одобрил
      for (let i = 0; i < 3; i++) {
        console.log('mulitsig', i)
        const multisigWallet = await contract.methods
          .multiSigAddresses(i)
          .call()
        console.log('multisigWallet:', multisigWallet)
        // Этот кошелек еще не обрабатывали
        if (multisigWallet && !(multisigWallet in res.wallets)) {
          res.wallets[multisigWallet] = {
            approved: await contract.methods
              .isApprovedTx(txId, multisigWallet)
              .call({ form: this.activeAccount }),
          }
        }
      }
      return res
    },
    // Одобрить транзакцию
    async approveWithdraw(project, txId) {
      console.log('approveWithdraw', txId, project)
      this.contractWait = true

      console.log(
        'getCountTransactions:',
        await project.contract.methods
          .getCountTransactions()
          .call({ from: this.activeAccount })
      )

      try {
        await project.contract.methods
          .approvePaymentToOwner(txId)
          .send({ from: this.activeAccount })
        this.$toast.success('Approve withdraw success')
        await this.readBlockchainData()
      } catch (e) {
        console.log(e)
        this.$toast.error('Approve withdraw error')
      }
      this.contractWait = false
    },

    // Получить данные из контракта из блокчейна
    async readFinancingProject(project) {
      console.log('readFinancingProject', project.id)
      const res = { contractAddress: project.contractAddress }
      if (!project.contractAddress || project.contractAddress === '') {
        return null
      }
      res.info = project
      // инициализируем контракт
      res.contract = new this.web3.eth.Contract(
        projectABI,
        project.contractAddress
      )
      try {
        const isMultisig = await res.contract.methods
          .addressIsMultisig(this.activeAccount)
          .call({ from: this.activeAccount })
        console.log('isMultisig:', isMultisig)
        // кошелек не имеет прав
        if (!isMultisig) {
          return null
        }
      } catch (error) {
        console.log('Cant read data from blockchain for project', project.id)
        return null
      }
      // Читаем из контракта некоторые свойства для работы
      for (const field of [
        'amountRaised',
        'amountMaxTarget',
        'endFundingTime',
        'getNow',
        'amountReturned',
        'amountForReturn',
        'owner',
        'allReturnFromDays',
        'returnStartTime',
      ]) {
        res[field] = await res.contract.methods[field]().call()
        console.log('contract.', field, res[field])
      }
      if (
        res.amountReturned / 1 >= res.amountForReturn / 1 &&
        res.amountForReturn > 0
      ) {
        return null
      }
      res.returnFromTime =
        res.returnStartTime / 1 + res.allReturnFromDays * 24 * 3600
      res.getNowFormatted = this.convertSecondsToDate(res.getNow)
      if (res.owner.toLowerCase() === this.activeAccount.toLowerCase()) {
        res.isOwner = true
      } else {
        res.isOwner = false
      }
      this.totalRaisedAmount += res.amountRaised / 1
      if (
        (res.amountRaised / 1 > 0 &&
          res.amountRaised / 1 >= res.amountMaxTarget / 1) ||
        res.getNow / 1 > res.endFundingTime / 1
      ) {
        res.crowdFinish = true
      } else {
        console.log('crowdFinish: false')
        res.crowdFinish = false
        // Сбор не закончен не показываем проек
        return null
      }
      // информация по токену инветирования
      res.tokenAddress = await res.contract.methods.InvestToken().call()

      res.token = new this.web3.eth.Contract(USDTContractABI, res.tokenAddress)

      res.decimals = await res.token.methods.decimals().call()

      // баланс контракта
      res.contractBalance = new BigNumber(
        await res.token.methods
          .balanceOf(res.contractAddress)
          .call({ from: this.activeAccount })
      ).toFixed()
      // нет токенов в контракте
      if (res.contractBalance === '0') {
        console.log(
          'amountForReturnRemainAmount+=',
          res.amountForReturn,
          res.amountReturned
        )
        this.amountForReturnRemainAmount =
          this.amountForReturnRemainAmount +
          res.amountForReturn / 1 -
          res.amountReturned / 1
        // return null
      } else {
        // считаем сколько доступно для вывода
        console.log('add ' + res.contractBalance)
        this.withdtawTotalAmount += res.contractBalance / 1
        // не возвращаем проект для вывода в панели выплат
        return null
      }

      // Читаем расаисание выплат
      res.payments = await this.readContractPayments(res)
      // Возвращаем проект

      return res
    },
    // Получить проекты владельца
    async getOwnerProjects() {
      this.loading = true
      this.ownerProjects = []
      this.withdtawTotalAmount = 0
      this.totalRaisedAmount = 0
      this.amountForReturnRemainAmount = 0
      this.upcomingAmountTotal = 0

      console.log('getOwnerProjects()')
      console.log(this.projectsFinacing.results)
      const items = this.projectsFinacing.results
      console.log(items)
      for (const index in items) {
        const project = await this.readFinancingProject(items[index])
        if (project) {
          this.ownerProjects.push(project)
        }
      }
      console.log('ownerProjects:', this.ownerProjects)
      this.loading = false
      return this.ownerProjects
    },

    formatToThousand(num) {
      return this.$numFormatter.formatToThousand(num)
    },
    formatDate(date) {
      if (!date) {
        return ''
      }
      return this.$date.formatToShort(date)
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
          // смотрим какие проекты принадлежат юзеру через блокчейн
          await this.getOwnerProjects()
        }
      } catch (error) {
        console.error('readBlockchain error:', error)
      }
    },
  },
  mounted() {
    console.log('2. projectsFinacing:')
    console.log(this.projectsFinacing)

    this.checkMetamaskInstalled()
  },
  async asyncData({ route, redirect, localePath, $api }) {
    let projectsFinacing = {}
    try {
      projectsFinacing = await $api.projects.getProjects({
        status: 'financing',
      })
    } catch (e) {}

    console.log('1. projectsFinacing:', projectsFinacing)
    return {
      projectsFinacing,
    }
  },
}
</script>

<style scoped lang="scss">
.panel {
  padding: 24px;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 4px 12px 0px #0000000a;
  border-radius: 8px;
}
.panels .panel {
  flex: 1 0 calc(25% - 32px); /* 25% ширины минус отступы */
}
.panel .title {
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  text-align: left;
}
.panel .amount {
  font-size: 40px;
  font-weight: 600;
  line-height: 44px;
  letter-spacing: -0.02em;
  text-align: left;
}
.panel .project-card__container {
  border: none !important;
}
.panel .project-card {
  border: none !important;
}
.panels {
  padding-top: 32px;
  padding-bottom: 32px;
  margin-bottom: 20px;
  display: flex;

  flex-wrap: wrap;
  gap: 32px;
}
.schedule .title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: left;
  margin-bottom: 24px;
}
.schedule table td {
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
}
.schedule table tbody tr:nth-last-child(1) td {
  border-bottom: none;
}
.schedule table tbody tr:nth-last-child(2) td {
  border-bottom: none;
}
.schedule table thead th {
  color: #828282;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: left;
}

.container.pad .column {
  padding: 10px;
}
.container {
  padding-top: 20px;
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
}
.column {
  flex: 1;
}
.confirmed {
  background-image: url('~assets/icons/confirmed.png');
  background-repeat: no-repeat;
  background-position: top 50% left 50%;
}
@media (max-width: 768px) {
  .panels {
    padding-left: 10px;
    padding-right: 10px;
  }
  .panels .panel {
    flex: 1 0 100%; /* 100% ширины для 1 блока */
  }
}
@import '~assets/scss/pages/profile/my-projects/index';
</style>
