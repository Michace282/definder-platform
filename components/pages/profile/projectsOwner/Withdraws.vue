<template>
  <div class="container">
    <div v-if="isMetamaskConnected">
      <div v-if="loading">Loading...</div>
      <div v-if="!loading">
        <div
          v-for="(project, index) in ownerProjects"
          :key="index"
          class="project"
        >
          <div class="pr_name">
            {{ project.name }}
            <span style="display: none"
              >contractAddress: {{ project.contractAddress }}, balance:
              {{ project.contractBalance }}
            </span>
          </div>
          <div class="amount" v-if="!project.withdraw">
            {{ showAmountUSD(project.amountRaised, project.decimals) }}
          </div>
          <div class="init_withdraw" v-if="project.contractBalance > 0">
            <BaseInput
              v-model="withdrawTo[index]"
              :placeholder="'Recipient address'"
            />
            <BaseButton
              class="buy-dnt__main-btn"
              color="blue"
              @click="initWithdraw(project, withdrawTo[index])"
            >
              Init withdtaw
            </BaseButton>
          </div>
          <div v-if="project.withdraw">
            <div class="withdraw_to">
              Withdtaw to {{ project.withdraw.tx.recipient }}
            </div>
            <div v-if="project.contractBalance === '0'" class="amount">
              {{ showAmountUSD(project.amountRaised, project.decimals) }}
            </div>
            <div v-if="project.contractBalance === '0'">
              Transaction Approved!
            </div>
            <div class="withdraws" v-if="project.contractBalance > 0">
              <div
                v-for="(walletWithdraw, walletAddress) in project.withdraw
                  .wallets"
                :key="walletAddress"
                class="item"
              >
                <div class="withdraw_card">
                  <div class="title">WITHDRAW REQUEST:</div>
                  <div class="amount">
                    {{ showAmountUSD(project.amountRaised, project.decimals) }}
                  </div>
                  <div class="approve_wallet">Project wallet</div>
                  <div class="approve_wallet_address">{{ walletAddress }}</div>
                </div>
                <div class="withdraw_confirmed" v-if="walletWithdraw.approved">
                  Confirmed
                </div>
                <a
                  v-if="
                    !contractWait &&
                    !walletWithdraw.approved &&
                    activeAccount.toLowerCase() === walletAddress.toLowerCase()
                  "
                  class="btn-approve"
                  @click="approveWithdraw(project, project.withdraw.id)"
                >
                  Approve
                </a>
                <a
                  v-if="
                    !walletWithdraw.approved &&
                    activeAccount.toLowerCase() !== walletAddress.toLowerCase()
                  "
                  class="btn-approve"
                >
                  Approval required
                </a>
                <div
                  v-if="
                    contractWait &&
                    !walletWithdraw.approved &&
                    activeAccount.toLowerCase() === walletAddress.toLowerCase()
                  "
                >
                  Wait...
                </div>
              </div>
              <!---->
              <div style="clear: both"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js'
import blockchain from '~/plugins/blockchain'

import { USDTContractABI } from '~/pkg/configs/usdtContract'
import { projectABI } from '~/pkg/configs/projectContract'

import BaseButton from '~/components/base/BaseButton'
import BaseInput from '~/components/base/BaseInput'

