import Web3 from 'web3'

export default (ctx, inject) => {
  const web3 = new Web3()
  ctx.$web3 = web3
  inject('web3', web3)
}
