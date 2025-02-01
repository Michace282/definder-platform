import Web3 from 'web3'

export default {
  data() {
    return {
      contractWait: false,
      activeAccount: '',
      isOwner: false,
      isLoading: false,
      isMetamaskInstalled: false,
      isMetamaskConnected: false,
      networkId: 0,
      invalidNetwork: false,
      handleAccountsChangedInited: false,
    }
  },
  async mounted() {
    console.log('blockain.mounted()')
    this.checkNetwork()

    await this.checkMetamaskInstalled()
    if (this.isMetamaskInstalled) {
      window.ethereum.removeListener(
        'accountsChanged',
        this.handleAccountsChanged
      )
      if (!this.handleAccountsChangedInited) {
        this.handleAccountsChangedInited = true
        console.log('init handleAccountsChanged')
        window.ethereum.on('accountsChanged', this.handleAccountsChanged)
      }
      window.ethereum.on('networkChanged', this.handleNetwotkChanged)
    }
    if (this.isMetamaskConnected) {
      await this.readBlockchainData()
    }

    // if (!this.isMobileMetamask) {
    // this.checkMetamaskInstalled(true)
    // }
  },
  methods: {
    async gasPrice() {
      let res = await this.web3.eth.getGasPrice()
      res = parseInt(res * 1.5)
      return res
    },
    async changeNetwork() {
      try {
        // Попытка переключиться на нужную сеть
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId:
                '0x' + parseInt(process.env.BLOCKCHAIN_NETWORK_ID).toString(16),
            },
          ],
        })
      } catch (switchError) {
        console.log('switchError:')
        console.log(switchError)
        // Если нужная сеть не добавлена в MetaMask
        if (switchError.code === 4902) {
          try {
            // Добавление новой сети в MetaMask
            console.log(
              '0x' + parseInt(process.env.BLOCKCHAIN_NETWORK_ID).toString(16)
            )
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId:
                    '0x' +
                    parseInt(process.env.BLOCKCHAIN_NETWORK_ID).toString(16),
                  chainName: 'BNB Chain',
                  rpcUrls: ['https://bsc-dataseed.binance.org/'],
                  nativeCurrency: {
                    name: 'Binance Coin',
                    symbol: 'BNB',
                    decimals: 18,
                  },
                  blockExplorerUrls: ['https://bscscan.com/'],
                },
              ],
            })
          } catch (addError) {
            console.error('Ошибка при добавлении сети в MetaMask:', addError)
          }
        } else {
          console.error('Ошибка при переключении сети в MetaMask:', switchError)
        }
      }
    },
    async checkNetwork() {
      this.web3 = new Web3(window.ethereum)
      this.networkId = await this.web3.eth.getChainId()
      if (this.networkId.toString() !== process.env.BLOCKCHAIN_NETWORK_ID) {
        this.invalidNetwork = true
        await this.changeNetwork()
      } else {
        this.invalidNetwork = false
      }
    },
    // Обработчик события смены активного кошелька
    async handleNetwotkChanged(accounts) {
      this.web3 = new Web3(window.ethereum)
      if (this.web3.eth.getChainId() !== this.networkId) {
        this.checkNetwork()
        console.log('blockchain.handleAccountsChanged:', accounts)
        this.$toast.success('Network changed')
        // Заново инициализируем конотракты
        await this.initContractWrap()
        this.readBlockchainData()
        // Здесь вы можете обновить состояние вашего компонента или выполнить другие действия
      }
    },
    // Обработчик события смены активного кошелька
    handleAccountsChanged(accounts) {
      console.log('blockchain.handleAccountsChanged:', accounts)
      if (this.activeAccount !== accounts[0]) {
        this.$toast.success('Account changed ' + this.activeAccount)
      }
      this.activeAccount = accounts[0]
      this.readBlockchainData()
      // Здесь вы можете обновить состояние вашего компонента или выполнить другие действия
    },

    async checkMetamaskInstalled() {
      console.log('blockchain.checkMetamaskInstalled()')
      if (window.ethereum) {
        this.isMetamaskInstalled = true
        this.web3 = new Web3(window.ethereum)
        try {
          // Запросить доступ, если MetaMask уже установлен
          console.log('await get accounts......')

          // Получаем активный аккаунт MetaMask
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
          })
          if (accounts.length === 0) {
            console.error('Активный аккаунт MetaMask не найден')
            return false
          }
          this.activeAccount = accounts[0]
          if (accounts.length === 0) {
            console.error('Активный аккаунт MetaMask не найден')
            return false
          }
          this.activeAccount = accounts[0]
          console.log('activeAccount:', this.activeAccount)
          if (!this.isMetamaskConnected) {
            this.checkNetwork()
            // this.$toast.success('Metamask connected: ' + this.activeAccount)
            this.isMetamaskConnected = true
          }
          // this.web3.eth.handleRevert = true

          await this.initContractWrap()
        } catch (error) {
          this.$toast.error('User denied account access')
          console.error('User denied account access', error)
        }
      } else {
        console.log('Please install MetaMask!')
        this.isMetamaskInstalled = false
      }
    },
    async initContractWrap() {
      try {
        await this.initContract()
        console.info('initContract - OK')
      } catch (error) {
        this.isOwner = false
        console.error('initContract error:', error)
        this.$toast.error('initContract error')
      }
    },
    // инициализация март-контрактов для работы
    async initContract() {
      console.log('initContract()')
      return await Promise.resolve()
    },
    showAmount(value) {
      console.log(value)
      console.log(this.decimals)
      return (
        new Intl.NumberFormat('ru-RU')
          .format(value / Math.pow(10, this.decimals))
          .toString() + ' DNT'
      )
    },
    showAmountUSD(value) {
      console.log(value)
      console.log(this.debitCreditTokenDecimals)
      return (
        '$' +
        new Intl.NumberFormat('ru-RU', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
          .format(value / Math.pow(10, this.debitCreditTokenDecimals))
          .toString()
          .replace(/,00$/, '')
      )
    },
    convertToUnixSeconds(dateStr) {
      const parts = dateStr.split(', ')
      const dateParts = parts[0].split('.')
      const timeParts = parts[1].split(':')

      // Создание объекта Date
      const date = new Date(
        dateParts[2],
        dateParts[1] - 1,
        dateParts[0],
        timeParts[0],
        timeParts[1],
        timeParts[2]
      )

      // Получение секунд Unix
      return Math.floor(date.getTime() / 1000)
    },
    currentUnixTimestamp() {
      return Math.floor(new Date().getTime() / 1000)
    },
    convertSecondsToDate(seconds) {
      const date = new Date(seconds * 1000)
      const options = {
        // timeZone: timeZone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      }
      return date.toLocaleString(undefined, options)
    },
    // посмотреть данные из блокчейна
    async readBlockchainData() {
      console.log('readBlockchainData()')
      return await Promise.resolve()
    },
  },
}