export default {
  name: 'ProjectsOwnerWithdraws',

  components: {
    BaseButton,
    BaseInput,
  },
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
    }
  },

  methods: {
    showAmountUSD(value, decimals) {
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

    // вывод на адрес владельца
    async initWithdraw(project, _to) {
      this.contractWait = true
      this.loading = true
      try {
        await project.contract.methods
          .initPaymentToOwner(_to)
          .send({ from: this.activeAccount })
        this.$toast.success('Init withdraw success')
      } catch (e) {
        console.log(e)
        this.$toast.error('Init withdraw error')
      }
      this.contractWait = false
      this.readBlockchainData()
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
    async initProject(project) {
      console.log('initProject(', project.id, ')')
      const res = { contractAddress: project.contractAddress }
      if (!project.contractAddress || project.contractAddress === '') {
        return null
      }
      res.name = project.name
      // транзакции на вывод
      res.txs = []
      // инициализируем контракт
      console.log('contract..')
      try {
        res.contract = new this.web3.eth.Contract(
          projectABI,
          project.contractAddress
        )
        const isMultisig = await res.contract.methods
          .addressIsMultisig(this.activeAccount)
          .call({ from: this.activeAccount })
        console.log('isMultisig:', isMultisig)
        // кошелек не имеет прав
        if (!isMultisig) {
          return null
        }
      } catch (error) {
        console.log('Cant init contract for project ', project.id, error)
        return null
      }

      // Читаем из контракта некоторые свойства для работы
      for (const field of [
        'amountRaised',
        'amountMaxTarget',
        'endFundingTime',
        'getNow',
      ]) {
        res[field] = await res.contract.methods[field]().call()
        console.log('contract.', field, res[field])
      }

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
        // return null
      }

      // Получаем последнюю транзакцию на вывод
      const countTxs = await res.contract.methods
        .getCountTransactions()
        .call({ from: this.activeAccount })
      if (countTxs > 0) {
        // Информация по последней транзе вывода
        res.withdraw = await this.getTxInfo(res.contract, countTxs - 1)
      }

      // Возвращаем проект
      return res
    },
    async getOwnerProjects() {
      this.loading = true
      this.ownerProjects = []

      console.log('getOwnerProjects()')
      for (const index in this.items) {
        const pr = await this.initProject(this.items[index])
        if (pr) {
          this.ownerProjects.push(pr)
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
    console.log('items:')
    console.log(this.items)

    this.checkMetamaskInstalled()
  },
}
</script>

<style lang="scss" scoped>
.withdraw_card {
  box-shadow: 0px 4px 12px 0px #0000000a;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin: 10px 10px 20px 10px;
  padding: 20px;
}
.withdraws {
  width: 100%;
}
.amount {
  font-size: 40px;
  font-weight: 600;
  line-height: 44px;
  color: #0000ff;
  margin-bottom: 20px;
  display: inline-block;
  letter-spacing: -0.02em;
}
.withdraw_card .amount {
  font-size: 40px;
  font-weight: 600;
  line-height: 44px;
  color: #0000ff;
  margin-bottom: 20px;
  display: block;

  letter-spacing: -0.02em;
  text-align: center;
}
.withdraw_card .title {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: left;
  padding-bottom: 20px;
}
.pr_name {
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 20px;
}
.approve_wallet {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: left;
  margin-bottom: 20px;
}
.approve_wallet_address {
  //styleName: Small text;
  font-size: 16px;
  font-weight: normal;
  line-height: 24px;
  text-align: left;
  color: #828282;
  word-wrap: break-word;
}
.withdraw_confirmed,
.btn-approve,
.btn-approve:hover {
  cursor: pointer;
  height: Fixed (38px) px;
  padding: 10px 40px 10px 40px;
  gap: 10px;
  display: inline-flex;
  color: white;
  text-align: center;
  width: auto;
  border-radius: 16px;
  background-color: black;
  background-position: right 10px top 50%;
  background-repeat: no-repeat;
}
.withdraw_confirmed {
  background-image: url('~assets/icons/confirmed.png');
}
.withdraws .item {
  text-align: center;
  width: 33.3333%;
  float: left;
}
.project {
  padding-bottom: 40px;
  margin-bottom: 40px;
  border-bottom: 1px solid silver;
}
.init_withdraw {
  display: flex;
  margin-bottom: 40px;
}
.withdraw_to {
  font-weight: 900;
  font-size: 20px;
}
.container {
  padding-left: 80px;
  padding-right: 80px;
}
@import '~assets/scss/pages/profile/projects-table';
</style>
