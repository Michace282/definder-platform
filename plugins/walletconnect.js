import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'
import { DNTContract, USDTContract } from '~/pkg/configs/metaMaskContracts'

class Provider {
  constructor(ctx) {
    this.ctx = ctx

    this.accounts = []
    this.provider = null
    this.web3 = null
  }

  get isConnected() {
    return this.ctx.store.getters['wallets/walletconnect/IS_CONNECTED']
  }

  set isConnected(value) {
    this.ctx.store.commit('wallets/walletconnect/TOGGLE_CONNECTION', value)
  }

  async mount() {
    this.init()

    if (this.ctx.$auth.loggedIn && this.provider.walletMeta) {
      await this.connect()
    }
  }

  init() {
    this.provider = new WalletConnectProvider({
      chainId: 56,
      infuraId: '6c5744c5fe674fcfba0fa7c9c7bc1495',
      rpc: {
        56: 'https://bsc-dataseed1.binance.org/',
      },
      qrcodeModalOptions: {
        desktopLinks: [],
        mobileLinks: ['trust wallet', 'metamask'],
      },
    })

    this.provider.on('disconnect', (code, reason) => {
      this.updateConnection(false)
    })
  }

  async connect() {
    if (!this.provider?.connected) {
      await this.init()
    }

    if (!this.ctx.$auth.loggedIn) {
      throw new Error(`user isn't logged in`)
    }

    this.accounts = await this.provider.enable()

    this.web3 = new Web3(this.provider)

    const walletUrl = this.provider.walletMeta?.url
    const walletId = this.accounts[0]
    if (walletUrl.includes('https://trustwallet.com', 0)) {
      await this.ctx.$api.wallets.addOrUpdateUserTrustWallet({ name: walletId })
    } else if (walletUrl.includes('https://metamask.io', 0)) {
      await this.ctx.$api.wallets.addOrUpdateUserMetamaskWallet({
        name: walletId,
      })
    }

    await this.ctx.$auth.fetchUser()

    this.updateConnection()
  }

  async sendTransaction({ toAddress, txValue, wallet }) {
    const fromAddress = this.accounts[0]
    const formattedValue = txValue * 1000000
    const value = this.web3.utils.toHex(formattedValue) // usdt/bnb

    let ABI
    let tokenAddress
    let chainId

    if (wallet === 'dnt') {
      tokenAddress = '0x2456493e757fDeedF569781F053998A72adfad03' // bnb dnt
      ABI = DNTContract
      chainId = 56
    } else if (wallet === 'busd') {
      tokenAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7' // eth usdt
      // tokenAddress = '0xB404c51BBC10dcBE948077F18a4B8E553D160084' // ropsten usdt
      ABI = USDTContract
      chainId = 1
    }

    if (chainId !== this.provider.chainId) {
      const err = this.ctx.i18n.t('TOAST.WALLET_CONNECT_CHAIN_ID_ERROR')
      const hint = this.ctx.i18n.t('TOAST.WALLET_CONNECT_CHANGE_CHAIN_ID_HINT')

      this.ctx.$toast.error(`${err}<br>${hint}`)

      throw new Error('your wallet connected to incorrect chain id')
    }

    const contract = new this.web3.eth.Contract(ABI, tokenAddress)

    let createTxHash
    try {
      createTxHash = await contract.methods.transfer(toAddress, value)
    } catch (e) {
      console.error(e)
    }

    let gasPrice = 30000000000
    let gasLimit = 63000
    try {
      const gasData = await this.ctx.$api.wallets.getGasData({
        transactionFrom: fromAddress,
        transactionTo: toAddress,
        value: formattedValue,
      })

      gasPrice = gasData.gasPrice
      gasLimit = gasData.gasLimit
    } catch (e) {
      console.error(e)
    }

    const transactionParameters = {
      to: tokenAddress,
      from: fromAddress,
      gasPrice,
      gas: gasLimit,
      data: createTxHash.encodeABI(),
    }

    let txHash
    try {
      const transactionResponse = await this.web3.eth.sendTransaction(
        transactionParameters
      )

      txHash = transactionResponse.transactionHash
    } catch (e) {
      if (e.code === 4100) {
        // error message
      }
      console.error(e)
    }

    if (txHash) {
      let link
      if (wallet !== 'usdt') link = 'https://bscscan.com/tx/' + txHash
      else link = 'https://etherscan.io/tx/' + txHash

      return link
    }

    throw new Error('transaction has failed')
  }

  async disconnect() {
    await this.provider?.disconnect()

    this.updateConnection(false)
  }

  updateConnection(value = null) {
    this.isConnected = value ?? this.provider.connected
  }
}

export default function (ctx, inject) {
  const provider = new Provider(ctx)
  inject('walletconnect', provider)
  ctx.$walletconnect = provider
}
